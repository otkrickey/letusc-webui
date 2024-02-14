"use client";

import { useSession } from "next-auth/react";

export const ShowSession = () => {
    // Show the session state
    const { data: session } = useSession();

    return (
        <div>
            <pre>
                <code>
                    {JSON.stringify(session, null, 2)}
                </code>
            </pre>
        </div>
    );
};