import React from 'react';
import { Chrome } from 'lucide-react';

const SocialAuth = ({ onGoogleSignIn, loading }) => (
  <div className="mt-8 md:mt-12">
    <div className="flex items-center gap-6 mb-8 md:mb-10 text-[#0D3B66]/20">
      <div className="h-px bg-current flex-grow" />
      <span className="text-[9px] font-black uppercase tracking-[0.5em]">Or</span>
      <div className="h-px bg-current flex-grow" />
    </div>

    <button
      onClick={onGoogleSignIn}
      disabled={loading}
      className="w-full bg-[#0D3B66]/5 border-2 border-[#0D3B66]/10 text-[#0D3B66] font-black uppercase py-4 md:py-5 rounded-2xl tracking-[0.4em] hover:bg-[#0D3B66] hover:text-[#FDFBF7] hover:border-transparent transition-all text-[10px] flex items-center justify-center gap-4 group"
    >
      <div className="p-1.5 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
        <Chrome size={14} className="text-[#0D3B66]" />
      </div>
      Continue with Google
    </button>
  </div>
);

export default SocialAuth;
