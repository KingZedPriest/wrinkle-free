//Utils
import { twMerge } from 'tailwind-merge'

//Icons
import { Setting2 } from 'iconsax-react';

const Button = ({ type, text, loading, onClick, classNames }: ButtonProps) => {
    return (
        <main className='text-white text-sm sm:text-base lg:text-lg my-6'>
            <button onClick={(e: any) => onClick} disabled={loading} type={type} className={twMerge("disabled:cursor-not-allowed py-3 w-full rounded-[2rem] bg-generalBlue dark:bg-cloudBlue hover:bg-blue-600 hover:dark:bg-blue-600 duration-300", classNames)}>
                {loading ? <Setting2 size="32" className='animate-spin mx-auto' variant="Bold"/> : text}
            </button>
        </main>
    );
}

export default Button;