import React from "react";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  idNumber: string;
  role: "MAHASISWA" | "DOSEN" | "ADMIN" | "KEUANGAN";
  department: string;
  initials: string;
}

interface UserTableProps {
  users: UserItem[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow className="bg-background- border-b border-outline-variant hover:bg-background border-b-outline-variant">
            <TableHead className="px-6 py-4 text-xs font-semibold text-foreground uppercase tracking-wider h-auto">
              User Info
            </TableHead>
            <TableHead className="px-6 py-4 text-xs font-semibold text-foreground uppercase tracking-wider h-auto">
              NIM / NIDN
            </TableHead>
            <TableHead className="px-6 py-4 text-xs font-semibold text-foreground uppercase tracking-wider h-auto">
              Role
            </TableHead>
            <TableHead className="px-6 py-4 text-xs font-semibold text-foreground uppercase tracking-wider h-auto">
              Department
            </TableHead>
            <TableHead className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right h-auto">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y bg-background divide-outline-variant">
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className="hover:bg-tertiary text-foreground transition-all duration-300 border-outline-variant"
            >
              <TableCell className="px-6 py-4 text-foreground ">
                <div className="flex text-foreground  items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.role === "DOSEN"
                        ? "bg-primary/10 text-primary"
                        : user.role === "MAHASISWA"
                          ? "bg-secondary/10 text-secondary"
                          : user.role === "KEUANGAN"
                            ? "bg-tertiary/10 text-tertiary"
                            : "bg-error-container/20 text-error"
                    }`}
                  >
                    {user.initials}
                  </div>
                  <div className="text-left text-foreground  ">
                    <p className="text-sm font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-on-surface">
                {user.idNumber}
              </TableCell>
              <TableCell className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-[11px] font-semibold ${
                    user.role === "DOSEN"
                      ? "bg-primary/10 text-on-primary-fixed-variant"
                      : user.role === "MAHASISWA"
                        ? "bg-secondary-container text-on-secondary-container"
                        : user.role === "KEUANGAN"
                          ? "bg-tertiary text-on-tertiary"
                          : "bg-primary text-on-primary"
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-foreground">
                {user.department}
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center bg-background justify-end gap-1">
                  <button className="text-foreground hover:text-primary p-1 transition-colors cursor-pointer">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-foreground hover:text-error p-1 transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="px-6 py-10 text-center text-sm text-on-surface-variant"
              >
                No users found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
