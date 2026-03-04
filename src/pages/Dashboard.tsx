import React from 'react';
import { useData } from '@/lib/store';
import { useAuth } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { transactions } = useData();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const recentTransactions = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const fmt = (n: number) => '৳' + n.toLocaleString('en-BD', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your financial overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="stat-card-income">
          <CardContent className="py-5 px-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold">{fmt(totalIncome)}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-income/10">
              <TrendingUp className="h-5 w-5 text-income" />
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card-expense">
          <CardContent className="py-5 px-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Expense</p>
              <p className="text-2xl font-bold">{fmt(totalExpense)}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-expense/10">
              <TrendingDown className="h-5 w-5 text-expense" />
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card-balance">
          <CardContent className="py-5 px-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-2xl font-bold">{fmt(balance)}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="py-4 px-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          {recentTransactions.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">No transactions yet. Start by adding income or expenses.</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map(t => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${t.type === 'income' ? 'bg-income/10' : 'bg-expense/10'}`}>
                      {t.type === 'income' ? <ArrowUpRight className="h-4 w-4 text-income" /> : <ArrowDownRight className="h-4 w-4 text-expense" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.category}</p>
                      <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                    {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
