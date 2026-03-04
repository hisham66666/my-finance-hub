export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export const INCOME_CATEGORIES = [
  'Salary', 'Freelance', 'Business', 'Investment', 'Rental', 'Other Income'
] as const;

export const EXPENSE_CATEGORIES = [
  'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Bills', 'Other Expense'
] as const;
