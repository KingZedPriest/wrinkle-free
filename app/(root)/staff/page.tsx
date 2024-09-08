import { redirect } from 'next/navigation';

//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";
import getAdmins from "@/actions/fetch/getAdmins";

//Components
import StaffHeader from "@/components/Staff/StaffHeader";
import StaffTable from "@/components/Staff/StaffTable";
import ScrollReveal from '@/components/RevelOnScroll';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const currentUser = await getCurrentUser()

    //Redirect to Dashboard if it's not a super admin
    if (currentUser.role !== "super_admin") {
        redirect(`/dashboard`)
    }

    //Fetch the admins
    const admins = await getAdmins()

    //Remove the Developer's account and the current logged in super admin
    const emailsToRemove = ['developer@email.com', currentUser.email]
    const filteredAdmins = admins.filter(admin => !emailsToRemove.includes(admin.email));

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <StaffHeader totalStaff={filteredAdmins.length} />
            <ScrollReveal>
                <StaffTable admins={filteredAdmins} />
            </ScrollReveal>
        </main>
    );
}

export default page;