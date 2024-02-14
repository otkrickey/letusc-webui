import mongoose from "mongoose";

const letuscUserSchema = new mongoose.Schema(
    {
        student_id: {
            type: String,
            required: true,
        },
        discord_id: {
            type: String,
            required: true,
        },
        Letus: {
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            cookies: {
                type: Array,
                required: true,
            },
        },
        Discord: {
            username: {
                type: String,
                required: true,
            },
            discriminator: {
                type: String,
                required: true,
            },
        },
    },
    {
        collection: 'accounts',
    }
);

export default mongoose.models.LetusUser || mongoose.model('LetusUser', letuscUserSchema);