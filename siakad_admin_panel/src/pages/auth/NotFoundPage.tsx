import React, { useEffect, useState } from "react";
import { ErrorVisual } from "@/components/error/ErrorVisual";
import { TypographySection } from "@/components/error/TypographySection";
import { ActionButtons } from "@/components/error/ActionButtons";
import { TrustBadge } from "@/components/error/TrustBadge";

export const NotFoundPage: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX - 250, y: e.clientY - 250 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Trigger a subtle console log for the "admin" feel
    console.warn(
      "%c SIAKAD ADMIN: Navigation Exception Detected.",
      "color: #4a148c; font-weight: bold; font-size: 14px;",
    );
    console.log(
      "Path not found in routing table. Redirecting to user fallback UI.",
    );

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center overflow-hidden selection:bg-primary-fixed font-sans relative">
      {/* Global Background Ornament */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-fixed-dim/20 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-tertiary-fixed/30 blur-[100px]" />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 w-full max-w-[1280px] px-4 md:px-10 flex flex-col items-center justify-center text-center">
        <ErrorVisual />
        <TypographySection />
        <ActionButtons />
        <TrustBadge />
      </main>

      {/* Footer-like Bottom Bar (Minimal) */}
      <footer className="absolute bottom-4 w-full text-center pointer-events-none px-4">
        <p className="font-sans text-xs text-on-surface-variant">
          © 2024 Academic Information System. All rights reserved.
        </p>
      </footer>

      {/* Interactive Layer: Cursor Follower */}
      <div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary-fixed-dim/10 blur-[100px] pointer-events-none z-[-1] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      />
    </div>
  );
};

export default NotFoundPage;
