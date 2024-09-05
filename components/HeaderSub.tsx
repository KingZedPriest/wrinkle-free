"use client"

import { useState } from "react"
import Link from "next/link";

//Components
import ModeToggle from "./toggle-mode";

//Icons
import { Add, Category2, Profile } from "iconsax-react";


const HeaderSub = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const baseClasses = "z-[2] absolute w-40 md:w-48 xl:w-56 top-10 bg-light-600 dark:bg-dark-600 right-2 sm:right-3 md:right-4 p-2 md:p-4 xl:p-6 rounded-xl flex flex-col duration-300"

    //Functions
    const toggleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <main>
            <Category2 size="24" variant="Bold" className={`${isOpen ? "text-generalBlue dark:text-cloudBlue" : ""} cursor-pointer hover:text-generalBlue dark:hover:text-cloudBlue duration-300`} onClick={toggleOpen} />
            <div className={`${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"} ${baseClasses}`}>
                <div className="flex gap-x-2 items-center hover:translate-x-2 duration-300 py-3 hover:text-generalBlue dark:hover:text-cloudBlue">
                    <Add size="24" variant="Bold" />
                    <Link href="/orders/new" className="font-semibold">Create New Order</Link>
                </div>
                <div className="flex justify-end my-2">
                    <ModeToggle />
                </div>
            </div>
            <div className={`${isOpen ? "fixed inset-0 bg-black/10" : "hidden"} `} onClick={() => setIsOpen(false)}></div>
        </main>
    );
}

export default HeaderSub;