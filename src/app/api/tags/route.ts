import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const tags = await db.tag.findAll();
        return NextResponse.json(tags, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
} 