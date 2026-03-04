import React, { useMemo, useState } from 'react';
import { useData } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const MonthlySummary = () => {
  const { transactions } = useData();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());

  const years = useMemo(() => {
    const set = new Set(transactions.map(t => new Date(t.date).getFullYear()));
    set.add(currentYear);
    return Array.from(set).sort((a, b) => b - a);
  }, [transactions, currentYear]);

  const chartData = useMemo(() => {
    return months.map((name, i) => {
      const monthTxns = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getFullYear() === parseInt(year) && d.getMonth() === i;
      });
      return {
        name,
        Income: monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        Expense: monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
      };
    });
  }, [transactions, year]);

  const totalIncome = chartData.reduce((s, d) => s + d.Income, 0);
  const totalExpense = chartData.reduce((s, d) => s + d.Expense, 0);
  const fmt = (n: number) => '৳' + n.toLocaleString('en-BD', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Monthly Summary</h1>
          <p className="text-muted-foreground">Income vs Expense breakdown</p>
        </div>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="stat-card-income">
          <CardContent className="py-4 px-6">
            <p className="text-sm text-muted-foreground">Yearly Income</p>
            <p className="text-xl font-bold">{fmt(totalIncome)}</p>
          </CardContent>
        </Card>
        <Card className="stat-card-expense">
          <CardContent className="py-4 px-6">
            <p className="text-sm text-muted-foreground">Yearly Expense</p>
            <p className="text-xl font-bold">{fmt(totalExpense)}</p>
          </CardContent>
        </Card>
        <Card className="stat-card-balance">
          <CardContent className="py-4 px-6">
            <p className="text-sm text-muted-foreground">Net Savings</p>
            <p className="text-xl font-bold">{fmt(totalIncome - totalExpense)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses ({year})</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Legend />
              <Bar dataKey="Income" fill="hsl(var(--income))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expense" fill="hsl(var(--expense))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlySummary;
