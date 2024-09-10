//Components
import ScrollReveal from "@/components/RevelOnScroll";
import OrderForm from "@/components/Orders/OrderForm";

const page = () => {
    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <OrderForm />
            </ScrollReveal>
        </main>
    );
}

export default page;