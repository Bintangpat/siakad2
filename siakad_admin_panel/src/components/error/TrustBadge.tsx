import React from "react";
import { ShieldCheck } from "lucide-react";

export const TrustBadge: React.FC = () => {
  return (
    <div className="mt-8 pt-8 border-t border-outline-variant w-full max-w-md flex flex-col items-center gap-1 opacity-60">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-[18px] h-[18px]" />
        <span className="font-sans font-semibold text-xs uppercase tracking-wider">
          SIAKAD Admin | Secure Session
        </span>
      </div>
      <p className="font-sans text-xs text-on-surface-variant">
        ID Sesi: ERR_academic_404_v1.0.2
      </p>
    </div>
  );
};
