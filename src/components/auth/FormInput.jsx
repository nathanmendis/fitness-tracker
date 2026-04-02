import React from 'react';

const FormInput = ({ label, icon: Icon, type, value, onChange, placeholder, required = true, rightElement }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between px-4">
      <label className="text-[10px] font-black text-[#0D3B66]/40 uppercase tracking-widest leading-none mb-1">
        {label}
      </label>
      {rightElement}
    </div>
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0D3B66]/30 group-focus-within:text-[#0D3B66] transition-colors">
        <Icon size={18} />
      </div>
      <input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/20 border-2 border-transparent rounded-2xl py-4 md:py-5 pl-16 pr-6 text-[#0D3B66] placeholder-[#0D3B66]/20 focus:outline-none focus:border-[#0D3B66]/10 focus:bg-white transition-all font-sans font-bold"
      />
    </div>
  </div>
);

export default FormInput;
