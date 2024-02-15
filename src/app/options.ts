// // import NextAuth, { type NextAuthOptions } from "next-auth";
// import { Account, NextAuthConfig, Profile } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
// import { AVAILABLE_GUILD_ID, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "@/utils/env";
// import { connectMongoDB } from "@/lib/mongodb";
// import discordUser from "@/models/discordUser";


// interface Guild {
//     id: string;
//     name: string;
//     icon: string;
//     owner: boolean;
//     permissions: number;
//     features: string[];
// }

// async function isJoinGuild(accessToken: string): Promise<boolean> {
//     const res: Response = await fetch("https://discordapp.com/api/users/@me/guilds", {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//     if (res.ok) {
//         const guilds: Guild[] = await res.json();
//         return guilds.some((guild: Guild) => guild.id === AVAILABLE_GUILD_ID);
//     }
//     return false;
// }

// async function saveUserToDB(profile: Profile, account: Account) {
//     await connectMongoDB();
//     const { id, username, discriminator } = profile;
//     const { access_token, refresh_token } = account;

//     const user = await discordUser.findOne({ discord_id: id });

//     if (user) {
//         console.log('updating user');
//         await discordUser.updateOne({ discord_id: id }, { access_token, refresh_token });
//     } else {
//         console.log('creating new user');
//         await discordUser.create({ discord_id: id, username, discriminator, access_token, refresh_token });
//     }

//     return true;
// }


// export const authOptions: NextAuthConfig = {
//     debug: true,
//     // session: { strategy: 'jwt' },
//     providers: [
//         DiscordProvider({
//             clientId: DISCORD_CLIENT_ID,
//             clientSecret: DISCORD_CLIENT_SECRET,
//             authorization: {
//                 params: {
//                     scope: "identify email guilds guilds.members.read",
//                 },
//             }
//         }),
//     ],
//     callbacks: {
//         async session({ session, token }) {
//             console.log('session callback');
//             session.accessToken = token.accessToken;
//             if (session.user && token.id) {
//                 session.user.id = token.id;
//             }
//             return session;
//         },
//         async jwt({ token, account, profile }) {
//             console.log('jwt callback');
//             if (account && account.access_token) {
//                 token.accessToken = account.access_token;
//             }
//             if (profile) {
//                 token.id = profile.id;
//             }
//             return token;
//         },
//         async signIn({ account, user, profile }) {
//             console.log('signIn callback');
//             if (profile && account) {
//                 await saveUserToDB(profile, account);
//             }
//             if (account == null || account.access_token == null) return false;
//             return await isJoinGuild(account.access_token);
//         }
//     },
// };