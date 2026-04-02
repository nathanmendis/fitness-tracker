import React from 'react';
import { Activity, Dumbbell, ChevronRight, CornerDownRight } from 'lucide-react';

const WorkoutCard = ({ day, exercises }) => (
  <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 shadow-[0_30px_60px_-15px_rgba(13,59,102,0.1)] flex flex-col h-full hover:scale-[1.03] transition-all duration-700 group animate-premium">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-[#0D3B66]/5 text-[#0D3B66] rounded-xl flex items-center justify-center group-hover:bg-[#0D3B66] group-hover:text-[#FDFBF7] transition-all duration-500">
          <Dumbbell size={18} />
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0D3B66] leading-none mb-0.5">{day}</h3>
      </div>
      <span className="text-[8px] font-black uppercase tracking-widest text-[#0D3B66]/20 group-hover:text-[#0D3B66] transition-colors">{exercises.length} Exercises</span>
    </div>

    <div className="space-y-4 flex-grow">
      {exercises.length > 0 ? (
        exercises.map((ex, idx) => (
          <div key={idx} className="flex flex-col gap-1 px-1">
            <div className="flex items-center gap-2">
               <CornerDownRight size={12} className="text-[#0D3B66]/30" />
               <span className="text-[12px] font-black text-[#0D3B66] tracking-tight uppercase leading-tight group-hover:translate-x-1 transition-transform">
                 {ex.Exercise}
               </span>
            </div>
            <div className="ml-5 flex items-center gap-2.5">
               <span className="text-[10px] font-bold text-[#0D3B66]/50 uppercase tracking-widest leading-none">
                 {ex.Sets} <span className="opacity-60">Sets</span>
               </span>
               <div className="h-1.5 w-1.5 rounded-full bg-[#0D3B66]/20" />
               <span className="text-[10px] font-black text-[#0D3B66]/80 uppercase tracking-widest leading-none">
                 {ex.Reps || '--'} <span className="opacity-60">Reps</span>
               </span>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 opacity-10">
           <Activity size={24} className="mb-2" />
           <p className="text-[8px] font-black uppercase tracking-[0.4em]">Recovery</p>
        </div>
      )}
    </div>

    <button className="mt-8 pt-6 border-t border-[#0D3B66]/5 w-full flex items-center justify-between text-[8px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/30 hover:text-[#0D3B66] transition-all border-none">
       View Details
       <ChevronRight size={12} />
    </button>
  </div>
);

const WorkoutsGrid = ({ workouts }) => {
  const categories = ['Push', 'Pull', 'Legs', 'Mobility'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((day) => (
        <WorkoutCard 
          key={day} 
          day={day} 
          exercises={workouts.filter(w => w.Day === day)} 
        />
      ))}
    </div>
  );
};

export default WorkoutsGrid;
