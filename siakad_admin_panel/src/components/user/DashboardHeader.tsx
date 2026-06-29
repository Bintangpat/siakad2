import React from "react";
import { UserPlus } from "lucide-react";

export const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-1">
          User Management
        </h1>
        <p className="text-base text-on-surface-variant">
          Oversee and manage institutional access for students, faculty, and
          administrative personnel.
        </p>
      </div>
      <button className="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-xs cursor-pointer shrink-0">
        <UserPlus className="w-4 h-4" />
        Add New User
      </button>
    </div>
  );
};
