import React from "react";
import { Search } from "lucide-react";

export const ErrorVisual: React.FC = () => {
  return (
    <div className="relative mb-8 animate-[float_6s_ease-in-out_infinite]">
      {/* Glassy Background Circle */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed-dim/30 to-tertiary-fixed/30 rounded-full blur-2xl transform scale-150" />

      {/* Magnifying Glass Icon Construct */}
      <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 bg-white/70 backdrop-blur-md border border-outline-variant/30 rounded-full shadow-lg">
        <div className="flex flex-col items-center">
          <Search className="w-20 h-20 md:w-32 md:h-32 text-primary stroke-[1.5]" />

          {/* Sad Face Over Search */}
          <div className="absolute top-[35%] flex flex-col items-center gap-1">
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-on-surface-variant" />
              <div className="w-2 h-2 rounded-full bg-on-surface-variant" />
            </div>
            <div className="w-6 h-3 border-t-2 border-on-surface-variant rounded-[100%_100%_0_0] rotate-180" />
          </div>
        </div>

        {/* Floating Decorative Numbers */}
        <span className="absolute -top-4 -right-4 font-sans font-bold text-primary/10 text-6xl md:text-8xl select-none">
          4
        </span>
        <span className="absolute top-1/2 -left-8 font-sans font-bold text-primary/10 text-6xl md:text-8xl select-none">
          0
        </span>
        <span className="absolute -bottom-4 -right-2 font-sans font-bold text-primary/10 text-6xl md:text-8xl select-none">
          4
        </span>
      </div>
    </div>
  );
};
