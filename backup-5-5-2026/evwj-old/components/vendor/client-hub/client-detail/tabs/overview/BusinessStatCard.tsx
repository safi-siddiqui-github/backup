"use client";

import { ReactNode } from "react";

interface BusinessStatCardProps {
  value: ReactNode;
  label: string;
  bgColor: string;
  textColor: string;
  valueColor: string;
}

export default function BusinessStatCard({
  value,
  label,
  bgColor,
  textColor,
  valueColor,
}: BusinessStatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-4`}>
      <p className={`text-xl font-bold ${valueColor} mb-1`}>{value}</p>
      <p className={`text-xs ${textColor}`}>{label}</p>
    </div>
  );
}

