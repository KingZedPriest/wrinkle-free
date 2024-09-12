"use client"

import { useState } from "react";

//Icons
import { Bag, Bag2 } from "iconsax-react";

//Components
import OrderForm from "../Orders/OrderForm";
import CreateOrder from "./CreateOrder";

const SelectPage = ({users}: {users: User[]}) => {

    const [selection, setSelection] = useState<"new" | "old" | "select">("select")

    return (
        <main>
            {selection === "select" &&
                <>
                    <p className="text-base md:text-lg xl:text-xl font-semibold mt-10 text-center">Select User</p>
                    <div className="flex flex-col gap-5 sm:flex-row items-center justify-evenly mt-10">
                        <div className="w-[16rem] sm:w-[24rem] dark:bg-[#005e38] bg-[#03a65a] flex flex-col items-center gap-y-2 rounded-[2rem] py-6 p-2 sm:p-4 md:p-6 xl:p-8 cursor-pointer" onClick={() => setSelection("new")}>
                            <Bag2 size="40" variant="Bold" />
                            <p className="text-sm md:text-base xl:text-lg font-semibold">New Client</p>
                        </div>
                        <div className="w-[16rem] sm:w-[24rem] dark:bg-[#c24914] bg-[#fc8621] flex flex-col items-center gap-y-2 rounded-[2rem] py-6 p-2 sm:p-4 md:p-6 xl:p-8 cursor-pointer" onClick={() => setSelection("old")}>
                            <Bag size="40" variant="Bold" />
                            <p className="text-sm md:text-base xl:text-lg font-semibold">Old Client</p>
                        </div>
                    </div>
                </>
            }
            {selection === "new" && <OrderForm />}
            {selection === "old" && <CreateOrder users={users}/>}
        </main>
    );
}

export default SelectPage;