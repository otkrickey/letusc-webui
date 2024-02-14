// import { Adapter } from "@auth/core/adapters";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { getUserByDiscordSub, getUserByLetuscSub } from "@/data/user";
// import { CustomPrismaAdapter } from "@/lib/adapter";
import { db } from "@/lib/db";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            if (session.user && token.id) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.discriminator = token.discriminator;
                session.user.discord_id = token.discord_id;
                session.user.letusc_id = token.letusc_id;
                session.user.discord_sub = token.discord_sub;
                session.user.letusc_sub = token.letusc_sub;
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            if (!token.sub) return token;

            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }

            let existingUser = null;
            if (account?.provider === "discord") {
                existingUser = await getUserByDiscordSub(token.sub);
            }
            if (account?.provider === "credentials") {
                existingUser = await getUserByLetuscSub(token.sub);
            }
            if (existingUser) {
                token.id = existingUser.id;
                token.discriminator = existingUser.discriminator;
                token.discord_id = existingUser.discord_id;
                token.letusc_id = existingUser.letusc_id;
                token.discord_sub = existingUser.discord_sub;
                token.letusc_sub = existingUser.letusc_sub;
            }
            return token;
        },
        async signIn({ account, profile, user }) {
            // if (profile && account) {
            //     await saveUserToDB(profile, account);
            // }
            // if (account == null || account.access_token == null) return false;
            // return await isJoinGuild(account.access_token);

            if (account?.provider === "discord") {
                if (!user || !user.id) return false;

                await db.user.upsert({
                    where: { discord_id: account.providerAccountId },
                    update: {
                        name: profile?.username || null,
                        discriminator: profile?.discriminator || null,
                        discord_email: profile?.email || null,
                        image: user.image || null,
                        discord_sub: user.id,
                    },
                    create: {
                        name: profile?.username || null,
                        discriminator: profile?.discriminator || null,
                        discord_id: account.providerAccountId,
                        discord_email: profile?.email || null,
                        image: user.image || null,
                        discord_sub: user.id,
                    },
                });

                return true;
            }

            if (account?.provider === "credentials") {
                if (!user || !user.id) return false;
                try {
                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            letusc_sub: account.providerAccountId
                        },
                    });
                } catch (e) {
                    return false;
                } finally {
                    return true;
                }

            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        }
    },
    // adapter: CustomPrismaAdapter(db) as Adapter,
    ...authConfig,
});