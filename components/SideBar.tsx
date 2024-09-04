"use client";

import { usePathname } from "next/navigation";

//Components
import SideItem from "./SideItem";

//Icons
import { AddCircle, HomeHashtag, Logout, Profile2User, ProfileCircle, SearchNormal } from "iconsax-react";

const navItems = [
    { href: "/dashboard", icon: HomeHashtag, label: "Home" },
    { href: "/orders", icon: AddCircle, label: "Orders" },
    { href: "/search", icon: SearchNormal, label: "Search" },
    { href: "/staff", icon: Profile2User, label: "Staff", role: "super_admin" },
    { href: "/profile", icon: ProfileCircle, label: "Profile" },
    { href: "/logout", icon: Logout, label: "Logout" }
];

const SideBar = ({ role }: { role: string }) => {
    const currentPath = usePathname();

    // Filter navItems based on role
    const filteredNavItems = navItems.filter(item => !item.role || item.role === role);

    return (
        <main className="px-10 py-6 dark:bg-light-600 bg-dark-600 w-[20rem] text-textDark dark:text-textLight h-dvh rounded-r-2xl">
            <div className="flex flex-col gap-y-8 mt-20">
                {filteredNavItems.map((item, index) => (
                    <SideItem key={index} currentPath={currentPath} href={item.href} icon={item.icon} label={item.label} />
                ))}
            </div>
        </main>
    );
}

export default SideBar;