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
    <div
      className="bg-surface text-on-surface min-h-screen flex flex-col transition-all duration-300"
      style={{
        backgroundColor: "#fbf9f8",
        backgroundImage: "radial-gradient(#cdc3d4 0.5px, transparent 0.5px)",
        backgroundSize: "24px 24px",
        backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`,
      }}
    >
      {/* Top Navigation Shared Component Mapping */}
      <Header />

      {/* Main Content Canvas */}
      <main className="flex items-center w-full h-screen justify-center p-4">
        <div className="w-full max-w-md">
          {/* Branding Content */}
          <BrandingHeader />

          {/* Main Auth Form Box */}
          <LoginForm />

          {/* Footer Navigation Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              University Main Website
            </a>
          </div>
        </div>
      </main>

      {/* Footer Copyright */}
      <footer className="w-full py-6 px-6 md:px-10 text-center border-t border-surface-variant/40">
        <p className="text-xs font-semibold text-on-surface-variant">
          © {new Date().getFullYear()} SIAKAD Management System. Developed by
          Academic IT Department.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
