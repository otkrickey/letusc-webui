'use client';
import { useState, useEffect } from "react";

interface responseJSON {
    discord: boolean;
    letus: boolean;
}

export const useCheckLetusAccount = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasDiscordAccount, setHasDiscordAccount] = useState(false);
    const [hasLetusAccount, setHasLetusAccount] = useState(false);

    useEffect(() => {
        const fetchLetusAccount = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/account-status`);
                const data: responseJSON = await response.json();
                setHasDiscordAccount(data.discord);
                setHasLetusAccount(data.letus);
            }
            catch (error) {
                console.error('Failed to fetch Letus account data');
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchLetusAccount();
    }, []);

    return { isLoading, hasDiscordAccount, hasLetusAccount };
};