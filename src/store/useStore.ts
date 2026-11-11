import { create } from 'zustand';
import { AppState, CartItem, Transaction } from '../types';

const INITIAL_CATEGORIES = ['Fuel', 'Junk', 'Utility', 'Fixed'];

const INITIAL_ITEMS: CartItem[] = [
  { id: '1', name: 'Veggies & Rice', price: 60, category: 'Fuel', icon: '🥦', quantity: 1 },
  { id: '2', name: 'Eggs & Milk', price: 50, category: 'Fuel', icon: '🥚', quantity: 1 },
  { id: '3', name: 'Maggi/Chips', price: 40, category: 'Junk', icon: '🍟', quantity: 1 },
  { id: '4', name: 'Swiggy/Zomato', price: 250, category: 'Junk', icon: '🍔', quantity: 1 },
  { id: '5', name: 'Auto/Bus', price: 40, category: 'Utility', icon: '🛺', quantity: 1 },
  { id: '6', name: 'Electricity/Rent', price: 500, category: 'Fixed', icon: '💡', quantity: 1 },
];

export const useAppStore = create<AppState>((set, get) => ({
  items: INITIAL_ITEMS,
  cart: [],
  transactions: [],
  categories: INITIAL_CATEGORIES,
  totalBudget: 5000,
  isBrokeMode: false,

  addCategory: (categoryName) => {
    const trimmed = categoryName.trim();
    if (trimmed && !get().categories.includes(trimmed)) {
      set((state) => ({ categories: [...state.categories, trimmed] }));
    }
  },

  addCustomItem: (newItem) => {
    set((state) => ({ items: [...state.items, { ...newItem, quantity: 1 }] }));
  },

  updateItemPrice: (id, newPrice) => {
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, price: newPrice } : i)),
    }));
  },

  addToCart: (item) => {
    const { cart } = get();
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      set({
        cart: cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
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
    set({ transactions: [...transactions, ...newTx], cart: [] });
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
  setItems: (items) => set({ items }),
}));
