"use client"

import { usePathname } from "next/navigation";

//Icons
import { ArrowRight2 } from "iconsax-react";

const Header = () => {

    const pathName = usePathname()
    const updatedPathname = pathName.replace(/^\//, "");

    return (
        <main className="bg-light-700 dark:bg-dark-700 py-3 px-2 md:px-4 xl:px-6">
            <div className="flex gap-x-3 items-center text-gray-500">
                <p>Main Menu</p>
                <p><ArrowRight2 size="20" /></p>
                <p className="text-black dark:text-white font-semibold capitalize">{updatedPathname}</p>
            </div>
            <p></p>
        </main>
    );
}

export default Header;