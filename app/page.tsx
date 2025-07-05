'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import SummaryCards from '@/components/SummaryCards';

// NEW: Import predefinedCategories and Transaction type from the new shared file
import { predefinedCategories, Transaction } from '@/lib/sharedTypes';


export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      if (data.success) {
        const sortedTransactions = data.data.sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTransactions(sortedTransactions);
      } else {
        toast.error(data.message || 'An unknown error occurred.', {});
      }
    } catch (error) {
      toast.error(`Failed to load transactions: ${(error as Error).message}`);
      console.error('Error fetching transactions:', error);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleNewTransaction = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Transaction Deleted', {
          description: 'The transaction has been successfully deleted.',
        });
        fetchTransactions();
      } else {
        toast.error('Error deleting transaction', {
          description: data.message || 'An unknown error occurred.',
        });
      }
    } catch (error) {
      toast.error(`Failed to delete transaction: ${(error as Error).message}`);
      console.error('Error deleting transaction:', error);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
    fetchTransactions();
    toast.success(editingTransaction ? 'Transaction Updated' : 'Transaction Added', {
      description: `Your transaction has been successfully ${editingTransaction ? 'updated' : 'added'}.`,
    });
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const recentTransactions = transactions.slice(0, 5);


  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Personal Finance Visualizer</h1>

      <section className="mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
        <SummaryCards totalExpenses={totalExpenses} recentTransactions={recentTransactions} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Monthly Expenses Overview</h2>
          <MonthlyExpensesChart transactions={transactions} />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Expenses by Category</h2>
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>

      <section className="mb-8 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewTransaction}>Add New Transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
              </DialogHeader>
              <TransactionForm
                initialData={editingTransaction}
                onSuccess={handleFormSuccess}
                onClose={() => setIsFormOpen(false)}
                categories={predefinedCategories}
              />
            </DialogContent>
          </Dialog>
        </div>
        <TransactionList
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </section>
    </main>
  );
}