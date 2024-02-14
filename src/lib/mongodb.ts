import { MONGODB_URI } from "@/utils/env";
import mongoose from "mongoose";


export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, { dbName: "letus", retryWrites: true, w: 'majority' });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
};