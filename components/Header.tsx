"use client"

import { usePathname } from "next/navigation";

//Icons
import { ArrowRight2, Category2 } from "iconsax-react";

//Utils
import { formatSubheading } from "@/lib/formatSubHeading";

//Components
import HeaderSearch from "./HeaderSearch";
import HeaderSub from "./HeaderSub";

const Header = ({ role }: { role: string }) => {

    const pathName = usePathname()
    const updatedPathname = pathName.replace(/^\//, "");



    return (
        <main className="bg-light-700 dark:bg-dark-700 py-3 px-2 md:px-4 xl:px-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-1 md:gap-x-2 xl:gap-x-3 items-center text-gray-500">
                    <p>Main Menu</p>
                    <p><ArrowRight2 size="18" /></p>
                    <p className="text-black dark:text-white font-semibold capitalize">{updatedPathname}</p>
                </div>
                <HeaderSub role={role} />
            </div>
            <div className="flex justify-between mt-6">
                <div className="flex flex-col gap-y-3 w-full">
                    <div className="flex flex-col gap-y-1 sm:gap-y-0 sm:flex-row sm:justify-between sm:items-center">
                        <p className="font-semibold text-xl md:text-2xl xl:text-3xl capitalize">{updatedPathname}</p>
                        <HeaderSearch />
                    </div>
                    <p>{formatSubheading(updatedPathname)}</p>
                </div>
            </div>
        </main>
    );
}

export default Header;