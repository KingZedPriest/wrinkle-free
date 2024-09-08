'use client'

import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

//Lib and Components
import { decryptPassword } from '@/lib/token';
import { Checkbox } from '../ui/checkbox';

//Icons
import { CloseSquare } from 'iconsax-react';
import Button from '../Button';



export default function EditDrawer({ isOpen, onClose, admin }: EditDrawerProps) {

    const initialState: InitialStateProps = {
        name: admin.name,
        email: admin.email,
        encryptedPassword: decryptPassword(admin.encryptedPassword),
        role: admin.role === "super_admin" ? true : false,
        suspended: admin.suspended,
    };

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false)

    //Function
    const handleFormChange = (event: any) => {
        const { name, type, checked, value } = event.target;
        setState({ ...state, [name]: type === "checkbox" ? checked : value });
    };

    //For the forms
    const textFields = [{ name: "name" }, { name: "email" }, { name: "encryptedPassword" }]
    const booleanFields = [{ name: "role" }, { name: "suspended" }]

    //OnSubmit function
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()

        console.log({ state })
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 10, stiffness: 300 }}
                    className="fixed inset-x-0 bottom-0 z-[3] bg-light-600 dark:bg-dark-600 border-2 border-slate-200 dark:border-slate-800 rounded-t-[2rem] shadow-lg">

                    <div className="p-4 md:p-6 xl:p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-base md:text-lg xl:text-xl font-semibold">Edit User</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <CloseSquare size={30} className="text-textRed" variant='Bold' />
                            </button>
                        </div>
                        <form className="mt-10 flex flex-col gap-y-5" onSubmit={onSubmit}>
                            {textFields.map((field, index) => (
                                <div key={`field-${index}`} className='flex flex-col gap-y-1'>
                                    <label className="cursor-pointer" htmlFor={field.name}>{field.name}</label>
                                    <input type={`${field.name === "email" ? "email" : "text"}`} id={field.name} name={field.name} onChange={handleFormChange} value={state[field.name] as string}
                                        className="bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800  focus:outline-none rounded-lg" />
                                </div>
                            ))}
                            <div className='flex gap-x-5'>
                                {booleanFields.map((field) => (
                                    <div key={field.name} className='flex gap-x-1 items-center'>
                                        <label className="cursor-pointer capitalize" htmlFor={field.name}>{field.name === "role" ? "Super Admin" : field.name}</label>
                                        <input type="checkbox" name={field.name} id={field.name} onChange={handleFormChange} checked={state[field.name] as boolean} className="cursor-pointer" />
                                    </div>
                                ))}
                            </div>
                            <Button type='submit' text='Update Values' loading={loading} />
                        </form>
                    </div>
                </motion.div>
            )}
            <div className={`${isOpen ? "fixed inset-0 h-dvh z-[2]" : "hidden"} `} onClick={onClose}></div>
        </AnimatePresence>
    )
}