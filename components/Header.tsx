"use client"

import { usePathname } from "next/navigation";

const Header = () => {

    const pathName =  usePathname()

    return ( 
        <main className="bg-light-700 dark:bg-dark-700">
            <p>{pathName}</p>
        </main>
     );
}
 
export default Header;