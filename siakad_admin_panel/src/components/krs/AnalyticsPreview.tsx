import React from "react";
import {
  LineChart,
  AlertCircle,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";

export const AnalyticsPreview: React.FC = () => {
  return (
    <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Daily Registration Trend Component */}
      <div className="bg-white/80 backdrop-blur-[8px] border border-[rgba(124,116,131,0.1)] p-lg rounded-xl shadow-sm">
        <h3 className="font-label-lg text-primary mb-md flex items-center gap-xs">
          <LineChart className="w-5 h-5" />
          Daily Registration Trend
        </h3>
        <div className="h-48 w-full flex items-end justify-between px-md pb-xs border-b border-l border-outline-variant relative">
          {/* Bar Chart Bars */}
          <div className="w-8 bg-primary rounded-t-sm h-[40%] transition-all hover:h-[45%] cursor-pointer group relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-label-sm bg-inverse-surface text-on-inverse-surface px-1 py-0.5 rounded transition-opacity">
              120
            </span>
          </div>
          <div className="w-8 bg-primary rounded-t-sm h-[65%] transition-all hover:h-[70%] cursor-pointer group"></div>
          <div className="w-8 bg-primary rounded-t-sm h-[55%] transition-all hover:h-[60%] cursor-pointer group"></div>
          <div className="w-8 bg-primary rounded-t-sm h-[85%] transition-all hover:h-[90%] cursor-pointer group"></div>
          <div className="w-8 bg-primary-container rounded-t-sm h-[95%] transition-all hover:h-[100%] cursor-pointer group"></div>
          <div className="w-8 bg-primary rounded-t-sm h-[70%] transition-all hover:h-[75%] cursor-pointer group"></div>
          <div className="w-8 bg-primary rounded-t-sm h-[60%] transition-all hover:h-[65%] cursor-pointer group"></div>
        </div>
        <div className="flex justify-between mt-sm text-label-sm text-on-surface-variant px-md">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Unresolved Conflicts Area */}
      <div className="bg-white/80 backdrop-blur-[8px] border border-[rgba(124,116,131,0.1)] p-lg rounded-xl shadow-sm">
        <h3 className="font-label-lg text-primary mb-md flex items-center gap-xs">
          <AlertCircle className="w-5 h-5" />
          Unresolved Conflicts
        </h3>
        <div className="space-y-md">
          {/* Conflict item 1 */}
          <div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 bg-error-container rounded-full flex items-center justify-center text-error">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-label-lg">Room Overlap - CS102</div>
                <div className="text-label-sm text-on-surface-variant">
                  Informatics Dept • 12 Students Affected
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant" />
          </div>

          {/* Conflict item 2 */}
          <div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-label-lg">Credit Limit Exceeded</div>
                <div className="text-label-sm text-on-surface-variant">
                  3 Students • Requires Dean Override
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant" />
          </div>
        </div>
        <button className="w-full mt-md py-1 text-label-lg text-primary hover:underline transition-all cursor-pointer">
          View All Issues (14)
        </button>
      </div>
    </div>
  );
};
