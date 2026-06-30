import React from "react";
import { Save, Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import uapData from "../../../../UAPinfo.json";

interface UserDataFormProps {
  formData: {
    fullName: string;
    email: string;
    idNumber: string;
    faculty: string;
    studyProgram: string;
    password?: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      idNumber: string;
      faculty: string;
      studyProgram: string;
      password?: string;
    }>
  >;
  status: "idle" | "saving" | "success";
  onSubmit: (e: React.FormEvent) => void;
}

export const UserDataForm: React.FC<UserDataFormProps> = ({
  formData,
  setFormData,
  status,
  onSubmit,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Reset studyProgram if faculty changes
      if (name === "faculty") {
        return { ...prev, [name]: value, studyProgram: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const selectedFacultyData = uapData.faculties.find(
    (f) => f.name === formData.faculty
  );
  const availablePrograms = selectedFacultyData ? selectedFacultyData.programs : [];

  return (
    <div className="lg:col-span-8 flex flex-col gap-6 text-left">
      {/* Personal Information Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs">
        <div className="px-8 py-4 bg-surface-container border-b border-outline-variant">
          <h2 className="text-sm font-semibold text-primary">
            Personal Information
          </h2>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-on-surface-variant">
              Full Name
            </label>
            <input
              className="h-11 px-4 border border-outline-variant rounded-lg text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              type="text"
              name="fullName"
              placeholder="Enter full name with titles"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-on-surface-variant">
              Email Address
            </label>
            <input
              className="h-11 px-4 border border-outline-variant rounded-lg text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              type="email"
              name="email"
              placeholder="example@university.ac.id"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-1">
            <label className="text-sm font-semibold text-on-surface-variant">
              Identification Number (NIM/NIDN)
            </label>
            <input
              className="h-11 px-4 border border-outline-variant rounded-lg text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              type="text"
              name="idNumber"
              placeholder="e.g., 202401001"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-1">
            <label className="text-sm font-semibold text-on-surface-variant">
              Initial Password
            </label>
            <input
              className="h-11 px-4 border border-outline-variant rounded-lg text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              type="password"
              name="password"
              placeholder="Enter temporary password"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Academic Placement Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs">
        <div className="px-8 py-4 bg-surface-container border-b border-outline-variant">
          <h2 className="text-sm font-semibold text-primary">
            Academic Placement
          </h2>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-on-surface-variant">
              Faculty
            </label>
            <div className="relative">
              <select
                className="w-full h-11 px-4 bg-surface border border-outline-variant rounded-lg text-base appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Faculty
                </option>
                {uapData.faculties.map((f, idx) => (
                  <option key={idx} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 absolute right-3 top-3 pointer-events-none text-on-surface-variant" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-on-surface-variant">
              Study Program (Prodi)
            </label>
            <div className="relative">
              <select
                className="w-full h-11 px-4 bg-surface border border-outline-variant rounded-lg text-base appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                name="studyProgram"
                value={formData.studyProgram}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Program
                </option>
                {availablePrograms.map((prog, idx) => (
                  <option key={idx} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 absolute right-3 top-3 pointer-events-none text-on-surface-variant" />
            </div>
          </div>
        </div>
      </div>

      {/* Form Bottom Actions */}
      <div className="flex justify-end items-center gap-4 pt-4">
        <button
          className="px-8 h-11 border border-primary text-primary font-semibold text-sm rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
          type="button"
          disabled={status !== "idle"}
        >
          Cancel
        </button>
        <button
          className={`px-8 h-11 font-semibold text-sm rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
            status === "saving"
              ? "bg-primary/80 text-white cursor-not-allowed"
              : status === "success"
                ? "bg-green-600 text-white"
                : "bg-primary text-white hover:opacity-90"
          }`}
          type="submit"
          disabled={status !== "idle"}
        >
          {status === "idle" && (
            <>
              <Save className="w-5 h-5" />
              <span>Save User</span>
            </>
          )}
          {status === "saving" && (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Success</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
