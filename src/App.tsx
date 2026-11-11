import React, { useState } from 'react';
import { QuickMartGrid } from './components/mart/QuickMartGrid';
import { CartDrawer } from './components/mart/CartDrawer';
import { Ledger } from './components/ledgers/Ledger';
import { RadarDashboard } from './components/analytics/RadarDashboard';
import { SurvivalSandbox } from './components/analytics/SurvivalSandbox';

export default function App() {
  const [activeTab, setActiveTab] = useState<'mart' | 'radar' | 'warroom'>('mart');

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-24 font-sans selection:bg-green-500 selection:text-black">
      {/* Navigation Header */}
      <header className="flex justify-around p-4 border-b border-neutral-800 bg-neutral-950 sticky top-0 z-40 shadow-md">
        <button 
          onClick={() => setActiveTab('mart')} 
          className={`font-bold transition-colors flex items-center gap-2 ${activeTab === 'mart' ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          🛒 Quick-Mart
        </button>
        <button 
          onClick={() => setActiveTab('radar')} 
          className={`font-bold transition-colors flex items-center gap-2 ${activeTab === 'radar' ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          📊 Radar
        </button>
        <button 
          onClick={() => setActiveTab('warroom')} 
          className={`font-bold transition-colors flex items-center gap-2 ${activeTab === 'warroom' ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          ⚔️ War Room
        </button>
      </header>

      {/* Main Content Area */}
      <main className="p-4 max-w-md mx-auto">
        {activeTab === 'mart' && (
          <div className="space-y-6">
            <QuickMartGrid />
            <Ledger />
          </div>
        )}
        
        {activeTab === 'radar' && <RadarDashboard />}
        
        {activeTab === 'warroom' && <SurvivalSandbox />}
      </main>

      {/* Floating Checkout Drawer */}
      <CartDrawer />
    </div>
  );
}