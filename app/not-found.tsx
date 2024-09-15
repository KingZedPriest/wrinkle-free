import Link from "next/link";
import Image from "next/image";

//Images
import notFound from "../public/notFound.jpg";

export default function NotFound() {
    return (
        <main className="h-dvh flex flex-col items-center justify-center bg-white">
            <div className="relative mx-auto">
                <Image src={notFound} alt="Not Found" />
            </div>
            <Link href="/dashboard" className="bg-generalBlue dark:bg-cloudBlue px-6 md:px-8 xl:px-10 py-3 rounded-[2rem] hover:bg-blue-800 dark:hover:bg-blue-400 duration-300 text-white">Go Home</Link>
        </main>
    );
}
