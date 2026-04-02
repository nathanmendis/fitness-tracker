import React from 'react';
import { Link, ExternalLink, Loader2, ArrowRight } from 'lucide-react';

const SetupForm = ({ sheetId, setSheetId, loading, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-6 md:space-y-10 w-full animate-reveal">
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-1.5 md:gap-2 px-1 md:px-2">
        <label className="text-[8px] md:text-[10px] font-black text-[#0D3B66]/40 uppercase tracking-[0.4em]">Google Sheet ID</label>
        <div className="relative group">
          <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-[#0D3B66]/20 group-focus-within:text-[#0D3B66] transition-all">
            <Link size={18} className="md:w-5 md:h-5" />
          </div>
          <input
            required
            type="text"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            placeholder="e.g. 1a8irLQQ9g0..."
            className="w-full bg-[#FDFBF7] border-2 border-[#0D3B66]/5 rounded-xl md:rounded-[2rem] py-4 md:py-6 pl-14 md:pl-16 pr-6 md:pr-8 text-[#0D3B66] placeholder-[#0D3B66]/10 focus:outline-none focus:border-[#0D3B66]/10 focus:ring-4 focus:ring-[#0D3B66]/5 transition-all font-sans font-black shadow-inner text-xs md:text-sm"
          />
        </div>
      </div>
      
      <p className="px-4 md:px-6 text-[8px] md:text-[10px] font-bold text-[#0D3B66]/30 uppercase tracking-[0.1em] leading-relaxed text-center">
        Ensure your Google Sheet is shared with <span className="text-[#0D3B66] font-black underline underline-offset-4 decoration-[#0D3B66]/10">"Anyone with the link"</span> as a Viewer.
      </p>
    </div>

    <button
      disabled={loading || !sheetId}
      className={`w-full bg-[#0D3B66] text-[#FDFBF7] font-black uppercase py-5 md:py-7 rounded-xl md:rounded-[2.5rem] tracking-[0.3em] md:tracking-[0.4em] shadow-2xl transition-all text-[10px] md:text-xs flex items-center justify-center gap-3 md:gap-4 ${
        loading || !sheetId ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.03] active:scale-95'
      }`}
    >
      {loading ? <Loader2 size={18} className="animate-spin text-[#FDFBF7]/40 md:w-5 md:h-5" /> : (
        <>
          Complete Setup
          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform md:w-5 md:h-5" />
        </>
      )}
    </button>
  </form>
);

export default SetupForm;
