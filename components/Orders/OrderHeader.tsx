import Link from "next/link";

//Icons
import { ShoppingBag } from "iconsax-react";

const OrderHeader = ({ totalOrders }: { totalOrders: number }) => {
    return ( 
        <main className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
                <p className="text-xl md:text-2xl xl:text-3xl font-semibold dark:text-white text-black">{totalOrders}</p>
                <p>Orders</p>
                <ShoppingBag size="24" className="text-textGreen" variant="Bold" />
            </div>
            <Link href="/orders/new" className="bg-generalBlue dark:bg-cloudBlue px-6 md:px-8 xl:px-10 py-3 rounded-[2rem] hover:bg-blue-800 dark:hover:bg-blue-400 duration-300 text-white">Add Staff</Link>
        </main>
     );
}
 
export default OrderHeader;