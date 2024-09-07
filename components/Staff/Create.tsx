"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";

//Utils and Types
import { StaffSchema, Staff } from "@/schemas/staff.schema";
import { makeApiRequest } from "@/lib/apiUtils";

//Import Needed Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/Auth/error-message";
import { Checkbox } from "@/components/ui/checkbox";

//Icons
import { Lock, Unlock } from "iconsax-react";

const Create = () => {

    const [show, setShow] = useState<boolean>(false);
    const [seePassword, setSeePassword] = useState<boolean>(false);
    const [suspended, setSuspended] = useState<boolean>(false);
    const [role, setRole] = useState<boolean>(false);

    //Functions
    const toggleShowPassword = () => {
        setSeePassword((prev) => !prev);
    }

    const toggleShow = () => {
        setShow((prev) => !prev)
    }

    const toggleSuspended = () => {
        setSuspended((prev) => !prev)
    }

    const toggleRole = () => {
        setRole((prev) => !prev)
    }

    // Data validation
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Staff>({
        resolver: zodResolver(StaffSchema),
    });

    // OnSubmit function
    const onSubmit: SubmitHandler<Staff> = async (data) => {

        toast.message("Creating Staff...")
        const formData = { ...data, suspended, role };

        await makeApiRequest("/addAdmin", "post", formData, {
            onSuccess: (response) => {
                toast.success(`Welcome ${response.data.name}`);
                reset();
                toggleShow()
            },
            onError: (error) => {
                toast.error(error.response.data);
                reset()
            },
        });
    };


    return (
        <main className="h-dvh flex items-center justify-center">
            <div className="bg-light-600 dark:bg-dark-600 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 xl:p-10 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
                <p className="text-base md:text-lg xl:text-xl font-semibold">Add New Staff</p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-y-5">
                    <div className="flex flex-col">
                        <Input type="text" placeholder="Staff Full Name" id="name" name="name" register={register} required={true} label="Full Name" />
                        {errors.name && <ErrorText message={errors.name.message as string} />}
                    </div>
                    <div className="flex flex-col">
                        <Input type="email" placeholder="Staff Email Address" id="email" name="email" register={register} required={true} label="Email" />
                        {errors.email && <ErrorText message={errors.email.message as string} />}
                    </div>
                    <div className="relative">
                        <div>
                            <Input type={seePassword ? "text" : "password"} placeholder="Password" id="password" name="password" register={register} required={true} label="Password" />
                            {errors.password && <ErrorText message={errors.password.message as string} />}
                        </div>
                        <div className="p-1 md:p-1.5 xl:p-2 bg-light-600 dark:bg-dark-600 rounded-md cursor-pointer absolute right-1 top-6 md:top-7 xl:top-8" onClick={toggleShowPassword}>
                            {seePassword ? <Unlock className="text-5xl md:text-7xl xl:text-9xl text-generalBlue dark:text-cloudBlue" /> : <Lock className="text-5xl md:text-7xl xl:text-9xl text-generalBlue dark:text-cloudBlue" />}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="suspended" className="rounded-[2rem]" onCheckedChange={toggleSuspended} />
                        <label htmlFor="suspended" className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                            Suspend Staff
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="role" className="rounded-[2rem]" onCheckedChange={toggleRole} />
                        <label htmlFor="role" className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                            Make a Super Admin
                        </label>
                    </div>
                    <Button type="submit" text="Add Staff" loading={isSubmitting} />
                </form>
            </div>
        </main>
    );
}

export default Create;