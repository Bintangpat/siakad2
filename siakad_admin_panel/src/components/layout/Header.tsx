import React from "react";
import { Search, Bell, HelpCircle, Settings } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="w-full h-16 sticky top-0 bg-background z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-lg">
      <div className="flex items-center gap-md flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="Search data, students, or schedules..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-md">
        <div className="flex items-center gap-sm mr-md">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant cursor-pointer">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant cursor-pointer">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-sm border-l border-outline-variant pl-md">
          <div className="text-right">
            <p className="font-label-lg text-label-lg leading-tight">
              Admin Principal
            </p>
            <p className="text-label-sm text-on-surface-variant">
              Super Administrator
            </p>
          </div>
          <div className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="Professional studio portrait of a university administrative officer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWQFjeQtogPNc0OOk4XKW06ujeVFb28LNufQhQRz1qBS2MUxAtgxGw1_1SsaFhoXQOwELBbmVqxmN_gk0qfa-6hfpiPROkGZLdN6NMo9MP3_WRB5Be88qvXlbfiJPLFAETlcNz95KovHLmCvERInNHMOT3avKMYz8f8hi72vRAmpHsNalueByJkIKytIc01Ol-DTNorbfPRcIIW4wto7zI2E-T7TDlq41ZfYISRgDS_A4YU0zjffq3fHeUFxwXdYXeyCvZ0iN60I0"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
