//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import Profile from "@/components/Profile/Profile";

const page = async () => {

    const currentAdmin = await getCurrentUser();

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <Profile admin={currentAdmin} />
            </ScrollReveal>
        </main>
    );
}

export default page;