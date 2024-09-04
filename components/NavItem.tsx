import Link from "next/link";


const NavItem = ({ href, icon: Icon, currentPath, label }: NavItem) => {
    const isActive = currentPath === href;
    const baseClasses = "text-[#6E6E6E] hover:text-generalBlue dark:hover:cloudBlue duration-300";
    const activeClasses = "text-white dark:text-black";

    return (
        <Link href={href} className={`${isActive && "p-2 rounded-[2rem] bg-dark-600 dark:bg-light-600 text-white dark:text-black"} flex gap-x-1 items-center text-gray-600 w-auto duration-300`}>
            <Icon size="24" className={isActive ? activeClasses : baseClasses} variant={isActive ? "Bold" : "Outline"} />
            {isActive && <p className="font-semibold">{label}</p>}
        </Link>
    );
};

export default NavItem;