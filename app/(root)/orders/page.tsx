//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";


//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderHeader from "@/components/Orders/OrderHeader";


export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const currentAdmin = await getCurrentUser()

    return ( 
        <main className="py-5 mb-20 lg:mb-10">
            <OrderHeader totalOrders={20}/>
        </main>
     );
}
 
export default page;