import React from "react";
import { Users, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-xl">
      {/* Total Students */}
      <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
        <div className="flex justify-between items-start mb-md">
          <span className="p-sm bg-primary-fixed rounded-lg text-primary">
            <Users className="w-5 h-5" />
          </span>
          <span className="text-label-sm text-on-surface-variant">
            Total Students
          </span>
        </div>
        <div className="text-display leading-none mb-xs">4,280</div>
        <div className="text-label-sm text-primary font-bold">
          100% Enrollment
        </div>
      </div>

      {/* Approved */}
      <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
        <div className="flex justify-between items-start mb-md">
          <span className="p-sm bg-green-100 rounded-lg text-green-700">
            <CheckCircle2 className="w-5 h-5 fill-current" />
          </span>
          <span className="text-label-sm text-on-surface-variant">
            Approved
          </span>
        </div>
        <div className="text-display leading-none mb-xs">3,120</div>
        <div className="text-label-sm text-green-700 font-bold">
          72.9% Progress
        </div>
      </div>

      {/* Pending Approval */}
      <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
        <div className="flex justify-between items-start mb-md">
          <span className="p-sm bg-orange-100 rounded-lg text-orange-700">
            <Clock className="w-5 h-5 fill-current" />
          </span>
          <span className="text-label-sm text-on-surface-variant">
            Pending Approval
          </span>
        </div>
        <div className="text-display leading-none mb-xs">850</div>
        <div className="text-label-sm text-orange-700 font-bold">
          Requires Action
        </div>
      </div>

      {/* Not Started */}
      <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
        <div className="flex justify-between items-start mb-md">
          <span className="p-sm bg-error-container rounded-lg text-error">
            <AlertTriangle className="w-5 h-5 fill-current" />
          </span>
          <span className="text-label-sm text-on-surface-variant">
            Not Started
          </span>
        </div>
        <div className="text-display leading-none mb-xs">310</div>
        <div className="text-label-sm text-error font-bold">
          Critical Follow-up
        </div>
      </div>
    </div>
  );
};
