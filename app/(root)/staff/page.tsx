//Components
import StaffHeader from "@/components/Staff/StaffHeader";


const page = () => {
    return ( 
        <main className="py-5 mb-20 lg:mb-10">
            <StaffHeader totalStaff={10} />
        </main>
     );
}
 
export default page;