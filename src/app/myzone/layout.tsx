import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MyZoneLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SidebarProvider>
                <AdminSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </div>
    );
}
