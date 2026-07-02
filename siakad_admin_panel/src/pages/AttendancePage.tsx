import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsCards } from "@/components/attendance/StatsCards";
import { ActiveSessions } from "@/components/attendance/ActiveSessions";
import { StudentTable } from "@/components/attendance/StudentTable";
import { OverrideModal } from "@/components/attendance/OverrideModal";
import { Filter, Download } from "lucide-react";

export default function AttendancePage() {
  const [selectedSession, setSelectedSession] = useState("3");
  const [modalOpen, setModalOpen] = useState(false);
  const [overrideNim, setOverrideNim] = useState("");

  // States for table filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const handleOpenOverride = (nim: string) => {
    setOverrideNim(nim);
    setModalOpen(true);
  };

  const handleSaveOverride = (status: string, note: string) => {
    console.log(`Saving attendance override for NIM ${overrideNim}: status=${status}, note=${note}`);
    alert(
      `Attendance status for NIM ${overrideNim} updated to ${status} successfully and logged in system history.`,
    );
    setModalOpen(false);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased">
      <Header />

      {/* Main Content Canvas */}
      <main className="p-10 bg-surface flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-4xl font-bold text-primary leading-tight">
              Attendance Monitoring
            </h2>
            <p className="font-body-lg text-lg text-on-surface-variant mt-2">
              Real-time overview of university-wide academic presence.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-3 border border-primary text-primary font-label-lg text-label-lg rounded-lg hover:bg-primary-fixed transition-colors cursor-pointer">
              <Filter className="w-5 h-5" />
              Filter View
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-label-lg text-label-lg rounded-lg hover:shadow-lg transition-all cursor-pointer">
              <Download className="w-5 h-5" />
              Export PDF
            </button>
          </div>
        </div>

        {/* High-Level Stats Bento Grid */}
        <StatsCards />

        {/* Split Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-start">
          {/* Left Column: Active Classes list */}
          <div className="lg:col-span-1">
            <ActiveSessions
              selectedSessionId={selectedSession}
              onSelectSession={setSelectedSession}
            />
          </div>

          {/* Right Column: Student Attendance Grid list */}
          <div className="lg:col-span-2 h-full">
            <StudentTable
              onOpenOverride={handleOpenOverride}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
        </div>
      </main>

      {/* Manual Status Override Modal overlay context */}
      <OverrideModal
        isOpen={modalOpen}
        nim={overrideNim}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveOverride}
      />
    </div>
  );
}
