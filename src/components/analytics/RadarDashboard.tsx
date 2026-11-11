import React from 'react';
import { useAppStore } from '../../store/useStore';

export function RadarDashboard() {
  const transactions = useAppStore((state) => state.transactions);
  const totalBudget = useAppStore((state) => state.totalBudget);

  const totalSpent = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentage = Math.min((totalSpent / totalBudget) * 100, 100);

  const categoryTotals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 pb-24">
      <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-2">Financial Radar</h2>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-neutral-400">Budget: ₹{totalBudget}</span>
          <span className={remaining > 500 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
            Left: ₹{remaining}
          </span>
        </div>
        
        <div className="h-4 w-full bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${percentage > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
            style={{ width: `${percentage}%` }} 
          />
        </div>
      </div>

      <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
        <h3 className="text-sm font-bold text-neutral-300 mb-4">Spend by Category</h3>
        <div className="space-y-3">
          {Object.entries(categoryTotals).map(([cat, amount]) => (
            <div key={cat} className="flex justify-between items-center border-b border-neutral-700 pb-2 last:border-0">
              <span className="text-white">{cat}</span>
              <span className="text-neutral-400 font-mono">₹{amount as number}</span>
            </div>
          ))}
          {Object.keys(categoryTotals).length === 0 && (
            <p className="text-neutral-500 text-xs">No spending data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}