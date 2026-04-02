import React from 'react';
import { User, Info, CheckCircle2 } from 'lucide-react';

const ProfileCard = ({ profile, currentWeight }) => {
  const calculateBMI = () => {
    if (!profile?.Height || !currentWeight) return { bmi: '--', category: '--' };

    let heightInMeters = 0;
    const hString = String(profile.Height).toLowerCase();

    if (hString.includes("'") || hString.includes('"')) {
      const parts = hString.split(/['"]/);
      const feet = parseInt(parts[0]) || 0;
      const inches = parseInt(parts[1]) || 0;
      heightInMeters = (feet * 12 + inches) * 0.0254;
    } else {
      const cm = parseFloat(hString);
      heightInMeters = cm / 100;
    }

    if (!heightInMeters || isNaN(heightInMeters)) return { bmi: '--', category: '--' };

    const bmi = currentWeight / (heightInMeters * heightInMeters);
    let category = '';

    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Healthy (Normal)';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return { bmi: bmi.toFixed(2), category };
  };

  const { bmi, category } = calculateBMI();

  return (
    <section className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(13,59,102,0.15)] flex flex-col justify-between relative group hover:scale-[1.02] transition-all duration-700 animate-premium overflow-hidden">
      {/* Accent Circle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D3B66]/5 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
      
      <div className="relative z-10 space-y-10">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 bg-[#0D3B66] text-[#FDFBF7] rounded-2xl flex items-center justify-center shadow-[0_20px_40px_-5px_rgba(13,59,102,0.3)] animate-float">
            <User size={28} />
          </div>
          <div className="min-w-0">
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/30 italic">Verified Profile</span>
                <CheckCircle2 size={10} className="text-emerald-500" />
             </div>
             <p className="text-2xl font-black text-[#0D3B66] mt-2 tracking-tighter truncate selection:bg-[#0D3B66] selection:text-[#FDFBF7]">
                {profile?.Name || 'User Name'}
             </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-12 pt-10 border-t border-[#0D3B66]/5">
           <div className="space-y-1.5 group/stat text-[#0D3B66]">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 leading-none block">Age</span>
              <div className="flex items-baseline gap-1.5">
                 <span className="text-4xl font-black tracking-tighter">
                   {profile?.Age || '--'}
                 </span>
                 <span className="text-[10px] font-bold opacity-20 uppercase">yrs</span>
              </div>
           </div>

           <div className="space-y-1.5 group/stat text-[#0D3B66]">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 leading-none block">Height</span>
              <div className="flex items-baseline gap-1.5">
                 <span className="text-4xl font-black tracking-tighter">
                   {profile?.Height || '--'}
                 </span>
              </div>
           </div>

           <div className="space-y-1.5 group/stat text-[#0D3B66]">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 leading-none block">BMI</span>
              <div className="flex items-baseline gap-1.5">
                 <span className="text-4xl font-black tracking-tighter">
                   {bmi}
                 </span>
              </div>
           </div>

           <div className="space-y-3 group/stat relative">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/30 leading-none flex items-center gap-2">
                 Health Status
                 <Info size={12} className="opacity-40" />
              </span>
              <div className="inline-block py-2.5 px-5 bg-[#0D3B66] text-[#FDFBF7] text-[9px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl transition-all duration-500 hover:scale-[1.05] cursor-help">
                 {category}
              </div>

              {/* Hover Reference */}
              <div className="absolute left-[-20%] bottom-[120%] mb-4 opacity-0 group-hover/stat:opacity-100 pointer-events-none transition-all duration-700 transform translate-y-4 group-hover/stat:translate-y-0 z-[200] min-w-[220px]">
                 <div className="bg-[#0D3B66] text-[#FDFBF7] p-6 rounded-[2rem] border border-[#FDFBF7]/20 shadow-3xl">
                    <h5 className="text-[9px] font-black uppercase tracking-[0.4em] mb-4 border-b border-[#FDFBF7]/10 pb-3">Health Reference (BMI)</h5>
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-bold">
                          <span className="opacity-40">Underweight</span>
                          <span className="font-black">&lt; 18.5</span>
                       </div>
                       <div className="flex justify-between text-[10px] font-bold text-[#FDFBF7]">
                          <span>Normal</span>
                          <span className="font-black">18.5 - 24.9</span>
                       </div>
                       <div className="flex justify-between text-[10px] font-bold">
                          <span className="opacity-40">Overweight</span>
                          <span className="font-black">25 - 29.9</span>
                       </div>
                       <div className="flex justify-between text-[10px] font-bold">
                          <span className="opacity-40">Obese</span>
                          <span className="font-black">30+</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
