//Components
import StaffHeader from "@/components/Staff/StaffHeader";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = () => {
    return ( 
        <main className="py-5 mb-20 lg:mb-10">
            <StaffHeader totalStaff={10} />
        </main>
     );
}
 
export default page;