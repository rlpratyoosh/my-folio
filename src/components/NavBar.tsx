"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBlog, FaEnvelope, FaGitAlt, FaInfoCircle, FaLayerGroup, FaSun } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50); //  50px scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pages = [
        {
            name: "Home",
            link: "/",
            icon: <TbHomeFilled className="text-lg" />,
        },
        {
            name: "Projects",
            link: "/projects",
            icon: <FaGitAlt className="text-lg" />,
        },
        {
            name: "About",
            link: "/#about",
            icon: <FaInfoCircle className="text-lg" />,
        },
        {
            name: "Tech Stack",
            link: "/#tech",
            icon: <FaLayerGroup className="text-lg" />,
        },
        {
            name: "Contact",
            link: "/#contact",
            icon: <FaEnvelope className="text-lg" />,
        },
    ];

    const mobilePages = [
        {
            name: "Home",
            icon: <TbHomeFilled />,
            link: "/",
        },
        {
            name: "Projects",
            icon: <FaGitAlt />,
            link: "/projects",
        },
        {
            name: "Tech Stack",
            link: "/#tech",
            icon: <FaLayerGroup className="text-lg" />,
        },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <div
                className={`fixed top-0 left-0 w-full hidden md:flex items-center justify-center z-50 transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? "bg-black/30 backdrop-blur-md shadow-lg py-2 lg:py-4 px-3 lg:px-6"
                        : "py-3 lg:py-6 px-3 lg:px-6"
                }`}
            >
                <div className="w-full lg:w-full flex items-center justify-between">
                    {/* Logo/Brand section */}
                    <div className="flex items-center ml-2 lg:ml-0">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full blur-md opacity-50"></div>
                            <div className="relative bg-black px-2 lg:px-4 py-1 lg:py-2 rounded-full border border-green-500/40">
                                <span className="font-bold text-sm md:text-base lg:text-xl bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                                    <span className="hidden lg:inline">Pratyoosh</span>
                                    <span className="inline lg:hidden">P</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center">
                        <div
                            className={`flex items-center gap-0.5 lg:gap-1 p-0.5 lg:p-1 ${
                                isScrolled ? "bg-black/40" : "bg-black/20"
                            } backdrop-blur-md rounded-full transition-all duration-300 border border-white/10`}
                        >
                            {pages.map(page => {
                                // Check if current path matches the page link
                                const isActive =
                                    (page.link === "/" && pathname === "/") ||
                                    (page.link !== "/" && pathname.startsWith(page.link)) ||
                                    (page.link.startsWith("/#") && pathname === "/" && page.link.includes(pathname));

                                return (
                                    <Link
                                        key={page.name}
                                        href={page.link}
                                        className={`relative px-1.5 lg:px-4 py-1 lg:py-2 text-xs lg:text-base transition-all duration-300 rounded-full hover:bg-green-500/20 group ${
                                            isActive ? "bg-green-500/20 text-green-400" : ""
                                        }`}
                                    >
                                        <div className="flex items-center gap-1 lg:gap-2">
                                            <span
                                                className={`${
                                                    isActive ? "text-green-400" : "text-gray-300"
                                                } text-xs lg:text-lg`}
                                            >
                                                {page.icon}
                                            </span>
                                            <span
                                                className={`hidden lg:inline relative z-10 ${
                                                    isActive ? "text-green-400" : ""
                                                } group-hover:text-green-400 transition-colors`}
                                            >
                                                {page.name}
                                            </span>
                                        </div>
                                        <span
                                            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full ${
                                                isActive ? "opacity-100" : "opacity-0"
                                            } group-hover:opacity-100 transition-all duration-300`}
                                        ></span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Theme & Actions */}
                    <div className="flex items-center gap-2 lg:gap-4 mr-2 lg:mr-0">
                        <button className="relative p-1.5 lg:p-2.5 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 group border border-green-500/20">
                            <FaSun className="text-sm lg:text-lg text-green-400" />
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                                Toggle theme
                            </span>
                        </button>
                        <Link
                            href="https://linkedin.com/in/rlpratyoosh"
                            className="relative overflow-hidden px-2 lg:px-5 py-1 lg:py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-black text-xs lg:text-base font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
                        >
                            <span className="relative z-10">
                                <span className="hidden md:inline">Connect</span>
                            </span>
                            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="fixed top-0 left-0 w-full md:hidden z-50 px-4">
                <div
                    className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
                        isScrolled
                            ? "mt-4 rounded-full backdrop-blur-md bg-black/40 shadow-lg border border-green-500/20 py-3 px-5"
                            : "mt-6 py-3 px-5"
                    }`}
                >
                    {/* Logo for Mobile */}
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="relative px-2 py-1 rounded-full">
                                <span className="font-bold text-base bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                                    P
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center gap-5">
                        {mobilePages.map(page => {
                            // Check if current path matches the page link for mobile
                            const isActive =
                                (page.link === "/" && pathname === "/") ||
                                (page.link !== "/" && pathname.startsWith(page.link));

                            return (
                                <Link
                                    key={page.name}
                                    href={page.link}
                                    className={`relative p-2 transition-all duration-200 ${
                                        isActive ? "text-green-400" : ""
                                    } hover:text-green-400 active:scale-95 group`}
                                >
                                    <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        {page.name}
                                    </span>
                                    {page.icon}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Theme toggle */}
                    <button className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 hover:text-green-400 active:scale-95 text-green-400">
                        <FaSun />
                    </button>
                </div>
            </div>
        </>
    );
}
