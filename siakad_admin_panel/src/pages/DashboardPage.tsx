import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShellPage from "./ShellPage";

/**
 * Komponen DevProgress - User Management
 * Konversi dari HTML ke TSX untuk lingkungan Vite/Next.js.
 * Menggunakan nilai arbitrary Tailwind untuk konsistensi desain tanpa file config eksternal[cite: 2, 4].
 */

const UserManagement = () => {
  // Variansi Animasi Framer Motion [cite: 7, 8, 9]
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <ShellPage>
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans selection:bg-[#2170e4]/20">
      {/* Injeksi font dan ikon material [cite: 10, 11] */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `,
        }}
      />

      {/* Sidebar Navigation [cite: 12] */}
      <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#eff4ff] dark:bg-[#213145] border-r border-[#c5c6cd] dark:border-[#75777d] flex flex-col py-6 px-4 gap-2 z-50 transition-all duration-150">
        <div className="flex items-center gap-4 px-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center">
            <span className="material-symbols-outlined text-white">
              terminal
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#091426] dark:text-[#d8e3fb]">
              DevProgress
            </h2>
            <p className="text-xs text-[#45474c] opacity-70">
              Technical Execution
            </p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          <NavLink icon="group" label="User Management" active />
          <NavLink icon="dashboard" label="Global Overview" />
          <NavLink icon="view_kanban" label="Kanban Board" />
          <NavLink icon="flag" label="Stakeholder View" />
        </nav>

        <div className="mt-auto pt-6 border-t border-[#c5c6cd] flex flex-col gap-1">
          <button className="bg-[#0058be] text-white py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 mb-4 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Create Project</span>
          </button>
          <NavLink icon="settings" label="Settings" />
          <NavLink icon="logout" label="Logout" isError />
        </div>
      </aside>

      {/* Main Content Area [cite: 13] */}
      <main className="ml-[280px] min-h-screen flex flex-col">
        {/* TopAppBar [cite: 13] */}
        <header className="bg-[#f8f9ff] dark:bg-[#1e293b] border-b border-[#c5c6cd] flex justify-between items-center w-full px-6 h-16 sticky top-0 z-40 transition-colors duration-200">
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#75777d]">
                <span className="material-symbols-outlined">search</span>
              </span>
              <input
                className="bg-[#e5eeff] border-none rounded-lg py-2 pl-10 pr-4 w-64 text-sm focus:ring-2 focus:ring-[#0058be] outline-none"
                placeholder="Search resources..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HeaderIcon icon="notifications" />
            <HeaderIcon icon="help_outline" />
            <div className="h-8 w-px bg-[#c5c6cd] mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#091426]">
                  Admin Account
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#75777d]">
                  System Lead
                </p>
              </div>
              <img
                alt="Profile"
                className="w-10 h-10 rounded-full border border-[#c5c6cd] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr477J8Zn5wE2zDSNSGxR1vwD93DlD1VLMgUUEUgkFY9G4-Hdd5k6zAUjU7AB3nC181yQOGPC1eiboRdDs3dG3u25LL_kNU4Sw1GnL5WF3GInJHZvCHKFH1tDwtuie3Eh1J306DoiDWQaNdQI5KDO9X4Ywv8kXsZu4JbTpWJY0cy8l2vfbh3yFj6aFdO9-YSZJ0jBwJafFoLMw0UMVCmPwJwP5zpXYRfRNfc8JL5UTW6NC63Ib2zp6e1caZdTsojjQN1thCUx2WaUB"
              />
            </div>
          </div>
        </header>

        {/* Canvas Area [cite: 13] */}
        <div className="p-6 max-w-7xl mx-auto w-full">
          {/* Page Header [cite: 13] */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#091426]">
                User Management
              </h1>
              <p className="text-[#45474c] mt-1">
                Provision and manage access controls for the DevProgress
                environment.
              </p>
            </div>
            <button className="bg-[#0058be] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-[#0058be]/10 hover:-translate-y-px transition-all">
              <span className="material-symbols-outlined">person_add</span>
              <span>Add User</span>
            </button>
          </div>

          {/* Stats Overview [cite: 16] */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <StatCard label="Total Users" value="1,284" trend="+12%" />
            <StatCard label="Active Now" value="342" isActive />
            <StatCard label="Admins" value="12" icon="shield" />
            <StatCard label="Pending Invites" value="08" icon="mail" />
          </motion.div>

          {/* Table Section [cite: 16] */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden shadow-sm"
          >
            <div className="px-6 py-4 border-b border-[#c5c6cd] flex items-center justify-between bg-[#eff4ff]/30">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-[#45474c] hover:text-[#091426] font-medium">
                  <span className="material-symbols-outlined text-[20px]">
                    filter_list
                  </span>{" "}
                  Filter
                </button>
                <button className="flex items-center gap-1 text-sm text-[#45474c] hover:text-[#091426] font-medium">
                  <span className="material-symbols-outlined text-[20px]">
                    sort
                  </span>{" "}
                  Sort
                </button>
              </div>
              <div className="text-xs text-[#75777d]">
                Displaying 1-10 of 1,284 users
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#eff4ff]/50">
                  <tr>
                    <Th label="Name" />
                    <Th label="Email" />
                    <Th label="Role" />
                    <Th label="Status" />
                    <Th label="Actions" align="right" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c6cd]">
                  <UserRow
                    name="Julian Sterling"
                    email="j.sterling@devprogress.io"
                    role="Admin"
                    status="Active"
                    initials="JS"
                  />
                  <UserRow
                    name="Elena Rodriguez"
                    email="e.rodriguez@devprogress.io"
                    role="Developer"
                    status="Active"
                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBppXUN8eIgUGTZlzrE33DdYmwoNv8uo2Vwt6Dfm6MSFHKoWRaUPXwI8qkK6LshXUYIjbhGDWXfs__oDRl9JaWiT3UFjRCq2qYotBmtE9-87uqsQxFy1TUfYRJvNBTr390FuhbVPf3DVhG3-21Z1nWvwyyXkKy1loU2SlL4xf4KoPTjCOnruXKSs06HUXpAJBrtDXXJPwmSdjez0-9BxeS-ZcQzXj_dyB5XcQsSb9Uf7T4RxdJA8qyuldlSN65iLqsFuR-E1R35-Nui"
                  />
                  <UserRow
                    name="Marcus Bennet"
                    email="m.bennet@external.com"
                    role="Stakeholder"
                    status="Inactive"
                    initials="MB"
                    isTertiary
                  />
                  <UserRow
                    name="Sarah Higgins"
                    email="s.higgins@devprogress.io"
                    role="Developer"
                    status="Active"
                    initials="SH"
                  />
                </tbody>
              </table>
            </div>

            {/* Pagination [cite: 29] */}
            <div className="px-6 py-4 bg-[#eff4ff]/30 border-t border-[#c5c6cd] flex items-center justify-between">
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#c5c6cd] text-sm text-[#45474c] hover:bg-white transition-all disabled:opacity-30">
                <span className="material-symbols-outlined">chevron_left</span>{" "}
                Previous
              </button>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded bg-[#0058be] text-white font-bold text-xs">
                  1
                </button>
                <button className="w-8 h-8 rounded hover:bg-[#d3e4fe] text-xs transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded hover:bg-[#d3e4fe] text-xs transition-colors">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-[#75777d]">
                  ...
                </span>
                <button className="w-8 h-8 rounded hover:bg-[#d3e4fe] text-xs transition-colors">
                  128
                </button>
              </div>
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#c5c6cd] text-sm text-[#45474c] hover:bg-white transition-all">
                Next{" "}
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </motion.div>

          {/* Bento Grid: Security [cite: 16, 25] */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="md:col-span-2 bg-[#1e293b] text-white p-8 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[240px]"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">
                  Access Control Audit
                </h3>
                <p className="max-w-md opacity-80 mb-6 text-sm">
                  Review detailed logs of all permission changes and user
                  creations within the last 24 hours. Ensuring compliance with
                  ISO 27001 standards.
                </p>
                <button className="bg-[#0058be] text-white px-6 py-2 rounded-lg font-bold inline-flex items-center gap-2 hover:brightness-110 transition-all">
                  View Audit Logs{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#0058be]/20 to-transparent flex items-center justify-center pointer-events-none">
                <span
                  className="material-symbols-outlined text-[160px] opacity-10"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  security
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-[#d3e4fe] p-8 rounded-xl flex flex-col items-center justify-center text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-[#adc6ff] flex items-center justify-center mb-4">
                <span
                  className="material-symbols-outlined text-[#001a42] text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mail
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#091426] mb-1">
                Invite Team
              </h3>
              <p className="text-sm text-[#45474c] mb-6">
                Send bulk invitations to your engineering organization.
              </p>
              <button className="w-full py-2 rounded-lg border border-[#0058be] text-[#0058be] font-bold hover:bg-[#0058be] hover:text-white transition-all">
                Send Invites
              </button>
            </motion.div>
          </div>
        </div>

        <footer className="mt-auto px-6 py-8 text-center border-t border-[#c5c6cd]">
          <p className="text-xs text-[#75777d]">
            © 2024 DevProgress Infrastructure. All rights reserved. Precision
            Technical Execution Platform.
          </p>
        </footer>
      </main>
    </div>
  );
};

// --- Sub-components Helper ---

const NavLink = ({ icon, label, active = false, isError = false }: any) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium text-sm ${active ? "bg-[#2170e4] text-white" : "text-[#45474c] hover:bg-[#d3e4fe]"} ${isError ? "text-red-600" : ""}`}
  >
    <span className="material-symbols-outlined text-[22px]">{icon}</span>
    <span>{label}</span>
  </a>
);

const HeaderIcon = ({ icon }: any) => (
  <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#45474c] hover:bg-[#e5eeff] transition-colors">
    <span className="material-symbols-outlined">{icon}</span>
  </button>
);

const StatCard = ({ label, value, trend, isActive, icon }: any) => (
  <div className="bg-white p-4 border border-[#c5c6cd] rounded-xl shadow-sm">
    <p className="text-[10px] text-[#75777d] font-bold uppercase tracking-widest">
      {label}
    </p>
    <div className="flex items-center justify-between mt-2">
      <span className="text-2xl font-bold text-[#091426]">{value}</span>
      {trend && (
        <span className="text-[#0058be] bg-[#0058be]/10 px-1.5 py-0.5 rounded text-[10px] font-bold">
          {trend}
        </span>
      )}
      {isActive && (
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      )}
      {icon && (
        <span className="material-symbols-outlined text-[#75777d]">{icon}</span>
      )}
    </div>
  </div>
);

const Th = ({ label, align = "left" }: any) => (
  <th
    className={`px-6 py-4 text-[10px] font-bold text-[#75777d] uppercase tracking-widest border-b border-[#c5c6cd] ${align === "right" ? "text-right" : "text-left"}`}
  >
    {label}
  </th>
);

const UserRow = ({
  name,
  email,
  role,
  status,
  initials,
  avatar,
  isTertiary,
}: any) => (
  <tr className="hover:bg-[#eff4ff]/30 transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white ${role === "Admin" ? "bg-[#091426]" : isTertiary ? "bg-[#0d0093]" : "bg-[#0058be]"}`}
          >
            {initials}
          </div>
        )}
        <span className="text-sm font-semibold text-[#091426]">{name}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-xs font-mono text-[#45474c]">{email}</td>
    <td className="px-6 py-4">
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${role === "Admin" ? "bg-[#0058be]/10 text-[#0058be]" : isTertiary ? "bg-[#040057]/10 text-[#040057]" : "bg-[#d3e4fe] text-[#45474c]"}`}
      >
        {role}
      </span>
    </td>
    <td className="px-6 py-4">
      <div
        className={`flex items-center gap-1.5 text-xs font-medium ${status === "Active" ? "text-emerald-600" : "text-[#75777d]"}`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-emerald-500" : "bg-[#75777d]"}`}
        ></div>{" "}
        {status}
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 text-[#45474c] hover:text-[#0058be] hover:bg-[#0058be]/5 rounded-md transition-all">
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button className="p-1.5 text-[#45474c] hover:text-red-600 hover:bg-red-50 rounded-md transition-all">
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </td>
  </tr>
  </ShellPage>
);

export default UserManagement;
