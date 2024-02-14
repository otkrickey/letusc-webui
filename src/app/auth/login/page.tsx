"use client";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import { LoginForm } from "@/components/auth/login-form";
import { DiscordLoginForm } from "@/components/auth/discord-login-form";

export default function LoginComponent() {
    // const onClick = () => {
    //     signIn("discord");
    // };

    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        //     <div className="p-8 text-left bg-white shadow-lg dark:bg-gray-900 rounded-xl w-96">
        //         <h3 className="text-2xl font-bold text-center">Login</h3>
        //         <form action="">
        //             <div className="mt-4">
        //                 <button
        //                     onClick={onClick}
        //                     type="button"
        //                     className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 justify-center flex items-center"
        //                 >
        //                     <Image
        //                         src="/discord/full_logo_black_RGB.svg"
        //                         alt="Discord Logo"
        //                         className="dark:invert dark:filter dark:grayscale"
        //                         width={100}
        //                         height={24}
        //                         priority
        //                     />
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <DiscordLoginForm />
    );
}
