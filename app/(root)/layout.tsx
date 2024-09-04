
//Components
import DownBar from "@/components/Downbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
            <section className="md:hidden"><DownBar /></section>
        </section>
    )
}