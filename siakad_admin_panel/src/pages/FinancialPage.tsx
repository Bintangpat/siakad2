import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import { StatsGrid } from "../components/financial/StatsGrid";
import { FinancialCharts } from "../components/financial/FinancialCharts";
import { TransactionTable } from "../components/financial/TransactionTable";
import { Filter, FileText, Plus } from "lucide-react";

export const FinancialPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-lg max-w-container-max mx-auto space-y-lg w-full">
        {/* Header Actions */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Payment Overview
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Real-time status of UKT payments across all faculties.
            </p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-sm px-lg py-sm border border-primary text-primary font-label-lg rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
              <Filter className="w-[20px] h-[20px]" />
              Filter
            </button>
            <button className="flex items-center gap-sm px-lg py-sm bg-primary text-on-primary font-label-lg rounded-lg shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
              <FileText className="w-[20px] h-[20px]" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Bento Dashboard Components */}
        <StatsGrid />
        <FinancialCharts />
        <TransactionTable
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50 cursor-pointer">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FinancialPage;
