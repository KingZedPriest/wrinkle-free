import { Suspense } from "react";
import { redirect } from 'next/navigation';

//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";
import getAdmins from "@/actions/fetch/getAdmins";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderTransactions from "@/components/Orders/OrderTransactions";
import Fallback from "@/components/Fallback";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const currentUser = await getCurrentUser()

    //Redirect to Dashboard if it's not a super admin
    if (currentUser.role !== "super_admin") {
        redirect(`/unauthorised`)
    }


    return (
        <main className="py-5 mb-20 lg:mb-10">
            <Suspense fallback={<Fallback />}>
                <ScrollReveal>
                    <OrderTransactions />
                </ScrollReveal>
            </Suspense>
        </main>
    );
}

export default page;