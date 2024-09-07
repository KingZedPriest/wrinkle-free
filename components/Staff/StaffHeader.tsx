import Link from "next/link";

//Icons
import { Android } from "iconsax-react";

const StaffHeader = ({ totalStaff }: { totalStaff: number }) => {
    return (
        <main className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
                <Android size="32" className="text-textOrange bg-textOrange/30 p-1" />
                <p className="text-xl md:text-2xl xl:text-3xl font-semibold dark:text-white text-black">{totalStaff}</p>
                <p>Workers</p>
            </div>
            <Link href="/staff/new" className="bg-generalBlue dark:bg-cloudBlue px-6 md:px-8 xl:px-10 py-3 rounded-[2rem] hover:bg-blue-800 dark:hover:bg-blue-400 duration-300 text-white">Add Staff</Link>
        </main>
    );
}

export default StaffHeader;