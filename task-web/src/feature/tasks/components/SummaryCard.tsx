import React from "react";
import { ui } from "../../../constants/ui";

interface SummaryCardProps {
  label: string;
  count: number;
  icon: React.ReactNode;
}

function SummaryCard({ label, count, icon }: SummaryCardProps) {
  return (
    <div className={ui.card.summary}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className={`text-xs font-bold uppercase tracking-wider ${ui.text.muted}`}>{label}</p>
          <span className={`text-2xl font-bold ${ui.text.primary}`}>{count}</span>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${ui.bg.soft} text-2xl`}>{icon}</div>
      </div>
    </div>
  );
}

export default SummaryCard;
