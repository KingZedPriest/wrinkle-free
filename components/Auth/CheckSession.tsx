'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

//Server Actions
import { checkOnline } from "@/actions/fetch/checkOnline";



const CheckSession = () => {
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            toast.info('Checking your session...')

            try {
                const result = await checkOnline()

                if (result.success) {
                    toast.success(result.message)
                    if (result.redirect) {
                        router.push(result.redirect)
                    }
                } else {
                    toast.error(result.message)
                }
            } catch (error) {
                toast.error('An error occurred while checking your session')
                console.error('Session check error:', error)
            }
        }

        checkSession()
    }, [router])

    return null
}

export default CheckSession