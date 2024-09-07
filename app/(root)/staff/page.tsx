//Actions
import getAdmins from "@/actions/fetch/getAdmins";

//Components
import StaffHeader from "@/components/Staff/StaffHeader";
import StaffTable from "@/components/Staff/StaffTable";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const admins = await getAdmins()

    return ( 
        <main className="py-5 mb-20 lg:mb-10">
            <StaffHeader totalStaff={admins.length} />
            <StaffTable admins={admins}/>
        </main>
     );
}
 
export default page;