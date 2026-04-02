import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

const SetupGuide = () => {
  const steps = [
    {
      num: '01',
      title: 'Get the Template',
      desc: 'Open the Sample Template and make a copy.',
      link: 'https://docs.google.com/spreadsheets/d/1a8irLQQ9g0GIwbld7eqQzd13C0lXvTf3JbFgLXoNouo/edit?usp=sharing'
    },
    {
      num: '02',
      title: 'Sharing Settings',
      desc: 'Set access to "Anyone with link" as Viewer.',
    },
    {
      num: '03',
      title: 'Enter Sheet ID',
      desc: 'Copy the unique ID from your URL and paste it here.',
    }
  ];

  return (
    <div className="bg-[#0D3B66] text-[#FDFBF7] rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden flex flex-col justify-center h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="flex items-center gap-4 mb-10">
        <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center">
          <Info size={20} />
        </div>
        <h4 className="text-[12px] font-black uppercase tracking-[0.4em]">Setup Guide</h4>
      </div>

      <div className="space-y-8 flex-grow">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-6 group">
            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[12px] font-black shrink-0 group-hover:bg-[#FDFBF7] group-hover:text-[#0D3B66] transition-all">
              {step.num}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white leading-tight font-black">
                {step.link ? (
                  <a href={step.link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-[#FDFBF7]/30 hover:text-[#FDFBF7] transition-colors">
                    {step.title}
                  </a>
                ) : step.title}
              </p>
              <p className="text-[11px] text-[#FDFBF7]/70 uppercase font-bold tracking-[0.1em] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-10 border-t border-white/10">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FDFBF7]/20 mb-4">Required Tabs</p>
            <div className="flex flex-wrap gap-2.5">
              {['Profile', 'Workouts', 'Goals', 'Schedule', 'Progress'].map(tab => (
                <span key={tab} className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black text-white/50 tracking-widest uppercase">
                  {tab}
                </span>
              ))}
            </div>
          </div>
          
          <a 
            href="https://docs.google.com/spreadsheets/d/1a8irLQQ9g0GIwbld7eqQzd13C0lXvTf3JbFgLXoNouo/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#FDFBF7] text-[#0D3B66] font-black uppercase py-4 rounded-2xl tracking-[0.3em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <ExternalLink size={14} />
            View Sample Template
          </a>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;
