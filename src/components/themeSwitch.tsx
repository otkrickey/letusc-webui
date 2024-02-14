'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const { theme, setTheme } = useTheme();
    const systemTheme = useSystemTheme();

    // initial theme
    useEffect(() => {
        setMounted(true);
        setTheme(systemTheme);
        setIsEnabled(systemTheme === 'dark');
    }, []);

    // update theme when system theme changes
    useEffect(() => {
        setTheme(systemTheme);
        setIsEnabled(systemTheme === 'dark');
    }, [systemTheme]);

    // update theme when switch is toggled
    useEffect(() => {
        if (mounted) {
            setTheme(isEnabled ? 'dark' : 'light');
        }
    }, [isEnabled]);


    if (!mounted) {
        return null;
    }

    const toggleEnabled = () => {
        setIsEnabled(!isEnabled);
    };

    return (
        <button
            className={`p-2 w-16 rounded-full ${isEnabled ? 'bg-blue-500' : 'bg-gray-200'}`}
            onClick={toggleEnabled}
        >
            <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isEnabled ? 'translate-x-8' : 'translate-x-0'}`}
            />
        </button>
    );
};


const useSystemTheme = () => {
    const [systemTheme, setSystemTheme] = useState('system');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
        };

        handleChange(); // 初期値を設定
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return systemTheme;
};
