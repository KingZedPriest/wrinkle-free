//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";

//Components
import DownBar from "@/components/Downbar";
import SideBar from "@/components/SideBar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const userDetails = await getCurrentUser()

    return (
        <section className="mainWidth">
            {children}
            <section className="md:hidden"><DownBar role={"super_admin"}/></section>
            <section className="hidden md:block"><SideBar role={"super_admin"}/></section>
        </section>
    )
}