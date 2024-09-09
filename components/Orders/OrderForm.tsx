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

const OrderForm = () => {

    const router = useRouter();

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
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-y-5">
                    <div className="flex flex-col">
                        <Input type="text" placeholder="Notes about the client (Optional)" id="notes" name="notes" register={register} label="Notes" />
                        {errors.notes && <ErrorText message={errors.notes.message as string} />}
                    </div>
                    <div className="flex flex-col">
                        <Input type="number" placeholder="Price" id="price" name="price" register={register} label="Price" />
                        {errors.price && <ErrorText message={errors.price.message as string} />}
                    </div>
                    <div className="flex flex-col">
                        <Input type="number" placeholder="Amount Paid (If none, add 0)" id="amountPaid" name="amountPaid" register={register} label="Amount Paid" />
                        {errors.amountPaid && <ErrorText message={errors.amountPaid.message as string} />}
                    </div>
                    <div className="flex flex-col">
                        <Input type="number" placeholder="How many clothes" id="quantity" name="quantity" register={register} label="Quantity" />
                        {errors.quantity && <ErrorText message={errors.quantity.message as string} />}
                    </div>
                </form>
            </div>
        </main>
    );
}

export default OrderForm;