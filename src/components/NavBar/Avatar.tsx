'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export default function Avatar() {
    const { data: session } = useSession();

    if (!session?.user.image) {
        return (
            <Link href="/login" className="mr-5 hover:text-gray-900 dark:hover:text-white">Login</Link>
        );
    }

    return (
        <div>
            <Image
                src={session.user.image}
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
            />
        </div>
    );
}