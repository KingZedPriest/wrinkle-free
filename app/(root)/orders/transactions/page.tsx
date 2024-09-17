import { Suspense } from "react";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderTransactions from "@/components/Orders/OrderTransactions";
import Fallback from "@/components/Fallback";


const page = () => {
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <ScrollReveal>
                    <OrderTransactions />
                </ScrollReveal>
            </Suspense>
        </main>
    );
}

export default page;