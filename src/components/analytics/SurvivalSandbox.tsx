import React from 'react';
import { useAppStore } from '../../store/useStore';

export function SurvivalSandbox() {
  const isBrokeMode = useAppStore((state) => state.isBrokeMode);
  const toggleBrokeMode = useAppStore((state) => state.toggleBrokeMode);
  
  return (
    <div className="space-y-4 pb-24">
      <div className={`p-6 rounded-xl border transition-all ${isBrokeMode ? 'bg-red-900/20 border-red-900' : 'bg-neutral-800 border-neutral-700'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">⚔️ War Room</h2>
        </div>
        <p className="text-sm text-neutral-400 mb-6">
          Activate Broke Mode to instantly lock all non-essential "Junk" category purchases in the Quick-Mart grid.
        </p>

        <button 
          onClick={toggleBrokeMode}
          className={`w-full py-4 rounded-xl font-bold tracking-wider transition-all ${
            isBrokeMode 
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
              : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'
          }`}
        >
          {isBrokeMode ? 'DEFCON 1: BROKE MODE ACTIVE' : 'ACTIVATE BROKE MODE'}
        </button>
      </div>
    </div>
  );
}