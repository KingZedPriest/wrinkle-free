import Link from "next/link";

//Icons
import { Ban } from "lucide-react";

const page = () => {
    return (
        <main className="h-dvh flex flex-col gap-y-10 items-center justify-center">
            <Ban className="text-textRed size-10" />
            <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold">Unauthorised</p>
            <Link href="/dashboard" className="bg-generalBlue dark:bg-cloudBlue px-6 md:px-8 xl:px-10 py-3 rounded-[2rem] hover:bg-blue-800 dark:hover:bg-blue-400 duration-300 text-white">Return to Dashboard</Link>
        </main>
    );
}

export default page;