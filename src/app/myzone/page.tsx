"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { $Enums, Skill, TechStack } from "@/generated/prisma/wasm";
import { skillSchema, techStackSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SkillFormData = z.infer<typeof skillSchema>;
type TechStackFormData = z.infer<typeof techStackSchema>;

export default function MyZoneDashboardPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [skillForm, setSkillForm] = useState(false);
    const [techs, setTechs] = useState<TechStack[]>([]);
    const [techForm, setTechsForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [skillError, setSkillError] = useState<string | null>(null);
    const [skillSuccess, setSkillSuccess] = useState<string | null>(null);
    const [techError, setTechError] = useState<string | null>(null);
    const [techSuccess, setTechSuccess] = useState<string | null>(null);
    const [skillProgress, setSkillProgress] = useState<$Enums.ProgressType>("BEGINNER");
    const [techProgress, setTechProgress] = useState<$Enums.ProgressType>("BEGINNER");
    const skillModalRef = useRef<HTMLDivElement>(null);
    const techModalRef = useRef<HTMLDivElement>(null);

    const skillFormMethods = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            name: "",
            iconUrl: "",
        },
    });

    const techFormMethods = useForm<TechStackFormData>({
        resolver: zodResolver(techStackSchema),
        defaultValues: {
            name: "",
            iconUrl: "",
        },
    });

    useEffect(() => {
        const fetchTechStacks = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/techstack", {
                    method: "GET",
                });
                const techData = (await res.json()) as TechStack[];
                setTechs(techData);
            } catch (er) {
                console.log("Error fetching techstack: ", er);
            } finally {
                setLoading(false);
            }
        };

        const fetchSkills = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/skill", {
                    method: "GET",
                });
                const skillData = (await res.json()) as Skill[];
                setSkills(skillData);
            } catch (er) {
                console.log("Error fetching skills, ", er);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
        fetchTechStacks();
    }, []);

    useEffect(() => {
        const handleSkillClickOutside = (event: MouseEvent) => {
            if (skillModalRef.current && !skillModalRef.current.contains(event.target as Node)) {
                closeSkillModal();
            }
        };

        const handleTechClickOutside = (event: MouseEvent) => {
            if (techModalRef.current && !techModalRef.current.contains(event.target as Node)) {
                closeTechModal();
            }
        };

        if (skillForm) {
            document.addEventListener("mousedown", handleSkillClickOutside);
        }

        if (techForm) {
            document.addEventListener("mousedown", handleTechClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleSkillClickOutside);
            document.removeEventListener("mousedown", handleTechClickOutside);
        };
    }, [skillForm, techForm]);

    const closeSkillModal = () => {
        setSkillForm(false);
        skillFormMethods.reset();
        setSkillProgress("BEGINNER");
        setSkillError(null);
        setSkillSuccess(null);
    };

    const closeTechModal = () => {
        setTechsForm(false);
        techFormMethods.reset();
        setTechProgress("BEGINNER");
        setTechError(null);
        setTechSuccess(null);
    };

    const onSkillSubmit = async (data: SkillFormData) => {
        try {
            setSkillError(null);
            setSkillSuccess(null);

            const skillData = {
                ...data,
                progress: skillProgress,
            };

            const response = await fetch("/api/skill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(skillData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create skill");
            }

            const newSkill = await response.json();
            setSkills([...skills, newSkill]);
            setSkillSuccess("Skill created successfully!");

            setTimeout(() => {
                closeSkillModal();
            }, 2000);
        } catch (error) {
            console.error("Error creating skill:", error);
            setSkillError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    const onTechSubmit = async (data: TechStackFormData) => {
        try {
            setTechError(null);
            setTechSuccess(null);

            const techData = {
                ...data,
                progress: techProgress,
            };

            const response = await fetch("/api/techstack", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(techData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create tech stack");
            }

            const newTech = await response.json();
            setTechs([...techs, newTech]);
            setTechSuccess("Tech stack created successfully!");
            
            setTimeout(() => {
                closeTechModal();
            }, 2000);
        } catch (error) {
            console.error("Error creating tech stack:", error);
            setTechError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    const deleteSkill = async (id: string) => {
        try {
            const response = await fetch(`/api/skill?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete skill");
            }

            setSkills(skills.filter(skill => skill.id !== id));
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    const deleteTech = async (id: string) => {
        try {
            const response = await fetch(`/api/techstack?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete tech stack");
            }

            setTechs(techs.filter(tech => tech.id !== id));
        } catch (error) {
            console.error("Error deleting tech stack:", error);
        }
    };

    if (loading) {
        return <div className="mt-10">Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-10 justify-center mt-10 w-full pr-10">
            {/* Skills */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl">Skills</h1>
                    <Button onClick={() => setSkillForm(true)}>Add Skills</Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {skills.length === 0 ? (
                        <p>No skills found. Add your first skill!</p>
                    ) : (
                        skills.map(skill => (
                            <div
                                key={skill.id}
                                className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-16 h-16 relative mb-2">
                                    <img
                                        src={skill.iconUrl}
                                        alt={skill.name}
                                        width={64}
                                        height={64}
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <span className="text-center font-medium">{skill.name}</span>
                                <span className="text-xs text-gray-500 mt-1">{skill.progress}</span>
                                <button
                                    onClick={() => deleteSkill(skill.id)}
                                    className="mt-2 text-xs text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Skill Form Modal */}
            {skillForm && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div ref={skillModalRef} className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Add New Skill</h2>
                            <button onClick={closeSkillModal} className="text-gray-500 hover:text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {skillError && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">{skillError}</div>}

                        {skillSuccess && (
                            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">{skillSuccess}</div>
                        )}

                        <Form {...skillFormMethods}>
                            <form onSubmit={skillFormMethods.handleSubmit(onSkillSubmit)} className="space-y-4">
                                <FormField
                                    control={skillFormMethods.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Skill name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={skillFormMethods.control}
                                    name="iconUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://example.com/icon.svg" {...field} />
                                            </FormControl>
                                            <FormDescription>URL for the skill icon</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <FormLabel>Proficiency Level</FormLabel>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={skillProgress}
                                        onChange={e => setSkillProgress(e.target.value as $Enums.ProgressType)}
                                    >
                                        <option value="BEGINNER">Beginner</option>
                                        <option value="INTERMEDIATE">Intermediate</option>
                                        <option value="ADVANCED">Advanced</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <Button type="button" variant="outline" onClick={closeSkillModal}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Add Skill</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )}

            {/* Techs */}
            <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl">TechStacks</h1>
                    <Button onClick={() => setTechsForm(true)}>Add Techs</Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {techs.length === 0 ? (
                        <p>No tech stacks found. Add your first tech stack!</p>
                    ) : (
                        techs.map(tech => (
                            <div
                                key={tech.id}
                                className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-16 h-16 relative mb-2">
                                    <img
                                        src={tech.iconUrl}
                                        alt={tech.name}
                                        width={64}
                                        height={64}
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <span className="text-center font-medium">{tech.name}</span>
                                <span className="text-xs text-gray-500 mt-1">{tech.progress}</span>
                                <button
                                    onClick={() => deleteTech(tech.id)}
                                    className="mt-2 text-xs text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Tech Form Modal */}
            {techForm && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div ref={techModalRef} className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Add New Tech Stack</h2>
                            <button onClick={closeTechModal} className="text-gray-500 hover:text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {techError && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">{techError}</div>}

                        {techSuccess && (
                            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">{techSuccess}</div>
                        )}

                        <Form {...techFormMethods}>
                            <form onSubmit={techFormMethods.handleSubmit(onTechSubmit)} className="space-y-4">
                                <FormField
                                    control={techFormMethods.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tech stack name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={techFormMethods.control}
                                    name="iconUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://example.com/icon.svg" {...field} />
                                            </FormControl>
                                            <FormDescription>URL for the tech stack icon</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <FormLabel>Proficiency Level</FormLabel>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={techProgress}
                                        onChange={e => setTechProgress(e.target.value as $Enums.ProgressType)}
                                    >
                                        <option value="BEGINNER">Beginner</option>
                                        <option value="INTERMEDIATE">Intermediate</option>
                                        <option value="ADVANCED">Advanced</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <Button type="button" variant="outline" onClick={closeTechModal}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Add Tech Stack</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </div>
    );
}
