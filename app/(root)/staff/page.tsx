import { redirect } from 'next/navigation';

//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";
import getAdmins from "@/actions/fetch/getAdmins";
import getAdmin from '@/actions/fetch/getAnyAdmin';

//Components
import StaffHeader from "@/components/Staff/StaffHeader";
import StaffTable from "@/components/Staff/StaffTable";
import ScrollReveal from '@/components/RevelOnScroll';


export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const accessTokenUser = await getCurrentUser();
    const currentAdmin = await getAdmin(accessTokenUser.id);

    //Redirect to Dashboard if it's not a super admin
    if (currentAdmin.role !== "super_admin") {
        redirect(`/unauthorised`)
    }

    //Fetch the admins
    const admins = await getAdmins()

    //Remove the Developer's account and the current logged in super admin
    const emailsToRemove = ['developer@email.com', currentAdmin.email]
    const filteredAdmins = admins.filter(admin => !emailsToRemove.includes(admin.email));

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <StaffHeader totalStaff={filteredAdmins.length} />
            <ScrollReveal>
                <StaffTable key={"admin"} admins={filteredAdmins} />
            </ScrollReveal>
        </main>
    );
}

export default page;