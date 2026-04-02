import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Droplets, Footprints, Moon, Dumbbell, Sparkles, Trophy } from 'lucide-react';

const DailyChecklist = ({ schedule, workouts }) => {
  const [checklist, setChecklist] = useState({
    hydration: 0,
    dailyWalk: false,
    sleep: false,
    workoutDone: false,
    lastUpdate: new Date().toLocaleDateString()
  });

  useEffect(() => {
    const saved = localStorage.getItem('daily_checklist');
    if (saved) {
      const parsed = JSON.parse(saved);
      const today = new Date().toLocaleDateString();
      if (parsed.lastUpdate !== today) {
        const resetData = { hydration: 0, dailyWalk: false, sleep: false, workoutDone: false, lastUpdate: today };
        setChecklist(resetData);
        localStorage.setItem('daily_checklist', JSON.stringify(resetData));
      } else {
        setChecklist(parsed);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('daily_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const toggleHabit = (key) => setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  const addWater = () => setChecklist(prev => ({ ...prev, hydration: Math.min(prev.hydration + 1, 8) }));

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[new Date().getDay()];
  const todayWorkout = schedule?.find(s => s.Day === todayName) || { Workout: 'Rest Day', Day: todayName };
  const todayExercises = workouts?.filter(w => w.Day === todayWorkout.Workout) || [];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-premium">
      {/* HABITS CARD */}
      <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(13,59,102,0.1)] flex flex-col">
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-[#0D3B66] text-[#FDFBF7] rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0D3B66] leading-none">Daily Habits</h3>
              <p className="text-[8px] font-bold text-[#0D3B66]/40 uppercase tracking-[0.4em] mt-1.5 font-sans italic">Track your daily activities</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* HYDRATION */}
          <div className="group bg-white/20 border border-white/40 rounded-3xl p-6 transition-all duration-500 hover:bg-white/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Droplets size={20} />
                </div>
                <div>
                   <p className="text-xs font-black text-[#0D3B66] uppercase tracking-widest leading-none">Water Intake</p>
                   <p className="text-[9px] font-bold text-[#0D3B66]/40 uppercase tracking-widest mt-1">{checklist.hydration} / 8 Glasses</p>
                </div>
              </div>
              <button 
                onClick={addWater}
                className="h-10 w-10 rounded-xl bg-[#0D3B66] text-[#FDFBF7] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all text-lg font-black"
              >
                +
              </button>
            </div>
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${i < checklist.hydration ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-[#0D3B66]/5'}`} />
              ))}
            </div>
          </div>

          <button onClick={() => toggleHabit('dailyWalk')} className="w-full flex items-center justify-between p-6 bg-white/20 border border-white/40 rounded-3xl hover:bg-[#0D3B66] hover:text-[#FDFBF7] transition-all duration-500 group">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:bg-white/10 group-hover:text-white transition-all">
                  <Footprints size={20} />
                </div>
                <div className="text-left">
                   <p className="text-xs font-black uppercase tracking-widest leading-none">Daily Walk</p>
                   <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest mt-1">3KM Daily Goal</p>
                </div>
             </div>
             {checklist.dailyWalk ? <CheckCircle2 className="text-emerald-500" /> : <Circle size={20} className="opacity-10" />}
          </button>

          <button onClick={() => toggleHabit('sleep')} className="w-full flex items-center justify-between p-6 bg-white/20 border border-white/40 rounded-3xl hover:bg-[#0D3B66] hover:text-[#FDFBF7] transition-all duration-500 group">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:bg-white/10 group-hover:text-white transition-all">
                  <Moon size={20} />
                </div>
                <div className="text-left">
                   <p className="text-xs font-black uppercase tracking-widest leading-none">Sleep Quality</p>
                   <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest mt-1">Daily Log</p>
                </div>
             </div>
             {checklist.sleep ? <CheckCircle2 className="text-emerald-500" /> : <Circle size={20} className="opacity-10" />}
          </button>
        </div>
      </div>

      {/* TODAY'S WORKOUT CARD */}
      <div className="bg-[#0D3B66] text-[#FDFBF7] rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(13,59,102,0.4)] flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-[#FDFBF7] text-[#0D3B66] rounded-xl flex items-center justify-center shadow-lg">
              <Dumbbell size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] leading-none">Today's Workout</h3>
              <p className="text-[8px] font-black text-[#FDFBF7]/40 uppercase tracking-[0.4em] mt-1.5 font-sans italic">{todayName}</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest">
             Status: Active
          </div>
        </div>

        <div 
          onClick={() => toggleHabit('workoutDone')}
          className={`flex-grow flex flex-col items-center justify-center text-center p-8 rounded-[2.5rem] border-2 transition-all duration-700 cursor-pointer group mb-8 ${checklist.workoutDone ? 'bg-[#FDFBF7] border-[#FDFBF7] text-[#0D3B66]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
        >
          <div className={`h-24 w-24 rounded-full flex items-center justify-center mb-6 transition-all duration-700 ${checklist.workoutDone ? 'bg-[#0D3B66] text-[#FDFBF7] rotate-[360deg]' : 'bg-[#FDFBF7] text-[#0D3B66] shadow-2xl'}`}>
             {checklist.workoutDone ? <Trophy size={40} /> : <Dumbbell size={40} />}
          </div>
          <h4 className="text-3xl font-black tracking-tighter uppercase mb-2 leading-none">
            {todayWorkout.Workout}
          </h4>
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${checklist.workoutDone ? 'text-[#0D3B66]/40' : 'text-[#FDFBF7]/40'}`}>
            {todayWorkout.Cardio || 'Strength Training'}
          </p>
          <div className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl transition-all ${checklist.workoutDone ? 'bg-[#0D3B66] text-[#FDFBF7]' : 'bg-[#FDFBF7] text-[#0D3B66]'}`}>
            {checklist.workoutDone ? 'Workout Complete' : 'Mark as Done'}
          </div>
        </div>

        <div className="space-y-2 relative z-10">
           {todayExercises.slice(0, 3).map((ex, idx) => (
             <div key={idx} className="flex justify-between items-center py-3 px-5 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest">{ex.Exercise}</span>
                <span className="text-[10px] font-black opacity-40">{ex.Sets} × {ex.Reps}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default DailyChecklist;
