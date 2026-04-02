import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorState = ({ error, onRetry }) => (
  <div className="h-screen flex flex-col items-center justify-center bg-[#FDFBF7] px-6 text-center">
    <div className="glass-card max-w-md w-full shadow-2xl">
      <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
      <h2 className="text-[#FDFBF7] text-lg font-bold mb-2 uppercase tracking-tight">Sync Failure</h2>
      <p className="text-[#FDFBF7]/80 text-sm mb-8 leading-relaxed font-medium">{error}</p>
      <button 
        onClick={onRetry} 
        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-[#FDFBF7] font-bold py-3 rounded-lg shadow-xl shadow-red-500/20 transition-all font-sans tracking-widest text-xs"
      >
        <RefreshCw size={18} /> RETRY CONNECTION
      </button>
    </div>
  </div>
);

export default ErrorState;
