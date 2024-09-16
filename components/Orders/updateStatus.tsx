"use client"

import { useState } from "react";
import { toast } from "sonner";

//Server Actions
import { updateOrder } from "@/actions/server/updateStatus";

//Icons
import { Setting2 } from "iconsax-react";


const UpdateStatus = ({ orderId }: { orderId: string }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [status, setStatus] = useState("pending");

    //Functions
    const toggleInput = () => setIsOpen(!isOpen);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    const handleUpdate = async () => {

        setLoading(true);
        toast.message("Updating...");

        const { success, message } = await updateOrder(orderId, status as "pending" | "in_progress" | "completed" | "cancelled")
        if (success) {
            setLoading(false);
            toast.success(message);
            window.location.reload();
        } else {
            setLoading(false);
            toast.error("Sorry, couldn't update status now, try again later.");
            window.location.reload();
        }
    }

    return (
        <main>
            <p className="text-green-600 dark:text-green-400 cursor-pointer hover:font-semibold duration-300" onClick={toggleInput}>
                {isOpen ? "Close" : "Update Status"}
            </p>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-10">
                    <div className="relative w-[90%] sm:w-[80%] md:w-[70%] xl:w-[60%] 2xl:w-[50%] px-2 sm:px-4 py-6 md:p-6 rounded-lg bg-light-300 dark:bg-dark-700 z-20">
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="status" className="cursor-pointer">
                                Order Status
                            </label>
                            <select id="status" value={status} onChange={handleChange}
                                className="block w-full p-2.5 bg-light-200 dark:bg-dark-300 text-textLight dark:text-textDark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-generalBlue">
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button onClick={handleUpdate} disabled={loading} className={"mt-4 text-white disabled:cursor-not-allowed py-3 w-full rounded-lg bg-generalBlue dark:bg-cloudBlue hover:bg-blue-600 hover:dark:bg-blue-600 duration-300"}>
                            {loading ? <Setting2 size="32" className='animate-spin mx-auto' variant="Bold" /> : "Update Status"}
                        </button>
                        <p onClick={toggleInput} className="mt-10 text-red-600 dark:text-red-400 text-[10px] md:text-xs xl:text-sm flex justify-end font-semibold cursor-pointer">Close</p>
                    </div>
                </div>
            )}
        </main>
    );
}

export default UpdateStatus;
