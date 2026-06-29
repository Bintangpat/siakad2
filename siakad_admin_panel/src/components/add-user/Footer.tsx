import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-10 py-6 max-w-7xl mx-auto gap-4">
        <span className="text-sm font-bold text-secondary dark:text-secondary-fixed-dim">
          SIAKAD
        </span>
        <div className="flex gap-6">
          <a
            className="text-xs text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary underline transition-all"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary underline transition-all"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary underline transition-all"
            href="#"
          >
            IT Support
          </a>
        </div>
        <p className="text-sm text-on-surface-variant dark:text-surface-variant">
          © {new Date().getFullYear()} SIAKAD University Academic System. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};
