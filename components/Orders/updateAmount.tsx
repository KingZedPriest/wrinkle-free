"use client";

import { useState } from "react";
import { toast } from "sonner";

// Server Actions
import { updateAmount } from "@/actions/server/updateAmount";

//Icons
import { Setting2 } from "iconsax-react";

const UpdateAmount = ({ orderId }: { orderId: string }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [remove, setRemove] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    //Functions
    const toggleInput = () => setIsOpen(!isOpen);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*\.?\d*$/.test(newValue)) {
            setValue(newValue);
        }
    };

    const handleCheckboxChange = () => setRemove(!remove);

    const handleUpdate = async () => {

        setLoading(true);
        toast.message("Updating...");

        const { success, message } = await updateAmount(orderId, parseInt(value), remove)
        if (success) {
            setLoading(false);
            toast.success(message);
            window.location.reload();
        } else {
            setLoading(false);
            toast.error("Sorry, couldn't update amount now, try again later.");
            window.location.reload();
        }
    }

    return (
        <main>
            <p className="text-generalBlue dark:text-cloudBlue cursor-pointer hover:font-semibold duration-300" onClick={toggleInput}>
                {isOpen ? "Close" : "Update Amount"}
            </p>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-10">
                    <div className="relative w-[90%] sm:w-[80%] md:w-[70%] xl:w-[60%] 2xl:w-[50%] px-2 sm:px-4 py-6 md:p-6 rounded-lg bg-light-300 dark:bg-dark-700 z-20">
                        <div className="flex flex-col gap-y-1">
                            <label className="cursor-pointer" htmlFor="amount">
                                Amount
                            </label>
                            <input type="text" placeholder="Enter the new Amount" id="amount" value={value} onChange={onChange} pattern="^\d*\.?\d*$"
                                title="Please enter a positive number."
                                className="bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800 focus:outline-none rounded-lg"
                                required
                            />
                        </div>
                        <div className="flex items-center mt-4">
                            <input type="checkbox" id="remove" checked={remove} onChange={handleCheckboxChange} className="mr-2" />
                            <label htmlFor="remove" className="cursor-pointer">Remove</label>
                        </div>
                        <button onClick={handleUpdate} disabled={loading} className={"mt-4 text-white disabled:cursor-not-allowed py-3 w-full rounded-lg bg-generalBlue dark:bg-cloudBlue hover:bg-blue-600 hover:dark:bg-blue-600 duration-300"}>
                            {loading ? <Setting2 size="32" className='animate-spin mx-auto' variant="Bold" /> : "Update Amount"}
                        </button>

                        <p onClick={toggleInput} className="mt-10 text-red-600 dark:text-red-400 text-[10px] md:text-xs xl:text-sm flex justify-end font-semibold cursor-pointer">Close</p>
                    </div>
                </div>
            )}
        </main>
    );
}

export default UpdateAmount;
