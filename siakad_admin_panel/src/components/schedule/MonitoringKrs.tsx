import React from "react";
import { Mail, AlertTriangle, BarChart3, Timer, Filter } from "lucide-react";

export const MonitoringKrs: React.FC = () => {
  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">
            KRS Monitoring - Incomplete Status
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Students who haven't finalized their study plans for Semester Gasal
            2023/2024
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <button className="flex items-center gap-sm px-md py-2 bg-error text-on-error font-label-lg rounded-lg hover:opacity-90 transition-opacity">
            <Mail className="w-4 h-4" />
            Mass Reminder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-md">
        {/* Stats Card 1 */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center justify-between">
          <div>
            <p className="text-label-md text-on-surface-variant uppercase">
              Total Pending
            </p>
            <p className="text-headline-lg font-bold text-error">124</p>
            <p className="text-label-sm text-on-surface-variant mt-1">
              Students across all faculties
            </p>
          </div>
          <div className="w-12 h-12 bg-error-container rounded-full flex items-center justify-center text-error">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Stats Card 2 */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center justify-between">
          <div>
            <p className="text-label-md text-on-surface-variant uppercase">
              Completion Rate
            </p>
            <p className="text-headline-lg font-bold text-primary">92.4%</p>
            <p className="text-label-sm text-on-surface-variant mt-1">
              Increasing from 88.1% last week
            </p>
          </div>
          <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        {/* Stats Card 3 */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center justify-between">
          <div>
            <p className="text-label-md text-on-surface-variant uppercase">
              Deadline Remaining
            </p>
            <p className="text-headline-lg font-bold text-on-surface">3 Days</p>
            <p className="text-label-sm text-on-surface-variant mt-1">
              Closes on Oct 15th, 2023
            </p>
          </div>
          <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant">
            <Timer className="w-6 h-6" />
          </div>
        </div>

        {/* Students List */}
        <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="p-md border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-label-lg">Student Tracking List</h3>
            <div className="flex items-center gap-md">
              <div className="relative">
                <Filter className="absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <select className="pl-8 pr-4 py-1.5 bg-surface border border-outline-variant rounded-lg text-label-sm focus:ring-0">
                  <option>Sort by Semester</option>
                  <option>Sort by Name</option>
                  <option>Sort by ID</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-surface-container-low text-on-surface-variant">
                <tr>
                  <th className="px-md py-3 text-left font-label-md uppercase">
                    Student Name
                  </th>
                  <th className="px-md py-3 text-left font-label-md uppercase">
                    Student ID
                  </th>
                  <th className="px-md py-3 text-left font-label-md uppercase">
                    Program
                  </th>
                  <th className="px-md py-3 text-left font-label-md uppercase">
                    Semester
                  </th>
                  <th className="px-md py-3 text-center font-label-md uppercase">
                    Last Activity
                  </th>
                  <th className="px-md py-3 text-center font-label-md uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-tertiary-fixed-dim transition-colors">
                  <td className="px-md py-4 flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">
                      JD
                    </div>
                    <span className="text-body-sm font-medium">
                      John Doe Anderson
                    </span>
                  </td>
                  <td className="px-md py-4 text-body-sm text-on-surface-variant">
                    20210801042
                  </td>
                  <td className="px-md py-4 text-body-sm">Informatics</td>
                  <td className="px-md py-4 text-body-sm text-center">5</td>
                  <td className="px-md py-4 text-body-sm text-center">
                    2 days ago
                  </td>
                  <td className="px-md py-4 text-center">
                    <button className="px-3 py-1 bg-surface-container-high text-primary rounded-lg text-label-sm font-bold hover:bg-primary-fixed transition-colors">
                      Remind
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-tertiary-fixed-dim transition-colors">
                  <td className="px-md py-4 flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">
                      SM
                    </div>
                    <span className="text-body-sm font-medium">
                      Sarah Miller
                    </span>
                  </td>
                  <td className="px-md py-4 text-body-sm text-on-surface-variant">
                    20220902011
                  </td>
                  <td className="px-md py-4 text-body-sm">
                    Information Systems
                  </td>
                  <td className="px-md py-4 text-body-sm text-center">3</td>
                  <td className="px-md py-4 text-body-sm text-center">Never</td>
                  <td className="px-md py-4 text-center">
                    <button className="px-3 py-1 bg-surface-container-high text-primary rounded-lg text-label-sm font-bold hover:bg-primary-fixed transition-colors">
                      Remind
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-tertiary-fixed-dim transition-colors">
                  <td className="px-md py-4 flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">
                      RB
                    </div>
                    <span className="text-body-sm font-medium">
                      Robert Brown
                    </span>
                  </td>
                  <td className="px-md py-4 text-body-sm text-on-surface-variant">
                    20230801099
                  </td>
                  <td className="px-md py-4 text-body-sm">
                    Computer Engineering
                  </td>
                  <td className="px-md py-4 text-body-sm text-center">1</td>
                  <td className="px-md py-4 text-body-sm text-center">
                    4 hours ago
                  </td>
                  <td className="px-md py-4 text-center">
                    <button className="px-3 py-1 bg-surface-container-high text-primary rounded-lg text-label-sm font-bold hover:bg-primary-fixed transition-colors">
                      Remind
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
