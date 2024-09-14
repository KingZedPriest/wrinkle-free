//Actions
import getOrder from "@/actions/fetch/getAnOrder";

//Components
import BackButton from "@/components/Orders/BackButton";
import ImageGallery from "@/components/Orders/ViewImage";

//Libs
import { dateConverter, formatTimestamp } from "@/lib/date";

//Icons
import { Box, ClipboardText, UserTag } from "iconsax-react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async ({ params }: { params: { id: string } }) => {

    const orderId = params.id;
    const order = await getOrder(orderId);

    if (!order) {
        return (
            <main className="fixed inset-0 flex items-center justify-center p-4">
                <h1 className="text-sm md:text-base xl:text-lg font-semibold">Sorry, we couldn&apos;t fetch the order details at this time, kindly try again later.</h1>
            </main>
        )
    }

    return (
        <main className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 top-0 left-0">
            <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] px-2 sm:px-4 py-6 md:p-6 xl:p-8 flex flex-col gap-y-3 rounded-lg bg-light-300 dark:bg-dark-700 overflow-y-auto">
                <div className="flex justify-between items-center">
                    <p className="text-base sm:text-lg md:text-xl xl:text-2xl font-semibold">
                        Order details
                    </p>
                    <BackButton />
                </div>
                <div className="flex flex-col gap-y-2 mt-4">
                    <p className="text-sm md:text-base xl:text-lg flex items-center"><Box size="24" className="text-textGreen mr-2 font-semibold" />Order Information</p>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Order ID</p>
                        <p className="text-black dark:text-white font-semibold">{order.orderId}</p>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Order Status</p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                    'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                            {order.status}
                        </span>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Price</p>
                        <p className="text-green-600 dark:text-green-400 font-semibold">+₦{order.price}</p>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Amount Paid</p>
                        <p className="text-red-600 dark:text-red-400 font-semibold">-₦{order.amountPaid}</p>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Pick-Up Day</p>
                        <p className="text-black dark:text-white font-semibold">{dateConverter(order.pickupDay)}</p>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Order Creation Date</p>
                        <p className="text-black dark:text-white font-semibold">{formatTimestamp(order.createdAt)}</p>
                    </div>
                    <hr />
                    <p className="text-sm md:text-base xl:text-lg flex items-center mt-6"><ClipboardText size="24" className="text-textGreen mr-2 font-semibold" />Order Items</p>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Quantity</p>
                        <p className="text-black dark:text-white font-semibold">{order.items[0].quantity} clothes</p>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Service</p>
                        <p className="text-black dark:text-white font-semibold">{order.items[0].service}</p>
                    </div>
                    <ImageGallery images={order.items[0].picture} />
                    <hr />
                    <p className="text-sm md:text-base xl:text-lg flex items-center mt-6"><UserTag size="24" className="text-textGreen mr-2 font-semibold" />Customer Information</p>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Customer Name</p>
                        <p className="text-black dark:text-white font-semibold">{order.user?.name}</p>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
                        <p>Customer Notes</p>
                        <p className="text-black dark:text-white font-semibold">{order.user?.notes ?? "No notes"}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default page;


// {
//     id: '66e4566c748adc7da0647dff',
//     orderId: 'WF-748',
//     userId: '66e4566b748adc7da0647dfe',
//     status: 'pending',
//     price: 3000,
//     amountPaid: 1000,
//     pickupDay: 2024-09-14T15:12:00.000Z,
//     admin: 'super@admin.com',
//     createdAt: 2024-09-13T15:12:44.667Z,
//     updatedAt: 2024-09-13T15:12:44.667Z,
//     user: {
//       id: '66e4566b748adc7da0647dfe',
//       name: 'Charles Paul',
//       notes: 'A new user',
//       createdAt: 2024-09-13T15:12:43.987Z,
//       updatedAt: 2024-09-13T15:12:43.987Z
//     },
//     items: [
//       {
//         id: '66e4566d748adc7da0647e00',
//         orderId: '66e4566c748adc7da0647dff',
//         picture: [Array],
//         quantity: 7,
//         service: 'Washing and Ironing.',
//         createdAt: 2024-09-13T15:12:45.118Z,
//         updatedAt: 2024-09-13T15:12:45.118Z
//       }
//     ]
//   }

