import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma-db";
import { skillSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const skillData = await db.skill.findAll();
        return NextResponse.json(skillData, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN")
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const { name, iconUrl, progress } = await req.json();
        const result = skillSchema.safeParse({ name, iconUrl });
        if (!result.success)
            return NextResponse.json({ error: result.error.issues[0].message || "Invalid Input" }, { status: 400 });

        const existingSkill = await db.skill.findUnique({ name });
        if (existingSkill) return NextResponse.json({ error: "Skill already exists" }, { status: 400 });

        const skill = await db.skill.create({
            name,
            iconUrl,
            progress,
        });

        return NextResponse.json(skill, { status: 201 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN")
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
        }

        await db.skill.delete({
            id,
        });
        return NextResponse.json({ message: "Skill deleted successfully " }, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
