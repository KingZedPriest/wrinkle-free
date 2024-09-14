//Actions
import getOrder from "@/actions/fetch/getAnOrder";

const page = async ({ params }: { params: { id: string } }) => {

    const orderId = params.id;
    const order = await getOrder(orderId)
    
    return ( 
        <main>

        </main>
     );
}
 
export default page;