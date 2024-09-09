'use client'


import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

//Lib, utils and Components
import { decryptPassword } from '@/lib/token';
import { makeApiRequest } from '@/lib/apiUtils';

//Icons
import { CloseSquare } from 'iconsax-react';
import Button from '../Button';

const Edit = ({ isOpen, onClose, admin }: EditProps) => {

    const initialState: InitialFormProps = {
        name: admin.name,
        profilePicture: admin.profilePicture ?? "",
    };

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false)

    //Functions
    const handleFormChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    //OnSubmit function
    const onSubmit = async (event: FormEvent) => {
        toast.message("Updating your profile...")
        event.preventDefault()
        setLoading(true)

        const formData = { ...state };

        await makeApiRequest("/editProfile", "post", formData, {
            onSuccess: () => {
                toast.success(`Your Profile was updated successfully.`);
                onClose();
                window.location.reload();
            },
            onError: () => {
                toast.error("Couldn't update your profile details now, please try again later.");
                setLoading(false)
            },
        });
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
                            <h2 className="text-base md:text-lg xl:text-xl font-semibold">Edit Your Profile</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <CloseSquare size={30} className="text-textRed" variant='Bold' />
                            </button>
                        </div>
                        <form className="mt-10 flex flex-col gap-y-5" onSubmit={onSubmit}>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor="name">Your Name</label>
                                <input type="text" name='name' value={state["name"] as string} onChange={handleFormChange}
                                className="bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800  focus:outline-none rounded-lg" />
                            </div>
                            <Button type='submit' text='Update Profile' loading={loading} />
                        </form>
                    </div>
                </motion.div>
            )}
            <div className={`${isOpen ? "fixed inset-0 h-dvh z-[2]" : "hidden"} `} onClick={onClose}></div>
        </AnimatePresence>
    );
}

export default Edit;