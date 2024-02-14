"use server";


import { db } from "@/lib/db";
import { LetuscAuthUtils } from "@/lib/letusc-auth-utils";

export const userInfo = async (
    letusc_sub: string
) => {
    const user = await db.user.findUnique({
        where: {
            letusc_sub,
        },
    });
    if (!user) return null;

    const { password, ...rest } = user;
    if (!password) return null;

    const decryptedPassword = LetuscAuthUtils.decrypt(password);
    return { ...rest, password: decryptedPassword };
};