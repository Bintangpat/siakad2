import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  badge?: ReactNode;
}

export default function MetricCard({
  title,
  value,
  icon,
  badge,
}: MetricCardProps) {
  return (
    <Card className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between hover:border-primary transition-colors shadow-none">
      <div className="flex justify-between items-start">
        {icon}
        {badge}
      </div>
      <div className="mt-xl">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase">
          {title}
        </p>
        {value}
      </div>
    </Card>
  );
}
