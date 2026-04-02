import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  return (
    <main className="relative z-10 pt-10 md:pt-24 pb-32 px-6">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      
      <div className="max-w-6xl mx-auto text-center space-y-10 md:space-y-14 relative">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full animate-slide-up shadow-sm">
           <Sparkles size={14} className="text-primary animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-70">The New Standard in Fitness</span>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.85] animate-reveal">
            Elevate Your <br className="hidden md:block" />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0D3B66' }}>Performance</span>
          </h2>
        </div>

        <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium opacity-60 leading-relaxed animate-slide-up stagger-2">
          A professional-grade dashboard that synchronizes directly with your personal Google Sheets. Track habits, monitor progress, and visualize your transformation with precision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-8 pt-8 animate-slide-up stagger-3">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-7 bg-[#0D3B66] text-[#FDFBF7] text-[11px] md:text-xs font-black uppercase tracking-[0.4em] rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(13,59,102,0.4)] hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-500 flex items-center justify-center gap-4 group"
          >
            Initialize Sync
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-7 bg-white/20 backdrop-blur-2xl border border-white/40 text-[#0D3B66] text-[11px] md:text-xs font-black uppercase tracking-[0.3em] rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/60 transition-all duration-500 hover:shadow-xl">
            View Features
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
