"use client"

import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";

//Utils
import { formatPlaceholder } from "@/lib/formatSubHeading";

//Icons
import { SearchNormal1 } from "iconsax-react";


const HeaderSearch = () => {

    const pathName = usePathname()
    const updatedPathname = pathName.replace(/^\//, "");
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    //Functions
    const toggleSearch = () => {
        setIsSearch((prev) => !prev)
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    return (
        <main className="px-3 flex items-center gap-x-1 border-2 border-light-400 dark:border-dark-400 rounded-[2rem]">
            <SearchNormal1 size="20" variant={searchText.length !== 0 ? "Bold" : "Outline"} />
            <input type="search" className="bg-inherit focus:border-none focus:outline-none py-3 rounded-[2rem] w-full px-2 placeholder:text-xs md:placeholder:text-sm" placeholder={formatPlaceholder(updatedPathname)} onChange={handleChange} value={searchText} />
        </main>
    );
}

export default HeaderSearch;