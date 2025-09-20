"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { $Enums, TechStack } from "@/generated/prisma/wasm";
import { Project as PrismaProject, ProjectTag, ProjectTechStack, Tag } from "@/generated/prisma/wasm";
import { projectSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project extends PrismaProject {
    techs: Array<
        ProjectTechStack & {
            tech: TechStack;
        }
    >;
    tags: Array<
        ProjectTag & {
            tag: Tag;
        }
    >;
}

type FormData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [techStacks, setTechStacks] = useState<TechStack[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            detail: "",
            thumbnailUrl: "",
            gitLink: "",
            projectLink: "",
            ytLink: "",
            slug: "",
            builtAt: "",
        },
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

        const fetchTags = async () => {
            try {
                const res = await fetch("/api/tags", {
                    method: "GET",
                });
                const data = (await res.json()) as Tag[];
                setTags(data);
            } catch (error) {
                console.log("Error fetching tags: ", error);
            }
        };

        fetchTags();
        fetchProjects();
        fetchTechStacks();
    }, []);

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
        form.reset();
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

            setProjects(projects.filter(project => project.slug !== slug));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    useEffect(() => {
        const filterTagsData = () => {
            const filteredTagsData = tags.filter(
                tag => tag.name.toLowerCase().includes(inputValue.toLowerCase()) && !selectedTags.includes(tag.name)
            );
            setFilteredTags(filteredTagsData);
        };
        const manageSuggestion = () => {
            if (inputValue === "")
                setShowSuggestions(false);
        }
        manageSuggestion();
        filterTagsData();
    }, [inputValue, tags, selectedTags]);

    return (
        <div className="mt-10 w-full pr-10 flex flex-col gap-10">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-3xl">Projects</h1>
                <Button onClick={() => setFormOpen(true)}>Add New Project</Button>
            </div>
            {loading ? (
                <p>Loading projects...</p>
            ) : projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="border p-4 rounded-lg shadow-md">
                            <img
                                src={project.thumbnailUrl}
                                alt={project.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(pt => (
                                    <span key={pt.id} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                        {pt.tag.name}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techs.map(pt => (
                                    <span
                                        key={pt.id}
                                        className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded flex items-center gap-1"
                                    >
                                        <img src={pt.tech.iconUrl} alt={pt.tech.name} className="w-4 h-4" />
                                        {pt.tech.name}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href={project.gitLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    GitHub
                                </a>
                                {project.projectLink && (
                                    <a
                                        href={project.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.ytLink && (
                                    <a
                                        href={project.ytLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        YouTube Video
                                    </a>
                                )}
                            </div>
                            <button
                                onClick={() => deleteProject(project.slug)}
                                className="mt-4 text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {formOpen && (
                <div className="fixed h-9/10 min-w-9/10 bg-background border-2 rounded-lg p-5 overflow-scroll">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl">Add New Project</h2>
                        <Button onClick={() => setFormOpen(false)} variant="ghost" className="text-xl w-10 h-10">
                            <IoMdClose />
                        </Button>
                    </div>

                    {formError && (
                        <div className="py-1 px-4 w-fit mt-2 text-sm rounded-lg border border-red-400 text-white bg-red-400/20">
                            {formError}
                        </div>
                    )}

                    {formSuccess && (
                        <div className="py-1 px-4 w-fit mt-2 text-sm rounded-lg border border-green-400 text-white bg-green-400/20">
                            {formSuccess}
                        </div>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter project name eg. Spotify" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project descrption eg. To play music"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Slug</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter slug for project eg. spotify-project"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="builtAt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Built At</FormLabel>
                                        <FormControl>
                                            <Input placeholder="When did you build it bro?" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="detail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Detail</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Give a detailed info about the project" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gitLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Github Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Github Link of the Project" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="thumbnailUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Thumbnail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Thumbnail URL" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ytLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Youtube Link (Optional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Give youtube link to the video of the project."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="projectLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Project Link (Optitonal)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Give the link to the deployed project" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="relative w-full flex flex-col gap-4 items-start justify-center">
                                <span className="text-lg font-semibold">Tags</span>
                                {selectedTags.length > 0 && (
                                    <div className="flex gap-2 items-center justify-start">
                                        {selectedTags.map((tag, i) => (
                                            <div
                                                key={i}
                                                className="border rounded-full text-sm py-2 px-4"
                                                onClick={() => {
                                                    setSelectedTags(selectedTags.filter(t => t != tag));
                                                }}
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Input
                                    value={inputValue}
                                    onChange={e => {
                                        e.preventDefault();
                                        setInputValue(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" || e.key === ",") {
                                            e.preventDefault();
                                            if (e.currentTarget.value.trim()) {
                                                setSelectedTags([...selectedTags, e.currentTarget.value.trim()]);
                                                e.currentTarget.value = "";
                                                setInputValue("");
                                            }
                                        }
                                    }}
                                />

                                {showSuggestions && filteredTags.length > 0 && (
                                    <div className="absolute bg-card bottom-10 flex w-1/2 flex-col gap-1 py-1 px-1 rounded-lg border">
                                        {filteredTags.map((tag, i) => (
                                            <div
                                                key={i}
                                                className="py-1 px-4 hover:border rounded-lg "
                                                onClick={() => {
                                                    setInputValue(tag.name);
                                                    setShowSuggestions(false);
                                                }}
                                            >
                                                {tag.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-full flex gap-2 items-center">
                                {techStacks.map(tech => (
                                    <div
                                        key={tech.id}
                                        className={cn(
                                            "p-5 border flex items-center justify-center bg-card",
                                            selectedTechs.includes(tech.id) && "bg-blue-400"
                                        )}
                                        onClick={() => {
                                            if (!selectedTechs.includes(tech.id))
                                                setSelectedTechs([...selectedTechs, tech.id]);
                                            else setSelectedTechs(selectedTechs.filter(t => t != tech.id));
                                        }}
                                    >
                                        <Image src={tech.iconUrl} alt="icon" width={10} height={10} />
                                    </div>
                                ))}
                            </div>

                            <Button>Submit</Button>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
}
