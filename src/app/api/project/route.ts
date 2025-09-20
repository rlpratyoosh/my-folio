import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";
import { projectSchema } from "@/lib/zod";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { name, description, detail, thumbnailUrl, gitLink, projectLink, ytLink, slug, builtAt, tags, techs } =
            await req.json();
        const result = projectSchema.safeParse({
            name,
            description,
            detail,
            thumbnailUrl,
            gitLink,
            projectLink,
            ytLink,
            slug,
            builtAt,
        });
        if (!result.success)
            return NextResponse.json({ error: result.error.issues[0].message || "Invalid Input" }, { status: 400 });

        const project = await db.project.create({
            name,
            description,
            detail,
            thumbnailUrl,
            gitLink,
            projectLink,
            ytLink,
            slug,
            builtAt,
        });

        if (Array.isArray(tags) && tags.length > 0) {
            await Promise.all(
                tags.map(async (name: string) => {
                    let tag = await db.tag.findUnique({ name });
                    if (!tag) {
                        tag = await db.tag.create({ name });
                    }
                    await db.projectTag.create({ tagId: tag.id, projectId: project.id });
                })
            );
        }

        if (Array.isArray(techs) && techs.length > 0) {
            await Promise.all(
                techs.map(async (id: string) => {
                    const techStack = await db.techStack.findUnique({ id });
                    if (!techStack)
                        return NextResponse.json({ error: `Tech stack with id ${id} not found` }, { status: 400 });
                    await db.projectTechStack.create({ techStackId: id, projectId: project.id });
                })
            );
        }

        return NextResponse.json(project, { status: 201 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        if (slug) {
            const project = await db.project.findUnique({ slug });
            if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
            return NextResponse.json(project);
        }
        const projects = await db.project.findAll();
        return NextResponse.json(projects, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth();
        if (!session || session.user.type !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

        const {
            name,
            description,
            detail,
            thumbnailUrl,
            gitLink,
            projectLink,
            ytLink,
            slug: newSlug,
            builtAt,
            tags,
            techs,
        } = await request.json();

        const result = projectSchema.safeParse({
            name,
            description,
            detail,
            thumbnailUrl,
            gitLink,
            projectLink,
            ytLink,
            slug: newSlug,
            builtAt,
        });
        if (!result.success)
            return NextResponse.json({ error: result.error.issues[0].message || "Invalid Input" }, { status: 400 });

        await db.project.update(
            { slug },
            { name, description, detail, thumbnailUrl, gitLink, projectLink, ytLink, slug: newSlug, builtAt }
        );

        const project = await db.project.findUnique({ slug: newSlug });

        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

        project.tags.forEach(async tag => {
            await db.projectTag.delete({ id: tag.id });
        });

        await Promise.all(
            tags.map(async (name: string) => {
                let tag = await db.tag.findUnique({ name });
                if (!tag) {
                    tag = await db.tag.create({ name });
                }
                await db.projectTag.create({ tagId: tag.id, projectId: project.id });
            })
        );

        project.techs.forEach(async tech => {
            await db.projectTechStack.delete({ id: tech.id });
        });

        await Promise.all(
            techs.map(async (id: string) => {
                const techStack = await db.techStack.findUnique({ id });
                if (!techStack)
                    return NextResponse.json({ error: `Tech stack with id ${id} not found` }, { status: 400 });
                await db.projectTechStack.create({ techStackId: id, projectId: project.id });
            })
        );

        const updatedProject = await db.project.findUnique({ slug: newSlug });

        return NextResponse.json(updatedProject);
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

        const project = await db.project.findUnique({ slug });
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

        await db.project.delete({ slug });

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (er) {
        if (er instanceof Error) return NextResponse.json({ error: er.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
