import React from "react";
import {
  History,
  Save,
  LayoutDashboard,
  UserCheck,
  CalendarDays,
  User,
} from "lucide-react";

interface BottomActionBarProps {
  onSave: () => void;
  isSaving: boolean;
  saveStatus: "idle" | "saving" | "success";
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onSave,
  isSaving,
  saveStatus,
}) => {
  return (
    <>
      {/* Bottom Action Bar (Desktop & Mobile Responsive) */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant z-40 mb-16 md:mb-0">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-on-surface-variant">
            <History className="w-4 h-4" />
            <span className="text-label-sm font-label-sm">
              Terakhir diubah: 12 Jul 2024 oleh Admin_IT
            </span>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 text-label-lg font-label-lg border border-primary text-primary rounded-lg hover:bg-tertiary-fixed transition-all duration-150 active:scale-95 cursor-pointer">
              Batal
            </button>
            <button
              onClick={onSave}
              disabled={isSaving}
              className={`flex-1 md:flex-none px-8 py-2.5 text-label-lg font-label-lg rounded-lg text-on-primary transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                saveStatus === "success"
                  ? "bg-green-600"
                  : "bg-primary hover:opacity-90 shadow-lg shadow-primary/20"
              }`}
            >
              <Save className={`w-5 h-5 ${isSaving ? "animate-spin" : ""}`} />
              {saveStatus === "idle" && "Simpan Konfigurasi"}
              {saveStatus === "saving" && "Menyimpan..."}
              {saveStatus === "success" && "Berhasil"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Shell (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-surface-container-lowest border-t border-outline-variant px-2 pb-safe z-50">
        <div className="flex flex-col items-center justify-center text-on-secondary-container cursor-pointer">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-label-sm">Dashboard</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 cursor-pointer">
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] font-label-sm">KRS</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-secondary-container cursor-pointer">
          <CalendarDays className="w-6 h-6" />
          <span className="text-[10px] font-label-sm">Schedules</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-secondary-container cursor-pointer">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-label-sm">Profile</span>
        </div>
      </nav>
    </>
  );
};
