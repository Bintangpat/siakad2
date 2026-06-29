import React from "react";
import { ShieldCheck, Scale, History, ArrowRight } from "lucide-react";

export const ManagementInsights: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white/80 backdrop-blur-md border border-[rgba(205,195,212,0.3)] p-6 rounded-xl flex flex-col gap-4 text-left shadow-xs">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Verification Queue</h3>
          <p className="text-sm text-on-surface-variant">
            There are 12 new lecturer profiles awaiting credential verification
            before system access is granted.
          </p>
        </div>
        <a
          className="mt-auto text-sm font-semibold text-primary flex items-center gap-1 hover:underline"
          href="#"
        >
          View Queue <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Card 2 */}
      <div className="bg-white/80 backdrop-blur-md border border-[rgba(205,195,212,0.3)] p-6 rounded-xl flex flex-col gap-4 text-left shadow-xs">
        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Role Permissions</h3>
          <p className="text-sm text-on-surface-variant">
            Audit and modify the granular permissions assigned to student and
            staff roles for the current semester.
          </p>
        </div>
        <a
          className="mt-auto text-sm font-semibold text-primary flex items-center gap-1 hover:underline"
          href="#"
        >
          Manage Roles <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Card 3 */}
      <div className="bg-white/80 backdrop-blur-md border border-[rgba(205,195,212,0.3)] p-6 rounded-xl flex flex-col gap-4 text-left shadow-xs">
        <div className="w-12 h-12 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
          <History className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Activity Logs</h3>
          <p className="text-sm text-on-surface-variant">
            Track all administrative actions, user additions, and credential
            resets across the portal.
          </p>
        </div>
        <a
          className="mt-auto text-sm font-semibold text-primary flex items-center gap-1 hover:underline"
          href="#"
        >
          Full Logs <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
