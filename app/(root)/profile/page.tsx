//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";
import getAdmin from "@/actions/fetch/getAnyAdmin";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import Profile from "@/components/Profile/Profile";


export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const accessTokenUser = await getCurrentUser();
    const currentAdmin = await getAdmin(accessTokenUser.id);

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <Profile admin={currentAdmin} />
            </ScrollReveal>
        </main>
    );
}

export default page;