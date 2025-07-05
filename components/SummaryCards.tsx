'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, List } from 'lucide-react'; 
import { Transaction } from '@/lib/sharedTypes'; 
import { format } from 'date-fns';

interface SummaryCardsProps {
  totalExpenses: number;
  recentTransactions: Transaction[];
}

export default function SummaryCards({ totalExpenses, recentTransactions }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Expenses
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Current sum of all recorded transactions.
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Most Recent Transactions
          </CardTitle>
          <List className="h-4 w-4 text-muted-foreground" /> 
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {recentTransactions.map(t => (
                <li key={t._id} className="flex justify-between items-center">
                  <span>{t.description} ({format(new Date(t.date), 'MMM dd')})</span>
                  <span className="font-semibold">${t.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">No recent transactions.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}