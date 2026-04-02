import React from 'react';
import { Heart } from 'lucide-react';

const AuthHeader = ({ title, subtitle }) => (
  <div className="flex flex-col items-center mb-8 md:mb-12 text-[#0D3B66]">

    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-center uppercase leading-none">
      FitSync Pro
    </h1>
    <p className="text-[#0D3B66]/40 font-black uppercase tracking-[0.4em] text-[8px] md:text-[9px] mt-4">
      {subtitle}
    </p>
  </div>
);

export default AuthHeader;
