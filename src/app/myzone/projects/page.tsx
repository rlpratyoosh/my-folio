"use client";
import GreenPatch from "@/components/GreenPatch";
import SeparatorLine from "@/components/SeparatorLine";
import type { $Enums, TechStack } from "@/generated/prisma/wasm";
import { Project as PrismaProject, ProjectTag, ProjectTechStack, Tag } from "@/generated/prisma/wasm";
import { projectSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface Project extends PrismaProject {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    detail: string | null;
    thumbnailUrl: string;
    gitLink: string;
    projectLink: string | null;
    ytLink: string | null;
    slug: string;
    builtAt: string;
    techs: Array<
        ProjectTechStack & {
            tech: TechStack & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                iconUrl: string;
                progress: $Enums.ProgressType;
            };
        }
    >;
    tags: Array<
        ProjectTag & {
            tag: Tag & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }
    >;
}

type FormData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [techStacks, setTechStacks] = useState<TechStack[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/project", {
                    method: "GET",
                });
                const data = (await res.json()) as Project[];
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTechStacks = async () => {
            try {
                const res = await fetch("/api/techstack", {
                    method: "GET",
                });
                const data = (await res.json()) as TechStack[];
                setTechStacks(data);
            } catch (error) {
                console.error("Error fetching tech stacks:", error);
            }
        };

        fetchProjects();
        fetchTechStacks();
    }, []);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        if (formOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [formOpen]);

    const closeModal = () => {
        setFormOpen(false);
        reset();
        setSelectedTags([]);
        setSelectedTechs([]);
        setFormError(null);
        setFormSuccess(null);
    };

    const onSubmit = async (data: FormData) => {
        try {
            setFormError(null);
            setFormSuccess(null);

            const projectData = {
                ...data,
                tags: selectedTags,
                techs: selectedTechs,
            };

            const response = await fetch("/api/project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create project");
            }

            const newProject = await response.json();
            setProjects([...projects, newProject]);
            setFormSuccess("Project created successfully!");

            // Reset form after successful submission
            setTimeout(() => {
                closeModal();
            }, 2000);
        } catch (error) {
            console.error("Error creating project:", error);
            setFormError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    const deleteProject = async (slug: string) => {
        try {
            const response = await fetch(`/api/project?slug=${slug}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete project");
            }

            setProjects(projects.filter((project) => project.slug !== slug));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <> </>
    );
}
