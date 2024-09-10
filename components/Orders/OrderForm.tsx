"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

//Utils and Types
import { Order, OrderSchema } from "@/schemas/order.schema";
import { makeApiRequest } from "@/lib/apiUtils";

//Import Needed Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/Auth/error-message";
import AutocompleteInput from "./SelectUser";

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
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const handleUserSelect = (user: User) => {
        setSelectedUser(user)
    }

    // Data validation
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Order>({
        resolver: zodResolver(OrderSchema),
    });

    // OnSubmit function
    const onSubmit: SubmitHandler<Order> = async (data) => {

        toast.message("Creating Order...")
        const formData = { ...data };

        await makeApiRequest("/createOrder", "post", formData, {
            onSuccess: (response) => {
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
            <div className="bg-light-600 dark:bg-dark-600 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 xl:p-10 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
                <p className="text-base md:text-lg xl:text-xl font-semibold">Create a New Order</p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-y-3">
                    <AutocompleteInput users={users} onSelect={handleUserSelect} />
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
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="media">Select Images</label>
                        <input type="file" id="media" name="media" accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm" className="bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800 focus:outline-none rounded-lg" />
                    </div>

                    <Button type="submit" text="Create Order" loading={isSubmitting} />
                </form>
            </div>
        </main>
    );
}

export default OrderForm;