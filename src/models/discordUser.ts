import mongoose from "mongoose";


const discordUserSchema = new mongoose.Schema(
    {
        discord_id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        discriminator: {
            type: String,
            required: true,
        },
        access_token: {
            type: String,
            required: true,
        },
        refresh_token: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'discordUsers',
    }
);

export default mongoose.models.DiscordUser || mongoose.model('DiscordUser', discordUserSchema);