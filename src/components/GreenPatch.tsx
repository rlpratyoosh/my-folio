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
}: GreenPatchProps) {
    const classNames = `fixed rounded-full ${
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
            : "blur-3xl"
    }`;

    return (
        <div
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
