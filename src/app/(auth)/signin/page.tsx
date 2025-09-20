"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

type FormData = z.infer<typeof signInSchema>;

export default function signInPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { data: session } = useSession();
    const { user } = session || {};

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await signIn("credentials", { ...data, redirect: false });
            if (res?.error) {
                setError("Invalid username or password");
            } else {
                setSuccess(true);
            }
        } catch (er) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    if (user) return (
        <div>
            <p className="m-20">You are already signed in as {user.email} </p>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-25 flex flex-col gap-5 w-1/4 ml-20">
            <label htmlFor="email">Email</label>
            <input type="text" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
            </button>
            {error && <p>{error}</p>}
            {success && <p>Signed in successfully!</p>}
        </form>
    );
}
