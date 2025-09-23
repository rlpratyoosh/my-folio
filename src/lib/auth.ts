import bcrypt from "bcrypt";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth-config";
import { db } from "./prisma-db";
import { signInSchema } from "./zod";

declare module "next-auth" {
    interface User {
        type?: string;
    }
    interface Session {
        user: {
            id: string;
            type?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth" {
    interface JWT {
        id: string;
        type?: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "••••••••",
                },
            },
            authorize: async credentials => {
                const { email, password } = await signInSchema.parseAsync(credentials);

                const user = await db.user.findUnique({ email });

                if (!user) {
                    throw new Error("User not found");
                }

                const isValid = await bcrypt.compare(password, user.password);

                if (!isValid) {
                    return Promise.reject(new Error("Wrong password"));
                }

                return { id: user.id, email: user.email, name: user.name, type: user.type };
            },
        }),
    ],
});
