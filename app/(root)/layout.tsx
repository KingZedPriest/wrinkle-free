//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";

//Components
import DownBar from "@/components/Downbar";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const userDetails = await getCurrentUser()

    return (
        <main className="h-dvh overflow-y-auto">
            <section className="mainWidth">
                <Header />
                <main className="px-2 md:px-4 xl:px-6">
                    {children}
                </main>
            </section>
            <section className="lg:hidden"><DownBar role={userDetails.role} /></section>
            <section className="hidden lg:block"><SideBar role={userDetails.role} /></section>
        </main>

    )
}