import React from "react";
import { Camera, ChevronDown } from "lucide-react";

interface PhotoAndRolePanelProps {
  role: string;
  setRole: (role: string) => void;
}

export const PhotoAndRolePanel: React.FC<PhotoAndRolePanelProps> = ({
  role,
  setRole,
}) => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      {/* Profile Photo Upload Box */}
      <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl flex flex-col items-center text-center shadow-xs">
        <h3 className="text-sm font-semibold text-on-surface mb-6">
          Profile Photo
        </h3>
        <div className="relative group">
          <div className="w-40 h-40 rounded-full bg-surface-container-high border-2 border-dashed border-outline flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-all relative">
            <Camera className="w-10 h-10 text-outline group-hover:text-primary transition-colors" />

            {/* Placeholder image for preview */}
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity"
              alt="Profile silhouette placeholder"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoIwBdq-yZzkeS-WFTILqSYCyk8TfljpCixyPdyiRmjE2wZs6iNB2LI4GF_-AgvNbvEojhE6Bkcb4qpKHVP6CzoeqVmxeHGHivaoX64b0Uwde7jJuvJfCGmluRSFBqVWkeFmpSQIEhfYJAa3Jhr8CYaNUwW7FUQuiChGnXPoahYeawu0J4njEN2nG0NrLCjag3pdp1Ly4fR8Bb1wOn-hO5bYlX0-yLUo9Huz1p8apXspmfNW4e4bB3YDLFRiKQrgAG82P1MQQzz-A"
            />
          </div>
          <div className="mt-4">
            <p className="text-xs text-on-surface-variant max-w-[240px]">
              Recommended: Square JPG/PNG, min. 500x500px
            </p>
          </div>
        </div>
      </div>

      {/* User Access Level Dropdown */}
      <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl shadow-xs text-left">
        <h3 className="text-sm font-semibold text-on-surface mb-6">
          User Access Level
        </h3>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-on-surface-variant">
            System Role
          </label>
          <div className="relative">
            <select
              className="w-full h-11 px-4 bg-surface border border-outline-variant rounded-lg text-base appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="MAHASISWA">Mahasiswa (Student)</option>
              <option value="DOSEN">Dosen (Lecturer)</option>
              <option value="ADMIN">Admin</option>
              <option value="KEUANGAN">Keuangan (Finance)</option>
            </select>
            <ChevronDown className="w-5 h-5 absolute right-3 top-3 pointer-events-none text-on-surface-variant" />
          </div>
        </div>
      </div>
    </div>
  );
};
