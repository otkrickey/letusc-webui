import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Avatar() {
    const session = await auth();

    if (!session?.user.image) {
        return (
            <Link href="/auth/login" className="mr-5 hover:text-gray-900 dark:hover:text-white">Login</Link>
        );
    }

    return (
        <div>
            <Image
                src={session?.user.image}
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
            />
        </div>
    );
}