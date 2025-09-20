"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";
import { FaBlog } from "react-icons/fa";
import { LuMessageSquareCode } from "react-icons/lu";

export default function AdminSidebar() {
    const items = [
        { title: "Dashboard", url: "/myzone", icon: TbLayoutDashboardFilled },
        { title: "Projects", url: "/myzone/projects", icon: GoProjectSymlink },
        { title: "Blogs", url: "/myzone/blogs", icon: FaBlog },
        { title: "Contacts", url: "/myzone/contacts", icon: LuMessageSquareCode },
    ];

    return (
            <Sidebar variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map(item => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
    );
}
