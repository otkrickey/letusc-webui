import { db } from "@/lib/db";

// export const getUserByEmail = async (email: string) => {
//     try {
//         const user = await db.user.findUnique({ where: { email } });

//         return user;
//     } catch {
//         return null;
//     }
// };

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });

        return user;
    } catch {
        return null;
    }
};

export const getUserByDiscordId = async (discord_id: string) => {
    try {
        const user = await db.user.findUnique({ where: { discord_id } });

        return user;
    } catch {
        return null;
    }
};

export const getUserByLetuscId = async (letusc_id: string) => {
    try {
        const user = await db.user.findUnique({ where: { letusc_id } });

        return user;
    } catch {
        return null;
    }
};

export const getUserByDiscordSub = async (discord_sub: string) => {
    try {
        const user = await db.user.findUnique({ where: { discord_sub } });

        return user;
    } catch {
        return null;
    }
};

export const getUserByLetuscSub = async (letusc_sub: string) => {
    try {
        const user = await db.user.findUnique({ where: { letusc_sub } });

        return user;
    } catch {
        return null;
    }
};