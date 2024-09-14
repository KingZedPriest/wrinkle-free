//Actions
import getOrders from "@/actions/fetch/getOrders";

//Components
import OrderHeader from "@/components/Orders/OrderHeader";


export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const { allOrders } = await getOrders()

    return ( 
        <main className="py-5 mb-20 lg:mb-10">
            <OrderHeader totalOrders={allOrders.length}/>
        </main>
     );
}
 
export default page;