import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";

export function CustomPrismaAdapter(p: typeof db) {
    return {
        ...PrismaAdapter(p),
        createUser({ id: _id, ...data }: any) {
            console.log("Creating user with id", _id);
            console.log("Creating user with data", data);

            return p.user.create({ data });
        },
    };
}