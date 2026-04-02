import React from 'react';
import { Target, CheckCircle2, ChevronRight } from 'lucide-react';

const GoalsTable = ({ goals }) => (
  <section className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 h-full shadow-[0_50px_100px_-20px_rgba(13,59,102,0.15)] flex flex-col animate-premium text-[#0D3B66]">
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-[#0D3B66] text-[#FDFBF7] rounded-xl flex items-center justify-center shadow-lg">
          <Target size={20} />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] leading-none">Personal Goals</h3>
          <p className="text-[8px] font-bold opacity-40 uppercase tracking-[0.4em] mt-1.5 font-sans italic">Track your targets</p>
        </div>
      </div>
    </div>

    <div className="flex-grow space-y-3">
      {goals.length > 0 ? (
        goals.map((row, idx) => (
          <div key={idx} className="group relative flex items-center justify-between p-5 bg-white/20 hover:bg-[#0D3B66] hover:text-[#FDFBF7] border border-white/40 rounded-2xl transition-all duration-700 cursor-default">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-[#0D3B66]/20 group-hover:bg-[#FDFBF7] transition-colors" />
              <span className="text-xs font-bold tracking-tight leading-tight">
                {row.Goal}
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-all">
                <span className="text-[8px] font-black uppercase tracking-widest">Active</span>
                <CheckCircle2 size={12} className="group-hover:text-emerald-400" />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20 opacity-20">
           <Target size={40} className="mb-4" />
           <p className="text-[10px] font-black uppercase tracking-[0.4em]">No goals found</p>
        </div>
      )}
    </div>

    <div className="mt-8 pt-8 border-t border-[#0D3B66]/5">
       <button className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all">
          View Details
          <ChevronRight size={14} />
       </button>
    </div>
  </section>
);

export default GoalsTable;
