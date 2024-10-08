import { permanentRedirect } from "next/navigation";

//Actions
import { getCurrentUser } from "@/actions/fetch/currentUser";
import getAdmin from "@/actions/fetch/getAnyAdmin";

//Components
import DownBar from "@/components/Downbar";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const userDetails = await getCurrentUser();
    const currentAdmin = await getAdmin(userDetails.id);

    //If suspended, redirect to the suspended page
    if (currentAdmin.suspended) {
        permanentRedirect("/unauthorised")
    }

    return (
        <main className="h-dvh overflow-y-auto" suppressHydrationWarning>
            <section className="mainWidth">
                <Header role={currentAdmin.role} />
                <main className="px-2 md:px-4 xl:px-6">
                    {children}
                </main>
            </section>
            <section className="lg:hidden"><DownBar role={currentAdmin.role} /></section>
            <section className="hidden lg:block"><SideBar role={currentAdmin.role} /></section>
        </main>

    )
}