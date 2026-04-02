import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, RefreshCw, User, Settings, Smartphone, LogOut } from 'lucide-react';

const TopNavbar = ({ profile, onSync, isSyncing, onShowSettings, onLogout, onShowSetup }) => {
  return (
    <nav className="flex items-center justify-between py-4 px-4 md:py-6 md:px-16 sticky top-0 z-[100] bg-[#FDFBF7]/90 backdrop-blur-3xl border-b border-[#0D3B66]/5 w-full">
      {/* Brand Section */}
      <Link to="/" className="group flex items-center gap-3 md:gap-4 shrink-0">
        <div className="h-10 w-10 md:h-12 md:w-12 bg-[#0D3B66] text-[#FDFBF7] rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-3 transition-transform duration-500">
          <LayoutDashboard size={window.innerWidth < 768 ? 20 : 24} />
        </div>
        <div className="hidden lg:block">
          <h1 className="text-2xl font-black text-[#0D3B66] leading-none tracking-tighter uppercase transition-colors">
            FitSync<span className="opacity-40 italic">Pro</span>
          </h1>
          <p className="text-[8px] font-black text-[#0D3B66]/40 uppercase tracking-[0.5em] mt-2 leading-none">Fitness Tracking</p>
        </div>
      </Link>

      {/* Navigation Links - Centered */}
      <div className="hidden md:flex items-center justify-center flex-grow mx-4">
        <div className="flex items-center gap-2 bg-[#0D3B66]/5 p-1.5 rounded-2xl border border-[#0D3B66]/5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                isActive ? 'bg-[#0D3B66] text-[#FDFBF7] shadow-2xl scale-[1.02]' : 'text-[#0D3B66]/40 hover:text-[#0D3B66] hover:bg-[#0D3B66]/5'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                isActive ? 'bg-[#0D3B66] text-[#FDFBF7] shadow-2xl scale-[1.02]' : 'text-[#0D3B66]/40 hover:text-[#0D3B66] hover:bg-[#0D3B66]/5'
              }`
            }
          >
            Reports
          </NavLink>
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-3 md:gap-8 lg:gap-10 shrink-0">
        {/* Quick Actions Group */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <button
            onClick={onShowSetup}
            className="h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-lg md:rounded-xl bg-white border border-[#0D3B66]/10 text-[#0D3B66]/40 hover:text-[#0D3B66] hover:border-[#0D3B66]/30 transition-all shadow-sm group"
            title="Setup"
          >
            <Settings size={16} className="md:w-[18px] group-hover:rotate-90 transition-transform duration-700" />
          </button>

          <button
            onClick={onSync}
            disabled={isSyncing}
            className="h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-lg md:rounded-xl bg-white border border-[#0D3B66]/10 text-[#0D3B66]/40 hover:text-[#0D3B66] hover:border-[#0D3B66]/30 transition-all shadow-sm disabled:opacity-30 group"
            title="Sync Data"
          >
            <RefreshCw size={16} className={`${isSyncing ? 'animate-spin' : 'group-hover:rotate-180'} md:w-[18px] transition-transform duration-700`} />
          </button>

          <button
            onClick={onLogout}
            className="h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-lg md:rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all shadow-sm group"
            title="Sign Out"
          >
            <LogOut size={14} className="md:w-[16px] group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Profile Identity Group */}
        <div className="flex items-center gap-2 md:gap-4 md:pl-8 md:border-l border-[#0D3B66]/10 group cursor-default">
          <div className="text-right hidden xl:block">
            <p className="text-[11px] font-black text-[#0D3B66] tracking-tight leading-none truncate max-w-[120px] mb-1.5 uppercase">
              {profile?.Name?.split(' ')[0] || 'User'}
            </p>
            <p className="text-[7px] font-black text-[#0D3B66]/40 uppercase tracking-[0.4em] leading-none opacity-60">Verified</p>
          </div>
          <div className="h-9 w-9 md:h-12 md:w-12 rounded-lg md:rounded-2xl bg-[#0D3B66]/5 border border-[#0D3B66]/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-[#0D3B66] group-hover:text-[#FDFBF7] group-hover:shadow-xl transition-all duration-500">
            <User size={18} className="md:w-[22px]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
