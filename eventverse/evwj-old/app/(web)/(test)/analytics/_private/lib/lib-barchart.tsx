import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

type BarConfig = {
  dataKey: string;
  name: string;
  fill: string;
};

type ChartDimensions = {
  width?: string | number;
  maxWidth?: string | number;
  height?: number;
};

type ReusableBarChartProps<T extends Record<string, any>> = {
  data: T[];
  title: string;
  bars: BarConfig[];
  yAxisLabel?: string;
  isAnimationActive?: boolean;
  getDescription?: (label: string | number | undefined) => string;
  dimensions?: ChartDimensions;
  barSize?: number;
};

const DefaultTooltip = ({
  active,
  payload,
  label,
  getDescription,
}: TooltipProps<number, string> & { getDescription?: (label: string | number | undefined) => string }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-md bg-white p-3 shadow-md border text-sm">
      <p className="font-semibold">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
      {getDescription && <p className="text-gray-500 mt-1">{getDescription(label)}</p>}
    </div>
  );
};

export function ReusableBarChart<T extends Record<string, any>>({
  data,
  title,
  bars,
  yAxisLabel = 'Score (%)',
  isAnimationActive = true,
  getDescription,
  dimensions = { width: '100%', maxWidth: 1000, height: 400 },
  barSize = 25,
}: ReusableBarChartProps<T>) {
  const CustomTooltip = (props: TooltipProps<number, string>) => (
    <DefaultTooltip {...props} getDescription={getDescription} />
  );

  return (
    <div style={{ width: dimensions.width, maxWidth: dimensions.maxWidth }}>
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{title}</h2>
      <div style={{ width: '100%', height: dimensions.height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip
              content={<CustomTooltip />}
              isAnimationActive={isAnimationActive}
            />
            <Legend />
            {bars.map((bar) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                barSize={barSize}
                fill={bar.fill}
                isAnimationActive={isAnimationActive}
                name={bar.name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
