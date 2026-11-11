import React, { useState } from 'react';
import { useAppStore } from '../../store/useStore';

export function QuickMartGrid() {
  const items = useAppStore((state) => state.items);
  const categories = useAppStore((state) => state.categories);
  const addToCart = useAppStore((state) => state.addToCart);
  const addCustomItem = useAppStore((state) => state.addCustomItem);
  const addCategory = useAppStore((state) => state.addCategory);
  const updateItemPrice = useAppStore((state) => state.updateItemPrice);
  const isBrokeMode = useAppStore((state) => state.isBrokeMode);

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'Fuel');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    let finalCategory = selectedCategory;
    if (isCreatingCategory && newCategoryInput.trim()) {
      finalCategory = newCategoryInput.trim();
      addCategory(finalCategory);
    }

    addCustomItem({
      id: crypto.randomUUID(),
      name,
      price: Number(price),
      category: finalCategory,
      icon: '✨',
    });

    setName('');
    setPrice('');
    setIsAdding(false);
    setIsCreatingCategory(false);
    setNewCategoryInput('');
  };

  const handlePriceUpdate = (id: string) => {
    if (tempPrice) {
      updateItemPrice(id, Number(tempPrice));
    }
    setEditingId(null);
    setTempPrice('');
  };

  return (
    <div className="space-y-4 pb-24">
      {/* User Freedom Controls */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="w-full bg-neutral-800 border border-dashed border-neutral-600 hover:border-green-500 text-neutral-300 py-2.5 rounded-xl text-sm font-semibold transition-colors"
      >
        + Add New Custom Item & Category
      </button>

      {isAdding && (
        <form onSubmit={handleCreateItem} className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 space-y-3 shadow-lg">
          <h3 className="text-sm font-bold text-white">Create Custom Item</h3>
          
          <input
            type="text"
            placeholder="Item name (e.g. Netflix Subscription)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white outline-none"
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white outline-none"
          />

          {/* Dynamic Category Selector / Creator */}
          <div className="space-y-2">
            <label className="text-xs text-neutral-400 block">Category</label>
            {!isCreatingCategory ? (
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsCreatingCategory(true)}
                  className="bg-neutral-700 text-xs px-3 rounded-lg text-white font-medium hover:bg-neutral-600"
                >
                  + New Category
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type new category name..."
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="flex-1 bg-neutral-900 border border-green-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsCreatingCategory(false)}
                  className="bg-neutral-700 text-xs px-3 rounded-lg text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-sm font-bold">
            Save Item to Grid
          </button>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const isDisabled = isBrokeMode && item.category === 'Junk';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col items-center justify-between transition-all ${
                isDisabled
                  ? 'bg-neutral-900 border-neutral-800 opacity-40 grayscale'
                  : 'bg-neutral-800 border-neutral-700 hover:border-green-500'
              }`}
            >
              <div className="text-center w-full">
                <span className="text-4xl mb-2 block">{item.icon}</span>
                <h3 className="font-semibold text-sm text-neutral-200 truncate">{item.name}</h3>
                <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded text-neutral-400 mt-1 inline-block">
                  {item.category}
                </span>

                {/* Editable Price */}
                {editingId === item.id ? (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-green-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      value={tempPrice}
                      onChange={(e) => setTempPrice(e.target.value)}
                      placeholder={String(item.price)}
                      className="w-16 bg-neutral-900 border border-green-500 rounded px-1 text-sm text-white text-center outline-none"
                      autoFocus
                    />
                    <button onClick={() => handlePriceUpdate(item.id)} className="text-xs bg-green-600 px-2 py-1 rounded text-white font-bold">✓</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <p className="text-green-400 text-sm font-bold">₹{item.price}</p>
                    <button 
                      onClick={() => { setEditingId(item.id); setTempPrice(String(item.price)); }}
                      className="text-[10px] text-neutral-400 hover:text-white underline"
                    >
                      edit
                    </button>
                  </div>
                )}
              </div>

              <button
                disabled={isDisabled}
                onClick={() => addToCart(item)}
                className="mt-3 w-full bg-neutral-700 hover:bg-green-600 text-white py-2 rounded-lg text-xl font-bold transition-colors disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
