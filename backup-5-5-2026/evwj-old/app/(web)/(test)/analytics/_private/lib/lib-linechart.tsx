"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

 
import { CurveType } from "recharts/types/shape/Curve";

export type LineConfig = {
  dataKey: string;
  stroke?: string;
  type?: CurveType;
  activeDot?: object;
  strokeWidth?: number;
  dot?: boolean;
};

export type SimpleLineChartProps = {
  data: any[];
  lines: LineConfig[];
  xKey?: string;
  height?: number;
  customTooltip?: ((props: any) => React.ReactNode);
};

export default function SimpleLineChart({
  data,
  lines,
  xKey = "name",
  height = 350,
  customTooltip
}: SimpleLineChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          {customTooltip ? <Tooltip content={customTooltip} /> : <Tooltip />}
          <Legend />
          {lines.map((line, idx) => (
            <Line
              key={`${line.dataKey}-${idx}`}
              type={line.type ?? "monotone"}
              dataKey={line.dataKey}
              stroke={line.stroke}
              activeDot={line.activeDot}
              strokeWidth={line.strokeWidth ?? 2}
              dot={line.dot ?? false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
