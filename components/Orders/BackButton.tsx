"use client"

import { useRouter } from 'next/navigation';


//Icons
import { BackSquare } from "iconsax-react";

const BackButton = () => {

    const router = useRouter()

    return (
        <main>
            <BackSquare size="24" className='text-textRed' onClick={() => router.back()}/>
        </main>
    );
}

export default BackButton;