import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Course {
  id: string;
  code: string;
  name: string;
  type: string;
  sks: number;
  lecturer: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "IF101",
    name: "Dasar Pemrograman",
    type: "Wajib Nasional",
    sks: 4,
    lecturer: "Dr. Ahmad Subarjo",
  },
  {
    id: "2",
    code: "IF102",
    name: "Struktur Data",
    type: "Wajib Prodi",
    sks: 3,
    lecturer: "Siska Amalia, M.T.",
  },
  {
    id: "3",
    code: "IF201",
    name: "Sistem Operasi",
    type: "Wajib Prodi",
    sks: 3,
    lecturer: "Budi Santoso, Ph.D.",
  },
  {
    id: "4",
    code: "IF204",
    name: "Etika Profesi",
    type: "Wajib Universitas",
    sks: 2,
    lecturer: "Drs. Wahyu Hidayat",
  },
  {
    id: "5",
    code: "IF305",
    name: "Kecerdasan Buatan",
    type: "Peminatan",
    sks: 3,
    lecturer: "Lia Permata, M.Kom.",
  },
];

export const CourseSelection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2"]);

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-label-lg font-label-lg text-on-surface-variant">
            Pilih Matakuliah Tersedia
          </label>
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            Pilih matakuliah yang akan dibuka untuk program studi ini di
            semester ganjil.
          </p>
        </div>
        <div className="relative">
          <input
            className="h-10 pl-10 pr-4 text-body-sm border border-outline-variant rounded-full focus:ring-1 focus:ring-primary focus:border-primary bg-surface w-full md:w-64 transition-all outline-none"
            placeholder="Cari matakuliah..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-on-surface-variant w-5 h-5" />
        </div>
      </div>

      <div className="border border-outline-variant rounded-lg overflow-hidden bg-surface">
        <div className="h-64 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-surface-container-low border-b border-outline-variant z-10">
              <tr className="text-label-md font-label-md text-on-surface-variant">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-outline text-primary focus:ring-primary accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Kode &amp; Nama Matakuliah</th>
                <th className="px-4 py-3 text-right">SKS</th>
                <th className="px-4 py-3">Dosen Koordinator</th>
              </tr>
            </thead>
            <tbody className="text-body-sm font-body-sm divide-y divide-outline-variant">
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-tertiary-fixed transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(course.id)}
                      onChange={() => handleToggleSelect(course.id)}
                      className="rounded border-outline text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-on-surface">
                      {course.code} - {course.name}
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      {course.type}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{course.sks}</td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {course.lecturer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-surface-container-low px-4 py-3 flex justify-between items-center border-t border-outline-variant">
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            Menampilkan {filteredCourses.length} dari 48 matakuliah
          </span>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-tertiary-fixed rounded cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-tertiary-fixed rounded cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
