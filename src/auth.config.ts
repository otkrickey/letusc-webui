import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";

import { LoginSchema } from "@/schemas";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "@/utils/env";
import { getUserByDiscordId } from "./data/user";
import { LetuscAuthUtils } from "./lib/letusc-auth-utils";

export default {
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        Discord({
            clientId: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "identify email guilds guilds.members.read",
                },
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { discord_id, password } = validatedFields.data;

                    const user = await getUserByDiscordId(discord_id);
                    if (!user || !user.password) return null;

                    const passwordsMatch = LetuscAuthUtils.decrypt(user.password) === LetuscAuthUtils.decrypt(password);

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ]
} satisfies NextAuthConfig;