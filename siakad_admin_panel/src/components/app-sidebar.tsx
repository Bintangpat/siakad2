"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  BanknoteIcon,
  UsersIcon,
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: (
        <LayoutDashboardIcon />
      ),
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/",
        },
      ],
    },
    {
      title: "Academics",
      url: "#",
      icon: (
        <BookOpenIcon />
      ),
      items: [
        {
          title: "Class Schedule",
          url: "/schedule",
        },
        {
          title: "KRS Monitoring",
          url: "/krs",
        },
        {
          title: "KRS Setup",
          url: "/krs/krs-setup",
        },
        {
          title: "Attendance",
          url: "/attendance",
        }
      ],
    },
    {
      title: "Financial",
      url: "#",
      icon: (
        <BanknoteIcon />
      ),
      items: [
        {
          title: "Overview",
          url: "/financial",
        }
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: (
        <UsersIcon />
      ),
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "Add User",
          url: "/users/add",
        }
      ],
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
