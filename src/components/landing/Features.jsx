import React from 'react';
import { Database, BarChart3, Cloud, ShieldCheck, Activity, CheckSquare } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, dark = false }) => (
  <div className={`${dark ? 'glass-card' : 'glass-card-light'} flex flex-col items-center md:items-start text-center md:text-left h-full group`}>
    <div className={`h-14 w-14 ${dark ? 'bg-[#FDFBF7] text-[#0D3B66]' : 'bg-[#0D3B66] text-[#FDFBF7]'} rounded-2xl flex items-center justify-center mb-8 md:mb-10 shadow-2xl group-hover:rotate-6 transition-transform`}>
      <Icon size={28} />
    </div>
    <h4 className="text-base md:text-lg font-black uppercase tracking-widest mb-4 leading-tight">{title}</h4>
    <p className={`text-xs md:text-sm font-medium leading-relaxed ${dark ? 'text-[#FDFBF7]/60' : 'opacity-60'}`}>
      {desc}
    </p>
  </div>
);

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto mt-32 md:mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 px-6 mb-40">
      <div className="animate-slide-up stagger-1">
        <FeatureCard 
          icon={Database} 
          title="Sheet Sync" 
          desc="Total control over your data. All analytics are driven directly from your private Google Sheets." 
        />
      </div>
      <div className="animate-slide-up stagger-2">
        <FeatureCard 
          icon={BarChart3} 
          title="Live Reports" 
          desc="Instant visualization of weight trends, habit consistency, and workout performance metrics." 
          dark 
        />
      </div>
      <div className="animate-slide-up stagger-3">
        <FeatureCard 
          icon={Cloud} 
          title="Cloud Access" 
          desc="Access your fitness profile from any device with a modern web browser. Desktop or Mobile." 
        />
      </div>
      <div className="animate-slide-up stagger-4">
        <FeatureCard 
          icon={ShieldCheck} 
          title="Secure Auth" 
          desc="Connect with Google or Email. Your personal data is protected by Firebase enterprise-grade security." 
          dark 
        />
      </div>
      <div className="animate-slide-up stagger-5">
        <FeatureCard 
          icon={Activity} 
          title="Performance Trends" 
          desc="Deep data analysis of your transformation, tracking weight fluctuations and BMI in real-time." 
        />
      </div>
      <div className="animate-slide-up stagger-6">
        <FeatureCard 
          icon={CheckSquare} 
          title="Dynamic Checklist" 
          desc="An intelligent to-do list generated daily from your weekly schedule and specific workout routines." 
          dark 
        />
      </div>
    </div>
  );
};

export default Features;
