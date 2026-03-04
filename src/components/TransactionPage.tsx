import React, { useState } from 'react';
import { useData } from '@/lib/store';
import type { Transaction } from '@/lib/types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/lib/types';
import TransactionForm from '@/components/TransactionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Props {
  type: 'income' | 'expense';
}

const TransactionPage: React.FC<Props> = ({ type }) => {
  const { transactions, deleteTransaction } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const items = transactions.filter(t => t.type === type).sort((a, b) => b.date.localeCompare(a.date));
  const total = items.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{type === 'income' ? 'Income' : 'Expenses'}</h1>
          <p className="text-muted-foreground">Manage your {type} records</p>
        </div>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Add {type === 'income' ? 'Income' : 'Expense'}
        </Button>
      </div>

      <Card className={type === 'income' ? 'stat-card-income' : 'stat-card-expense'}>
        <CardContent className="py-4 px-6">
          <p className="text-sm text-muted-foreground">Total {type === 'income' ? 'Income' : 'Expenses'}</p>
          <p className="text-2xl font-bold">৳{total.toLocaleString('en-BD', { minimumFractionDigits: 2 })}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No {type} records yet</TableCell></TableRow>
              ) : items.map(t => (
                <TableRow key={t.id}>
                  <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{t.description || '—'}</TableCell>
                  <TableCell className="text-right font-medium">৳{t.amount.toLocaleString('en-BD', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(t); setDialogOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteTransaction(t.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}</DialogTitle>
          </DialogHeader>
          <TransactionForm type={type} categories={categories} editingTransaction={editing} onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionPage;
