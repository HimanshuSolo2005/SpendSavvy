export const predefinedCategories = [
  'Food',
  'Transport',
  'Utilities',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Education',
  'Salary',
  'Groceries',
  'Bills',

];


export interface Transaction {
  _id: string;
  amount: number;
  date: string; 
  description: string;
  category: string;
  createdAt: string; 
}