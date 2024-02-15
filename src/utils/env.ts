import logging from './logging';

const dotenv_error = (name: string, defaultValue?: string): string => { logging.error('dotenv', `Please Specify ${name}`); return defaultValue ?? 'error'; };

export const PORT = process.env.PORT ?? dotenv_error('PORT', '3000');
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? dotenv_error('DISCORD_CLIENT_ID');
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? dotenv_error('DISCORD_CLIENT_SECRET');
export const AVAILABLE_GUILD_ID = process.env.AVAILABLE_GUILD_ID ?? dotenv_error('AVAILABLE_GUILD_ID');
export const MONGO_HOST = process.env.MONGO_HOST ?? dotenv_error('MONGO_HOST');
export const MONGO_USER = process.env.MONGO_USER ?? dotenv_error('MONGO_USER');
export const MONGO_PASS = process.env.MONGO_PASS ?? dotenv_error('MONGO_PASS');
export const MONGODB_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}`;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? dotenv_error('NEXTAUTH_SECRET');
export const ORIGIN_URL = process.env.ORIGIN_URL ?? dotenv_error('ORIGIN_URL');