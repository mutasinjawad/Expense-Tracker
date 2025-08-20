'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseAreaChart({ expenses }) {
  const dailyTotals = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!acc[date]) {
          acc[date] = 0;
      }
      acc[date] += expense.amount;
      return acc;
  }, {});

  const chartData = Object.entries(dailyTotals).map(([date, amount]) => ({
      date,
      amount,
  }));

  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

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
    <div className="lg:h-[35vh] h-full w-full rounded-xl border-[1px] border-zinc-300">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" textAnchor="middle" height={30} tick={{ fontSize: 12 }}/>
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3F3F46" 
            fill="#3F3F46"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
