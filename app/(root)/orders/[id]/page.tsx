//Actions
import getOrder from "@/actions/fetch/getAnOrder";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async ({ params }: { params: { id: string } }) => {

    const orderId = params.id;
    const order = await getOrder(orderId)

    if (!order) {
        return (
            <main className="fixed inset-0 flex items-center justify-center text-[#020100] p-4">
                <h1 className="text-sm md:text-base xl:text-lg font-semibold">Sorry, we couldn&apos;t fetch the order details at this time, kindly try again later.</h1>
            </main>
        )
    }

    return (
        <main className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 top-0 left-0">
            <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] px-2 sm:px-4 py-6 md:p-6 xl:p-8 flex flex-col gap-y-3 rounded-lg bg-light-300 dark:bg-dark-300">
                <p className="text-base md:text-xl xl:text-2xl text-[#020100] font-semibold">
                    Order details
                </p>
                <div className="flex flex-col gap-y-2 mt-4">

                </div>
            </div>
        </main>
    );
}

export default page;