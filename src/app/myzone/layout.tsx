import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MyZoneLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SidebarProvider>
                <AdminSidebar />
                <div className="w-full flex flex-col items-start px-4 mt-4">
                    <div className="w-full bg-card flex gap-2 items-center py-2 px-4 rounded-2xl text-2xl">
                        <SidebarTrigger/>
                        Admin Panel
                    </div>
                    {children}
                </div>
            </SidebarProvider>
        </div>
    );
}
