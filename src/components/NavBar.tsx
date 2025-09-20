"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBlog, FaEnvelope, FaGitAlt, FaInfoCircle, FaLayerGroup, FaSun } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

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
            name: "Blog",
            link: "/blogs",
            icon: <FaBlog className="text-lg" />,
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
            name: "Blogs",
            icon: <FaBlog />,
            link: "/blogs",
        },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <div
                className={`fixed top-0 left-0 w-full hidden md:flex items-center justify-center z-50 transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? "bg-black/30 backdrop-blur-md shadow-lg py-4 px-6 "
                        : "py-6 px-6"
                }`}
            >
                <div className="w-11/12 lg:w-10/12 flex items-center justify-between">
                    {/* Logo/Brand section */}
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full blur-md opacity-50"></div>
                            <div className="relative bg-black px-4 py-2 rounded-full border border-green-500/40">
                                <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                                    Pratyoosh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center">
                        <div
                            className={`flex items-center gap-1 p-1 ${
                                isScrolled ? "bg-black/40" : "bg-black/20"
                            } backdrop-blur-md rounded-full transition-all duration-300 border border-white/10`}
                        >
                            {pages.map((page, index) => (
                                <Link
                                    key={page.name}
                                    href={page.link}
                                    className={`relative px-5 py-2 text-sm lg:text-base transition-all duration-300 rounded-full hover:bg-green-500/20 group ${
                                        index === 0 ? "bg-green-500/20 text-green-400" : ""
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">{page.icon}</span>
                                        <span className="relative z-10 group-hover:text-green-400 transition-colors">
                                            {page.name}
                                        </span>
                                    </div>
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Theme & Actions */}
                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 group border border-green-500/20">
                            <FaSun className="text-lg text-green-400" />
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                                Toggle theme
                            </span>
                        </button>
                        <Link
                            href="/#contact"
                            className="relative overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-black font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
                        >
                            <span className="relative z-10">Get in Touch</span>
                            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`fixed left-1/2 transform -translate-x-1/2 flex md:hidden items-center justify-between text-xl z-50 transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? "top-4 w-90/100 rounded-full backdrop-blur-md bg-black/40 shadow-lg border border-green-500/20 px-6 py-3"
                        : "top-6 w-full px-6 py-3"
                }`}
            >
                <div className="flex items-center gap-6">
                    {mobilePages.map(page => (
                        <Link
                            key={page.name}
                            href={page.link}
                            className="relative p-2 transition-all duration-200 hover:text-green-400 active:scale-95 group"
                        >
                            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                {page.name}
                            </span>
                            {page.icon}
                        </Link>
                    ))}
                </div>
                <div>
                    <button className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 hover:text-green-400 active:scale-95">
                        <FaSun />
                    </button>
                </div>
            </div>
        </>
    );
}
