"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { Socket, io } from "socket.io-client";

import { userInfo } from "@/actions/userInfo";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { ClientToServerEvents, ServerToClientEvents } from "@/models/socket";
import { SOCKET_URL } from "@/routes";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type User = ThenArg<ReturnType<typeof userInfo>>;

export default function SettingsPage() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!session) {
            return;
        }
        if (!session.user.letusc_sub) {
            setError("letusc_sub not found");
            return;
        }

        userInfo(session.user.letusc_sub)
            .then((user) => {
                setUser(user);
            });
    }, [session]);


    const onClick = () => {

        startTransition(() => {
            // Socket.ioを用いて、サーバーにユーザー登録情報を送信する
            // ここに記述
            const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);
            if (!user) {
                setError("User not found");
                return;
            }
            const { letusc_id: student_id, discord_id, password, name: username, discriminator } = user;
            if (!student_id || !discord_id || !password || !username || !discriminator) {
                setError("User data not found");
                return;
            }

            socket.emit("login", { student_id, discord_id, password, username, discriminator });

            socket.on("progress", (data) => {
                console.log(data);
            });
        });
    };



    return (
        <div>
            <h1>Settings</h1>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <LogoutButton>
                Sign Out
            </LogoutButton>
            <Button onClick={onClick}>
                Socket Test
            </Button>
        </div>
    );
}