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
      <div className="text-center text-xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded px-4 py-1">
        {title}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimplePieChart;
