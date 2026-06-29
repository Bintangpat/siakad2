import React from "react";
import { LayoutDashboard, ArrowLeft } from "lucide-react";

export const ActionButtons: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
      {/* Primary CTA */}
      <a
        className="group flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-sans font-semibold text-sm transition-all duration-300 hover:bg-primary-container active:scale-95 shadow-md hover:shadow-lg"
        href="/dashboard"
      >
        <LayoutDashboard className="w-4 h-4" />
        Back to Dashboard
      </a>

      {/* Secondary/Support Action */}
      <button
        className="flex items-center gap-2 bg-surface-container-high text-on-surface border border-outline-variant px-8 py-4 rounded-lg font-sans font-semibold text-sm transition-all duration-300 hover:bg-secondary-container hover:border-outline active:scale-95"
        onClick={handleBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Halaman Sebelumnya
      </button>
    </div>
  );
};
