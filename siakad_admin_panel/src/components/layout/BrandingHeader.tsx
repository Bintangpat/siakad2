import React from "react";

export const BrandingHeader: React.FC = () => {
  return (
    <div className="text-center mb-8 w-fit bg-background flex flex-col justify-center-safe items-center-safe w-full ">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border border-outline-variant mb-4 overflow-hidden shadow-xs">
        <img
          className="w-12 h-12 object-contain"
          alt="University Emblem Logo"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGpk0k8YLXaLM6VgkZbdLVHY-n7ojCLZgoZMfwnYVaVBHdKqfs8pArBTlCgSW2idnINt85yRQj2gV35x0vPxmugt9AQinCLJEAs9l0RILTX9ERn_iNl1QjKj1nsEWZl2VK428lEq5bnrBmLIBlJ0wi-lvE_3t7jZBS5jux2MpJaFoNb7D9o3ILBrtldQfvQIQFYQCLJz50o8Uqda3VkuEd7xllO4qjIkVUBbduH-J6kG8O65-X5Per9hN-wKqjAQXh0kThGaorosc"
        />
      </div>
      <h2 className="text-2xl w-36 font-bold text-foreground ">
        Academic Portal
      </h2>
      <p className="text-sm text-on-surface-variant mt-1">
        Information System for Academic Administration
      </p>
    </div>
  );
};
