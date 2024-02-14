"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { io, Socket } from "socket.io-client";
import * as z from "zod";

import { register } from "@/actions/register";
import { LoginCard } from "@/components/auth/login-card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { SOCKET_URL } from "@/routes";
import { ClientToServerEvents, ServerToClientEvents } from "@/models/socket";



export const EmailRegisterForm = () => {
    const { data: session } = useSession();

    const router = useRouter();

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    // const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            discord_id: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (session?.user?.discord_id) {
            form.setValue("discord_id", session.user.discord_id);
        }
        if (session?.user.letusc_sub) {
            const newUrl = new URL(callbackUrl || DEFAULT_LOGIN_REDIRECT, location.origin);
            router.push(newUrl.href);
        }
    }, [session]);

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            // Socket.ioを用いて、サーバーにユーザー登録情報を送信する
            // ここに記述
            // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);
            // const student_id = values.email.split("@")[0];
            // if (!session) {
            //     setError("Session not found");
            //     return;
            // }
            // const username = session.user.name;
            // const discriminator = session.user.discriminator;
            // if (!username || !discriminator) {
            //     setError("Username or discriminator not found");
            //     return;
            // }

            // socket.emit("login", {
            //     student_id,
            //     discord_id: values.discord_id,
            //     password: values.password,
            //     username,
            //     discriminator,
            // });

            register(values, callbackUrl)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.redirect) {
                        router.push(data.redirect);
                    }
                });
        });
    };


    return (
        <LoginCard
            headerTitle="🔐 Register"
            headerLabel="Enter your TUS account"
            mode="email"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="xxxxxxx@ed.tus.ac.jp"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {/* {showTwoFactor ? "Confirm" : "Login"} */}
                        Register Account
                    </Button>
                </form>
            </Form>
        </LoginCard>
    );
};