import React from "react";
import { Search, ChevronLeft, ChevronRight, Users } from "lucide-react";

interface Student {
  id: string;
  name: string;
  nim: string;
  deptYear: string;
  timeIn: string;
  status: "Hadir" | "Alpa" | "Izin" | "Sakit";
  initials: string;
}

interface StudentTableProps {
  onOpenOverride: (nim: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  onOpenOverride,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  const students: Student[] = [
    {
      id: "1",
      name: "Ahmad Jaelani",
      nim: "210104523",
      deptYear: "Design, 2021",
      timeIn: "11:02 AM",
      status: "Hadir",
      initials: "AJ",
    },
    {
      id: "2",
      name: "Bella Wijaya",
      nim: "210104992",
      deptYear: "Design, 2021",
      timeIn: "—",
      status: "Alpa",
      initials: "BW",
    },
    {
      id: "3",
      name: "Chandra Febrian",
      nim: "210104881",
      deptYear: "Design, 2021",
      timeIn: "11:15 AM",
      status: "Izin",
      initials: "CF",
    },
    {
      id: "4",
      name: "Dina Safitri",
      nim: "210104772",
      deptYear: "Design, 2021",
      timeIn: "—",
      status: "Sakit",
      initials: "DS",
    },
    {
      id: "5",
      name: "Endang Kurnia",
      nim: "210104119",
      deptYear: "Design, 2021",
      timeIn: "11:05 AM",
      status: "Hadir",
      initials: "EK",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Hadir":
        return "bg-green-100 text-green-800";
      case "Alpa":
        return "bg-red-100 text-red-800";
      case "Izin":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nim.includes(searchTerm);
    const matchesStatus =
      statusFilter === "All Status" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
        <div>
          <h4 className="font-headline-sm text-headline-sm text-primary">
            Class Detail: DES-302
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Human-Computer Interaction • Section A • Session 8 of 14
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg border border-outline-variant">
            <Users className="w-4 h-4 text-on-surface-variant" />
            <span className="font-label-md text-label-md">32 / 45 Present</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-wrap gap-4 items-center border-b border-outline-variant bg-surface-bright">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            className="w-full pl-9 pr-4 py-1.5 bg-surface border border-outline-variant rounded text-body-sm outline-none focus:border-primary"
            placeholder="Filter student name or NIM..."
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-1.5 bg-surface border border-outline-variant rounded text-label-md outline-none focus:border-primary"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option>All Status</option>
          <option>Hadir</option>
          <option>Izin</option>
          <option>Sakit</option>
          <option>Alpa</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-surface-container-high z-10">
            <tr>
              <th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                Student Details
              </th>
              <th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                NIM
              </th>
              <th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                Time In
              </th>
              <th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                Status
              </th>
              <th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-tertiary-fixed transition-transform duration-200 ease-out hover:translate-x-1"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">
                      {student.initials}
                    </div>
                    <div>
                      <p className="font-label-lg text-label-lg">
                        {student.name}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {student.deptYear}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-body-sm text-body-sm">
                  {student.nim}
                </td>
                <td className="px-6 py-4 font-body-sm text-body-sm">
                  {student.timeIn}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded font-label-md text-label-md ${getStatusStyle(student.status)}`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {student.status === "Izin" ? (
                    <button className="text-primary hover:underline font-label-md text-label-md cursor-pointer">
                      View Note
                    </button>
                  ) : student.status === "Sakit" ? (
                    <button className="text-primary hover:underline font-label-md text-label-md cursor-pointer">
                      View Cert
                    </button>
                  ) : (
                    <button
                      className="text-primary hover:underline font-label-md text-label-md cursor-pointer"
                      onClick={() => onOpenOverride(student.nim)}
                    >
                      Override
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Showing {filteredStudents.length} of 45 students
        </p>
        <div className="flex gap-2">
          <button className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-colors inline-flex justify-center items-center cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-colors inline-flex justify-center items-center cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
