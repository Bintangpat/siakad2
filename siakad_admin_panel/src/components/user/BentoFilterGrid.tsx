import React from "react";
import { Search } from "lucide-react";

interface BentoFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  deptFilter: string;
  setDeptFilter: (dept: string) => void;
}

export const BentoFilterGrid: React.FC<BentoFilterProps> = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  deptFilter,
  setDeptFilter,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
      {/* Search & Filters Panel */}
      <div className="md:col-span-8 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col sm:flex-row gap-6 items-center">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            className="w-full pl-12 pr-4 py-2 bg-surface-container border border-outline rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-base transition-all"
            placeholder="Search by name, NIM/NIDN, or email..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
          <select
            className="bg-surface-container border border-outline rounded-lg py-2 px-4 text-sm font-semibold text-on-surface-variant focus:ring-primary focus:border-primary outline-none"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All Roles">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="DOSEN">Dosen (Lecturer)</option>
            <option value="MAHASISWA">Mahasiswa (Student)</option>
            <option value="KEUANGAN">Keuangan (Finance)</option>
          </select>
          <select
            className="bg-surface-container border border-outline rounded-lg py-2 px-4 text-sm font-semibold text-on-surface-variant focus:ring-primary focus:border-primary outline-none"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All Departments">All Departments</option>
            <option value="Informatics Engineering">Informatics</option>
            <option value="Electrical Engineering">Electrical Eng.</option>
            <option value="Mathematics & Science">Mathematics</option>
            <option value="University Secretariat">Secretariat</option>
          </select>
        </div>
      </div>

      {/* Stats Card 1 */}
      <div className="md:col-span-2 bg-primary-container/10 p-6 rounded-xl border border-primary-container/20 flex flex-col justify-between text-left">
        <span className="text-on-primary-fixed-variant text-xs font-semibold uppercase tracking-wider">
          Total Users
        </span>
        <span className="text-primary text-2xl md:text-3xl font-bold mt-2">
          1,284
        </span>
      </div>

      {/* Stats Card 2 */}
      <div className="md:col-span-2 bg-tertiary-fixed p-6 rounded-xl border border-outline-variant flex flex-col justify-between text-left">
        <span className="text-on-tertiary-fixed-variant text-xs font-semibold uppercase tracking-wider">
          Active Today
        </span>
        <span className="text-tertiary text-2xl md:text-3xl font-bold mt-2">
          492
        </span>
      </div>
    </div>
  );
};
