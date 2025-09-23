import { NextResponse } from "next/server";
import { auth } from "./lib/auth-config";

export default auth(req => {
    const { pathname } = req.nextUrl;

    const session = req.auth;
    const user = session?.user;

    if (pathname.startsWith("/myzone")) {
        if (!user || user.type !== "ADMIN") {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/myzone/:path*"],
};
