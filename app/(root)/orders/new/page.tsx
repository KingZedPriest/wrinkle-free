//Actions
import getUsers from "@/actions/fetch/getAllUsers";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import SelectPage from "@/components/Staff/SelectPage";

const page = async () => {

    const users = await getUsers(false)

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <SelectPage  users={users}/>
            </ScrollReveal>
        </main>
    );
}

export default page;