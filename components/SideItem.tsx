import Link from "next/link";

const SideItem = ({ href, icon: Icon, currentPath, label }: NavItem) => {

    const isActive = currentPath === href;
    const baseClasses = "dark:hover:bg-dark-600 hover:bg-light-600 dark:hover:text-white hover:text-black duration-300";
    const activeClasses = "dark:bg-dark-600 bg-light-600 dark:text-white text-black";


    return (
        <Link href={href} className={`${isActive ? activeClasses : baseClasses } w-full rounded-[2rem] flex gap-x-2 py-3 px-6 items-center`}>
            <Icon size="24" variant={isActive ? "Bold" : "Outline"} />
            <p className="font-semibold">{label}</p>
        </Link>
    );
}

export default SideItem;