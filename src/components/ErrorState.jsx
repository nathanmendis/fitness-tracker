import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorState = ({ error, onRetry, onReset }) => (
  <div className="h-screen flex flex-col items-center justify-center bg-[#FDFBF7] px-6 text-center">
    <div className="glass-card max-w-md w-full shadow-2xl p-8">
      <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
      <h2 className="text-[#FDFBF7] text-xl font-black mb-2 uppercase tracking-tighter">Sync Failure</h2>
      <p className="text-[#FDFBF7]/60 text-sm mb-8 leading-relaxed font-medium">{error}</p>
      
      <div className="space-y-3">
        <button 
          onClick={onRetry} 
          className="w-full flex items-center justify-center gap-2 bg-[#FDFBF7] hover:bg-[#FDFBF7]/90 text-[#0D3B66] font-black py-4 rounded-xl shadow-xl transition-all uppercase text-[10px] tracking-[0.2em]"
        >
          <RefreshCw size={14} /> RETRY CONNECTION
        </button>

        <button 
          onClick={onReset} 
          className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#FDFBF7]/20 hover:border-[#FDFBF7]/40 text-[#FDFBF7] font-black py-4 rounded-xl transition-all uppercase text-[10px] tracking-[0.2em]"
        >
          RESET SHEET ID
        </button>
      </div>
    </div>
  </div>
);

export default ErrorState;
