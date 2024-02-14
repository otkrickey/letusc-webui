"use client";
import { useCheckLetusAccount } from "@/hooks/use-check-letus-account";

export default function CheckLetusAccount() {
    const { isLoading, hasDiscordAccount, hasLetusAccount } = useCheckLetusAccount();
    return (
        <div>
            <h1>Check Letus Account</h1>
            <p>isLoading: {isLoading.toString()}</p>
            <p>hasDiscordAccount: {hasDiscordAccount.toString()}</p>
            <p>hasLetusAccount: {hasLetusAccount.toString()}</p>
        </div>
    );
}