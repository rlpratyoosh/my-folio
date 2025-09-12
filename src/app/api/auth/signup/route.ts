import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";
import { signUpSchema } from "@/lib/zod";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const result = signUpSchema.safeParse(data);
        if (!result.success) return NextResponse.json({ error: result.error.issues[0].message || "Invalid Input" }, { status: 400 });

        const { name, email, password } = result.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.findUnique({ email });
        if (user) return NextResponse.json({ error: "User already exists" }, { status: 400 });

        const newUser = await db.user.create({ name, email, password: hashedPassword });

        return NextResponse.json(newUser, { status: 201 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
    }
}
