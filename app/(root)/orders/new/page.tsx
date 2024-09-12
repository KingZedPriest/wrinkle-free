//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";
import getAdmin from "@/actions/fetch/getAnyAdmin";
import getUsers from "@/actions/fetch/getAllUsers";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import SelectPage from "@/components/Staff/SelectPage";

const page = async () => {

    const accessTokenUser = await getCurrentUser();
    const currentAdmin = await getAdmin(accessTokenUser.id);
    const users = await getUsers(false)

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <SelectPage  users={users} email={currentAdmin.email} />
            </ScrollReveal>
        </main>
    );
}

export default page;