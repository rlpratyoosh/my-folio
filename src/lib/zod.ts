import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z.string().min(1, "Password is required").min(6, "Password must be 6 letters long").max(32, "Passwords must be less than 32 characters")
})

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required").max(32, "Name must be less than 32 characters"),
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z.string().min(1, "Password is required").min(6, "Password must be 6 letters long").max(32, "Passwords must be less than 32 characters"),
})

export const projectSchema = z.object({
    name: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    detail: z.string().optional(),
    thumbnailUrl: z.string().url("Invalid URL").optional(),
    gitLink: z.string().min(1, "Git Link is required").url("Invalid URL"),
    projectLink: z.string().optional(),
    ytLink: z.string().optional(),
    slug: z.string().min(1, "Slug is required").max(100, "Slug must be less than 100 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    builtAt: z.string().min(1, "Built At is required"),
});

export const techStackSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    iconUrl: z.string().url("Invalid URL").optional(),
})