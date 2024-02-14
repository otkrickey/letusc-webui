import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string | null;
        user: {
            id?: string | null;
            name?: string | null;
            discriminator?: string | null;
            // isSignedInDiscord?: boolean;
            // isSignedInLetus?: boolean;
            discord_id?: string | null;
            letusc_id?: string | null;
            discord_sub?: string | null;
            letusc_sub?: string | null;
        }
        & DefaultSession["user"];
    }
    interface Profile {
        id?: string;
        username?: string;
        discriminator?: string;
    }
    interface Account {
        access_token?: string;
        refresh_token?: string;
    }
    interface User {
        id?: string;
    }
}

import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        accessToken?: string | null;
        // username?: string | null;
        discriminator?: string | null;
        // isSignedInDiscord?: boolean;
        // isSignedInLetus?: boolean;
        discord_id?: string | null;
        letusc_id?: string | null;
        discord_sub?: string | null;
        letusc_sub?: string | null;
    }
}