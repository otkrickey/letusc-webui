import { ThemeSwitch } from "../themeSwitch";
import Link from "next/link";
// import Avatar from "./Avatar";
import ServerAvatar from "./ServerAvatar";


// use tailwindcss
// title: Letusc Dashboard
// nav: Home, About, Contact, Login, Register
export default function NavBar() {
    return (
        <header className="text-gray-600 dark:text-white body-font border-b-2 border-gray-300 dark:border-gray-700">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/" className="flex title-font font-medium items-center text-gray-900 dark:text-white mb-4 md:mb-0">
                    <span className="ml-3 text-xl">Letusc Dashboard</span>
                </Link>

                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <div className="mr-5">
                        <ThemeSwitch />
                    </div>
                    {/* <Avatar /> */}
                    <ServerAvatar />
                </nav>
            </div>
        </header>
    );
};
