"use client"

import { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

//Images
import logo from "../../public/logo.png";

//Utils and Types
import { AuthSchema, Auth } from "@/schemas/auth.schema";
import { makeApiRequest } from "@/lib/apiUtils";

//Import Needed Components
import Input from "../Input";
import Button from "../Button";
import ErrorText from "./error-message";
import { Checkbox } from "@/components/ui/checkbox"

//Icons
import { Lock, Unlock } from "iconsax-react";

const SignIn = () => {

    const router = useRouter();
    const [seePassword, setSeePassword] = useState<boolean>(false);
    const [staySignedIn, setStaySignedIn] = useState<boolean>(false)

    //Functions
    const toggleShowPassword = () => {
        setSeePassword((prev) => !prev);
    }

    const toggleStaySignedIn = () => {
        setStaySignedIn((prev) => !prev)
    }

    // Data validation
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Auth>({
        resolver: zodResolver(AuthSchema),
    });

    // OnSubmit function
    const onSubmit: SubmitHandler<Auth> = async (data) => {

        const formData = { ...data };

        await makeApiRequest("/signIn", "post", formData, {
            onSuccess: () => {
                toast.success("");
                reset();
                router.replace(`/dashboard`);
            },
            onError: () => {
                toast.error("");
                reset()
            },
        });
    };

    return (
        <main className="flex">
            <div className="w-full lg:w-1/2 h-dvh flex items-center justify-center">
                <div className="bg-light-600 dark:bg-dark-600 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 xl:p-10 rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[80%] xl:w-[60%]">
                    <div className="flex items-center gap-x-1">
                        <div className="rounded-[50%] p-2 size-10 bg-generalBlue dark:bg-cloudBlue">
                            <Image src={logo} alt="Logo" />
                        </div>
                        <p className="text-sm md:text-base xl:text-lg font-semibold">Wrinkle Free</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 mt-8">
                        <div className="flex flex-col">
                            <Input type="email" placeholder="Enter your email address" id="email" name="email" register={register} required={true} label="Email" />
                            {errors.email && <ErrorText message={errors.email.message as string} />}
                        </div>
                        <div className="relative">
                            <div>
                                <Input type={seePassword ? "text" : "password"} placeholder="Enter your password" id="password" name="password" register={register} required={true} label="Password" />
                                {errors.password && <ErrorText message={errors.password.message as string} />}
                            </div>
                            <div className="p-1 md:p-1.5 xl:p-2 bg-light-600 dark:bg-dark-600 rounded-md cursor-pointer absolute right-1 top-6 md:top-7 xl:top-8" onClick={toggleShowPassword}>
                                {seePassword ? <Unlock className="text-5xl md:text-7xl xl:text-9xl text-generalBlue dark:text-cloudBlue" /> : <Lock className="text-5xl md:text-7xl xl:text-9xl text-generalBlue dark:text-cloudBlue" />}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="staySignedIn" onCheckedChange={toggleStaySignedIn} className={`${staySignedIn ? "bg-generalBlue dark:text-cloudBlue text-white" : ""}`} />
                            <label htmlFor="staySignedIn" className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                Stay Signed In For Seven (7) Days
                            </label>
                        </div>
                        <Button type="submit" text="Login" loading={isSubmitting} />
                    </form>
                </div>
            </div>
            <div className="hidden lg:flex lg:w-1/2 bg-generalBlue dark:bg-cloudBlue items-center justify-center">
                <div className="rounded-[50%] p-8 bg-cloudBlue dark:bg-generalBlue">
                    <Image src={logo} alt="Logo" />
                </div>
            </div>
        </main>
    );
}

export default SignIn;