import Image from "next/image";

//Component
import ShapesAnimation from "./ShapeBackground";

//Images
import logo from "../../public/logo.png";

const SignIn = () => {
    return (
        <main className="flex">
            <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 h-dvh flex items-center justify-center">
                <h1>This is a sample</h1>
            </div>
            <div className="hidden lg:flex lg:w-1/2 bg-generalBlue dark:bg-cloudBlue items-center justify-center">
                <div className="rounded-[50%] p-8 bg-cloudBlue dark:bg-generalBlue">
                    <Image src={logo} alt="Logo" />
                </div>
            </div>
        </main>
    );
}

export default SignIn;