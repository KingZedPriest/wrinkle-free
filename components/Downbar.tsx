"use client";

import { usePathname } from "next/navigation";

//Components
import NavItem from "./NavItem";

//Icons
import { AddCircle, HomeHashtag, Profile2User, ProfileCircle, SearchNormal } from "iconsax-react";

const navItems = [
  { href: "/dashboard", icon: HomeHashtag, label: "Dashboard" },
  { href: "/orders", icon: AddCircle, label: "Orders" },
  { href: "/staff", icon: Profile2User, label: "Staff", role: "super_admin" },
  { href: "/profile", icon: ProfileCircle, label: "Profile" },
];

const DownBar = ({ role }: { role: string }) => {
  const currentPath = usePathname();

  // Filter navItems based on role
  const filteredNavItems = navItems.filter(item => !item.role || item.role === role);

  return (
    <main className="absolute bottom-0 z-[8] left-0 w-full p-2 dark:bg-light-600 bg-dark-600">
      <div className="bg-white dark:bg-black rounded-[2rem] p-2 flex justify-between items-center">
        {filteredNavItems.map((item) => (
          <NavItem key={item.label} currentPath={currentPath} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </div>
    </main>
  );
};

export default DownBar;
