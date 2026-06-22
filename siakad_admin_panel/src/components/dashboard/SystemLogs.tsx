import { Calendar, CheckCircle2, UserPlus, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LogItem {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  themeClass: string;
}

const logs: LogItem[] = [
  {
    id: 1,
    title: "New Schedule Added",
    description:
      'Class "Advanced Quantum Physics" added to Semester 5 timetable.',
    time: "2 MINS AGO",
    icon: <Calendar className="h-3.5 w-3.5" />,
    themeClass: "bg-primary-fixed text-primary",
  },
  {
    id: 2,
    title: "Payment Validated",
    description: "Tuition fee for Student #20240105 successfully processed.",
    time: "45 MINS AGO",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    themeClass: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    title: "New Admin Role",
    description: "Sarah Jenkins granted 'Financial Monitor' access levels.",
    time: "3 HOURS AGO",
    icon: <UserPlus className="h-3.5 w-3.5" />,
    themeClass: "bg-amber-100 text-amber-800",
  },
  {
    id: 4,
    title: "Announcement Published",
    description: '"Registration Deadline Extended" broadcast to all students.',
    time: "5 HOURS AGO",
    icon: <Megaphone className="h-3.5 w-3.5" />,
    themeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
];

export default function SystemLogs() {
  return (
    <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col shadow-none">
      <div className="p-lg border-b border-outline-variant">
        <h4 className="font-headline-sm text-headline-sm text-primary">
          System Logs
        </h4>
      </div>

      <div className="p-lg space-y-lg relative">
        {/* Timeline Line */}
        <div className="absolute left-[39px] top-lg bottom-lg w-px bg-outline-variant"></div>

        {logs.map((log) => (
          <div key={log.id} className="flex gap-md relative">
            <div
              className={`z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${log.themeClass}`}
            >
              {log.icon}
            </div>
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">
                {log.title}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {log.description}
              </p>
              <p className="text-[10px] text-outline font-bold mt-xs">
                {log.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto p-lg border-t border-outline-variant bg-surface-container-low text-center rounded-b-xl">
        <Button
          variant="link"
          className="font-label-lg text-label-lg text-primary p-0 h-auto hover:underline"
        >
          View System History
        </Button>
      </div>
    </Card>
  );
}
