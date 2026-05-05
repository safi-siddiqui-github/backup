import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export type RadarLineConfig = {
  name: string;
  dataKey: string;
  stroke?: string;
  fill?: string;
  fillOpacity?: number;
};

export type SimpleRadarChartProps = {
  data: any[];
  lines: RadarLineConfig[];
  angleKey?: string;
  outerRadius?: string | number;
  height?: number;
  legend?: boolean;
  customTooltip?: React.ComponentType<any>;
};

export function SimpleRadarChart({
  data,
  lines,
  angleKey = "subject",
  outerRadius = "80%",
  height = 350,
  legend = true,
  customTooltip,
}: SimpleRadarChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          outerRadius={outerRadius}
          margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey={angleKey} />
          <PolarRadiusAxis />
          {lines.map((line, idx) => (
            <Radar
              key={line.dataKey + idx}
              name={line.name}
              dataKey={line.dataKey}
              stroke={line.stroke}
              fill={line.fill}
              fillOpacity={line.fillOpacity ?? 0.6}
            />
          ))}
          {customTooltip ? <Tooltip content={(props) => React.createElement(customTooltip, props)} /> : <Tooltip />}
          {legend && <Legend />}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
