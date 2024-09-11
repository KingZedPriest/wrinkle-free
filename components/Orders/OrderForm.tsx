"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

//Libs, Utils and Types
import { Order, OrderSchema } from "@/schemas/order.schema";
import { makeApiRequest } from "@/lib/apiUtils";

//Import Needed Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/Auth/error-message";
import AutocompleteInput from "./SelectUser";
import FileUpload from "./FileUpload";

//Icons
import { ArrowLeft3, ArrowRight3 } from "iconsax-react";

const users: User[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
]

const fields = [
    { name: "notes", placeholder: "Notes about the client (Optional)", type: "text", label: "Notes" },
    { name: "price", placeholder: "Price or Amount Charged", type: "number", label: "Price or Amount Charged" },
    { name: "amountPaid", placeholder: "Amount Paid (If none, add 0)", type: "number", label: "Amount Paid (Deposit)" },
    { name: "quantity", placeholder: "How many clothes", type: "number", label: "Total Number of Clothes" },
    { name: "service", placeholder: "Example: Washing, Ironing...", type: "text", label: "Needed Services" },
    { name: "pickupDay", placeholder: "The Pick up Date", type: "datetime-local", label: "Pick up Day" }
]

const OrderForm = () => {

    const router = useRouter();
    const [index, setIndex] = useState<number>(0)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filesUrl, setFileUrls] = useState<string[]>([]);
    const [upload, setUpload] = useState<boolean>(false)

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

    const handleUserSelect = (user: User) => {
        setSelectedUser(user)
    }

    // Data validation
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Order>({
        resolver: zodResolver(OrderSchema),
    });

    // OnSubmit function
    const onSubmit: SubmitHandler<Order> = async (data) => {
        setUpload(true);
        toast.message("Creating Order...")
        const formData = { ...data };

        await makeApiRequest("/createOrder", "post", formData, {
            onSuccess: () => {
                toast.success(`Your order was created successfully.`);
                setUpload(false)
                reset();
                router.push("/order")
            },
            onError: (error) => {
                toast.error(error.response.data);
                reset()
                setUpload(false)
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
                        <FileUpload name={selectedUser?.name!} upload={upload}/>
                        <Button type="submit" text="Create Order" loading={isSubmitting} />
                    </div>
                </form>
                <div className="flex justify-between mt-8">
                    <p onClick={() => indexFunction("remove")} className={`${index === 0 ? "text-inherit cursor-not-allowed" : "text-textOrange cursor-pointer"} flex gap-x-1 items-center hover:-translate-x-1 duration-300`}><ArrowLeft3 size="36" variant="Bold" /><span>Prev</span></p>
                    <p onClick={() => indexFunction("add")} className={`${index === 2 ? "text-inherit cursor-not-allowed" : "text-generalBlue dark:text-cloudBlue cursor-pointer"} flex gap-x-1 items-center hover:translate-x-1 duration-300`}><ArrowRight3 size="36" variant="Bold" /><span>Next</span></p>
                </div>
                <p className=" text-textGreen text-[10px] md:text-xs xl:text-sm text-center font-semibold">Steps {index + 1}/3 </p>
            </div>
            
        </main>
    );
}

export default OrderForm;