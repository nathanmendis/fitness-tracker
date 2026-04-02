import React from 'react';
import { Linkedin, Github, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#0D3B66]/5 pt-12 pb-8">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[#0D3B66]/40">
          <a href="https://www.linkedin.com/in/nathan-mendis-a2318122a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <Linkedin size={14} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">LinkedIn</span>
          </a>
          <a href="https://github.com/nathanmendis" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <Github size={14} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">GitHub</span>
          </a>
          <a href="https://nathanmendis.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <Globe size={14} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Portfolio</span>
          </a>
          <a href="mailto:nathanmendis17@gmail.com" className="flex items-center gap-2.5">
            <Mail size={14} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Contact</span>
          </a>
        </div>
        <div className="flex items-center gap-4 w-full max-w-sm mb-4 opacity-50 text-[#0D3B66]">
          <div className="h-px bg-current flex-grow" />
          <p className="text-[8px] font-black uppercase tracking-[0.5em] whitespace-nowrap text-center">Developed by Nathan Mendis</p>
          <div className="h-px bg-current flex-grow" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
