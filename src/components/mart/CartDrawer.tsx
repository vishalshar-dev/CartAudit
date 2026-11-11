import React from 'react';
import { useAppStore } from '../../store/useStore';

export function CartDrawer() {
  const items = useAppStore((state) => state.items);
  const addTransaction = useAppStore((state) => state.addTransaction);
  const clearCart = useAppStore((state) => state.clearCart);

  const totalPrice = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Record each item or a summary as a transaction
    items.forEach((item) => {
      addTransaction({
        id: crypto.randomUUID(),
        name: `${item.name} (x${item.quantity || 1})`,
        amount: item.price * (item.quantity || 1),
        category: item.category,
        timestamp: new Date().toISOString(),
      });
    });

    clearCart();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 p-4 shadow-2xl z-50 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-xs text-neutral-400 block">Total Cart Value</span>
          <span className="text-lg font-bold text-green-400">₹{totalPrice}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            items.length > 0
              ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
          }`}
        >
          Checkout ({items.reduce((sum, i) => sum + (i.quantity || 1), 0)})
        </button>
      </div>
    </div>
  );
}