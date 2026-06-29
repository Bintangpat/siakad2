import React, { useState } from "react";
import { Settings } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FilterParameter } from "@/components/krs-setup/FilterParameter";
import { ConfigForm } from "@/components/krs-setup/ConfigForm";
import { CourseSelection } from "@/components/krs-setup/CourseSelection";
import { BottomActionBar } from "@/components/krs-setup/BottomActionBar";

export default function KrsSetupPage() {
  const [semester, setSemester] = useState<"Ganjil" | "Genap">("Ganjil");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">(
    "idle",
  );

  const handleSaveConfiguration = () => {
    setSaveStatus("saving");

    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-36 font-sans">
      <Header />

      <main className="max-w-[1280px] mx-auto px-4 md:px-10 mt-2 md:mt-6 space-y-6">
        {/* Breadcrumb (Desktop Only) */}
        <nav className="hidden md:flex text-label-md font-label-md text-on-surface-variant gap-2 items-center mb-4">
          <span className="hover:text-primary cursor-pointer">Dashboard</span>
          <span className="text-sm">/</span>
          <span className="hover:text-primary cursor-pointer">Akademik</span>
          <span className="text-sm">/</span>
          <span className="text-primary font-bold">Pengaturan KRS</span>
        </nav>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Filter */}
          <div className="lg:col-span-4">
            <FilterParameter semester={semester} setSemester={setSemester} />
          </div>

          {/* Right Panel - Configuration Details */}
          <section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary" />
                <h2 className="text-headline-sm font-headline-sm text-on-surface">
                  Detail Konfigurasi
                </h2>
              </div>

              {/* Status Activation Toggle */}
              <div className="flex items-center gap-3">
                <span className="text-label-lg font-label-lg text-on-surface-variant">
                  Status Aktivasi
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#310065]"></div>
                </label>
              </div>
            </div>

            {/* Core Config Form Elements */}
            <ConfigForm isActive={isActive} setIsActive={setIsActive} />

            {/* Course Table Filter Component */}
            <CourseSelection />
          </section>
        </div>
      </main>

      {/* Global Interactive Bottom Actions */}
      <BottomActionBar
        onSave={handleSaveConfiguration}
        isSaving={saveStatus === "saving"}
        saveStatus={saveStatus}
      />
    </div>
  );
}
