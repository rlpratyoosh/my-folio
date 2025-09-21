import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSmoothScroll = () => {
    const router = useRouter();

    useEffect(() => {
        const handleSmoothScroll = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.tagName === "A") {
                const link = target as HTMLAnchorElement;
                const href = link.getAttribute("href");

                if (href && (href.startsWith("#") || href.includes("/#"))) {
                    e.preventDefault();

                    const hash = href.includes("#") ? `#${href.split("#")[1]}` : "";

                    if (hash) {
                        const element = document.querySelector(hash);
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });

                            history.pushState(null, "", href);
                        }
                    }
                }
            }
        };

        const handleInitialHash = () => {
            if (window.location.hash) {
                const element = document.querySelector(window.location.hash);

                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }, 100);
                }
            }
        };

        document.addEventListener("click", handleSmoothScroll);

        handleInitialHash();

        return () => {
            document.removeEventListener("click", handleSmoothScroll);
        };
    }, [router]);
};
