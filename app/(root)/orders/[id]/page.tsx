// Actions
import getOrder from "@/actions/fetch/getAnOrder";

// Components
import BackButton from "@/components/Orders/BackButton";
import DeleteOrder from "@/components/Orders/deleteOrder";
import UpdateAmount from "@/components/Orders/updateAmount";
import UpdateStatus from "@/components/Orders/updateStatus";
import Gallery from "@/components/Orders/ViewImage";

// Libs
import { dateConverter, formatTimestamp } from "@/lib/date";
import { OrderStatus } from "@prisma/client";

// Icons
import { Box, ClipboardText, UserTag } from "iconsax-react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const OrderDetail = ({ label, value, isCurrency = false }: { label: string, value: any, isCurrency?: boolean }) => (
    <div className="flex justify-between items-center gap-x-5 mt-4 text-dark-300 dark:text-light-300">
        <p>{label}</p>
        <p className={`text-black dark:text-white font-semibold ${isCurrency && (value < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400')}`}>
            {isCurrency ? `₦${value}` : value}
        </p>
    </div>
);

const page = async ({ params }: { params: { id: string } }) => {

    const orderId = params.id;
    const order = await getOrder(orderId);

    if (!order) {
        return (
            <main className="fixed inset-0 flex items-center justify-center p-4">
                <h1 className="text-sm md:text-base xl:text-lg font-semibold">
                    Sorry, we couldn&apos;t fetch the order details at this time, kindly try again later.
                </h1>
            </main>
        );
    }

    const renderOrderStatus = () => {
        const statusColors: { [key: string]: string } = {
            completed: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
            in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
        };

        const getStatusColor = (status: OrderStatus) => statusColors[status] || 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';

        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
            </span>
        );
    };

    return (
        <main className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 overflow-y-auto">
            <div className="w-[90%] sm:w-[80%] md:w-[70%] xl:w-[60%] 2xl:w-[50%] px-2 sm:px-4 py-6 md:p-6 rounded-lg bg-light-300 dark:bg-dark-700">
                <div className="flex justify-between items-center mt-4 font-semibold">
                    <p className="text-base sm:text-lg md:text-xl xl:text-2xl">Order details</p>
                    <BackButton />
                </div>

                <section className="mt-4">
                    <p className="text-sm md:text-base xl:text-lg flex items-center font-semibold">
                        <Box size="24" className="text-textGreen mr-2" />Order Information
                    </p>
                    <OrderDetail label="Order ID" value={order.orderId} />
                    <OrderDetail label="Order Status" value={renderOrderStatus()} />
                    <OrderDetail label="Price" value={`+${order.price}`} isCurrency />
                    <OrderDetail label="Amount Paid" value={`-${order.amountPaid}`} isCurrency />
                    <OrderDetail label="Amount Remaining" value={order.price - (order.amountPaid ?? 0)} isCurrency />
                    <OrderDetail label="Pick-Up Day" value={dateConverter(order.pickupDay)} />
                    <OrderDetail label="Order Creation Date" value={formatTimestamp(order.createdAt)} />
                </section>

                <hr />

                <section className="mt-6">
                    <p className="text-sm md:text-base xl:text-lg flex items-center font-semibold">
                        <ClipboardText size="24" className="text-textGreen mr-2" />Order Items
                    </p>
                    <OrderDetail label="Quantity" value={`${order.items[0].quantity} clothes`} />
                    <OrderDetail label="Service" value={order.items[0].service} />
                    <Gallery mediaUrls={order.items[0].picture} />
                </section>

                <hr />

                <section className="mt-6">
                    <p className="text-sm md:text-base xl:text-lg flex items-center font-semibold">
                        <UserTag size="24" className="text-textGreen mr-2" />Customer Information
                    </p>
                    <OrderDetail label="Customer Name" value={order.user?.name} />
                    <OrderDetail label="Customer Notes" value={order.user?.notes ?? "No notes"} />
                    <OrderDetail label="Admin Email" value={order.admin} />
                </section>

                <hr />

                <p className="text-orange-600 dark:text-orange-400 font-semibold mt-2">Quick Actions</p>
                <div className="flex justify-between items-center mt-2">
                    <UpdateStatus /> <UpdateAmount orderId={order.orderId} /> <DeleteOrder orderId={order.orderId} />
                </div>
            </div>
        </main>
    );
}

export default page;
