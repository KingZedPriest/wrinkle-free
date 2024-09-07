"use client"


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

//Lib
import { decryptPassword } from '@/lib/token';

//Icons
import { CloseSquare, Copy } from "iconsax-react";


const NewDetails = ({ name, email, encryptedPassword, toggleFunction }: newDetails) => {

    const router = useRouter();

    //Redirect if there is an undefined
    useEffect(() => {
        if (name === undefined || email === undefined || encryptedPassword === undefined) {
          toast.error("There is an issue, if this has happened more than once, contact the developer");
          toggleFunction();
          router.push("/staff");
        }
      }, [name, email, encryptedPassword, toggleFunction, router]);
      

    //Functions
    const handleCopy = async (textToCopy: string, type: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            toast.success(type === "email" ? `The Admin email ${email} was copied to your clipboard` : `The Admin decrypted password was copied to your clipboard`)
        } catch (error) {
            toast.error("Couldn't copy, something went wrong. Try again later.")
            console.error("Failed to copy text: ", error);
        }
    };

    return (
        <main className="fixed inset-0 h-dvh flex items-center justify-center bg-black z-10">
            <div className="relative bg-light-600 dark:bg-dark-600 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 xl:p-10 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
                <CloseSquare size="30" className="text-textRed absolute top-2 right-4 cursor-pointer"variant='Bold' onClick={() => {router.push('/staff'); toggleFunction()}}/>
                <p className="text-base md:text-lg xl:text-xl font-semibold">New Admin Detail</p>
                <div className="flex flex-col gap-y-5 mt-10">
                    <p>Full Name: <span className='text-black dark:text-white font-semibold'>{name}</span></p>
                    <div className="flex items-center gap-x-2">
                        <p>Email: <span className='text-black dark:text-white font-semibold'>{email}</span></p>
                        <Copy size="24" className='text-generalBlue dark:text-cloudBlue cursor-pointer' onClick={() => handleCopy(email, "email")} />
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <p>Password: <span className='text-black dark:text-white font-semibold'>{decryptPassword(encryptedPassword)}</span></p>
                        <Copy size="24" className='text-generalBlue dark:text-cloudBlue cursor-pointer' onClick={() => handleCopy(decryptPassword(encryptedPassword), "password")} />
                    </div>
                </div>
            </div>

        </main>
    );
}

export default NewDetails;