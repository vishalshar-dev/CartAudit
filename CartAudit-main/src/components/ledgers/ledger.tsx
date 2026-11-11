import React, { useState } from 'react';
import { useAppStore } from '../../store/useStore';
import { useSyncStore } from '../../utils/db';

export function Ledger() {
  useSyncStore(); // Automatically syncs with IndexedDB

  const transactions = useAppStore((state) => state.transactions);
  const setTransactions = useAppStore((state) => state.setTransactions);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [splitName, setSplitName] = useState('');

  const totalOwedToMe = transactions.reduce(
    (sum, tx) => sum + (tx.splitWith ? tx.amount : 0), 0
  );

  const handleSplitSubmit = (id: string) => {
    const updated = transactions.map((tx) =>
      tx.id === id ? { ...tx, splitWith: splitName.trim() || null } : tx
    );
    setTransactions(updated);
    setEditingId(null);
    setSplitName('');
  };

  const sortedTx = [...transactions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Ledger & Udhaar</h2>
        <div className="bg-neutral-900 px-3 py-1 rounded-lg border border-neutral-700">
          <span className="text-xs text-neutral-400 block">Owed to me</span>
          <span className="text-green-400 font-bold">₹{totalOwedToMe}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {sortedTx.length === 0 ? (
          <p className="text-neutral-500 text-sm text-center py-4">No expenses yet.</p>
        ) : (
          sortedTx.map((tx) => (
            <div key={tx.id} className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium">{tx.name}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(tx.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <p className="text-red-400 font-bold">₹{tx.amount}</p>
              </div>

              {editingId === tx.id ? (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Who owes you this? (e.g. Harsh)"
                    className="flex-1 bg-neutral-800 border border-neutral-600 rounded-md px-2 py-1 text-xs text-white outline-none"
                    value={splitName}
                    onChange={(e) => setSplitName(e.target.value)}
                    autoFocus
                  />
                  <button 
                    onClick={() => handleSplitSubmit(tx.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-bold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center mt-2 border-t border-neutral-800 pt-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-neutral-800 rounded-md text-neutral-400">
                    {tx.category}
                  </span>
                  
                  {tx.splitWith ? (
                    <button onClick={() => setEditingId(tx.id)} className="text-xs text-green-400 font-medium px-2 py-1 bg-green-400/10 rounded-md">
                      Split with: {tx.splitWith}
                    </button>
                  ) : (
                    <button onClick={() => setEditingId(tx.id)} className="text-xs text-neutral-500 hover:text-white transition-colors">
                      + Split bill
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}