import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardHeader } from "@/components/user/DashboardHeader";
import { BentoFilterGrid } from "@/components/user/BentoFilterGrid";
import { UserTable, type UserItem } from "@/components/user/UserTable";
import { ManagementInsights } from "@/components/user/ManagementInsights";
import { Footer } from "@/components/user/Footer";

interface BackendUser {
  id: number;
  namaLengkap?: string;
  email: string;
  username: string;
  role: "MAHASISWA" | "DOSEN" | "ADMIN" | "KEUANGAN";
  mahasiswa?: unknown;
  dosen?: unknown;
}

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/users");
        if (response.ok) {
          const data = await response.json();

          // JALUR AMAN SENIOR DEV:
          // Periksa apakah 'data' adalah Array langsung, jika bukan (berupa Object),
          // ambil array-nya dari dalam properti 'data.data' (sesuaikan dengan hasil console.log-mu)
          const arrayUser = data.data;

          // Berikan perlindungan (guard clause) jika arrayUser ternyata kosong/tidak ditemukan
          if (!arrayUser) {
            console.error("Format data dari API tidak dikenali:", data);
            return;
          }

          const mappedUsers = arrayUser.map((u: BackendUser) => {
            const initials = u.namaLengkap
              ? u.namaLengkap
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()
              : "??"; // Proteksi jika namaLengkap ternyata kosong atau null

            return {
              id: u.id.toString(),
              name: u.namaLengkap || "No Name",
              email: u.email,
              idNumber: u.username,
              role: u.role,
              department: u.mahasiswa
                ? "MAHASISWA"
                : u.dosen
                  ? "DOSEN"
                  : u.role === "KEUANGAN"
                    ? "KEUANGAN"
                    : "ADMIN",
              initials,
            };
          });

          setUsers(mappedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  // Reaktif Client-Side Filter Logic
  const filteredUsers = users.filter((user) => {
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
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8  bg-background grow w-full">
        <DashboardHeader />

        <BentoFilterGrid
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
        />

        {loading ? (
          <div className="py-12 text-center text-on-surface-variant font-medium">
            Loading users...
          </div>
        ) : (
          <UserTable users={filteredUsers} />
        )}

        <ManagementInsights />
      </main>

      {/* Global Page Footer */}
      <Footer />
    </div>
  );
};

export default UserManagementPage;
