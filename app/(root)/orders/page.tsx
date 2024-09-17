import { Suspense } from 'react';

//Actions
import getOrders from "@/actions/fetch/getOrders";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderHeader from "@/components/Orders/OrderHeader";
import OrderPage from "@/components/Orders/OrderPage";
import Fallback from '@/components/Fallback';


export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const { allOrders } = await getOrders()

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <OrderHeader totalOrders={allOrders.length} />
            <Suspense fallback={<Fallback />}>
                <ScrollReveal>
                    <OrderPage />
                </ScrollReveal>
            </Suspense>
        </main>
    );
}

export default page;