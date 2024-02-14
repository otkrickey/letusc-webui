"use client";

import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_SECONDARY_LOGIN_REDIRECT } from "@/routes";
import { useEffect, useState } from "react";

export const DiscordButton = () => {
    const searchParams = useSearchParams();
    const [callbackUrl, setCallbackUrl] = useState<string>(DEFAULT_SECONDARY_LOGIN_REDIRECT);
    const oldCallbackUrl = searchParams.get("callbackUrl");

    useEffect(() => {
        const encodedCallbackUrl = encodeURIComponent(oldCallbackUrl || DEFAULT_LOGIN_REDIRECT);
        const newUrl = new URL(`${DEFAULT_SECONDARY_LOGIN_REDIRECT}?callbackUrl=${encodedCallbackUrl}`, location.origin);
        setCallbackUrl(newUrl.href);
    }, [oldCallbackUrl]);


    const onClick = () => {
        signIn("discord", { callbackUrl });
    };

    return (
        <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={onClick}
        >
            <FaDiscord className="h-5 w-5" />
        </Button>
    );
};