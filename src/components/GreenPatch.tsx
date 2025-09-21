import { motion } from "framer-motion";

interface GreenPatchProps {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    opacity?: string;
    width?: string;
    height?: string;
    blur?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    color?: string;
    animationType?: "pulse" | "shift" | "breathe" | "rotate" | "float" | "none";
    animationDuration?: number;
}

export default function GreenPatch({
    top,
    left,
    right,
    bottom,
    opacity = "30",
    width = "200px",
    height = "200px",
    blur = "3xl",
    color = "green-500",
    animationType = "float",
    animationDuration = 30,
}: GreenPatchProps) {
    const blurClass =
        blur === "sm"
            ? "blur-sm"
            : blur === "md"
            ? "blur-md"
            : blur === "lg"
            ? "blur-lg"
            : blur === "xl"
            ? "blur-xl"
            : blur === "2xl"
            ? "blur-2xl"
            : "blur-3xl";

    const classNames = `fixed rounded-full ${blurClass}`;

    const animationVariants = getAnimationVariants(animationType);

    const randomOffset = Math.random();

    return (
        <motion.div
            className={classNames}
            style={{
                top,
                left,
                right,
                bottom,
                width,
                height,
                backgroundColor: getColorValue(color),
                opacity: opacity ? Number(opacity) / 100 : 0.3,
                zIndex: -1,
            }}
            initial="initial"
            animate="animate"
            variants={animationVariants}
            transition={{
                duration: animationDuration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                delay: randomOffset * 5, // Random delay for more natural movement
            }}
        />
    );
}

function getColorValue(tailwindColor: string): string {
    const colorMap: Record<string, string> = {
        "green-500": "#10b981",
        "emerald-400": "#34d399",
        "teal-400": "#2dd4bf",
        "cyan-500": "#06b6d4",
        "lime-400": "#a3e635",
    };

    return colorMap[tailwindColor] || "#10b981";
}

function getAnimationVariants(type: string) {
    switch (type) {
        case "pulse":
            return {
                initial: { scale: 1, opacity: 0.3 },
                animate: {
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.4, 0.3],
                    x: [0, 20, -10, 15, -15, 0],
                    y: [0, -15, 10, -20, 5, 0],
                },
            };
        case "shift":
            return {
                initial: { x: 0, y: 0 },
                animate: {
                    x: [0, 30, -20, 15, -25, 0],
                    y: [0, -20, 15, -25, 10, 0],
                },
            };
        case "breathe":
            return {
                initial: { opacity: 0.2 },
                animate: {
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -25, 15, -15, 20, 0],
                    y: [0, 15, -25, 20, -10, 0],
                },
            };
        case "rotate":
            return {
                initial: { rotate: 0 },
                animate: {
                    rotate: 360,
                    x: [0, 20, -15, 10, -20, 0],
                    y: [0, -10, 20, -15, 5, 0],
                },
            };
        case "float":
            return {
                initial: { x: 0, y: 0 },
                animate: {
                    x: [0, 40, -30, 25, -35, 0],
                    y: [0, -35, 25, -40, 20, 0],
                    scale: [1, 1.03, 0.98, 1.02, 0.99, 1],
                },
            };
        case "none":
            return {
                initial: {},
                animate: {},
            };
        default:
            return {
                initial: { scale: 1 },
                animate: {
                    scale: [1, 1.05, 0.98, 1.02, 1],
                    x: [0, 25, -15, 20, -10, 0],
                    y: [0, -20, 10, -15, 5, 0],
                },
            };
    }
}
