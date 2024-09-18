"use client"

import { useState } from "react";
import { toast } from "sonner";

//Utils
import { makeApiRequest } from '@/lib/apiUtils';

//Icons
import { ChartCircle, Trash } from "iconsax-react";

const DeleteOrder = ({ orderId }: { orderId: string }) => {

    const [loading, setLoading] = useState<boolean>(false);

    //Functions
    const handleDeleteOrder = async () => {
        toast.message("Deleting Order(s)...")
        setLoading(true)

        const formData = { orderId };

        await makeApiRequest("/deleteOrder", "delete", formData, {
            onSuccess: () => {
                toast.success(`The Order was deleted successfully.`);
                setLoading(false);
                window.location.reload();
            },
            onError: () => {
                toast.error("Couldn't delete order now, please try again later.");
                setLoading(false);
                window.location.reload();
            },
        });
    }

    return (
        <main onClick={handleDeleteOrder} className="flex gap-x-2 items-center text-red-600 dark:text-red-400 hover:text-red-400 hover:dark:text-red-600 duration-300 cursor-pointer">
            {loading ? <ChartCircle size="24" color="#2ccce4" className="animate-spin" /> : <Trash size="24" variant="Bold" />}
        </main>
    );
}

export default DeleteOrder;