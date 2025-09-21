import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { messageSchema } from "@/lib/zod";
import { error } from "console";

export async function GET(req: Request) {
    try {
        const messages = await db.message.findAll();
        return NextResponse.json(messages, { status: 200 });
    } catch (er) {
        return er instanceof Error
            ? NextResponse.json({ error: er.message }, { status: 500 })
            : NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();
        const result = messageSchema.safeParse({ name, email, message });
        if (!result.success)
            return NextResponse.json({ error: result.error.issues[0].message || "Invalid Input" }, { status: 400 });
        const contactMessage = db.message.create({ name, email, message });
        return NextResponse.json(contactMessage, { status: 201 });
    } catch (er) {
        return er instanceof Error
            ? NextResponse.json({ error: er.message }, { status: 500 })
            : NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN")
            return NextResponse.json({ error: "Unaotuhorized" }, { status: 401 });
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Id is required" }, { status: 400 });
        const { read } = await req.json();
        const contactMessage = db.message.update({ id }, { read });
    } catch (er) {
        return er instanceof Error
            ? NextResponse.json({ error: er.message }, { status: 500 })
            : NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
