"use client"

import { useState } from "react";
import Image from "next/image";

//Components and libs
import EditProfile from "./Edit";
import { decryptPassword } from "@/lib/token";

//Images
import profilePicture from "../../public/profilePicture.jpg";

//Icons
import { ChartCircle, Edit, InfoCircle } from "iconsax-react";


const Profile = ({ admin }: { admin: Admin }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    //Functions
    const toggleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    const fields = [{ name: "name" }, { name: "email" }, { name: "encryptedPassword" }]

    return (
        <>
            {isOpen && <EditProfile isOpen={isOpen} onClose={toggleOpen} admin={admin} />}
            <main className="flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:justify-between">
                <div className="min-size-[16rem] w-full md:w-[40%]">
                    {isLoading && (
                        <div className="w-full h-full flex items-center justify-center">
                            <ChartCircle size="30" className="animate-spin text-generalBlue dark:text-cloudBlue" />
                        </div>
                    )}
                    {hasError ? (
                        <div className="flex items-center justify-center h-full w-full">
                            <InfoCircle size="30" className="text-[#db3056]" variant="Bold" />
                        </div>
                    ) : (
                        <Image src={admin.profilePicture ?? profilePicture} alt="Profile Picture" className="object-center w-full h-full rounded-[2rem]"
                            onLoad={() => setIsLoading(false)} onError={() => { setHasError(true); setIsLoading(false); }} />
                    )}
                </div>
                <div className="w-full md:w-[56%] border border-slate-200 dark:border-slate-800 p-2 md:p-4 xl:p-6 rounded-[2rem]">
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <p className="text-base md:text-lg xl:text-xl font-semibold">{admin.name}&apos;s Profile</p>
                            <p className={`mt-2 px-2 inline-flex leading-5 font-semibold rounded-full 
                                            ${admin.role === 'super_admin' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                    admin.role === 'admin' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : ''}`}>
                                {admin.role === "super_admin" ? "super admin" : "admin"}
                            </p>
                        </div>
                        <Edit variant="Bold" size={30} onClick={toggleOpen} className="text-generalBlue dark:text-cloudBlue cursor-pointer hover:text-cloudBlue dark:hover:text-generalBlue duration-300" />
                    </div>
                    <div className="flex flex-col gap-y-3 mt-10">
                        {fields.map((field) => (
                            <div key={field.name} className="flex flex-col gap-y-1 border-b border-slate-200 dark:border-slate-800 p-2">
                                <p className="text-[10px] md:text-xs xl:text-sm capitalize">{field.name === "encryptedPassword" ? "Password" : field.name}</p>
                                <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white">{field.name === "encryptedPassword" ? decryptPassword(admin[field.name] as string) : admin[field.name] as string}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-y-1 border-b border-slate-200 dark:border-slate-800 p-2 capitalize">
                        <p className="text-[10px] md:text-xs xl:text-sm">Access Level</p>
                        <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white">{admin.role === "super_admin" ? "super admin" : "admin"}</p>
                    </div>
                    <div className="flex flex-col gap-y-1 border-b border-slate-200 dark:border-slate-800 p-2 capitalize">
                        <p className="text-[10px] md:text-xs xl:text-sm">Suspended?</p>
                        <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white">{admin.suspended ? "Yes" : "No"}</p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Profile;