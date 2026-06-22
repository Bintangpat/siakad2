import React, { useState, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { FilterSection } from "../components/schedule/FilterSection";
import { ScheduleTable } from "../components/schedule/ScheduleTable";
import { MonitoringKrs } from "../components/schedule/MonitoringKrs";
import { Download, Plus } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export const SchedulePage: React.FC = () => {
  const [activeView, setActiveView] = useState<"schedule" | "monitoring">(
    "schedule",
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "monitoring") {
        setActiveView("monitoring");
      } else {
        setActiveView("schedule");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Trigger on initial load

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <Header />

      {/* Main Content Canvas */}
      <main className="min-h-screen flex flex-col flex-1">
        {/* Helper Navigation Tab (Opsional, untuk memudahkan testing pengganti SideNavBar) */}
        <div className="px-lg pt-4 max-w-container-max mx-auto w-full flex gap-sm">
          <button
            onClick={() => {
              window.location.hash = "schedule";
            }}
            className={`px-4 py-2 text-label-sm font-bold rounded-lg transition-colors ${activeView === "schedule" ? "bg-primary text-on-primary" : "bg-surface-container-high text-primary"}`}
          >
            Schedule View
          </button>
          <button
            onClick={() => {
              window.location.hash = "monitoring";
            }}
            className={`px-4 py-2 text-label-sm font-bold rounded-lg transition-colors ${activeView === "monitoring" ? "bg-primary text-on-primary" : "bg-surface-container-high text-primary"}`}
          >
            Monitoring KRS View
          </button>
        </div>

        {/* Content Area */}
        <section
          className="p-lg max-w-container-max mx-auto w-full flex-1"
          id="content-canvas"
        >
          {activeView === "schedule" && (
            <div className="space-y-lg" id="view-schedule">
              {/* Header Actions */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary">
                    Class Schedule Management
                  </h2>
                  <p className="text-body-md text-on-surface-variant">
                    Manage and monitor current semester lectures
                  </p>
                </div>
                <div className="flex items-center gap-sm">
                  <button className="flex items-center gap-sm px-md py-2 border border-primary text-primary font-label-lg rounded-lg hover:bg-surface-container-low transition-colors">
                    <Download className="w-4 h-4" />
                    Export to Excel
                  </button>
                  <button className="flex items-center gap-sm px-md py-2 bg-primary text-on-primary font-label-lg rounded-lg hover:opacity-90 transition-opacity">
                    <Plus className="w-4 h-4" />
                    Add Schedule
                  </button>
                </div>
              </div>

              {/* Filters Bento */}
              <FilterSection />

              {/* Data Table Card */}
              <ScheduleTable />
            </div>
          )}

          {activeView === "monitoring" && <MonitoringKrs />}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
