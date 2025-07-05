'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Transaction } from '@/lib/sharedTypes'; 


interface CategoryPieChartProps {
  transactions: Transaction[];
}

const COLORS = [
  '#8884d8', // Purple
  '#82ca9d', // Green
  '#ffc658', // Yellow
  '#ff8042', // Orange
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Gold
  '#FF8042', // Coral (repeated, add more as needed)
  '#A282CA', // Muted Purple
  '#E67399', // Pink
  '#66CCFF', // Light Blue
  '#99CC00', // Lime Green
  '#B2B2B2', // Grey for Uncategorized
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; name: string }[]; 
}

export default function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const categoryDataMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      const category = transaction.category || 'Uncategorized';
      const currentTotal = categoryDataMap.get(category) || 0;
      categoryDataMap.set(category, currentTotal + transaction.amount);
    }
  });

  const chartData = Array.from(categoryDataMap.entries())
    .map(([name, value]) => ({ name, value }))
    .filter(data => data.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No categorized expense data to display yet. Add some categorized transactions!
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => { 
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded shadow-md">
          <p className="font-bold text-lg">{`${payload[0].name}`}</p>
          <p className="text-sm">{`Amount: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}