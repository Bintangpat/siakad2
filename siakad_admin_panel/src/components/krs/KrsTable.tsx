import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  Mail,
} from "lucide-react";

interface StudentKrs {
  id: string;
  nim: string;
  name: string;
  major: string;
  semester: number;
  status: "APPROVED" | "PENDING" | "NOT STARTED";
}

export const KrsTable: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [students] = useState<StudentKrs[]>([
    {
      id: "1",
      nim: "20210801234",
      name: "Aditya Rahman",
      major: "Informatics",
      semester: 5,
      status: "APPROVED",
    },
    {
      id: "2",
      nim: "20210801235",
      name: "Sarah Aliyah",
      major: "Visual Comm. Design",
      semester: 5,
      status: "PENDING",
    },
    {
      id: "3",
      nim: "20230101456",
      name: "Budi Santoso",
      major: "Information Systems",
      semester: 1,
      status: "NOT STARTED",
    },
    {
      id: "4",
      nim: "20210801238",
      name: "Fanya Putri",
      major: "Informatics",
      semester: 5,
      status: "APPROVED",
    },
    {
      id: "5",
      nim: "20220901772",
      name: "Kevin Wijaya",
      major: "Law",
      semester: 3,
      status: "PENDING",
    },
  ]);

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s) => s.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-700">
            APPROVED
          </span>
        );
      case "PENDING":
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-100 text-orange-700">
            PENDING
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-error-container text-error">
            NOT STARTED
          </span>
        );
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
      {/* Filtering Subheader */}
      <div className="p-md border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-md bg-surface-container-low">
        <div className="flex gap-sm">
          <select className="bg-surface-container-lowest border border-outline-variant rounded-lg text-label-lg px-md py-1 focus:ring-primary focus:border-primary focus:outline-none">
            <option>All Majors</option>
            <option>Informatics</option>
            <option>Visual Communication Design</option>
            <option>Information Systems</option>
          </select>
          <select className="bg-surface-container-lowest border border-outline-variant rounded-lg text-label-lg px-md py-1 focus:ring-primary focus:border-primary focus:outline-none">
            <option>All Semesters</option>
            <option>Semester 1</option>
            <option>Semester 3</option>
            <option>Semester 5</option>
            <option>Semester 7</option>
          </select>
        </div>
        <div className="flex items-center gap-xs">
          <span className="text-label-sm text-on-surface-variant">
            Showing 10 of 4,280
          </span>
          <div className="flex gap-xs ml-sm">
            <button className="p-1 hover:bg-surface-container rounded transition-colors cursor-pointer inline-flex items-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-surface-container rounded transition-colors cursor-pointer inline-flex items-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                  checked={selectedIds.length === students.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                NIM
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Major
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Sem
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                KRS Status
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-tertiary-fixed transition-colors cursor-pointer"
                onClick={() => toggleSelectRow(student.id)}
              >
                <td
                  className="px-lg py-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                    checked={selectedIds.includes(student.id)}
                    onChange={() => toggleSelectRow(student.id)}
                  />
                </td>
                <td className="px-lg py-md font-label-lg">{student.nim}</td>
                <td className="px-lg py-md font-body-md">{student.name}</td>
                <td className="px-lg py-md text-on-surface-variant">
                  {student.major}
                </td>
                <td className="px-lg py-md">{student.semester}</td>
                <td className="px-lg py-md">
                  {renderStatusBadge(student.status)}
                </td>
                <td
                  className="px-lg py-md text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-end items-center gap-2">
                    {student.status === "PENDING" && (
                      <button className="text-on-surface-variant hover:text-primary transition-all cursor-pointer inline-flex items-center">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    {student.status === "NOT STARTED" && (
                      <button className="text-on-surface-variant hover:text-primary transition-all cursor-pointer inline-flex items-center">
                        <Mail className="w-5 h-5" />
                      </button>
                    )}
                    <button className="text-on-surface-variant hover:text-primary transition-all cursor-pointer inline-flex items-center">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-md bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
        <span className="text-label-md text-on-surface-variant">
          Page 1 of 428
        </span>
        <div className="flex gap-sm">
          <button
            className="px-md py-1 border border-outline-variant rounded-lg text-label-lg hover:bg-surface-container transition-colors disabled:opacity-50 cursor-pointer"
            disabled
          >
            Previous
          </button>
          <button className="px-md py-1 bg-primary text-on-primary rounded-lg text-label-lg active:scale-95 transition-transform cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
