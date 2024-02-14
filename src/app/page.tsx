"use client";

import { useSession } from "next-auth/react";

import CheckLetusAccount from "@/components/Auth/CheckLetusAccount";

export default function Home() {
    const { data: session } = useSession();

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome {session?.user.name}#{session?.user.discriminator}</p>
            <CheckLetusAccount />
        </div>
    );
}