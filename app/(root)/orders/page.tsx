//Actions
import getOrders from "@/actions/fetch/getOrders";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderHeader from "@/components/Orders/OrderHeader";
import OrderPage from "@/components/Orders/OrderPage";


export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const { allOrders } = await getOrders()

    return ( 
        <main className="py-5 mb-20 lg:mb-10">
            <OrderHeader totalOrders={allOrders.length}/>
            <ScrollReveal>
                <OrderPage />
            </ScrollReveal>
        </main>
     );
}
 
export default page;