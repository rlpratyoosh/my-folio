"use client";

import Link from "next/link";
import { TbHomeFilled } from "react-icons/tb";
import { FaGitAlt } from "react-icons/fa";
import { FaBlog, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

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
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "About",
      link: "/#about",
    },
    {
      name: "Tech Stack",
      link: "/#tech",
    },
    {
      name: "Blog",
      link: "/blogs",
    },
    {
      name: "Contact",
      link: "/#contact",
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
      <div className="fixed top-0 left-0 w-full h-fit hidden md:flex items-center justify-center gap-4 z-50">
        {pages.map((page) => (
          <Link key={page.name} href={page.link}>
            {page.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 flex md:hidden items-center justify-around text-2xl z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "top-4 w-90/100 mx-4 rounded-full backdrop-blur-md bg-white/10 shadow-lg px-4 py-4 justify-around gap-8"
            : "h-20 gap-10 w-full"
        }`}
      >
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            isScrolled ? "gap-6" : "gap-10"
          }`}
        >
          {mobilePages.map((page) => (
            <Link 
              key={page.name} 
              href={page.link}
              className="transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {page.icon}
            </Link>
          ))}
        </div>
        <button className="transition-all duration-200 hover:scale-110 active:scale-95">
          <FaSun />
        </button>
      </div>
    </>
  );
}