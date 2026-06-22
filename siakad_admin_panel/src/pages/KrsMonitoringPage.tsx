import React from "react";
import { Header } from "../components/layout/Header";
import { SummaryCards } from "../components/krs/SummaryCards";
import { KrsTable } from "../components/krs/KrsTable";
import { AnalyticsPreview } from "../components/krs/AnalyticsPreview";
import { Mail, CheckSquare } from "lucide-react";

export const KrsMonitoringPage: React.FC = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen font-sans antialiased">
      <Header />

      {/* Content Canvas */}
      <main className="p-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              KRS Monitoring
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Academic Year 2023/2024 - Odd Semester
            </p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-2 border border-primary text-primary font-label-lg rounded-lg hover:bg-primary-fixed transition-colors cursor-pointer">
              <Mail className="w-4 h-4" />
              Send Reminders
            </button>
            <button className="flex items-center gap-xs px-md py-2 bg-primary text-on-primary font-label-lg rounded-lg active:scale-95 transition-transform cursor-pointer">
              <CheckSquare className="w-4 h-4" />
              Bulk Approve
            </button>
          </div>
        </div>

        {/* Bento Summary Grid Cards */}
        <SummaryCards />

        {/* Main Data Student Table */}
        <KrsTable />

        {/* Analytical Section Charts & Preview */}
        <AnalyticsPreview />
      </main>
    </div>
  );
};

export default KrsMonitoringPage;
