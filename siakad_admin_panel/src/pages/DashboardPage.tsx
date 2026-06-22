import React, { useState } from "react";

interface Transaction {
  id: string;
  name: string;
  amount: string;
  status: "VALIDATED" | "PENDING" | "REJECTED";
  date: string;
}

export default function App() {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // Data Tabel Finansial Dinamis
  const transactions: Transaction[] = [
    {
      id: "20240105",
      name: "Alexander Wright",
      amount: "$1,250.00",
      status: "VALIDATED",
      date: "Oct 12, 2023",
    },
    {
      id: "20240112",
      name: "Sophie Chen",
      amount: "$840.00",
      status: "PENDING",
      date: "Oct 11, 2023",
    },
    {
      id: "20240215",
      name: "Marcus Aurelius",
      amount: "$1,250.00",
      status: "VALIDATED",
      date: "Oct 10, 2023",
    },
    {
      id: "20240301",
      name: "Elena Gilbert",
      amount: "$450.00",
      status: "REJECTED",
      date: "Oct 09, 2023",
    },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen antialiased">
      {/* TopNavBar */}
      <header className="w-full h-16 sticky top-0 z-40 bg-surface border-b border-outline-variant">
        <div className="flex justify-between items-center px-lg h-full max-w-container-max mx-auto">
          {/* Search Box dengan interaksi State React */}
          <div
            className={`flex items-center gap-md bg-surface-container-low px-md py-xs rounded-full border transition-all duration-200 w-96 ${isSearchFocused ? "border-primary shadow-sm" : "border-outline-variant"}`}
          >
            <span className="material-symbols-outlined text-on-surface-variant">
              search
            </span>
            <input
              className="bg-transparent border-none focus:outline-hidden w-full text-sm placeholder:text-on-surface-variant/60"
              placeholder="Search administrative records..."
              type="text"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          <div className="flex items-center gap-md">
            <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full transition-colors cursor-pointer">
              notifications
            </button>
            <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full transition-colors cursor-pointer">
              help
            </button>
            <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full transition-colors cursor-pointer">
              settings
            </button>
            <div className="h-8 w-px bg-outline-variant mx-xs"></div>
            <div className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-xs pr-sm rounded-full transition-colors">
              <img
                className="w-8 h-8 rounded-full border border-primary object-cover"
                alt="Admin Profile Portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqPkEuMyAyN4t96gpm7hHuPoqBv0c84UAZNRUgF6NZpkhPI3irJXdG28u5Obn6sVSpX5TMExAgJfjSx4ZE4R8kuXO2OGvxPG57uHYi9PHu1tZ4dLoGuNLxDn2BQ-ZvMzkHfKDU8H09GZVEeQo2mOeSmB3yDAC29BWdiD_6fbZJFW9OBrlVlpAVLRqV01kag3atCGdVDc0GheBnWnmXW_-rzcW_Dzdcirm5DSVPb_Ya9xoPEoYFgIw5w0vtY8N2fzFzcEpK-mFIuTY"
              />
              <span className="text-sm font-semibold text-primary">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-lg">
        <div className="max-w-container-max mx-auto space-y-xl">
          {/* Dashboard Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Academic Overview
              </h2>
              <p className="text-sm md:text-base text-on-surface-variant">
                Welcome back, Admin. Here's what's happening at SIAKAD today.
              </p>
            </div>
            <div className="flex gap-sm">
              <button className="bg-primary text-on-primary px-lg py-sm rounded-lg text-sm font-semibold flex items-center gap-xs hover:opacity-90 transition-opacity cursor-pointer">
                <span className="material-symbols-outlined text-base">add</span>
                New Enrollment
              </button>
              <button className="border border-primary text-primary px-lg py-sm rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors cursor-pointer">
                Generate Report
              </button>
            </div>
          </div>

          {/* Bento Grid Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {/* Total Students */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between hover:border-primary transition-colors">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined bg-primary-fixed text-on-primary-fixed p-sm rounded-lg">
                  groups
                </span>
                <span className="text-green-600 text-xs font-semibold flex items-center gap-0.5">
                  +4.2%{" "}
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                </span>
              </div>
              <div className="mt-xl">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Total Active Students
                </p>
                <h3 className="text-4xl font-extrabold text-primary mt-xs">
                  12,480
                </h3>
              </div>
            </div>

            {/* KRS Completion Rate */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg hover:border-primary transition-colors">
              <div className="relative w-24 h-24 circular-progress shrink-0">
                <span className="absolute z-10 text-xl font-bold text-primary">
                  84%
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  KRS Completion
                </p>
                <p className="text-xs text-on-surface-variant/80 mt-xs">
                  Current Semester Progress
                </p>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between hover:border-primary transition-colors">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined bg-tertiary-fixed text-on-tertiary-fixed p-sm rounded-lg">
                  account_balance_wallet
                </span>
                <span className="text-on-surface-variant text-xs font-medium">
                  This Semester
                </span>
              </div>
              <div className="mt-xl">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Total Revenue
                </p>
                <div className="flex items-baseline gap-xs">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mt-xs">
                    $4.2M
                  </h3>
                  <span className="text-xs font-semibold text-on-surface-variant">
                    USD
                  </span>
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between hover:border-primary transition-colors">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined bg-error-container text-on-error-container p-sm rounded-lg">
                  pending_actions
                </span>
                <span className="bg-error text-on-error px-sm py-xs rounded-full text-[10px] font-bold">
                  URGENT
                </span>
              </div>
              <div className="mt-xl">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Pending Approvals
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-error mt-xs">
                  142
                </h3>
              </div>
            </div>
          </div>

          {/* Table & Logs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Financial Monitoring Table */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
              <div className="p-lg border-b border-outline-variant flex justify-between items-center">
                <h4 className="text-lg font-bold text-primary">
                  Financial Monitoring
                </h4>
                <button className="text-primary text-sm font-semibold hover:underline cursor-pointer">
                  View All Transactions
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low">
                    <tr>
                      <th className="px-lg py-md text-xs font-bold text-on-surface-variant uppercase">
                        STUDENT ID
                      </th>
                      <th className="px-lg py-md text-xs font-bold text-on-surface-variant uppercase">
                        NAME
                      </th>
                      <th className="px-lg py-md text-xs font-bold text-on-surface-variant uppercase">
                        AMOUNT
                      </th>
                      <th className="px-lg py-md text-xs font-bold text-on-surface-variant uppercase">
                        STATUS
                      </th>
                      <th className="px-lg py-md text-xs font-bold text-on-surface-variant uppercase">
                        DATE
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-surface-container-high transition-colors group"
                      >
                        <td className="px-lg py-md text-xs">{tx.id}</td>
                        <td className="px-lg py-md text-sm font-semibold">
                          {tx.name}
                        </td>
                        <td className="px-lg py-md text-xs">{tx.amount}</td>
                        <td className="px-lg py-md">
                          <span
                            className={`px-sm py-xs rounded text-[11px] font-bold ${
                              tx.status === "VALIDATED"
                                ? "bg-green-100 text-green-800"
                                : tx.status === "PENDING"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-error-container text-on-error-container"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-lg py-md text-xs">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Logs Feed */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col">
              <div className="p-lg border-b border-outline-variant">
                <h4 className="text-lg font-bold text-primary">System Logs</h4>
              </div>
              <div className="p-lg space-y-lg relative">
                <div className="absolute left-[39px] top-lg bottom-lg w-px bg-outline-variant"></div>

                <div className="flex gap-md relative">
                  <div className="z-10 bg-primary-fixed text-primary w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    <span className="material-symbols-outlined text-sm">
                      calendar_today
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      New Schedule Added
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Class "Advanced Quantum Physics" added to Semester 5
                      timetable.
                    </p>
                    <p className="text-[10px] text-outline font-bold mt-xs">
                      2 MINS AGO
                    </p>
                  </div>
                </div>

                <div className="flex gap-md relative">
                  <div className="z-10 bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    <span className="material-symbols-outlined text-sm">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      Payment Validated
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Tuition fee for Student #20240105 successfully processed.
                    </p>
                    <p className="text-[10px] text-outline font-bold mt-xs">
                      45 MINS AGO
                    </p>
                  </div>
                </div>

                <div className="flex gap-md relative">
                  <div className="z-10 bg-amber-100 text-amber-800 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    <span className="material-symbols-outlined text-sm">
                      person_add
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      New Admin Role
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Sarah Jenkins granted 'Financial Monitor' access levels.
                    </p>
                    <p className="text-[10px] text-outline font-bold mt-xs">
                      3 HOURS AGO
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-lg border-t border-outline-variant bg-surface-container-low text-center">
                <button className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                  View System History
                </button>
              </div>
            </div>
          </div>

          {/* Academic Analytics Section */}
          <div className="bg-primary-container p-xl rounded-xl text-on-primary-container relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
              <div>
                <h4 className="text-xl md:text-2xl font-bold mb-sm">
                  Academic Performance Insights
                </h4>
                <p className="text-sm opacity-85 mb-lg">
                  Predictive analysis shows a 12% projected increase in student
                  retention if current mentorship programs continue their growth
                  trajectory.
                </p>
                <div className="flex gap-md">
                  <div className="bg-white/10 backdrop-blur-md p-md rounded-lg border border-white/20">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      Retention Rate
                    </p>
                    <p className="text-lg font-bold">92.4%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-md rounded-lg border border-white/20">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      GPA Average
                    </p>
                    <p className="text-lg font-bold">3.62</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div
                  className="w-full h-48 bg-cover bg-center rounded-xl border border-white/20 shadow-2xl"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJsYNYoUFurE8Lq5b9qmN9utZqXsD2WZ8TxA-Uy5iVR96cRBb4qZUtt2gn6-DMPei80M19MFcSgFmC7lEQRZ62j-B_7S7xDTnlk3dCaTZYAHp7qnAY8puJ6mU8A7xNjbQfdkgWvmN_rnnH-88UZZ49BAZkYjGpTEqOLGTZzFXiyNrLqpYQi5bNkqd0CKfDmLoosmHYTLS6yi-ZnRHSEwI8aGiwlkZOo3sL-1GCfc7zmSUjrwZLKNbqSFLcE9bysBV-YtBy0kEjAgo')`,
                  }}
                ></div>
              </div>
            </div>
            {/* Background Aesthetics Blurs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-fixed/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
