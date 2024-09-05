//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";

//Components
import DownBar from "@/components/Downbar";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    // const userDetails = await getCurrentUser()

    return (
        <main>
            <section className="mainWidth">
                <Header />
                {children}
            </section>
            <section className="lg:hidden"><DownBar role={"super_admin"} /></section>
            <section className="hidden lg:block"><SideBar role={"super_admin"} /></section>
        </main>

    )
}