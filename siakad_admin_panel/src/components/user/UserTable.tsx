import React from "react";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  idNumber: string;
  role: "LECTURER" | "STUDENT" | "ADMIN";
  department: string;
  initials: string;
}

interface UserTableProps {
  users: UserItem[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-xs">
      <div className="overflow-x-auto [scrollbar-width:thin] [scrollbar-color:#cdc3d4_transparent]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant">
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                User Info
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                NIM / NIDN
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-tertiary-container/10 transition-all duration-300 transform opacity-0 translate-y-[10px] animate-[slideUp_0.4s_ease_forward]"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: "forwards",
                }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.role === "LECTURER"
                          ? "bg-primary/10 text-primary"
                          : user.role === "STUDENT"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-error-container/20 text-error"
                      }`}
                    >
                      {user.initials}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-on-surface">
                        {user.name}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface">
                  {user.idNumber}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-[11px] font-semibold ${
                      user.role === "LECTURER"
                        ? "bg-primary/10 text-on-primary-fixed-variant"
                        : user.role === "STUDENT"
                          ? "bg-secondary-container text-on-secondary-container"
                          : "bg-primary text-on-primary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">
                  {user.department}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="text-on-surface-variant hover:text-primary p-1 transition-colors cursor-pointer">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-on-surface-variant hover:text-error p-1 transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-on-surface-variant"
                >
                  No users found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-surface-container-low px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant">
        <p className="text-sm text-on-surface-variant">
          Showing 1 to {users.length} of 1,284 entries
        </p>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-outline-variant transition-colors rounded cursor-pointer">
            <ChevronLeft className="w-4 h-4 text-on-surface-variant" />
          </button>
          <button className="w-8 h-8 rounded bg-primary text-on-primary text-sm font-semibold">
            1
          </button>
          <button className="w-8 h-8 rounded hover:bg-outline-variant transition-colors text-sm font-semibold cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 rounded hover:bg-outline-variant transition-colors text-sm font-semibold cursor-pointer">
            3
          </button>
          <span className="px-1 text-on-surface-variant">...</span>
          <button className="w-8 h-8 rounded hover:bg-outline-variant transition-colors text-sm font-semibold cursor-pointer">
            257
          </button>
          <button className="p-1 hover:bg-outline-variant transition-colors rounded cursor-pointer">
            <ChevronRight className="w-4 h-4 text-on-surface-variant" />
          </button>
        </div>
      </div>
    </div>
  );
};
