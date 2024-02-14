"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { DiscordButton } from "@/components/auth/discord-button";

interface LoginCardProps {
    children?: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonLabel?: string;
    backButtonHref?: string;
    mode: "email" | "discord" | "alreadySignedIn";
};

export const LoginCard = ({
    children,
    headerTitle,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    mode,
}: LoginCardProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header
                    title={headerTitle}
                    label={headerLabel}
                />
            </CardHeader>
            {
                children && (
                    <CardContent>
                        {children}
                    </CardContent>
                )
            }
            {
                mode === "discord" && (
                    <CardFooter>
                        <DiscordButton />
                    </CardFooter>
                )
            }
            {
                backButtonLabel && backButtonHref && (
                    <CardFooter>
                        <BackButton
                            label={backButtonLabel}
                            href={backButtonHref}
                        />
                    </CardFooter>
                )
            }
        </Card>
    );
};