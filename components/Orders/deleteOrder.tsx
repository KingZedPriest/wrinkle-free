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
    const handleDeleteOrder = async () => {
        const { success, message } = await deleteOrder(orderId)
        if(success){
            toast.success(message);
            router.back();
        }else{
            toast.error("Order could not be deleted, kindly try again later");
            router.refresh();
        }

    }

    return (
        <main onClick={handleDeleteOrder} className="flex gap-x-2 items-center text-red-600 dark:text-red-400 hover:text-red-400 hover:dark:text-red-600 duration-300 cursor-pointer">
            <p className="hover:font-bold duration-300">Delete</p>
            <Trash size="24" variant="Bold"/>
        </main>
    );
}

export default DeleteOrder;