import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardHeader } from "@/components/user/DashboardHeader";
import { BentoFilterGrid } from "@/components/user/BentoFilterGrid";
import { UserTable, type UserItem } from "@/components/user/UserTable";
import { ManagementInsights } from "@/components/user/ManagementInsights";
import { Footer } from "@/components/user/Footer";

const INITIAL_USERS: UserItem[] = [
  {
    id: "1",
    name: "Prof. John Doe",
    email: "john.doe@siakad.ac.id",
    idNumber: "198801022015041001",
    role: "LECTURER",
    department: "Informatics Engineering",
    initials: "JD",
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice.smith@student.siakad.ac.id",
    idNumber: "2109106024",
    role: "STUDENT",
    department: "Mathematics & Science",
    initials: "AS",
  },
  {
    id: "3",
    name: "Robert Miller",
    email: "robert.miller@admin.siakad.ac.id",
    idNumber: "ADM-4012",
    role: "ADMIN",
    department: "University Secretariat",
    initials: "RM",
  },
  {
    id: "4",
    name: "Katherine Wang",
    email: "k.wang@siakad.ac.id",
    idNumber: "197708052003122002",
    role: "LECTURER",
    department: "Electrical Engineering",
    initials: "KW",
  },
  {
    id: "5",
    name: "Brian Kim",
    email: "brian.kim@student.siakad.ac.id",
    idNumber: "2209103011",
    role: "STUDENT",
    department: "Informatics Engineering",
    initials: "BK",
  },
];

export const UserManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [deptFilter, setDeptFilter] = useState("All Departments");

  // Reaktif Client-Side Filter Logic
  const filteredUsers = INITIAL_USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.idNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    const matchesDept =
      deptFilter === "All Departments" || user.department === deptFilter;

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
      {/* Top Application Bar */}
      <Header />

      {/* Main Core Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex-grow w-full">
        <DashboardHeader />

        <BentoFilterGrid
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
        />

        <UserTable users={filteredUsers} />

        <ManagementInsights />
      </main>

      {/* Global Page Footer */}
      <Footer />
    </div>
  );
};

export default UserManagementPage;
