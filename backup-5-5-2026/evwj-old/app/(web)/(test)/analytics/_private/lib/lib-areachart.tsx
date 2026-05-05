import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AreaConfig {
  dataKey: string;
  stroke: string;
  fill: string;
  stackId?: string;
  type?: 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
}

export function ReusableAreaChart(props: {
  data: unknown[];
  areas: AreaConfig[];
  title?: string;
  xAxisKey: string;
  yAxisWidth?: number | string;
  isAnimationActive?: boolean;
  tooltipFormatter?: (data: unknown) => React.ReactNode;
  dimensions?: { width?: string | number; height?: number };
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
}) {
  const {
    data,
    areas,
    title,
    xAxisKey,
    yAxisWidth = 'auto',
    isAnimationActive = true,
    tooltipFormatter,
    dimensions = { width: '100%', height: 400 },
    margin = { top: 20, right: 30, left: 0, bottom: 0 },
  } = props;

  const CustomTooltip = (tooltipProps: unknown): React.ReactNode => {
    const { active, payload } = tooltipProps as { active?: boolean; payload?: unknown[] };

    if (!active || !payload || !payload.length) return null;

    if (tooltipFormatter) {
      return tooltipFormatter(payload);
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {title && <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>}
      <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
        <AreaChart data={data as unknown[]} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
          <XAxis 
            dataKey={xAxisKey}
            className="text-gray-700 dark:text-gray-300"
          />
          <YAxis 
            width={typeof yAxisWidth === 'number' ? yAxisWidth : undefined}
            className="text-gray-700 dark:text-gray-300"
          />
          {tooltipFormatter && <Tooltip content={<CustomTooltip />} />}
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type={area.type || 'monotone'}
              dataKey={area.dataKey}
              stackId={area.stackId}
              stroke={area.stroke}
              fill={area.fill}
              isAnimationActive={isAnimationActive}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
