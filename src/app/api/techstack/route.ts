import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { techStackSchema } from "@/lib/zod";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { name, iconUrl, progress } = await req.json();
        const result = techStackSchema.safeParse({ name, iconUrl });
        if (!result.success)
            return NextResponse.json({ error: result.error.issues[0].message || "Invalid Input" }, { status: 400 });

        const existingTech = await db.techStack.findUniqueByName( { name } );
        if (existingTech)
            return NextResponse.json({ error: "Tech stack with this name already exists" }, { status: 400 });

        const techStack = await db.techStack.create({ name, iconUrl, progress });
        return NextResponse.json(techStack, { status: 201 });

    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const techStacks = await db.techStack.findAll();
        return NextResponse.json(techStacks, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id, name, iconUrl, progress } = await req.json();
        const result = techStackSchema.safeParse({ name, iconUrl });
        if (!result.success)
            return NextResponse.json({ error: result.error.issues[0].message || "Invalid Input" }, { status: 400 });

        const techStack = await db.techStack.update({ id }, { name, iconUrl, progress });
        return NextResponse.json(techStack, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await req.json();
        await db.techStack.delete({ id });
        return NextResponse.json({ message: "Tech stack deleted successfully" }, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}