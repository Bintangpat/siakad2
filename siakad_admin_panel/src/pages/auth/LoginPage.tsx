import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { BrandingHeader } from "@/components/layout/BrandingHeader";
import { LoginForm } from "@/components/login/LoginForm";

export const LoginPage: React.FC = () => {
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      setBgPosition({ x, y });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-background w-full flex flex-col h-screen items-center transition-all duration-300">
      {/* Top Navigation Shared Component Mapping */}
      <Header />
      <div className="bg-background flex h-full flex-col justify-center-safe items-center-safe w-full">
        {/* Main Content Canvas */}
        <main className="flex items-center w-full h-80vh justify-center ">
          <div className="w-full justify-center-safe h-full items-center-safe p-12 grid grid-cols-2 ">
            {/* Branding Content */}
            <BrandingHeader />

            {/* Main Auth Form Box */}
            <LoginForm />
          </div>
        </main>

        {/* Footer Copyright */}
      </div>
      <footer className="w-full  py-12 md:px-10 text-center border-t border-surface-variant/40">
        <p className="text-xs font-semibold text-on-surface-variant">
          © {new Date().getFullYear()} SIAKAD Management System. Developed by
          Academic IT Department.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
