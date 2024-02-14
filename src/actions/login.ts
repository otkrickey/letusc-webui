"use server";

import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { getUserByDiscordId } from "@/data/user";
import { LetuscAuthUtils } from "@/lib/letusc-auth-utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { discord_id, email, password } = validatedFields.data;

    const encryptedPassword = LetuscAuthUtils.encrypt(password);

    const existingUser = await getUserByDiscordId(discord_id);

    if (!existingUser || !existingUser.letusc_email || !existingUser.password) {
        return { error: "Email does not exist!" };
    }

    try {
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
};