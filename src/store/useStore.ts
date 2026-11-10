import { create } from 'zustand';
import { AppState, CartItem, Transaction } from '../types';

export const useAppStore = create<AppState>((set, get) => ({
  cart: [],
  transactions: [],
  totalBudget: 5000,
  isBrokeMode: false,

  addToCart: (item) => {
    const { cart } = get();
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      set({
        cart: cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => {
    const { cart } = get();
    set({ cart: cart.filter((i) => i.id !== id) });
  },

  checkoutCart: () => {
    const { cart, transactions } = get();
    const newTx: Transaction[] = cart.map((item) => ({
      id: crypto.randomUUID(),
      name: item.name,
      amount: item.price * item.quantity,
      category: item.category,
      timestamp: new Date().toISOString(),
    }));
    set({
      transactions: [...transactions, ...newTx],
      cart: [],
    });
  },

  addTransaction: (tx) => {
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...tx, id: crypto.randomUUID(), timestamp: new Date().toISOString() },
      ],
    }));
  },

  toggleBrokeMode: () => set((state) => ({ isBrokeMode: !state.isBrokeMode })),
  
  setTransactions: (txs) => set({ transactions: txs }),
}));
