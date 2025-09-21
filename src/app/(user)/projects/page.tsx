"use client";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import SeparatorLine from "@/components/SeparatorLine";
import { Project as PrismaProject, ProjectTag, ProjectTechStack, Tag, TechStack } from "@/generated/prisma";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { IoLogoInstagram, IoLogoLinkedin, IoMdOpen } from "react-icons/io";
import GreenPatchCollection from "@/components/GreenPatchCollect";

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

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/project", {
                    method: "GET",
                });
                const data = await res.json();
                if (data.error) throw new Error(error);
                const projectData = data as Project[];
                setProjects(projectData);
            } catch (er) {
                er instanceof Error ? setError(er.message) : setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-xl"></div>

                    {/* Loading text */}
                    <div className="text-2xl md:text-3xl font-bold mb-8 text-green-400">Loading Projects...</div>

                    {/* Circular spinner */}
                    <div className="relative w-24 h-24 mx-auto">
                        {/* Spinner track */}
                        <div className="absolute inset-0 rounded-full border-4 border-gray-700 opacity-30"></div>

                        {/* Spinner animation */}
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-400 border-r-green-400 animate-spin"></div>

                        {/* Pulsing dot in center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Loading dots */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <div
                            className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                            className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                            className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                        ></div>
                    </div>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-2xl text-red-500 mb-4">Error loading projects</div>
                <div className="text-lg text-gray-300">{error}</div>
            </div>
        );

    return (
        <div className="flex flex-col mt-20 gap-10 min-w-screen relative">
            {/* Projects Header */}
            <GreenPatchCollection />
            

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 px-6 md:px-16 lg:px-24">
                {projects.length === 0 ? (
                    <div className="col-span-full text-center text-xl text-gray-400 py-20">
                        No projects found. Check back soon!
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <ScrollAnimationWrapper
                            key={project.id}
                            animation="fadeInUp"
                            delay={0.1 * index}
                            threshold={0.1}
                        >
                            <motion.div
                                className="flex flex-col items-start justify-center border border-green-950/20 rounded-xl bg-green-950/20 backdrop-blur-md shadow-xl transition-all duration-300 h-full"
                                whileTap={{ y: -4 }}
                            >
                                <div className="relative w-full overflow-hidden rounded-t-xl">
                                    <motion.img
                                        src={project.thumbnailUrl || "/project-placeholder.jpg"}
                                        alt={project.name}
                                        width={400}
                                        height={200}
                                        className="w-full h-48 md:h-56 lg:h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                                </div>
                                <div className="flex flex-col items-start justify-center gap-2 px-5 pt-3 md:pt-5 md:px-6 flex-grow">
                                    <span className="text-xl md:text-2xl lg:text-3xl">{project.name}</span>
                                    <p className="text-xs md:text-sm lg:text-base text-white/80">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    {project.techs && project.techs.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.techs.map(tech => (
                                                <div
                                                    key={tech.id}
                                                    className="bg-green-900/30 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                                                >
                                                    {tech.tech.iconUrl && (
                                                        <img
                                                            src={tech.tech.iconUrl}
                                                            alt={tech.tech.name}
                                                            className="w-3 h-3 object-contain"
                                                        />
                                                    )}
                                                    {tech.tech.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {project.tags.map(tag => (
                                                <span
                                                    key={tag.id}
                                                    className="bg-blue-900/30 px-2 py-0.5 rounded-full text-xs"
                                                >
                                                    {tag.tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Built At */}
                                    {project.builtAt && (
                                        <div className="text-xs text-gray-400 mt-2">{project.builtAt}</div>
                                    )}
                                </div>
                                <div className="flex items-start justify-center gap-3 py-5 md:py-6 px-4 md:px-6 w-full mt-auto">
                                    <Link
                                        href={project.gitLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <motion.div
                                            className="bg-white text-black rounded-xl py-1 px-3 md:py-2 md:px-4 text-base md:text-lg flex items-center justify-center gap-2 w-full"
                                            whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FiGithub /> Repo
                                        </motion.div>
                                    </Link>
                                    {project.projectLink && (
                                        <Link
                                            href={project.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <motion.div
                                                className="border-2 border-green-400 text-white rounded-2xl py-1 px-3 md:py-2 md:px-4 text-base md:text-lg flex items-center justify-center gap-3 w-full"
                                                whileHover={{ scale: 1.05, borderColor: "rgb(74, 222, 128)" }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <IoMdOpen /> Live
                                            </motion.div>
                                        </Link>
                                    )}
                                    {project.ytLink && (
                                        <Link
                                            href={project.ytLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <motion.div
                                                className="border-2 border-green-400 text-white rounded-2xl py-1 px-3 md:py-2 md:px-4 text-base md:text-lg flex items-center justify-center gap-3 w-full"
                                                whileHover={{ scale: 1.05, borderColor: "rgb(74, 222, 128)" }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <FaYoutube /> Video
                                            </motion.div>
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        </ScrollAnimationWrapper>
                    ))
                )}
            </div>

            <SeparatorLine />

            {/* Footer */}
            <ScrollAnimationWrapper animation="fadeInUp" delay={0.2}>
                <div className="flex flex-col items-center justify-center w-full gap-4 md:gap-6 py-6 md:py-10">
                    <div className="flex items-center justify-center gap-6 md:gap-10">
                        <motion.a
                            href="https://github.com/rlpratyoosh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl md:text-3xl lg:text-4xl hover:text-green-400 transition-colors"
                            whileHover={{ scale: 1.2, color: "#4ade80" }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiGithub />
                        </motion.a>
                        <motion.a
                            href="https://instagram.com/rlpratyoosh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl md:text-3xl lg:text-4xl hover:text-green-400 transition-colors"
                            whileHover={{ scale: 1.2, color: "#4ade80" }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <IoLogoInstagram />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/rlpratyoosh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl md:text-3xl lg:text-4xl hover:text-green-400 transition-colors"
                            whileHover={{ scale: 1.2, color: "#4ade80" }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <IoLogoLinkedin />
                        </motion.a>
                    </div>
                    <motion.div
                        className="text-sm md:text-base lg:text-lg text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <p>Made with ❤️ by Pratyoosh</p>
                        <p className="text-xs md:text-sm text-gray-500 mb-2">Designed by Meet</p>
                    </motion.div>
                </div>
            </ScrollAnimationWrapper>
        </div>
    );
}
