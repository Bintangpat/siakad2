import React from "react";
import { TrendingUp } from "lucide-react";

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-[24px]">
      {/* Total Revenue */}
      <div className="col-span-12 lg:col-span-3 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          Total Revenue
        </p>
        <h3 className="font-headline-lg text-headline-lg text-primary mt-xs">
          Rp 8.42B
        </h3>
        <div className="flex items-center gap-xs mt-sm text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="font-label-sm text-label-sm font-bold">
            +12.4% from last semester
          </span>
        </div>
      </div>

      {/* Paid UKT */}
      <div className="col-span-12 lg:col-span-3 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          Paid UKT
        </p>
        <h3 className="font-headline-lg text-headline-lg text-on-surface mt-xs">
          12,450
        </h3>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-md">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: "82%" }}
          ></div>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-sm">
          82% Completion Rate
        </p>
      </div>

      {/* Outstanding */}
      <div className="col-span-12 lg:col-span-3 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          Outstanding
        </p>
        <h3 className="font-headline-lg text-headline-lg text-on-surface mt-xs">
          2,105
        </h3>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-md">
          <div
            className="bg-error h-full rounded-full"
            style={{ width: "18%" }}
          ></div>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-sm">
          Rp 1.15B Remaining
        </p>
      </div>

      {/* Pending Bank Transfer */}
      <div className="col-span-12 lg:col-span-3 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          Pending Bank Transfer
        </p>
        <h3 className="font-headline-lg text-headline-lg text-on-surface mt-xs">
          48
        </h3>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-md">
          Requires manual approval
        </p>
        <button className="mt-sm text-primary font-label-md hover:underline cursor-pointer">
          Review all →
        </button>
      </div>
    </div>
  );
};
