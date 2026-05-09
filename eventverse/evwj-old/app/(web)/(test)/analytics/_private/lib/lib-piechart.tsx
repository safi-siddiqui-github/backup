import React from 'react';
import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip } from 'recharts';

const RADIAN = Math.PI / 180;

const createRenderCustomizedLabel = (renderLabel?: (props: unknown) => React.ReactNode) => {
  return (props: PieLabelRenderProps): React.ReactNode => {
    if (renderLabel) {
      return renderLabel(props);
    }

    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (typeof cx !== 'number' || typeof cy !== 'number' || !innerRadius || !outerRadius) {
      return null;
    }

    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${((percent ?? 0) * 100).toFixed(0)}%`}
      </text>
    );
  };
};

const createTooltipContent = (tooltipFormatter?: (data: unknown) => React.ReactNode) => {
  return (props: unknown): React.ReactNode => {
    const { active, payload } = props as { active?: boolean; payload?: unknown[] };

    if (!active || !payload || !payload.length) return null;

    if (tooltipFormatter) {
      return tooltipFormatter(payload[0]);
    }

    return null;
  };
};

export function ReusablePieChart(props: {
  data: unknown[];
  title: string;
  colors: string[];
  isAnimationActive?: boolean;
  renderLabel?: (props: unknown) => React.ReactNode;
  tooltipFormatter?: (data: unknown) => React.ReactNode;
  dimensions?: { width?: string | number; height?: number };
}) {
  const {
    data,
    title,
    colors,
    isAnimationActive = true,
    renderLabel,
    tooltipFormatter,
    dimensions = { width: '100%', height: 400 },
  } = props;

  const dims = dimensions as { width?: string | number; height?: number };
  const CustomLabel = createRenderCustomizedLabel(renderLabel as (props: unknown) => React.ReactNode | undefined);
  const CustomTooltip = createTooltipContent(tooltipFormatter as (data: unknown) => React.ReactNode | undefined);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <ResponsiveContainer width={dims.width} height={dims.height}>
        <PieChart>
          <Pie
            data={data as unknown[]}
            labelLine={false}
            label={CustomLabel}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={isAnimationActive}
          >
            {(data as unknown[]).map((entry: unknown, index: number) => {
              const item = entry as { name?: string };
              return <Cell key={`cell-${item.name || index}`} fill={colors[index % colors.length]} />;
            })}
          </Pie>
          {tooltipFormatter && <Tooltip content={<CustomTooltip />} />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
