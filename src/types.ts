export type CategoryType = 'Fuel' | 'Junk' | 'Utility' | 'Fixed';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: CategoryType;
  icon: string;
  quantity: number;
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: CategoryType;
  splitWith?: string | null;
  timestamp: string;
}

export interface AppState {
  cart: CartItem[];
  transactions: Transaction[];
  totalBudget: number;
  isBrokeMode: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  checkoutCart: () => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void;
  toggleBrokeMode: () => void;
  setTransactions: (txs: Transaction[]) => void;
}
