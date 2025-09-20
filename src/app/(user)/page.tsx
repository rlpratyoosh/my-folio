"use client";
import GreenPatch from "@/components/GreenPatch";
import SeparatorLine from "@/components/SeparatorLine";
import { Project as PrismaProject, ProjectTag, ProjectTechStack, Skill, Tag, TechStack } from "@/generated/prisma";
import { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { IoLogoInstagram, IoLogoLinkedin, IoMdMail, IoMdOpen } from "react-icons/io";
import { PiTreasureChestFill } from "react-icons/pi";

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

export default function Home() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [techs, setTechs] = useState<TechStack[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/skill", {
                    method: "GET",
                });
                const data = await response.json();
                if (data.error) throw new Error(error);
                const skillData = data as Skill[];
                setSkills(skillData);
            } catch (er) {
                er instanceof Error ? setError(er.message) : setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        const fetchTechs = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/techstack", {
                    method: "GET",
                });
                const data = await res.json();
                if (data.error) throw new Error(error);
                const techData = data as TechStack[];
                setTechs(techData);
            } catch (er) {
                er instanceof Error ? setError(er.message) : setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

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

        fetchSkills();
        fetchTechs();
        fetchProjects();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-xl"></div>

                    {/* Loading text */}
                    <div className="text-2xl md:text-3xl font-bold mb-8 text-green-400">Loading Portfolio...</div>

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

    return (
        <div className="flex flex-col gap-10 min-w-screen relative">
            {/* Background green patches - Mobile */}
            <div className="md:hidden">
                <GreenPatch top="-10%" left="-20%" opacity="20" width="200px" height="200px" />
                <GreenPatch top="40%" right="-20%" opacity="20" width="200px" height="200px" />
                <GreenPatch top="80%" left="-30%" opacity="20" width="200px" height="200px" />
                <GreenPatch top="-20%" right="-20%" opacity="20" width="200px" height="200px" />
                <GreenPatch top="90%" right="-40%" opacity="20" width="200px" height="200px" />
            </div>

            {/* Background green patches - Tablet */}
            <div className="hidden md:block lg:hidden">
                <GreenPatch top="-10%" left="-20%" opacity="20" width="250px" height="250px" />
                <GreenPatch top="40%" right="-20%" opacity="20" width="250px" height="250px" />
                <GreenPatch top="80%" left="-30%" opacity="20" width="250px" height="250px" />
                <GreenPatch top="-20%" right="-20%" opacity="20" width="250px" height="250px" />
                <GreenPatch top="90%" right="-40%" opacity="20" width="250px" height="250px" />
                <GreenPatch top="25%" left="40%" opacity="8" width="300px" height="300px" blur="2xl" />
                <GreenPatch top="65%" right="30%" opacity="8" width="300px" height="300px" blur="2xl" />
            </div>

            {/* Background green patches - Desktop */}
            <div className="hidden lg:block">
                <GreenPatch top="-10%" left="-20%" opacity="20" width="300px" height="300px" />
                <GreenPatch top="40%" right="-20%" opacity="20" width="300px" height="300px" />
                <GreenPatch top="80%" left="-30%" opacity="20" width="300px" height="300px" />
                <GreenPatch top="-20%" right="-20%" opacity="20" width="300px" height="300px" />
                <GreenPatch top="90%" right="-40%" opacity="20" width="300px" height="300px" />
                <GreenPatch top="25%" left="40%" opacity="8" width="400px" height="400px" blur="2xl" />
                <GreenPatch top="65%" right="30%" opacity="8" width="400px" height="400px" blur="2xl" />
                <GreenPatch top="10%" right="20%" opacity="5" width="500px" height="500px" blur="3xl" />
                <GreenPatch top="85%" left="20%" opacity="5" width="500px" height="500px" blur="3xl" />
            </div>

            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-around p-8 md:px-16 lg:px-30 lg:mt-20">
                {/* Top Main Text */}
                <div className="flex flex-col md:w-1/2">
                    {/* Big Hello with green dot */}
                    <span className="relative after:content-[''] after:absolute after:w-5 after:h-5 md:after:w-6 md:after:h-6 lg:after:w-7 lg:after:h-7 after:bg-green-500 after:rounded-full after:bottom-4 after:ml-3 md:after:bottom-5 md:after:ml-4 lg:after:bottom-7 lg:after:ml-5 text-7xl md:text-8xl lg:text-9xl font-semibold">
                        Hello
                    </span>
                    {/* Name introduction */}
                    <span className="text-5xl md:text-6xl lg:text-6xl font-grotesk mt-2 md:mt-4">
                        My self, Pratyoosh!
                    </span>
                    {/* Title with separator */}
                    <div className="flex gap-3 items-center mt-6 md:mt-10">
                        <div className="w-1/4 bg-white rounded-full h-1 md:h-1.5 lg:h-2"></div>
                        <div className="rounded-full w-2 h-2 bg-white md:w-3 md:h-3 lg:w-4 lg:h-4"></div>
                        <span className="text-green-500 text-xl md:text-2xl lg:text-3xl font-bold">Full Stack</span>
                        <span className="text-xl md:text-2xl lg:text-3xl">Developer</span>
                    </div>
                    {/* Quote */}
                    <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-500">
                        "When there is no bug there is no code..."
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center justify-start gap-6 mt-12 md:mt-16 lg:mt-20">
                        {/* Chat button with speech bubble triangle */}
                        <button className="relative bg-white text-black font-semibold px-6 py-3 md:px-7 md:py-3.5 rounded-full shadow-lg text-sm md:text-base lg:text-lg">
                            Let's Chat
                            <span
                                className="absolute -bottom-3 left-8 w-0 h-0 
           border-l-[10px] border-r-[10px] border-t-[10px] border-transparent 
           border-t-white md:border-l-[12px] md:border-r-[12px] md:border-t-[12px]"
                            ></span>
                        </button>
                        {/* Lootbox button with icon */}
                        <button className="flex items-center gap-3 text-sm md:text-base lg:text-lg border-2 border-green-300 rounded-full px-6 py-3 md:px-7 md:py-3.5">
                            Open LootBox <PiTreasureChestFill className="text-lg md:text-xl lg:text-2xl" />
                        </button>
                    </div>
                </div>
                {/* Profile img with effects */}
                <div className="relative w-full md:w-1/2 flex justify-center md:justify-end mt-16 md:mt-0">
                    <img
                        src={"/av.png"}
                        alt="Description"
                        width={500}
                        height={500}
                        className="w-[500px] md:w-[400px] lg:w-[500px]"
                    />
                    {/* Green glow effect */}
                    <div className="absolute right-20 rounded-full h-60 w-60 md:h-80 md:w-80 lg:h-96 lg:w-96 bg-green-500 opacity-30 blur-3xl z-[-1]"></div>
                    {/* Shadow under img */}
                    <div className="absolute bottom-[-10%] w-full bg-black blur-2xl md:blur-3xl h-24 md:h-32 lg:h-40"></div>
                </div>
            </div>
            {/* Separator Line */}
            <div className="flex items-center justify-center w-full">
                <SeparatorLine />
            </div>
            {/* About Me Section */}
            {/* Green line accent */}
            <div className="h-0.5 md:h-1 w-1/2 md:w-25/100 bg-green-500 mt-10 md:mt-16"></div>
            <div className="flex flex-col gap-4 md:gap-6 items-start justify-center p-5 pr-9 md:px-16 lg:px-24">
                {/* Section title */}
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">About Me</span>
                {/* Bio paragraph */}
                <p className="text-lg md:text-xl lg:text-2xl md:max-w-3xl lg:max-w-4xl">
                    Hey, I'm Pratyoosh, a CS student who breaks Linux for fun, fights with DSA, and builds SaaS projects
                    that (mostly) work. Currently diving into TypeScript, React, Next.js, Prisma, and AI/ML while
                    surviving hostel food.
                </p>
                {/* Contact information */}
                <div className="flex items-center justify-center gap-3 mt-2 md:mt-4">
                    <div className="w-0.5 md:w-1 h-10 md:h-14 bg-green-500"></div>
                    <IoMdMail className="text-lg md:text-xl mt-0.5" />
                    <div className="text-xs md:text-sm lg:text-base text-gray-500">pratyoosh.prakash.dev@gmail.com</div>
                </div>
                {/* Timeline Section */}
                <div className="flex flex-col items-start gap-14 md:gap-20 w-full mt-10 md:mt-16 ml-6 md:ml-12 lg:ml-20 relative">
                    {/* Timeline box - 2024 */}
                    <div className="relative w-full max-w-3xl group">
                        {/* Year label that overlaps the border */}
                        <div className="absolute -top-5 left-6 z-10">
                            <span className="border-2 border-green-400 bg-black px-4 py-1 md:px-6 md:py-2 rounded-full text-green-400 md:text-lg lg:text-xl font-medium">
                                2024
                            </span>
                        </div>
                        {/* Connector dot */}
                        <div className="absolute top-12 -left-2 w-4 h-4 rounded-full bg-green-400 z-20 shadow-lg shadow-green-500/30"></div>
                        {/* Content box */}
                        <div className="border-2 border-green-400/30 rounded-xl p-8 pt-10 md:p-10 md:pt-12 ml-10 bg-green-900/10 backdrop-blur-sm transition-all duration-300 hover:border-green-400/60 hover:bg-green-900/20 group-hover:shadow-lg group-hover:shadow-green-900/20">
                            <h3 className="text-xl md:text-2xl lg:text-3xl text-green-400 mb-3">Fundamentals & DSA</h3>
                            <p className="text-base md:text-lg lg:text-xl text-white/90">
                                Learnt C/C++ and had love-hate battles with Data Structures and Algorithms, building a
                                strong foundation for advanced programming concepts.
                            </p>
                        </div>
                    </div>

                    {/* Timeline box - 2025 */}
                    <div className="relative md:w-full w-95/100 max-w-3xl group">
                        {/* Year label that overlaps the border */}
                        <div className="absolute -top-5 left-6 z-10">
                            <span className="border-2 border-green-400 bg-black px-4 py-1 md:px-6 md:py-2 rounded-full text-green-400 md:text-lg lg:text-xl font-medium">
                                2025
                            </span>
                        </div>
                        {/* Connector dot */}
                        <div className="absolute top-12 -left-2 w-4 h-4 rounded-full bg-green-400 z-20 shadow-lg shadow-green-500/30"></div>
                        {/* Content box */}
                        <div className="border-2 border-green-400/30 rounded-xl p-8 pt-10 md:p-10 md:pt-12 ml-10 bg-green-900/10 backdrop-blur-sm transition-all duration-300 hover:border-green-400/60 hover:bg-green-900/20 group-hover:shadow-lg group-hover:shadow-green-900/20">
                            <h3 className="text-xl md:text-2xl lg:text-3xl text-green-400 mb-3">
                                Full-Stack Development
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-white/90">
                                Dove into the world of Full-Stack development, mastering TypeScript, React, Next.js &
                                Prisma to build modern web applications and complex SaaS projects.
                            </p>
                        </div>
                    </div>

                    {/* Timeline box - 2026 (Future) */}
                    <div className="relative w-full max-w-3xl group opacity-60 hover:opacity-80 transition-opacity">
                        {/* Year label that overlaps the border */}
                        <div className="absolute -top-5 left-6 z-10">
                            <span className="border-2 border-gray-600 bg-black px-4 py-1 md:px-6 md:py-2 rounded-full text-gray-400 md:text-lg lg:text-xl font-medium">
                                2026
                            </span>
                        </div>
                        {/* Connector dot */}
                        <div className="absolute top-12 -left-2 w-4 h-4 rounded-full bg-gray-600 z-20 shadow-lg shadow-gray-500/30"></div>
                        {/* Content box */}
                        <div className="border-2 border-gray-700 rounded-xl p-8 pt-10 md:p-10 md:pt-12 ml-10 bg-gray-900/10 backdrop-blur-sm">
                            <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-3">Coming soon...</h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-500">
                                Future adventures and technological explorations to be discovered...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SeparatorLine />
            {/* Skills */}
            <div className="flex flex-col items-start justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold ml-6 md:ml-16 lg:ml-24">My Skills</span>
                <div className="h-0.5 md:h-1 w-1/2 md:w-25/100 bg-green-500 mt-1 md:mt-2"></div>
                <div className="flex items-center justify-center w-full mt-10 md:mt-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-12 lg:gap-16 items-center justify-center px-4 md:px-16 lg:px-24">
                        {skills.map(skill => {
                            const percentage =
                                skill.progress === "ADVANCED"
                                    ? 90
                                    : skill.progress === "INTERMEDIATE"
                                    ? 60
                                    : skill.progress === "BEGINNER"
                                    ? 30
                                    : 15;
                            const circumference = 2 * Math.PI * 45;
                            const offset = circumference - (percentage / 100) * circumference;

                            return (
                                <div key={skill.name} className="flex flex-col items-center justify-center">
                                    {/* Circular progress */}
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                                        {/* Background circle */}
                                        <svg className="w-full h-full -rotate-90">
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="45"
                                                stroke="currentColor"
                                                strokeWidth="5"
                                                fill="transparent"
                                                className="text-gray-700"
                                            />
                                            {/* Foreground circle with stroke-dasharray for percentage */}
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="45"
                                                stroke="currentColor"
                                                strokeWidth="5"
                                                fill="transparent"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={offset}
                                                className="text-green-500"
                                            />
                                        </svg>
                                        {/* Absolute positioning to center the image */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 rounded-full">
                                            <img
                                                src={skill.iconUrl}
                                                alt={skill.name}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </div>
                                    </div>
                                    {/* Skill name */}
                                    <span className="mt-4 text-sm md:text-base lg:text-lg text-center">
                                        {skill.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <SeparatorLine />

            {/* Tech Stack */}
            <div className="flex flex-col items-start justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold ml-6 md:ml-16 lg:ml-24">Stacks</span>
                <div className="h-0.5 md:h-1 w-1/2 md:w-20/100 bg-green-500 mt-1 md:mt-2"></div>
                <div className="w-full mt-10 md:mt-16 px-8 md:px-16 lg:px-24">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
                        {techs.map(tech => (
                            <div
                                key={tech.name}
                                className="flex flex-col items-center justify-center bg-green-900/20 backdrop-blur-sm hover:bg-green-900/30 transition-all duration-300 p-4 md:p-6 rounded-xl hover:scale-105 w-full"
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-green-500/10 rounded-xl">
                                    <img
                                        src={tech.iconUrl}
                                        alt={tech.name}
                                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
                                    />
                                </div>
                                <span className="mt-3 text-sm md:text-base lg:text-lg text-center">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SeparatorLine />
            {/* Projects */}
            <div className="flex flex-col items-start justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold ml-6 md:ml-16 lg:ml-24">Projects</span>
                <div className="h-0.5 md:h-1 w-1/2 md:w-22/100 bg-green-500 mt-1 md:mt-2"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-10 md:mt-16 px-6 md:px-16 lg:px-24">
                    {projects.map(project => (
                        <div
                            className="flex flex-col items-start justify-center border border-green-950/20 rounded-xl bg-green-950/20 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                            key={project.name}
                        >
                            <div className="relative w-full overflow-hidden rounded-t-xl">
                                <img
                                    src={project.thumbnailUrl}
                                    alt={""}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                            </div>
                            <div className="flex flex-col items-start justify-center gap-2 px-5 pt-3 md:pt-5 md:px-6">
                                <span className="text-xl md:text-2xl lg:text-3xl">{project.name}</span>
                                <p className="text-xs md:text-sm lg:text-base text-white/80">{project.description}</p>
                            </div>
                            <div className="flex items-start justify-center gap-3 py-5 md:py-6 px-4 md:px-6">
                                <div className="bg-white text-black rounded-xl py-1 px-3 md:py-2 md:px-4 text-base md:text-lg flex items-center justify-center gap-2">
                                    <FiGithub /> Repo
                                </div>
                                <div className="border-2 border-green-400 text-white rounded-2xl py-1 px-3 md:py-2 md:px-4 text-base md:text-lg flex items-center justify-center gap-3">
                                    <IoMdOpen /> Live
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center w-full mt-10 md:mt-16">
                    <div className="bg-white text-black font-semibold rounded-xl py-2 px-4 md:py-3 md:px-6 md:text-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        View More
                    </div>
                </div>
            </div>

            <SeparatorLine />
            {/* Contact */}
            <div className="flex flex-col items-start justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold ml-6 md:ml-16 lg:ml-24">Let's Connect</span>
                <div className="h-0.5 md:h-1 w-75/100 md:w-32/100 bg-green-500 mt-1 md:mt-2"></div>
                <div className="w-full flex flex-col md:flex-row items-center justify-between mt-10 md:mt-16 px-6 md:px-16 lg:px-24 relative">
                    {/* Message icon/illustration on the left */}
                    <div className="w-full md:w-2/5 flex items-center justify-center md:justify-start mb-12 md:mb-0">
                        <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center">
                            {/* Message icon with green glow effect */}
                            <div className="absolute w-full h-full rounded-full bg-green-500 opacity-20 blur-2xl z-[-1]"></div>
                            <div className="w-full h-full flex items-center justify-center">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Form on the right with Message title overlay */}
                    <div className="w-full md:w-3/5 relative">
                        {/* Message title that overlaps the border - similar to timeline year styling */}
                        <div className="absolute -top-5 left-6 z-10">
                            <span className="border-2 border-green-400 bg-black px-4 py-1 md:px-6 md:py-2 rounded-full text-green-400 md:text-lg lg:text-xl font-medium">
                                Message
                            </span>
                        </div>
                        {/* Connector dot - like timeline */}
                        <div className="absolute top-12 -left-2 w-4 h-4 rounded-full bg-green-400 z-20 shadow-lg shadow-green-500/30"></div>

                        {/* Form container with styling similar to timeline boxes */}
                        <div className="border-2 border-green-400/30 rounded-xl p-8 pt-10 md:p-10 md:pt-12 ml-10 bg-green-900/10 backdrop-blur-sm transition-all duration-300 hover:border-green-400/60 hover:bg-green-900/20">
                            <form className="flex flex-col gap-4 md:gap-8 w-full">
                                <label htmlFor="name" className="flex flex-col gap-2 text-lg md:text-xl w-full">
                                    Name
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Eg. John Doe"
                                        className="focus:outline-0 outline-0 border border-green-400 rounded-xl py-2 px-4 md:py-3 md:px-5 md:text-base w-full"
                                    />
                                </label>
                                <label htmlFor="email" className="flex flex-col gap-2 text-lg md:text-xl w-full">
                                    Email
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Eg. john@example.com"
                                        className="focus:outline-0 outline-0 border border-green-400 rounded-xl py-2 px-4 md:py-3 md:px-5 md:text-base w-full"
                                    />
                                </label>
                                <label htmlFor="message" className="flex flex-col gap-2 text-lg md:text-xl w-full">
                                    Message
                                    <textarea
                                        id="message"
                                        placeholder="Your message here..."
                                        className="focus:outline-0 outline-0 border border-green-400 rounded-xl py-2 px-4 md:py-3 md:px-5 md:text-base w-full min-h-[100px]"
                                    ></textarea>
                                </label>
                                <button
                                    type="submit"
                                    className="bg-white text-black px-5 py-2 md:py-3 md:px-8 mt-4 md:mt-6 rounded-xl md:text-lg hover:bg-gray-100 transition-colors self-start"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <SeparatorLine />
            {/* Footer */}
            <div className="flex flex-col items-center justify-center w-full gap-4 md:gap-6 py-6 md:py-10">
                <div className="flex items-center justify-center gap-6 md:gap-10">
                    <a
                        href="https://github.com/rlpratyoosh"
                        className="text-2xl md:text-3xl lg:text-4xl hover:text-green-400 transition-colors"
                    >
                        <FiGithub />
                    </a>
                    <a
                        href="https://instagram.com/rlpratyoosh"
                        className="text-2xl md:text-3xl lg:text-4xl hover:text-green-400 transition-colors"
                    >
                        <IoLogoInstagram />
                    </a>
                    <a
                        href="https://linkedin.com/in/rlpratyoosh"
                        className="text-2xl md:text-3xl lg:text-4xl hover:text-green-400 transition-colors"
                    >
                        <IoLogoLinkedin />
                    </a>
                </div>
                <div className="text-sm md:text-base lg:text-lg text-center">
                    <p>Made with ❤️ by Pratyoosh</p>
                    <p className="text-xs md:text-sm text-gray-500 mb-2">Designed by Meet</p>
                </div>
            </div>
        </div>
    );
}
