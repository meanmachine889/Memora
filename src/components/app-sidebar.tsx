"use client";

import type React from "react";

import { Home, Inbox, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Address from "./address";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/",
    icon: Home,
  },
  {
    title: "My Content",
    url: "/dashboard/content",
    icon: Inbox,
  },
];

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 py-2">
        <div className="flex w-full gap-2 p-1 px-3 bg-[#1f1f1f] shadow-md rounded-sm py-3 justify-start items-center group transition-all duration-300">
          <Loader className="h-6 w-6 font-thin" />
          <h1 className="text-2xl font-thin transition-all duration-500">
            Memora
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button
                      onClick={() => router.push(item.url)}
                      variant={"ghost"}
                      className="w-full justify-start gap-2 text-md my-1 font-normal"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Address />
      </SidebarFooter>
    </Sidebar>
  );
}
