"use client";

import { usePathname } from "next/navigation";

//Component
import SideItem from "./SideItem";

//Icons
import { AddCircle, HomeHashtag, Logout, Profile2User, ProfileCircle, SearchNormal } from "iconsax-react";

const navItems = [
  { href: "/dashboard", icon: HomeHashtag, label: "Dashboard" },
  { href: "/orders", icon: AddCircle, label: "Orders" },
  { href: "/staff", icon: Profile2User, label: "Staff", role: "super_admin" },
  { href: "/profile", icon: ProfileCircle, label: "Profile" },
];

const logoutItem = { href: "/logout", icon: Logout, label: "Logout" };

const SideBar = ({ role }: { role: string }) => {
  const currentPath = usePathname();

  // Filter navItems based on role
  const filteredNavItems = navItems.filter(item => !item.role || item.role === role);

  return (
    <main className="px-10 py-6 bg-light-600 dark:bg-dark-600 w-[20rem] dark:text-textDark text-textLight h-dvh fixed flex flex-col rounded-r-[2rem]">
      <div className="flex-grow flex flex-col gap-y-8 mt-20">
        {filteredNavItems.map((item, index) => (
          <SideItem key={`items-${index}`} currentPath={currentPath} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </div>
      <div className="mt-8">
        <SideItem currentPath={currentPath} href={logoutItem.href} icon={logoutItem.icon} label={logoutItem.label} />
      </div>
    </main>
  );
};

export default SideBar;
