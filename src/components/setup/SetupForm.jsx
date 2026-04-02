import React from 'react';
import { Link, ExternalLink, Loader2, ArrowRight } from 'lucide-react';

const SetupForm = ({ sheetId, setSheetId, loading, onSubmit }) => (
  <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(13,59,102,0.15)] flex flex-col justify-center h-full">
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <label className="text-[11px] font-black text-[#0D3B66]/60 uppercase tracking-[0.4em]"> Enter Google Sheet ID</label>
          <a
            href="https://docs.google.com/spreadsheets/d/1a8irLQQ9g0GIwbld7eqQzd13C0lXvTf3JbFgLXoNouo/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black text-[#0D3B66] hover:underline uppercase tracking-widest flex items-center gap-1.5 transition-all"
          >
            <ExternalLink size={12} /> View Sample
          </a>
        </div>
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0D3B66]/40 group-focus-within:text-[#0D3B66] transition-colors">
            <Link size={18} />
          </div>
          <input
            required
            type="text"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            placeholder="Enter spreadsheet ID"
            className="w-full bg-white border-2 border-[#0D3B66]/5 rounded-[1.5rem] py-6 pl-16 pr-6 text-[#0D3B66] placeholder-[#0D3B66]/20 focus:outline-none focus:border-[#0D3B66]/20 transition-all font-sans font-bold shadow-inner"
          />
        </div>
        <p className="px-6 text-[10px] font-bold text-[#0D3B66]/50 uppercase tracking-[0.1em] leading-relaxed">
          Note: The ID is the unique string found in your browser URL between <span className="text-[#0D3B66] font-black">/d/</span> and <span className="text-[#0D3B66] font-black">/edit</span>.
        </p>
      </div>

      <button
        disabled={loading || !sheetId}
        className="w-full bg-[#0D3B66] text-[#FDFBF7] font-black uppercase py-6 rounded-[2rem] tracking-[0.4em] shadow-xl hover:scale-[1.03] active:scale-95 transition-all text-[11px] flex items-center justify-center gap-4 mt-8"
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : (
          <>
            Save Configuration
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  </div>
);

export default SetupForm;
