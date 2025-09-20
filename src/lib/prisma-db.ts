import prisma from "./prisma";

type ProgressType = "ADVANCE" | "INTERMEDIATE" | "BEGINNER";

export const db = {
    user: {
        create: async (data: { name: string; email: string; password: string; avatarUrl?: string }) =>
            await prisma.user.create({ data }),
        findUnique: async (where: { email: string }) => await prisma.user.findUnique({ where }),
        delete: async (where: { id: string }) => await prisma.user.delete({ where }),
    },
    project: {
        create: async (data: {
            name: string;
            description: string;
            detail?: string;
            thumbnailUrl: string;
            gitLink: string;
            projectLink?: string;
            ytLink?: string;
            slug: string;
            builtAt: string;
        }) => await prisma.project.create({ data }),
        findAll: async () => await prisma.project.findMany({ include: { techs: { include:  { tech: true }}, tags: { include: {tag: true}} } }),
        findUnique: async (where: { slug: string }) =>
            await prisma.project.findUnique({ where, include: { techs: { include: { tech: true } }, tags: { include: { tag: true } } } }),
        update: async (
            where: { slug: string },
            data: {
                name?: string;
                description?: string;
                detail?: string;
                thumbnailUrl?: string;
                gitLink?: string;
                projectLink?: string;
                ytLink?: string;
                slug?: string;
                builtAt?: string;
            }
        ) => await prisma.project.update({ where, data }),
        delete: async (where: { slug: string }) => await prisma.project.delete({ where }),
    },
    techStack: {
        create: async (data: { name: string; iconUrl: string; progress: ProgressType }) =>
            prisma.techStack.create({ data }),
        findAll: async () => await prisma.techStack.findMany(),
        findUnique: async (where: { id: string }) => await prisma.techStack.findUnique({ where }),
        findUniqueByName: async (where: { name: string }) => await prisma.techStack.findUnique({ where }),
        update: async (where: { id: string }, data: { name?: string; iconUrl?: string; progress?: ProgressType }) =>
            await prisma.techStack.update({ where, data }),
        delete: async (where: { id: string }) => await prisma.techStack.delete({ where }),
    },
    projectTechStack: {
        create: async (data: { techStackId: string; projectId: string }) =>
            await prisma.projectTechStack.create({ data }),
        delete: async (where: { id: string }) => await prisma.projectTechStack.delete({ where }),
    },
    tag: {
        create: async (data: { name: string }) => await prisma.tag.create({ data }),
        findAll: async () => await prisma.tag.findMany(),
        findUnique: async (where: { name: string }) => await prisma.tag.findUnique({ where }),
        delete: async (where: { id: string }) => await prisma.tag.delete({ where }),
    },
    projectTag: {
        create: async (data: { tagId: string; projectId: string }) => await prisma.projectTag.create({ data }),
        delete: async (where: { id: string }) => await prisma.projectTag.delete({ where }),
    },
    skill: {
        create: async (data: { name: string; iconUrl: string; progress: ProgressType }) =>
            await prisma.skill.create({ data }),
        update: async (where: { id: string }, data: { name?: string; iconUrl?: string; progress: ProgressType }) =>
            await prisma.skill.update({ where, data }),
        delete: async (where: { id: string }) => await prisma.skill.delete({ where }),
    },
    blog: {
        create: async (data: {
            title: string;
            content: string;
            thumbnailUrl: string;
            slug: string;
            published: boolean;
        }) => await prisma.blog.create({ data }),
        update: async (
            where: { slug: string },
            data: {
                title?: string;
                content?: string;
                thumbnailUrl?: string;
                slug?: string;
                published?: boolean;
            }
        ) => await prisma.blog.update({ where, data }),
        findAll: async () => await prisma.blog.findMany({ include: { category: true } }),
        findUnique: async (where: { slug: string }) => await prisma.blog.findUnique({ where }),
        delete: async (where: { slug: string }) => await prisma.blog.delete({ where }),
    },
    category: {
        create: async (data: { name: string }) => await prisma.category.create({ data }),
        findAll: async () => await prisma.category.findMany(),
        delete: async (where: { id: string }) => await prisma.category.delete({ where }),
    },
    blogCategory: {
        create: async (data: { categoryId: string; blogId: string }) => await prisma.blogCategory.create({ data }),
        delete: async (where: { id: string }) => await prisma.blogCategory.delete({ where }),
    },
    message: {
        create: async (data: { name: string; email: string; message: string; read: boolean }) =>
            await prisma.message.create({ data }),
        findAll: async () => await prisma.message.findMany(),
        findUnique: async (where: { id: string }) => await prisma.message.findUnique({ where }),
        delete: async (where: { id: string }) => await prisma.message.delete({ where }),
    },
    testinomial: {
        create: async (data: { author: string; content: string }) => await prisma.testimonial.create({ data }),
        findAll: async () => await prisma.testimonial.findMany(),
        findUnique: async (where: { id: string }) => await prisma.testimonial.findUnique({ where }),
        delete: async (where: { id: string }) => await prisma.testimonial.delete({ where }),
    },
};
