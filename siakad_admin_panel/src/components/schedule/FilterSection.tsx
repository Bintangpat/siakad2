import React from "react";

export const FilterSection: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
      <div className="flex flex-wrap items-center gap-lg">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-label-md text-on-surface-variant mb-xs ml-1">
            Department
          </label>
          <select className="w-full border border-outline-variant rounded-lg px-md py-2 bg-surface text-body-sm focus:border-primary focus:ring-0">
            <option>All Departments</option>
            <option>Faculty of Computer Science</option>
            <option>Faculty of Engineering</option>
            <option>Faculty of Economics</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-label-md text-on-surface-variant mb-xs ml-1">
            Program
          </label>
          <select className="w-full border border-outline-variant rounded-lg px-md py-2 bg-surface text-body-sm focus:border-primary focus:ring-0">
            <option>All Programs</option>
            <option>Information Systems</option>
            <option>Informatics</option>
            <option>Computer Engineering</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-label-md text-on-surface-variant mb-xs ml-1">
            Semester
          </label>
          <select className="w-full border border-outline-variant rounded-lg px-md py-2 bg-surface text-body-sm focus:border-primary focus:ring-0">
            <option>Gasal 2023/2024</option>
            <option>Genap 2023/2024</option>
          </select>
        </div>
        <div className="flex items-end h-full">
          <button className="px-md py-2 bg-secondary-container text-on-secondary-container font-label-lg rounded-lg hover:bg-secondary-fixed transition-colors">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
