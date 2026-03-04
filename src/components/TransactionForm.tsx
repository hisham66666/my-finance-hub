import React, { useState } from 'react';
import { useData } from '@/lib/store';
import type { Transaction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Props {
  type: 'income' | 'expense';
  categories: readonly string[];
  editingTransaction?: Transaction | null;
  onClose?: () => void;
  open?: boolean;
}

const TransactionForm: React.FC<Props> = ({ type, categories, editingTransaction, onClose, open }) => {
  const { addTransaction, updateTransaction } = useData();
  const [amount, setAmount] = useState(editingTransaction?.amount?.toString() || '');
  const [category, setCategory] = useState(editingTransaction?.category || '');
  const [date, setDate] = useState(editingTransaction?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(editingTransaction?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    const data = { amount: parseFloat(amount), category, date, description, type };
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }
    setAmount(''); setCategory(''); setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Amount (৳)</Label>
        <Input type="number" step="0.01" min="0" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Input placeholder="Brief description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <Button type="submit" className="w-full">{editingTransaction ? 'Update' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}</Button>
    </form>
  );
};

export default TransactionForm;
