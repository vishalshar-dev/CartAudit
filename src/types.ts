export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string; // Dynamic string instead of a locked union
  icon: string;
  quantity: number;
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  splitWith?: string | null;
  timestamp: string;
}

export interface AppState {
  items: CartItem[];
  cart: CartItem[];
  transactions: Transaction[];
  categories: string[]; // Dynamic categories list managed by user
  totalBudget: number;
  isBrokeMode: boolean;
  
  // Ultimate Freedom Actions
  addCategory: (categoryName: string) => void;
  addCustomItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
  
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  checkoutCart: () => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void;
  toggleBrokeMode: () => void;
  setTransactions: (txs: Transaction[]) => void;
  setItems: (items: CartItem[]) => void;
}
