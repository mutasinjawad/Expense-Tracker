'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const categoryConfig = {
  Food: { label: 'Food', color: '#bef264' },
  Transport: { label: 'Transport', color: '#d9f99d' },
  Shopping: { label: 'Shopping', color: '#a3e635' },
  Entertainment: { label: 'Entertainment', color: '#65a30d' },
  Healthcare: { label: 'Healthcare', color: '#4d7c0f' },
  Utilities: { label: 'Utilities', color: '#84cc16' },
  Others: { label: 'Others', color: '#3f6212' },
};

export default function ExpenseChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: categoryConfig[category]?.label || 'Others',
    value: amount,
    color: categoryConfig[category]?.color || '#6b7280',
  }));

  chartData.sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-blue-600">${data.value.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            {((data.value / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div className="lg:h-[35vh] h-[30vh] w-full rounded-xl border-[1px] border-zinc-300">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}