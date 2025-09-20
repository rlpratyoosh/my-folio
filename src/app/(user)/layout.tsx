import NavBar from "@/components/NavBar";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            <div className="mt-20">{children}</div>
        </>
    );
}
