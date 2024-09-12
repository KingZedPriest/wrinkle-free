//Actions
import getUsers from "@/actions/fetch/getAllUsers";


//Components
import ScrollReveal from "@/components/RevelOnScroll";
import SelectPage from "@/components/Staff/SelectPage";

const page = async () => {

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <SelectPage />
            </ScrollReveal>
        </main>
    );
}

export default page;