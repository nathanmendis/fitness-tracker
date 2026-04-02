import React from 'react';
import { Calendar, CheckCircle2, Activity } from 'lucide-react';

const ScheduleTable = ({ schedule }) => {
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(13,59,102,0.1)] flex flex-col animate-premium">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-[#0D3B66] text-[#FDFBF7] rounded-xl flex items-center justify-center shadow-lg">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0D3B66] leading-none">Weekly Schedule</h3>
            <p className="text-[8px] font-bold text-[#0D3B66]/40 uppercase tracking-[0.4em] mt-1.5 font-sans italic">Your planned routines</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b-2 border-[#0D3B66]/5 bg-[#0D3B66]/5 rounded-t-2xl">
              <th className="py-5 px-6 text-[9px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/40">Day</th>
              <th className="py-5 px-6 text-[9px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/40">Workout</th>
              <th className="py-5 px-6 text-[9px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/40">Activity</th>
              <th className="py-5 px-6 text-[9px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/40">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0D3B66]/5">
            {schedule.map((row, idx) => {
              const isToday = row.Day === todayName;
              return (
                <tr 
                  key={idx} 
                  className={`transition-all group relative ${isToday ? 'bg-[#0D3B66] text-[#FDFBF7] shadow-2xl' : 'hover:bg-white/40'}`}
                >
                  <td className="py-6 px-6 relative">
                    {isToday && <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#FDFBF7]" />}
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all ${isToday ? 'translate-x-2' : ''}`}>
                        {row.Day}
                      </span>
                      {isToday && <CheckCircle2 size={12} className="text-[#FDFBF7]" />}
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <span className="text-[12px] font-black tracking-tighter uppercase">{row.Workout}</span>
                  </td>
                  <td className="py-6 px-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${isToday ? 'bg-white/10 border-white/20' : 'bg-[#0D3B66]/5 border-[#0D3B66]/10 opacity-60'}`}>
                      <Activity size={12} />
                      {row.Cardio || 'Strength'}
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <p className={`text-[10px] font-bold italic tracking-tight leading-tight max-w-[200px] ${isToday ? 'text-white/60' : 'text-[#0D3B66]/40'}`}>
                      {row.Notes && row.Notes !== '-' ? row.Notes : 'Personal notes'}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 pt-8 border-t border-[#0D3B66]/5 flex justify-between items-center text-[9px] font-black text-[#0D3B66]/30 uppercase tracking-[0.4em]">
         <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Verified Sync Active
         </div>
      </div>
    </section>
  );
};

export default ScheduleTable;
