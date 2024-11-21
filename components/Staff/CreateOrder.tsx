"use client"

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

//Libs, Utils, Types, and Actions
import { UserOrder, UserOrderSchema } from "@/schemas/order.schema";
import { makeApiRequest } from "@/lib/apiUtils";
import { computeSHA256 } from "@/lib/fileUpload";
import { getSignedURL } from "@/actions/server/uploadFiles";

//Import Needed Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/Auth/error-message";
import MediaPreview from "../Orders/PreviewImage";

//Icons
import { ArrowLeft3, ArrowRight3 } from "iconsax-react";
import SelectUser from "../Orders/SelectUser";


const fields = [
    { name: "price", placeholder: "Price or Amount Charged", type: "number", label: "Price or Amount Charged" },
    { name: "amountPaid", placeholder: "Amount Paid (If none, add 0)", type: "number", label: "Amount Paid (Deposit)" },
    { name: "quantity", placeholder: "How many clothes", type: "number", label: "Total Number of Clothes" },
    { name: "service", placeholder: "Example: Washing, Ironing...", type: "text", label: "Needed Services" },
    { name: "pickupDay", placeholder: "The Pick up Date", type: "datetime-local", label: "Pick up Day" }
]

const CreateOrder = ({ users, email }: { users: User[], email: string }) => {

    const router = useRouter();
    const [index, setIndex] = useState<number>(0)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [files, setFiles] = useState<File[]>([]);
    const [fileUrls, setFileUrls] = useState<MediaFile[]>([]);
    const [preview, setPreview] = useState<boolean>(false);

    //Functions
    const indexFunction = (type: "add" | "remove") => {
        if (type === "add") {
            if (index === 2) return;
            const isFirstPageValid = Object.keys(errors).every(key =>
                !['price', 'amountPaid', 'quantity', 'service', 'pickupDay'].includes(key)
            );
            if (isFirstPageValid) {
                setIndex(index + 1);
            } else {
                toast.error("Please fill out all required fields correctly before proceeding.");
            }
        }
        if (type === "remove") {
            if (index === 0) return
            setIndex(index - 1);
        }
    };

    const handleUserSelect = (user: User | null) => {
        setSelectedUser(user)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        setFiles(selectedFiles);

        // Revoke previous URLs
        fileUrls.forEach(file => URL.revokeObjectURL(file.url));

        // Create new MediaFile objects
        const newFileUrls: MediaFile[] = selectedFiles.map(file => ({
            url: URL.createObjectURL(file),
            type: file.type
        }));

        setFileUrls(newFileUrls);
    };

    const handlePreviewToggle = () => {
        setPreview(!preview);
    };

    //Reset Function
    const resetFileStates = () => {
        setIndex(0);
        setFiles([]);
        setFileUrls([]);
        setPreview(false);
    };

    // Data validation
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserOrder>({
        resolver: zodResolver(UserOrderSchema),
    });

    //Upload Files
    const uploadFiles = async (name: string) => {
    
        if (!files.length) {
            return;
        }

        toast.info("Uploading Media Files...");

        try {
            const newUploadedUrls: string[] = [];

            // Map through all the files and process each one
            const uploadPromises = files.map(async (file) => {
                const checksum = await computeSHA256(file);
                const signedUrlResponse: SignedUrlResponse = await getSignedURL(file.name, file.type, file.size, checksum, name);

                if (signedUrlResponse.failure) {
                    console.error(`Failed to upload ${file.name}: ${signedUrlResponse.failure}`);
                    return;
                }

                const url = signedUrlResponse.success?.url;
                if (!url) {
                    console.error(`No URL returned for ${file.name}`);
                    return;
                }
                await fetch(url, {
                    method: "PUT", body: file,
                    headers: { "Content-Type": file.type }
                })
                newUploadedUrls.push(url.split("?")[0]);
            });

            // Wait for all uploads to complete, throw a toast, and then
            await Promise.all(uploadPromises);
            toast.success("Files uploaded successfully");
            return newUploadedUrls;

        } catch (error) {
            console.error("Error uploading files:", error);
            toast.error("Failed to upload files");
            return null;
        }
    };

    // OnSubmit function
    const onSubmit: SubmitHandler<UserOrder> = async (data) => {
        try {
            //Upload Files to AWS
            const uploadedUrls = await uploadFiles(selectedUser?.name ?? "nameError");

            if (uploadedUrls && uploadedUrls.length > 0) {

                toast.info("Creating Order...");
                const formData = { ...data, images: uploadedUrls, user: selectedUser, email };

                //Save to the database
                await makeApiRequest("/createOrder", "post", formData, {
                    onSuccess: () => {
                        toast.success(`Your order was created successfully.`);
                        reset();
                        resetFileStates()
                        router.push("/orders");
                    },
                    onError: (error) => {
                        toast.error(error.response.data);
                        resetFileStates()
                    },
                });
            } else {
                toast.error("Failed to upload files, kindly try again.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Failed to create order. Please try again.");
        }
    };

    return (
        <main className="flex justify-center items-center h-dvh">
            <div className="border-slate-200 dark:border-slate-800 bg-light-600 dark:bg-dark-600 p-4 sm:p-6 md:p-8 xl:p-10 border rounded-lg w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={`${index === 0 ? "mt-4" : "hidden"}`}>
                        <SelectUser users={users} onSelectUser={handleUserSelect} />
                    </div>
                    <div className={`${index === 1 ? "flex flex-col gap-y-5 mt-4" : "hidden"}`}>
                        {fields.map((field) => (
                            <div key={field.name} className="flex flex-col">
                                <Input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    id={field.name}
                                    name={field.name as "price" | "amountPaid" | "quantity" | "service" | "pickupDay"}
                                    register={register}
                                    label={field.label}
                                />
                                {errors[field.name as keyof typeof errors] && (
                                    <ErrorText message={errors[field.name as keyof typeof errors]?.message as string} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={`${index === 2 ? "flex flex-col gap-y-5 mt-4" : "hidden"}`}>
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="media">Select Image(s) or Video(s)</label>
                            <input onChange={handleChange} type="file" id="media" name="media" accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm" multiple className="focus:border-slate-200 focus:dark:border-slate-800 bg-white dark:bg-black px-2 xl:px-4 py-3 rounded-lg duration-300 focus:outline-none" />
                        </div>
                        {fileUrls.length > 0 &&
                            <button type="button" onClick={handlePreviewToggle} className="text-generalBlue text-left dark:text-cloudBlue">{preview ? 'Close Preview' : 'Preview Media'}</button>
                        }
                        <Button type="submit" text="Create Order" loading={isSubmitting} />
                    </div>
                </form>
                <div className="flex justify-between mt-8">
                    <p onClick={() => indexFunction("remove")} className={`${index === 0 ? "text-inherit cursor-not-allowed" : "text-textOrange cursor-pointer"} flex gap-x-1 items-center hover:-translate-x-1 duration-300`}><ArrowLeft3 size="36" variant="Bold" /><span>Prev</span></p>
                    <p onClick={() => indexFunction("add")} className={`${index === 2 ? "text-inherit cursor-not-allowed" : "text-generalBlue dark:text-cloudBlue cursor-pointer"} flex gap-x-1 items-center hover:translate-x-1 duration-300`}><ArrowRight3 size="36" variant="Bold" /><span>Next</span></p>
                </div>
                <p className="font-semibold text-[10px] text-center text-textGreen xl:text-sm md:text-xs">Steps {index + 1}/3 </p>
            </div>
            {preview && (
                <MediaPreview files={fileUrls} onClose={handlePreviewToggle} />
            )}
        </main>
    );
}

export default CreateOrder;