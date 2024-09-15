"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Server Actions
import { updateAmount } from "@/actions/server/updateAmount";

const UpdateAmount = ({ orderId }: { orderId: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [remove, setRemove] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const toggleInput = () => setIsOpen(!isOpen);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*\.?\d*$/.test(newValue)) {
            setValue(newValue);
        }
    };

    const handleCheckboxChange = () => setRemove(!remove);

    return (
        <main className="flex flex-col gap-y-1">
            <p className="text-generalBlue dark:text-cloudBlue cursor-pointer hover:font-semibold duration-300" onClick={toggleInput}>
                {isOpen ? "Close" : "Update Amount"}
            </p>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20 overflow-y-auto" onClick={toggleInput}>
                    <div className="w-[90%] sm:w-[80%] md:w-[70%] xl:w-[60%] 2xl:w-[50%] px-2 sm:px-4 py-6 md:p-6 rounded-lg bg-light-300 dark:bg-dark-700">
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
                    </div>
                </div>
            )}
        </main>
    );
}

export default UpdateAmount;
