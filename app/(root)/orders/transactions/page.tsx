//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderTransactions from "@/components/Orders/OrderTransactions";


const page = () => {
    return ( 
        <main>
            <ScrollReveal>
                <OrderTransactions />
            </ScrollReveal>
        </main>
     );
}
 
export default page;