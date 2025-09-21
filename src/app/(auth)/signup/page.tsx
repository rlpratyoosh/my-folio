"use client";
import { signUpSchema } from "@/lib/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const { error } = await res.json();
                setError(error || "Something went wrong");
            } else setSuccess(true);
        } catch (er) {
            console.log(er)
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-25 flex flex-col gap-5 w-1/4 ml-20">
                <label htmlFor="name">Name</label>
                <input type="text" {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="email">Email</label>
                <input type="text" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="password">Password</label>
                <input type="password" {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Sign Up"}
                </button>
                {error && <p>{error}</p>}
                {success && <p>Account created successfully! Please sign in.</p>}
            </form>
        </>
    );
}
