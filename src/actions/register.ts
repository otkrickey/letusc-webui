"use server";

import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { getUserByLetuscId } from "@/data/user";
import { db } from "@/lib/db";
import { LetuscAuthUtils } from "@/lib/letusc-auth-utils";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_SECONDARY_LOGIN_REDIRECT } from "@/routes";
import { RegisterSchema } from "@/schemas";

export const register = async (
    values: z.infer<typeof RegisterSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { discord_id, email, password } = validatedFields.data;

    const letusc_id = email.split("@")[0];
    const encryptedPassword = LetuscAuthUtils.encrypt(password);

    const existingUser = await getUserByLetuscId(letusc_id);

    if (existingUser) {
        return { redirect: DEFAULT_SECONDARY_LOGIN_REDIRECT };
    }

    try {
        // add letusc info to user
        await db.user.update({
            where: { discord_id },
            data: {
                letusc_id,
                discord_id,
                letusc_email: email,
                password: encryptedPassword,
            },
        });
        // sign in user (with letusc info)
        await signIn("credentials", {
            discord_id,
            email,
            password: encryptedPassword,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }

    return { success: "Registered!" };
};