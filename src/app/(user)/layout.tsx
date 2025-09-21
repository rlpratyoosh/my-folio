import NavBar from "@/components/NavBar";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="dark">
            <NavBar />
            <div className="mt-20 md:mt-0">{children}</div>
        </div>
    );
}
