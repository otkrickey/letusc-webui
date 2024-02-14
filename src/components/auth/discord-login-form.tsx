"use client";

import { LoginCard } from "@/components/auth/login-card";

export const DiscordLoginForm = () => {
    return (
        <LoginCard
            headerTitle="🔐 Discord Auth"
            headerLabel="Continue with Discord (1st Party)"
            // backButtonLabel="Don't have an account?"
            // backButtonHref="/auth/register"
            mode="discord"
        >
        </LoginCard>
    );
};