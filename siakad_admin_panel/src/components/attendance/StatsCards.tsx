import React from "react";
import { Users, Clock, UserX, FileText } from "lucide-react";

export const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Attendance Today */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <span className="p-2 bg-primary-fixed text-primary rounded-lg">
            <Users className="w-5 h-5" />
          </span>
          <span className="text-green-700 font-label-md text-label-md bg-green-50 px-2 py-1 rounded">
            +2.4%
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Total Attendance Today
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            94.2%
          </h3>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <span className="p-2 bg-secondary-container text-secondary rounded-lg">
            <Clock className="w-5 h-5" />
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Active Sessions
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            142
          </h3>
        </div>
      </div>

      {/* Absent */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <span className="p-2 bg-error-container text-error rounded-lg">
            <UserX className="w-5 h-5" />
          </span>
          <span className="text-error font-label-md text-label-md bg-red-50 px-2 py-1 rounded">
            High
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Absent (Alpa)
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            184{" "}
            <span className="text-body-sm font-normal text-on-surface-variant">
              Students
            </span>
          </h3>
        </div>
      </div>

      {/* Pending Permits */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <span className="p-2 bg-tertiary-fixed text-tertiary rounded-lg">
            <FileText className="w-5 h-5" />
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Pending Permits (Izin)
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            26
          </h3>
        </div>
      </div>
    </div>
  );
};
