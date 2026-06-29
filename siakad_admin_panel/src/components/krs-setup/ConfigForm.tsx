import React from "react";
import { Settings, Calendar, AlertTriangle, Info } from "lucide-react";

interface ConfigFormProps {
  isActive: boolean;
  setIsActive: (val: boolean) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date Range */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-label-lg font-label-lg text-on-surface-variant">
            Mulai Pengisian
          </label>
          <div className="relative">
            <input
              className="w-full h-12 px-4 pr-10 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-surface outline-none"
              type="date"
              defaultValue="2024-08-01"
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-on-surface-variant pointer-events-none" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-lg font-label-lg text-on-surface-variant">
            Batas Pengisian
          </label>
          <div className="relative">
            <input
              className="w-full h-12 px-4 pr-10 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-surface outline-none"
              type="date"
              defaultValue="2024-08-31"
            />
            <AlertTriangle className="absolute right-3 top-3 w-5 h-5 text-on-surface-variant pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Max SKS & Alert Info */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-label-lg font-label-lg text-on-surface-variant">
            Batas Maksimal SKS
          </label>
          <div className="flex items-center gap-2">
            <input
              className="w-full h-12 px-4 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-surface outline-none"
              max={24}
              min={1}
              type="number"
              defaultValue={24}
            />
            <span className="text-body-md font-body-md text-on-surface-variant whitespace-nowrap">
              SKS
            </span>
          </div>
          <p className="text-label-sm font-label-sm text-on-surface-variant italic">
            Standar nasional pendidikan tinggi maksimal 24 SKS per semester.
          </p>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-secondary-container/30 border border-outline-variant rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-on-secondary-container" />
            <span className="text-label-md font-label-md text-on-secondary-container">
              Info Otomatisasi
            </span>
          </div>
          <p className="text-label-sm font-label-sm text-on-secondary-container">
            Sistem akan secara otomatis menutup akses mahasiswa setelah melewati
            batas tanggal yang ditentukan.
          </p>
        </div>
      </div>
    </div>
  );
};
