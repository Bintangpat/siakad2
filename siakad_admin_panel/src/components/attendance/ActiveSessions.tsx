import React from "react";

interface Session {
  id: string;
  code: string;
  title: string;
  percentage: number;
  instructor: string;
  details: string;
}

interface ActiveSessionsProps {
  selectedSessionId: string;
  onSelectSession: (id: string) => void;
}

export const ActiveSessions: React.FC<ActiveSessionsProps> = ({
  selectedSessionId,
  onSelectSession,
}) => {
  const sessions: Session[] = [
    {
      id: "1",
      code: "INF-204",
      title: "Advanced Web Architecture",
      percentage: 88,
      instructor: "Prof. Alexander Grant",
      details: "Room 402 • 10:00 - 12:00",
    },
    {
      id: "2",
      code: "ECO-101",
      title: "Macroeconomics Foundations",
      percentage: 96,
      instructor: "Dr. Sarah Jenkins",
      details: "Auditorium B • 10:30 - 12:30",
    },
    {
      id: "3",
      code: "DES-302",
      title: "Human-Computer Interaction",
      percentage: 72,
      instructor: "Ar. Marcus Vane",
      details: "Lab 10 • 11:00 - 13:00",
    },
    {
      id: "4",
      code: "MAT-211",
      title: "Calculus III: Vector Calculus",
      percentage: 91,
      instructor: "Prof. Liang Wei",
      details: "Room 205 • 11:15 - 13:15",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="font-headline-sm text-headline-sm text-on-surface">
          Active Sessions
        </h4>
        <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent">
        {sessions.map((session) => {
          const isActive = session.id === selectedSessionId;
          return (
            <div
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`p-4 rounded-lg border transition-all cursor-pointer border-l-4 ${
                isActive
                  ? "bg-primary text-on-primary border-primary border-l-on-primary-container shadow-lg ring-2 ring-primary ring-offset-2"
                  : "bg-surface-container-lowest border-outline-variant hover:bg-surface-variant border-l-primary"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p
                    className={`font-label-sm text-label-sm font-bold ${isActive ? "text-on-primary-container" : "text-primary"}`}
                  >
                    {session.code}
                  </p>
                  <h5 className="font-label-lg text-label-lg">
                    {session.title}
                  </h5>
                </div>
                <span
                  className={`font-label-md text-label-md font-bold ${isActive ? "text-on-primary" : "text-primary"}`}
                >
                  {session.percentage}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden mb-2 bg-secondary-container/30">
                <div
                  className={`h-full ${isActive ? "bg-white" : "bg-primary"}`}
                  style={{ width: `${session.percentage}%` }}
                ></div>
              </div>
              <div
                className={`flex justify-between ${isActive ? "text-on-primary-container" : "text-on-surface-variant"}`}
              >
                <span className="font-label-sm text-label-sm">
                  {session.instructor}
                </span>
                <span className="font-label-sm text-label-sm">
                  {session.details}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
