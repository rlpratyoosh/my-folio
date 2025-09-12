import GreenPatch from "@/components/GreenPatch";
import { PiTreasureChestFill } from "react-icons/pi";
import SeparatorLine from "@/components/SeparatorLine";
import Image from "next/image";
import { IoLogoInstagram, IoLogoLinkedin, IoMdMail, IoMdOpen } from "react-icons/io";
import { FiGithub } from "react-icons/fi";

export default function Home() {
    const skills = [
        { name: "Problem Solving", level: "Beginner" },
        { name: "Full Stack Dev", level: "Advanced" },
        { name: "Version Control", level: "Intermediate" },
        { name: "Designing", level: "Beginner" },
    ];

    const projects = [
        {
            title: "Project One",
            description: "A cool project that does amazing things.",
            thumbnailUrl: "/project1.png",
        },
        {
            title: "Project Two",
            description: "Another cool project that does even more amazing things.",
            thumbnailUrl: "/project2.png",
        },
        {
            title: "Project Three",
            description: "Another cool project that does even more amazing things.",
            thumbnailUrl: "/project2.png",
        },
        {
            title: "Project Four",
            description: "Another cool project that does even more amazing things.",
            thumbnailUrl: "/project2.png",
        },
    ];

    return (
        <div className="flex flex-col gap-10 min-w-screen relative">
            {/* Background green patches */}
            <GreenPatch top="-10%" left="-20%" opacity="20" width="200px" height="200px" />
            <GreenPatch top="40%" right="-20%" opacity="20" width="200px" height="200px" />
            <GreenPatch top="80%" left="-30%" opacity="20" width="200px" height="200px" />
            <GreenPatch top="-20%" right="-20%" opacity="20" width="200px" height="200px" />
            <GreenPatch top="90%" right="-40%" opacity="20" width="200px" height="200px" />

            {/* Top Section */}
            <div className="flex flex-col p-8 mt-15">
                {/* Top Main Text */}
                <div className="flex flex-col">
                    {/* Big Hello with green dot */}
                    <span className="relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-green-500 after:rounded-full after:bottom-3 after:ml-2 text-7xl">
                        Hello
                    </span>
                    {/* Name introduction */}
                    <span className="text-5xl font-grotesk">My self, Pratyoosh!</span>
                    {/* Title with separator */}
                    <div className="flex gap-2 items-center mt-5">
                        <div className="w-1/4 bg-white rounded-full h-0.5 "></div>
                        <div className="rounded-full w-1 h-1.5 bg-white"></div>
                        <span className="text-green-500 text-xl font-bold">Full Stack</span>
                        <span className="text-xl">Developer</span>
                    </div>
                    {/* Quote */}
                    <p className="mt-3 text-sm text-gray-500">"When there is no bug there is no code..."</p>
                </div>
                {/* CTA Buttons */}
                <div className="flex items-center justify-start gap-5 mt-10">
                    {/* Chat button with speech bubble triangle */}
                    <button className="relative bg-white text-black font-semibold px-4 py-2 rounded-full shadow-lg text-sm">
                        Let's Chat
                        <span
                            className="absolute -bottom-2 left-6 w-0 h-0 
       border-l-8 border-r-8 border-t-8 border-transparent 
       border-t-white "
                        ></span>
                    </button>
                    {/* Lootbox button with icon */}
                    <button className="flex items-center gap-3 text-sm border-1 border-green-300 rounded-full px-5 py-2">
                        Open LootBox <PiTreasureChestFill className="text-lg" />
                    </button>
                </div>
                {/* Profile image with effects */}
                <div className="relative w-full flex justify-end mt-10">
                    <Image src={"/av.png"} alt="Description" width={500} height={500} />
                    {/* Green glow effect */}
                    <div className="absolute top-0 left-6 rounded-full h-50 w-50 bg-green-500 opacity-30 blur-3xl z-[-1]"></div>
                    {/* Shadow under image */}
                    <div className="absolute bottom-12 w-full bg-black blur-2xl h-20"></div>
                </div>
            </div>
            {/* Separator Line */}
            <div className="flex items-center justify-center w-full">
                <SeparatorLine />
            </div>
            {/* About Me Section */}
            {/* Green line accent */}
            <div className="h-0.5 w-1/2 bg-green-500 mt-10"></div>
            <div className="flex flex-col gap-4 items-start justify-center p-5 pr-9">
                {/* Section title */}
                <span className="text-4xl font-bold">About Me</span>
                {/* Bio paragraph */}
                <p className="text-lg">
                    Hey, I'm Pratyoosh, a CS student who breaks Linux for fun, fights with DSA, and builds SaaS projects
                    that (mostly) work. Currently diving into TypeScript, React, Next.js, Prisma, and AI/ML while
                    surviving hostel food.
                </p>
                {/* Contact information */}
                <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="w-0.5 h-10 bg-green-500"></div>
                    <IoMdMail className="text-lg mt-0.5" />
                    <div className="text-xs text-gray-500">pratyoosh.prakash.dev@gmail.com</div>
                </div>
                {/* Timeline Section */}
                <div className="flex flex-col items-center justify-center w-full mt-10">
                    <div className="flex items-center justify-center relative w-full h-70">
                        {/* Left timeline item - 2025 */}
                        <div className="flex flex-col items-center h-full justify-end border-r-2 border-green-400 mt-8 w-1/2">
                            <div className="flex items-center justify-end gap-2 w-full">
                                <span className="border-2 border-green-400 rounded-full px-4 py-1">2025</span>
                                <div className="h-0.5 w-1/4 bg-green-400"></div>
                            </div>
                            <span className="py-3 px-1">
                                Dove into Full-Stack Dev: TypeScript, React, Next.js & Prisma
                            </span>
                        </div>
                        {/* Right timeline item - 2024 */}
                        <div className="flex flex-col items-center justify-start gap-2 w-1/2 h-full">
                            <div className="flex items-center justify-start gap-2 w-full">
                                <div className="h-0.5 w-1/4 bg-green-400"></div>
                                <span className="border-2 border-green-400 rounded-full px-4 py-1">2024</span>
                            </div>
                            <span className="py-3 px-1 ml-3">Learnt C/C++ and had love-hate battles with DSA</span>
                        </div>
                    </div>
                    {/* Future timeline item - 2026 */}
                    <span className="border-2 border-gray-800 rounded-full px-4 py-1 w-23/100 mt-4 text-gray-400">
                        2026
                    </span>
                </div>
            </div>
            <SeparatorLine />
            {/* Skills */}
            <div className="flex flex-col items-start justify-center">
                <span className="text-4xl font-bold ml-6">My Skills</span>
                <div className="h-0.5 w-1/2 bg-green-500 mt-1"></div>
                <div className="flex items-center justify-center w-full mt-10">
                    <div className="grid grid-cols-2 gap-8 items-center justify-center">
                        {skills.map(skill => {
                            const percentage =
                                skill.level === "Advanced"
                                    ? 90
                                    : skill.level === "Intermediate"
                                    ? 60
                                    : skill.level === "Beginner"
                                    ? 30
                                    : 15;
                            const circumference = 2 * Math.PI * 45;
                            const offset = circumference - (percentage / 100) * circumference;

                            return (
                                <div key={skill.name} className="flex flex-col items-center justify-center">
                                    {/* Circular progress */}
                                    <div className="relative w-24 h-24 flex items-center justify-center">
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
                                        {/* Percentage text */}
                                        <span className="absolute text-lg font-bold">{percentage}%</span>
                                    </div>
                                    {/* Skill name */}
                                    <span className="mt-4 text-base">{skill.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <SeparatorLine />
            {/* Projects */}
            <div className="flex flex-col items-start justify-center">
                <span className="text-4xl font-bold ml-6">Projects</span>
                <div className="h-0.5 w-1/2 bg-green-500 mt-1"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-10">
                    {projects.map(project => (
                        <div
                            className="flex flex-col items-start justify-center border border-green-950/20 rounded-xl bg-green-950/20 backdrop-blur-md shadow-xl transition-all duration-300"
                            key={project.title}
                        >
                            <div className="relative w-full overflow-hidden rounded-t-xl">
                                <Image
                                    src={project.thumbnailUrl}
                                    alt={""}
                                    width={400}
                                    height={200}
                                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                            </div>
                            <div className="flex flex-col items-start justify-center gap-2 px-5 pt-3">
                                <span className="text-xl">{project.title}</span>
                                <p className="text-xs text-white/80">{project.description}</p>
                            </div>
                            <div className="flex items-start justify-center gap-3 py-5 px-4">
                                <div className="bg-white text-black rounded-xl py-1 px-3 text-base flex items-center justify-center gap-2">
                                    <FiGithub /> Repo
                                </div>
                                <div className="border-2 border-green-400  text-white rounded-xl py-1 px-3 text-base flex items-center justify-center gap-3">
                                    <IoMdOpen /> Live
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center w-full mt-10">
                    <div className="bg-white text-black font-semibold rounded-xl py-2 px-4">View More</div>
                </div>
            </div>

            <SeparatorLine />
            {/* Contact */}
            <div className="flex flex-col items-start justify-center">
                <span className="text-4xl font-bold ml-6">Let's Connect</span>
                <div className="h-0.5 w-75/100 bg-green-500 mt-1"></div>
                <form className="flex flex-col gap-4 mt-10 px-10 w-full items-center justify-center">
                    <label htmlFor="name" className="flex flex-col gap-2 text-lg">
                        Name
                        <input
                            type="text"
                            id="name"
                            placeholder="Eg. John Doe"
                            className="focus:outline-0 outline-0 border border-green-400 rounded-xl py-2 px-4"
                        />
                    </label>
                    <label htmlFor="email" className="flex flex-col gap-2 text-lg">
                        Email
                        <input
                            type="email"
                            id="email"
                            placeholder="Eg. john@example.com"
                            className="focus:outline-0 outline-0 border border-green-400 rounded-xl py-2 px-4"
                        />
                    </label>
                    <label htmlFor="message" className="flex flex-col gap-2 text-lg">
                        Message
                        <textarea
                            id="message"
                            placeholder="Your message here..."
                            className="focus:outline-0 outline-0 border border-green-400 rounded-xl py-2 px-4"
                        ></textarea>
                    </label>
                    <button type="submit" className="bg-white text-black px-5 py-2 mt-4 rounded-xl">
                        Send
                    </button>
                </form>
            </div>
            <SeparatorLine />
            {/* Footer */}
            <div className="flex flex-col items-center justify-center w-full gap-4 py-6">
              <div className="flex items-center justify-center gap-6">
                <a href="https://github.com/rlpratyoosh" className="text-2xl hover:text-green-400 transition-colors">
                  <FiGithub />
                </a>
                <a href="https://instagram.com/rlpratyoosh" className="text-2xl hover:text-green-400 transition-colors">
                  <IoLogoInstagram />
                </a>
                <a href="https://linkedin.com/in/rlpratyoosh" className="text-2xl hover:text-green-400 transition-colors">
                  <IoLogoLinkedin />
                </a>
              </div>
              <div className="text-sm text-center">
                <p>Made with ❤️ by Pratyoosh</p>
                <p className="text-xs text-gray-500 mb-2">Designed by Meet</p>
              </div>
            </div>
        </div>
    );
}
