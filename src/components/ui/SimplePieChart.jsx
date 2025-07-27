// src/components/ui/SimplePieChart.jsx

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7f50',
  '#8dd1e1',
  '#a4de6c',
  '#d0ed57',
  '#ffc0cb',
  '#ffbb28',
  '#00C49F',
  '#FF8042',
];

const SimplePieChart = ({ data, title }) => {
  return (
    <div className="flex flex-col items-center w-1/3">
      <div className="text-center text-2xl font-semibold mb-2 bg-[linear-gradient(to_right,_#2e8b84,_#75c3b9)] text-white rounded px-4 py-1">
        {title}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ percent }) => (percent > 0.02 ? `${(percent * 100).toFixed(0)}%` : '')}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            position="outside"
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimplePieChart;
