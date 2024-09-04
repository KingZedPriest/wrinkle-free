
//Components
import DownBar from "@/components/Downbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
            <section className="md:hidden"><DownBar role={"super_admin"}/></section>
        </section>
    )
}