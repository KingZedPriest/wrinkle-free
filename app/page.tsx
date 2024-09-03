//Components
import ModeToggle from "@/components/toggle-mode";
import SignIn from "@/components/Auth/Sign-In";

const page = () => {
  return (
    <main className="relative">
      <div className="absolute bottom-4 left-4">
        <ModeToggle />
      </div>
      <SignIn />
    </main>
  );
}

export default page;