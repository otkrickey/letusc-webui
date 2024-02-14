"use client";

import { useSession } from "next-auth/react";

export default function ClientPage() {
    const { data: session } = useSession();

    return (
        <div>
            <h1>Client Page</h1>
            <p>Welcome {session?.user.name}#{session?.user.discriminator}</p>
        </div>
    );
}