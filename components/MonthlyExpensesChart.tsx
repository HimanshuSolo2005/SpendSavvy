'use client'; 

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Transaction } from '@/lib/sharedTypes'; 
import { format, parseISO } from 'date-fns';

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
}

interface ChartData {
  month: string;
  total: number;
}

export default function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const monthlyDataMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    const monthYear = format(parseISO(transaction.date), 'yyyy-MM');
    const currentTotal = monthlyDataMap.get(monthYear) || 0;
    monthlyDataMap.set(monthYear, currentTotal + transaction.amount);
  });

  const chartData: ChartData[] = Array.from(monthlyDataMap.entries())
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month)); 

  const formattedChartData = chartData.map(data => ({
    ...data,
    month: format(parseISO(`${data.month}-01`), 'MMM yyyy') 
  }));


  if (formattedChartData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No expense data to display yet. Add some transactions to see your chart!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={formattedChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Bar dataKey="total" fill="#8884d8" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}