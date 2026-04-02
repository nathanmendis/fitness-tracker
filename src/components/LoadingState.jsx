import React from 'react';

const LoadingState = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-[#FDFBF7] gap-4">
    <div className="text-[#0D3B66] text-2xl font-bold tracking-tight">Synchronizing Data...</div>
    <div className="text-[#0D3B66]/60 text-[10px] font-bold uppercase tracking-widest">Connecting to Database</div>
  </div>
);

export default LoadingState;
