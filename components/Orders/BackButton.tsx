"use client"

import { useRouter } from 'next/navigation';


//Icons
import { BackSquare } from "iconsax-react";

const BackButton = () => {

    const router = useRouter()

    return (
        <main>
            <BackSquare size="35" className='text-textRed cursor-pointer' variant='Bold' onClick={() => router.back()}/>
        </main>
    );
}

export default BackButton;