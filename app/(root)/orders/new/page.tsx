//Fetch Action
import getUsers from "@/actions/fetch/getAllUsers";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderForm from "@/components/Orders/OrderForm";

const page = async () => {

    const users: UserWithOutOrder[] = await getUsers()

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <OrderForm users={users}/>
            </ScrollReveal>
        </main>
    );
}

export default page;