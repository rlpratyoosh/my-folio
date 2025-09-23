import NextAuth, { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.type = user.type;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
                session.user.type = token.type as string;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnMyZone = nextUrl.pathname.startsWith("/myzone");

            if (isOnMyZone) {
                if (isLoggedIn && auth?.user?.type === "ADMIN") return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
    },
    providers: [], 
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
};

export const { auth } = NextAuth(authConfig);
