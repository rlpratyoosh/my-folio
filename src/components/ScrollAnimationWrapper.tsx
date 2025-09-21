"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollAnimationWrapperProps {
    children: ReactNode;
    className?: string;
    animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "stagger";
    delay?: number;
    duration?: number;
    once?: boolean;
    threshold?: number;
}

export default function ScrollAnimationWrapper({
    children,
    className = "",
    animation = "fadeInUp",
    delay = 0,
    duration = 0.5,
    once = true,
    threshold = 0.1,
}: ScrollAnimationWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });

    const animations = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        fadeInUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
        },
        fadeInLeft: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
        },
        fadeInRight: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
        },
        zoomIn: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
        },
        stagger: {
            hidden: { opacity: 0, y: 20 },
            visible: (i = 0) => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.1 + delay,
                    duration,
                },
            }),
        },
    };

    const selectedAnimation = animations[animation];

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={selectedAnimation}
            transition={{ duration, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
