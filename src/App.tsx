import React, { useState } from 'react';
import { QuickMartGrid } from './components/mart/QuickMartGrid';
import { CartDrawer } from './components/mart/CartDrawer';
import { Ledger } from './components/ledger/Ledger';
import { RadarDashboard } from './components/analytics/RadarDashboard';
import { SurvivalSandbox } from './components/analytics/SurvivalSandbox';
import { SmartLogger } from './components/ai/SmartLogger';

export default function App() {
  const [activeTab, setActiveTab] = useState<'mart' | 'radar' | 'warroom'>('mart');

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-24 font-sans">
      <header className="flex justify-around p-4 border-b border-neutral-800 bg-neutral-950">
        <button onClick={() => setActiveTab('mart')} className={activeTab === 'mart' ? 'text-green-400' : 'text-gray-500'}>🛒 Quick-Mart</button>
        <button onClick={() => setActiveTab('radar')} className={activeTab === 'radar' ? 'text-green-400' : 'text-gray-500'}>📊 Radar</button>
        <button onClick={() => setActiveTab('warroom')} className={activeTab === 'warroom' ? 'text-green-400' : 'text-gray-500'}>⚔️ War Room</button>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {activeTab === 'mart' && (
          <div className="space-y-6">
            <SmartLogger />
            <QuickMartGrid />
            <Ledger />
          </div>
        )}
        {activeTab === 'radar' && <RadarDashboard />}
        {activeTab === 'warroom' && <SurvivalSandbox />}
      </main>

      <CartDrawer />
    </div>
  );
}
