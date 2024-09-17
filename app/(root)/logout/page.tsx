"use client"

import Link from 'next/link';

//Import Needed Server Actions
import { logOut } from '@/actions/server/logOut';

//Import needed icons
import { LogoutCurve } from "iconsax-react";


const page = () => {
    return ( 
        <main className="fixed h-dvh w-full bg-black bg-opacity-80 flex items-center justify-center z-10 top-0 left-0">
            <div className="relative w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[15rem] bg-white p-4 md:p-8 rounded-xl">
                <div className="flex flex-col gap-y-5 xl:gap-y-3 items-center justify-center text-center">
                    <LogoutCurve size="50" color="#D70015" variant="Bulk"/>
                    <div>
                        <p className="text-[16px] md:text-[20px] xl:text-[24px] text-[#020100] font-semibold">Logging out</p>
                        <p className="text-[#8E8E93] font-medium text-[12px] md:text-[14px] xl:text-[16px]">Are you sure you want to log out?</p>
                    </div>
                    <form action={logOut} className='flex justify-between w-full'>
                        <Link href='/dashboard' className='px-4 md:px-6 xl:px-8 bg-generalBlue dark:bg-cloudBlue text-white py-3 rounded-[2rem]'>Go home</Link>
                        <button type="submit" className="bg-[#D70015] px-4 md:px-6 xl:px-8 py-3 rounded-[2rem] text-white cursor-pointer border border-[#D70015] hover:bg-white hover:text-[#D70015] duration-500">Yes</button>
                    </form>
                    
                </div>
            </div>
        </main>
     );
}
 
export default page;