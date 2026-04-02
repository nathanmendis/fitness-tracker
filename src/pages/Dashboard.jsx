import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import GoalsTable from '../components/GoalsTable';
import ScheduleTable from '../components/ScheduleTable';
import WorkoutsGrid from '../components/WorkoutsGrid';
import DailyChecklist from '../components/DailyChecklist';

const Dashboard = ({ profile, goals, schedule, workouts, currentWeight, progressPercent }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      {/* Side-by-side layout for profile and goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div 
          onClick={() => navigate('/profile')} 
          className="cursor-pointer group flex h-full"
          title="View Detailed Analytics Page"
        >
          <ProfileCard profile={profile} currentWeight={currentWeight} />
        </div>
        
        <div className="lg:col-span-2">
          <GoalsTable goals={goals} />
        </div>
      </div>

      {/* TRANSFORMATION PROGRESS */}
      {progressPercent !== null && (
        <section className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(13,59,102,0.1)] flex flex-col gap-6 animate-premium">
          <div className="flex flex-col gap-5">
             <div className="flex justify-between items-end">
               <div className="flex flex-col gap-2 text-[#0D3B66]">
                 <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] leading-none mb-2">Overall Progress</span>
                 <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">Transformation <span className="opacity-30 italic">Progress</span></h2>
               </div>
               <div className="text-right">
                  <span className="text-4xl font-black text-[#0D3B66] tracking-tighter">{progressPercent}%</span>
               </div>
             </div>
             
             <div className="relative h-6 w-full bg-[#0D3B66]/5 rounded-3xl overflow-hidden border border-[#0D3B66]/5 p-1 p-1">
               <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0D3B66] to-[#0D3B66]/80 rounded-3xl shadow-[0_4px_12px_rgba(13,59,102,0.3)] transition-all duration-[2500ms] ease-out-expo" 
                style={{ width: `${progressPercent}%` }}
               />
               <div 
                className="absolute top-0 left-0 h-full w-full opacity-10 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 3s infinite linear' }}
               />
             </div>
             
             <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-[#0D3B66]/20" />
                   <span className="text-[9px] font-black text-[#0D3B66]/30 uppercase tracking-[0.2em]">Start</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] font-black text-[#0D3B66]/30 uppercase tracking-[0.2em]">Goal</span>
                   <div className="h-1.5 w-1.5 rounded-full bg-[#0D3B66]/20" />
                </div>
             </div>
          </div>
        </section>
      )}

      <DailyChecklist schedule={schedule} workouts={workouts} />

      <div className="flex flex-col gap-4 mt-8 text-[#0D3B66]">
         <div className="flex items-center gap-4 px-2">
            <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Weekly <span className="opacity-30 italic">Schedule</span></h2>
            <div className="h-px bg-current opacity-10 flex-grow" />
         </div>
         <ScheduleTable schedule={schedule} />
         <WorkoutsGrid workouts={workouts} />
      </div>
    </div>
  );
};

export default Dashboard;
