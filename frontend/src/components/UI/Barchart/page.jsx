'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const categoryConfig = {
  Food: { label: 'Food', color: '#bef264' },
  Transport: { label: 'Transport', color: '#d9f99d' },
  Shopping: { label: 'Shopping', color: '#a3e635' },
  Entertainment: { label: 'Entertainment', color: '#65a30d' },
  Healthcare: { label: 'Healthcare', color: '#4d7c0f' },
  Utilities: { label: 'Utilities', color: '#84cc16' },
  Others: { label: 'Others', color: '#3f6212' },
};

export default function ExpenseBarChart({ expenses }) {
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
    amount: amount,
    color: categoryConfig[category]?.color || '#6b7280',
  }));

  chartData.sort((a, b) => b.amount - a.amount);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-blue-600">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
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
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" textAnchor="middle" height={30} tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]} >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}