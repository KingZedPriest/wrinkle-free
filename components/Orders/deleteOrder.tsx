"use client"

import { toast } from "sonner";
import { useRouter } from "next/navigation";

//Server Actions
import { deleteOrder } from "@/actions/server/deleteOrder";

//Icons
import { Trash } from "iconsax-react";

const DeleteOrder = ({ orderId }: { orderId: string }) => {

    const router = useRouter()

    //Functions
    const handleDeleteOrder = async (Id : string) => {
        const { success, message } = await deleteOrder(Id)
        if(success){
            toast.success(message);
            router.back();
        }else{
            toast.error("Order could not be deleted, kindly try again later");
            router.refresh();
        }

    }

    return (
        <main onClick={() => handleDeleteOrder(orderId)} className="flex gap-x-2 items-center text-red-600 dark:text-red-400 hover:text-generalBlue hover:dark:text-cloudBlue duration-300">
            <p>Delete</p>
            <Trash size="24" />
        </main>
    );
}

export default DeleteOrder;