import { connectMongoDB } from "@/lib/mongodb";
import discordUser from "@/models/discordUser";
import letuscUser from "@/models/letuscUser";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";


export async function GET(req: NextRequest) {
    const session = await auth();

    const response = {
        discord: false,
        letus: false,
        error: false,
    };
    try {
        await connectMongoDB();
        const discord_id = session?.user?.id;

        const letusc_user = await letuscUser.findOne({ discord_id });
        const discord_user = await discordUser.findOne({ discord_id });

        if (letusc_user) response.letus = true;
        if (discord_user) response.discord = true;

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response.error = true;
        return NextResponse.json(response, { status: 500 });
    }
}