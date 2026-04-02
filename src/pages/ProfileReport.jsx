import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, Info } from 'lucide-react';
import ProgressChart from '../components/ProgressChart';
import ProfileCard from '../components/ProfileCard';

const ProfileReport = ({ profile, progress, currentWeight }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 text-[#0D3B66]">
      {/* Header Section */}
      <div className="mb-2">
        <h2 className="text-3xl font-black tracking-tight uppercase">Analytics Report</h2>
        <p className="opacity-40 text-[9px] font-black uppercase tracking-[0.4em] leading-none mt-2">Detailed Progress Monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex">
          <ProfileCard profile={profile} currentWeight={currentWeight} />
        </div>
        
        <div className="lg:col-span-2">
           <ProgressChart progress={progress} />
        </div>
      </div>
      
      <div className="bg-[#0D3B66] text-[#FDFBF7] rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
             <Info size={20} />
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em]">Data Analysis</h3>
        </div>
        
        <p className="text-sm leading-relaxed max-w-2xl font-medium opacity-70">
          Your BMI and progress metrics are calculated in real-time by comparing your profile information with your latest weight logs. This provides an accurate update on your fitness journey with every synchronization.
        </p>
      </div>
    </div>
  );
};

export default ProfileReport;
