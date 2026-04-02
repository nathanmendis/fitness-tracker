import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, Bell, RefreshCw } from 'lucide-react';

const Navbar = ({ onShowInstall, onSync, isSyncing }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm">
      <div className="bg-[#0D3B66] border border-[#FDFBF7]/20 rounded-2xl shadow-prmium p-1.5 flex justify-around items-center gap-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'bg-[#FDFBF7] text-[#0D3B66]' 
                : 'text-[#FDFBF7]/60 hover:text-[#FDFBF7] hover:bg-white/5'
            }`
          }
        >
          <LayoutDashboard size={18} />
          <span className="text-[9px] font-black uppercase tracking-widest">Dash</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'bg-[#FDFBF7] text-[#0D3B66]' 
                : 'text-[#FDFBF7]/60 hover:text-[#FDFBF7] hover:bg-white/5'
            }`
          }
        >
          <BarChart3 size={18} />
          <span className="text-[9px] font-black uppercase tracking-widest">Stats</span>
        </NavLink>

        <button 
          onClick={onSync}
          disabled={isSyncing}
          className="flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl text-[#FDFBF7]/60 hover:text-[#FDFBF7] hover:bg-white/5 transition-all duration-300 disabled:opacity-50"
        >
          <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
          <span className="text-[9px] font-black uppercase tracking-widest">{isSyncing ? 'Sync...' : 'Sync'}</span>
        </button>

        <button 
          onClick={onShowInstall}
          className="flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl text-[#FDFBF7]/60 hover:text-[#FDFBF7] hover:bg-white/5 transition-all duration-300"
        >
          <Settings size={18} />
          <span className="text-[9px] font-black uppercase tracking-widest">Install</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
