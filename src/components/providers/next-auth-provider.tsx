import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

// export default async function NextAuthProvider({ children }: { children: React.ReactNode; }) {
//     const session = await auth();

//     return (
//         <SessionProvider session={session} refetchOnWindowFocus={false}>
//             {children}
//         </SessionProvider>
//     );
// }


export const NextAuthProvider = async ({ children }: { children: React.ReactNode; }) => {
    const session = await auth();

    return (
        <SessionProvider session={session} refetchOnWindowFocus={false}>
            {children}
        </SessionProvider>
    );
}