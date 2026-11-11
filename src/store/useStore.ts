import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  timestamp: string;
  splitWith?: string | null;
}

export interface AppState {
  items: CartItem[];
  transactions: Transaction[];
  totalBudget: number;
  isBrokeMode: boolean;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  addItem: (item: CartItem) => void;
  addToCart: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  addTransaction: (tx: Transaction) => void;
  setTransactions: (txs: Transaction[]) => void;
  toggleBrokeMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  items: [],
  transactions: [],
  totalBudget: 5000,
  isBrokeMode: false,
  categories: ['All', 'Groceries', 'Junk'],
  selectedCategory: 'All',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  
  addItem: (item) => set((state) => {
    const existingIndex = state.items.findIndex((i) => i.id === item.id);
    if (existingIndex > -1) {
      const newItems = [...state.items];
      const currentQty = newItems[existingIndex].quantity || 1;
      newItems[existingIndex] = { ...newItems[existingIndex], quantity: currentQty + 1 };
      return { items: newItems };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),

  addToCart: (item) => set((state) => {
    const existingIndex = state.items.findIndex((i) => i.id === item.id);
    if (existingIndex > -1) {
      const newItems = [...state.items];
      const currentQty = newItems[existingIndex].quantity || 1;
      newItems[existingIndex] = { ...newItems[existingIndex], quantity: currentQty + 1 };
      return { items: newItems };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map((i) => {
      if (i.id === id) {
        const newQty = (i.quantity || 1) + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : null;
      }
      return i;
    }).filter(Boolean) as CartItem[],
  })),

  clearCart: () => set({ items: [] }),

  addTransaction: (tx) => set((state) => ({
    transactions: [tx, ...state.transactions],
  })),

  setTransactions: (txs) => set({ transactions: txs }),

  toggleBrokeMode: () => set((state) => ({
    isBrokeMode: !state.isBrokeMode,
  })),
}));