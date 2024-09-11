"use client"

import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

//Libs, Utils, Types, and Actions
import { Order, OrderSchema } from "@/schemas/order.schema";
import { makeApiRequest } from "@/lib/apiUtils";
import { computeSHA256 } from "@/lib/fileUpload";
import { getSignedURL } from "@/actions/server/uploadFiles";

//Import Needed Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/Auth/error-message";
import AutocompleteInput from "./SelectUser";

//Icons
import { ArrowLeft3, ArrowRight3 } from "iconsax-react";


const fields = [
    { name: "notes", placeholder: "Notes about the client (Optional)", type: "text", label: "Notes" },
    { name: "price", placeholder: "Price or Amount Charged", type: "number", label: "Price or Amount Charged" },
    { name: "amountPaid", placeholder: "Amount Paid (If none, add 0)", type: "number", label: "Amount Paid (Deposit)" },
    { name: "quantity", placeholder: "How many clothes", type: "number", label: "Total Number of Clothes" },
    { name: "service", placeholder: "Example: Washing, Ironing...", type: "text", label: "Needed Services" },
    { name: "pickupDay", placeholder: "The Pick up Date", type: "datetime-local", label: "Pick up Day" }
]

const OrderForm = ({ users }: { users: UserWithOutOrder[] }) => {

    const router = useRouter();
    const [index, setIndex] = useState<number>(0)
    const [selectedUser, setSelectedUser] = useState<UserWithOutOrder | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [uploadedFilesUrl, setUploadedFilesUrl] = useState<string[]>([]);
    const [preview, setPreview] = useState<boolean>(false);

    //Functions

    const indexFunction = (type: "add" | "remove") => {
        if (type === "add") {
            if (index === 2) return;
            setIndex(index + 1);
        }
        if (type === "remove") {
            if (index === 0) return
            setIndex(index - 1);
        }
    };

    const handleUserSelect = (user: UserWithOutOrder) => {
        setSelectedUser(user)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        setFiles(selectedFiles);

        // Revoke previous URLs
        fileUrls.forEach(url => URL.revokeObjectURL(url));

        // Create new URLs
        const newFileUrls = selectedFiles.map(file => URL.createObjectURL(file));
        setFileUrls(newFileUrls);
    }

    const handlePreviewToggle = () => {
        setPreview(!preview);
    };

    // Data validation
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Order>({
        resolver: zodResolver(OrderSchema),
    });

    //Upload Files
    const uploadFiles = async () => {
        toast.info("Uploading Media Files...")

        if (!files.length) {
            return;
        }
        try {
            const newUploadedUrls: string[] = [];

            // Map through all the files and process each one
            const uploadPromises = files.map(async (file) => {
                const checksum = await computeSHA256(file);
                const signedUrlResponse: SignedUrlResponse = await getSignedURL(file.name, file.type, file.size, checksum, selectedUser?.name!);

                if (signedUrlResponse.failure) {
                    console.error(`Failed to upload ${file.name}: ${signedUrlResponse.failure}`);
                    return;
                }

                const url = signedUrlResponse.success?.url;
                if (!url) {
                    console.error(`No URL returned for ${file.name}`);
                    return;
                }
                await makeApiRequest(url, 'put', file, {
                    headers: { 'Content-Type': file.type },
                });
                newUploadedUrls.push(url.split("?")[0]);
            });

            // Wait for all uploads to complete, throw a toast, and then
            await Promise.all(uploadPromises);
            setUploadedFilesUrl(prevUrls => [...prevUrls, ...newUploadedUrls]);
            toast.message("Files uploaded successfully");

        } catch (error) {
            console.error("Error uploading files:", error);
            toast.error("Failed to upload files");
        }
    };

    // OnSubmit function
    const onSubmit: SubmitHandler<Order> = async (data) => {

        toast.message("Creating Order...")

        const formData = { ...data, ...uploadedFilesUrl, ...selectedUser };


        await makeApiRequest("/createOrder", "post", formData, {
            onSuccess: () => {
                toast.success(`Your order was created successfully.`);
                reset();
                router.push("/order")
            },
            onError: (error) => {
                toast.error(error.response.data);
                reset()
            },
        });
    };

    return (
        <main className="h-dvh flex items-center justify-center">
            <div className="bg-light-600 dark:bg-dark-600 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 xl:p-10 rounded-lg w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
                <p className="text-base md:text-lg xl:text-xl font-semibold">Create a New Order</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${index === 0 ? "flex mt-4" : "hidden"}`}>
                        <AutocompleteInput users={users} onSelect={handleUserSelect} />
                    </div>
                    <div className={`${index === 1 ? "flex flex-col gap-y-5 mt-4" : "hidden"}`}>
                        {fields.map((field) => (
                            <div key={field.name} className="flex flex-col">
                                <Input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    id={field.name}
                                    name={field.name as "notes" | "price" | "amountPaid" | "quantity" | "service" | "pickupDay"}
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
                            <input onChange={handleChange} type="file" id="media" name="media" accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm" multiple className="bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800 focus:outline-none rounded-lg" />
                        </div>
                        {fileUrls.length > 0 &&
                            <button onClick={handlePreviewToggle} className="text-generalBlue dark:text-cloudBlue text-left">{preview ? 'Close Preview' : 'Preview Media'}</button>
                        }
                        <Button type="submit" text="Create Order" loading={isSubmitting} />
                    </div>
                </form>
                <div className="flex justify-between mt-8">
                    <p onClick={() => indexFunction("remove")} className={`${index === 0 ? "text-inherit cursor-not-allowed" : "text-textOrange cursor-pointer"} flex gap-x-1 items-center hover:-translate-x-1 duration-300`}><ArrowLeft3 size="36" variant="Bold" /><span>Prev</span></p>
                    <p onClick={() => indexFunction("add")} className={`${index === 2 ? "text-inherit cursor-not-allowed" : "text-generalBlue dark:text-cloudBlue cursor-pointer"} flex gap-x-1 items-center hover:translate-x-1 duration-300`}><ArrowRight3 size="36" variant="Bold" /><span>Next</span></p>
                </div>
                <p className=" text-textGreen text-[10px] md:text-xs xl:text-sm text-center font-semibold">Steps {index + 1}/3 </p>
            </div>
            {preview && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-wrap justify-center items-center z-50">
                    <button onClick={handlePreviewToggle}
                        className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg z-10">
                        Close Preview
                    </button>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
                        {fileUrls.map((url, index) => (
                            <div key={index} className="relative w-40 h-64">
                                {files[index].type.startsWith("image/") ? (
                                    <Image src={url} alt={`media-${index}`} fill className="object-cover rounded-lg" />
                                ) : (
                                    <video src={url} controls className="w-full h-full object-cover rounded-lg" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default OrderForm;