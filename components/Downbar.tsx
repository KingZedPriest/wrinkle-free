"use client"

import { usePathname } from "next/navigation";

//Components
import NavItem from "./NavItem";

//Icons
import { AddCircle, HomeHashtag, Profile2User, ProfileCircle, SearchNormal, } from "iconsax-react";

const navItems = [
    { href: "/dashboard", icon: HomeHashtag, label: "Home" },
    { href: "/orders", icon: AddCircle, label: "Orders" },
    { href: "/search", icon: SearchNormal, label: "Search" },
    { href: "/admin", icon: Profile2User, label: "Staff" },
    { href: "/profile", icon: ProfileCircle, label: "Profile" }
];

const DownBar = ({ role }: { role: string }) => {

    const currentPath = usePathname();

    return (
        <main className="absolute bottom-0 left-0 w-full p-2 dark:bg-light-600 bg-dark-600">
            <div className="bg-white dark:bg-black rounded-[2rem] p-2 flex justify-between items-center">
                {navItems.map((item, index) => (
                    <NavItem key={index} currentPath={currentPath} href={item.href} icon={item.icon} label={item.label} />
                ))}
            </div>
        </main>
    );
}

export default DownBar;