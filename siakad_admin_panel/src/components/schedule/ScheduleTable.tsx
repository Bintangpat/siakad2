import React from "react";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface ScheduleItem {
  id: string;
  subject: string;
  code: string;
  credits: number;
  lecturer: string;
  day: string;
  time: string;
  room: string;
  enrolled: number;
  capacity: number;
  status: "Active" | "Pending";
}

const initialSchedules: ScheduleItem[] = [
  {
    id: "1",
    subject: "Advanced Algorithms",
    code: "CS302",
    credits: 3,
    lecturer: "Prof. Dr. Emily Watson",
    day: "Monday",
    time: "08:00 - 10:30",
    room: "Building B - 402",
    enrolled: 38,
    capacity: 40,
    status: "Active",
  },
  {
    id: "2",
    subject: "Database Systems",
    code: "IS201",
    credits: 4,
    lecturer: "Dr. Michael Chen",
    day: "Tuesday",
    time: "13:00 - 15:30",
    room: "Lab Comp 1",
    enrolled: 25,
    capacity: 40,
    status: "Active",
  },
  {
    id: "3",
    subject: "UX Research Methods",
    code: "DE104",
    credits: 3,
    lecturer: "Sarah Jenkins, MFA",
    day: "Wednesday",
    time: "09:00 - 11:30",
    room: "Design Studio A",
    enrolled: 12,
    capacity: 25,
    status: "Pending",
  },
];

export const ScheduleTable: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr class="bg-surface-container-low text-on-surface-variant border-b border-outline-variant">
              <th className="px-md py-3 text-left font-label-md uppercase tracking-wider">
                Subject
              </th>
              <th className="px-md py-3 text-left font-label-md uppercase tracking-wider">
                Lecturer
              </th>
              <th className="px-md py-3 text-left font-label-md uppercase tracking-wider">
                Time
              </th>
              <th className="px-md py-3 text-left font-label-md uppercase tracking-wider">
                Room
              </th>
              <th className="px-md py-3 text-right font-label-md uppercase tracking-wider">
                Capacity/Enrolled
              </th>
              <th className="px-md py-3 text-center font-label-md uppercase tracking-wider">
                Status
              </th>
              <th className="px-md py-3 text-center font-label-md uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialSchedules.map((item) => {
              const percentage = (item.enrolled / item.capacity) * 100;
              return (
                <tr
                  key={item.id}
                  className="hover:bg-tertiary-fixed-dim transition-colors group"
                >
                  <td className="px-md py-4">
                    <p className="font-label-lg text-primary">{item.subject}</p>
                    <p className="text-label-sm text-on-surface-variant">
                      {item.code} • {item.credits} Credits
                    </p>
                  </td>
                  <td className="px-md py-4 text-body-sm">{item.lecturer}</td>
                  <td className="px-md py-4">
                    <p className="text-body-sm">{item.day}</p>
                    <p className="text-label-sm text-on-surface-variant">
                      {item.time}
                    </p>
                  </td>
                  <td className="px-md py-4 text-body-sm">{item.room}</td>
                  <td className="px-md py-4 text-right">
                    <div className="flex items-center justify-end gap-sm">
                      <span className="text-body-sm font-bold">
                        {item.enrolled}
                      </span>
                      <span className="text-label-sm text-on-surface-variant">
                        / {item.capacity}
                      </span>
                      <div className="w-16 h-1.5 bg-secondary-container rounded-full overflow-hidden ml-2">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-lg text-label-sm ${item.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-md py-4 text-center">
                    <button className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-on-surface-variant hover:text-error transition-colors ml-2 inline-flex items-center">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-lg py-md border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest">
        <span className="text-body-sm text-on-surface-variant">
          Showing 1 to 3 of 42 entries
        </span>
        <div className="flex gap-xs">
          <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors inline-flex items-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1 bg-primary text-on-primary rounded font-label-md">
            1
          </button>
          <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors font-label-md">
            2
          </button>
          <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors font-label-md">
            3
          </button>
          <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors inline-flex items-center">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
