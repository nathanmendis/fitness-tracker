import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFBF7] overflow-x-hidden font-sans text-[#0D3B66]">
      <div className="absolute top-0 left-0 w-full h-[120%] bg-gradient-to-b from-[#0D3B66] to-transparent rounded-[100%] blur-[120px] opacity-10 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-[#0D3B66]/5 rounded-full blur-[120px] pointer-events-none hidden md:block" />

      <nav className="relative z-50 flex items-center justify-between p-6 md:p-8 md:px-12">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="h-10 w-10 bg-[#0D3B66] text-[#FDFBF7] rounded-xl flex items-center justify-center shadow-2xl group-hover:rotate-3 transition-transform">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tighter uppercase leading-none">FitSync<span className="opacity-40 italic">Pro</span></h1>
            <p className="text-[7px] font-black uppercase tracking-[0.4em] mt-1.5 opacity-40">Fitness Tracking</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 md:px-8 py-3 bg-[#0D3B66] text-[#FDFBF7] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none"
        >
          Get Started
        </button>
      </nav>

      <Hero onGetStarted={() => navigate('/login')} />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
