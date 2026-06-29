import React from "react";
import { Filter } from "lucide-react";

interface FilterParameterProps {
  semester: "Ganjil" | "Genap";
  setSemester: (sem: "Ganjil" | "Genap") => void;
}

export const FilterParameter: React.FC<FilterParameterProps> = ({
  semester,
  setSemester,
}) => {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-headline-sm font-headline-sm text-on-surface">
          Parameter Konfigurasi
        </h2>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-label-lg font-label-lg text-on-surface-variant">
            Tahun Akademik
          </label>
          <select className="w-full h-12 px-4 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-surface transition-all outline-none">
            <option>2024/2025</option>
            <option>2023/2024</option>
            <option>2022/2023</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-lg font-label-lg text-on-surface-variant">
            Semester
          </label>
          <div className="flex p-1 bg-surface-container-low rounded-lg border border-outline-variant">
            <button
              onClick={() => setSemester("Ganjil")}
              className={`flex-1 py-2 text-label-lg font-label-lg rounded-md transition-all cursor-pointer ${
                semester === "Ganjil"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-tertiary-fixed"
              }`}
            >
              Ganjil
            </button>
            <button
              onClick={() => setSemester("Genap")}
              className={`flex-1 py-2 text-label-lg font-label-lg rounded-md transition-all cursor-pointer ${
                semester === "Genap"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-tertiary-fixed"
              }`}
            >
              Genap
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-lg font-label-lg text-on-surface-variant">
            Program Studi
          </label>
          <select className="w-full h-12 px-4 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-surface transition-all outline-none">
            <option>Teknik Informatika (S1)</option>
            <option>Sistem Informasi (S1)</option>
            <option>Manajemen Bisnis (S1)</option>
            <option>Ilmu Komunikasi (S1)</option>
          </select>
        </div>
      </div>
    </section>
  );
};
