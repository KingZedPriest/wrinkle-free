'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

//Server actions
import { checkOnline } from "@/actions/fetch/checkOnline";

const CheckSession = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(true)

    const handleCheckSession = async () => {
        setShowModal(false)
        toast.info('Checking your session...', { duration: 3000 })

        try {
            const result = await checkOnline()

            if (result.success) {
                toast.success(result.message, { duration: 3000 })
                if (result.redirect) {
                    router.push(result.redirect)
                }
            } else {
                toast.error(result.message, { duration: 5000, })
            }
        } catch (error) {
            toast.error('An error occurred while checking your session', {
                duration: 5000,
            })
            console.error('Session check error:', error)
        }
    }

    const handleSkip = () => {
        setShowModal(false)
        toast.info('Session check skipped', { duration: 3000 })
    }


    if (!showModal) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-[90%] ">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Check Session</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Do you want to check your session status?
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleSkip}
                        className="px-4 py-3 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        No, skip
                    </button>
                    <button onClick={handleCheckSession}
                        className="px-4 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Yes, check session
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckSession