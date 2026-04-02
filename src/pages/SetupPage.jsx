import React, { useState, useMemo } from 'react';
import { db, auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { 
  Database, 
  LogOut, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  Share2, 
  ClipboardList, 
  PartyPopper 
} from 'lucide-react';

import SetupForm from '../components/setup/SetupForm';
import { fetchSheetData } from '../utils/api';
import ErrorState from '../components/ErrorState';

const SetupPage = ({ onComplete }) => {
  const { user, userData, setUserData } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [sheetId, setSheetId] = useState(userData?.sheetId || '');
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState(null);

  const totalSteps = 4;

  const handleSetup = async (e) => {
    if (e) e.preventDefault();
    const cleanId = sheetId.trim();
    if (!cleanId) return;
    
    setLoading(true);
    setError(null);
    try {
      // 1. Rigorous Verification
      const testData = await fetchSheetData(cleanId, 'Profile');
      if (!testData || testData.length === 0) {
        throw new Error("Sheet found, but the 'Profile' tab is empty. Please follow the template exactly.");
      }

      // 2. Persist only if data is valid
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { sheetId: cleanId });
      setUserData(prev => ({ ...prev, sheetId: cleanId }));

      // 3. Success state
      setIsCompleted(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);

    } catch (err) {
      setError(err.message || "Failed to save changes");
    } finally { 
      setLoading(false); 
    }
  };

  const handleLogout = () => signOut(auth);
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const skipHelp = () => setCurrentStep(totalSteps);

  const steps = useMemo(() => [
    {
      title: "Welcome aboard!",
      subtitle: "Let's personalize your fitness dashboard by connecting your Google Sheet data.",
      icon: <Database className="text-[#0D3B66]" size={36} />,
      content: (
        <div className="space-y-6">
          <div className="bg-[#0D3B66]/5 p-8 rounded-[2.5rem] border border-[#0D3B66]/10 text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-[#0D3B66]/40">Why connect a sheet?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <CheckCircle2 size={18} />, title: "Live Syncing", desc: "Data updates in real-time" },
                { icon: <ClipboardList size={18} />, title: "Custom Tracking", desc: "Your metrics, your way" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-white shadow-lg rounded-2xl flex items-center justify-center text-[#0D3B66]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#0D3B66]">{item.title}</p>
                    <p className="text-[11px] text-[#0D3B66]/60 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#0D3B66]/40 px-8 leading-relaxed text-balance">
            This setup takes about 2 minutes and only needs to be done once.
          </p>
        </div>
      )
    },
    {
      title: "Get your template",
      subtitle: "First, you'll need the predefined Google Sheet template to structure your data.",
      icon: <ExternalLink className="text-[#0D3B66]" size={36} />,
      content: (
        <div className="space-y-4 md:space-y-8">
          <div className="flex flex-col items-center text-center p-6 md:p-10 bg-[#0D3B66] rounded-[2rem] md:rounded-[3rem] text-[#FDFBF7] shadow-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="h-12 w-12 md:h-16 md:w-16 bg-white/10 rounded-xl md:rounded-[1.5rem] flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <ClipboardList className="md:w-8 md:h-8 w-6 h-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-2">Step 1: Copy Template</h4>
            <p className="text-[#FDFBF7]/60 text-[10px] md:text-xs font-medium max-w-xs mb-6 md:mb-8 text-balance">
              Click the button below to open the sample sheet, then go to 
              <span className="text-[#FDFBF7] font-black"> File {">"} Make a copy</span>.
            </p>
            <a 
              href="https://docs.google.com/spreadsheets/d/1a8irLQQ9g0GIwbld7eqQzd13C0lXvTf3JbFgLXoNouo/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-10 py-5 bg-[#FDFBF7] text-[#0D3B66] rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all text-center"
            >
              Open Sheet Link
            </a>
          </div>
        </div>
      )
    },
    {
      title: "Set permissions",
      subtitle: "Ensure our dashboard can read your spreadsheet securely.",
      icon: <Share2 className="text-[#0D3B66]" size={36} />,
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white border border-[#0D3B66]/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-xl text-left">
             <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-[#0D3B66]/5">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-red-50 text-red-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                  <Lock size={window.innerWidth < 768 ? 20 : 24} />
                </div>
                <div>
                   <h5 className="text-[12px] md:text-sm font-black text-[#0D3B66] uppercase tracking-tight mb-1">Privacy matters</h5>
                   <p className="text-[10px] md:text-[11px] text-[#0D3B66]/60 leading-relaxed">
                      We never store your personal Google account data. We only read metric values from the specific sheet you provide.
                   </p>
                </div>
             </div>
             
             <div className="space-y-3 md:space-y-4">
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/30 mb-2 px-2">How to share:</p>
                {[
                  "Click the big 'Share' button in Google Sheets",
                  "Change General Access to 'Anyone with the link'",
                  "Ensure role is set to 'Viewer'"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4 bg-[#0D3B66]/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-[#0D3B66]/5">
                    <span className="h-6 w-6 bg-[#0D3B66] text-[#FDFBF7] text-[8px] md:text-[9px] font-black rounded-lg flex items-center justify-center shrink-0">{i+1}</span>
                    <span className="text-[10px] md:text-[11px] font-black text-[#0D3B66]/80 tracking-tight leading-tight">{text}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )
    },
    {
       title: "Connect Sheet ID",
       subtitle: "Final step! Paste your unique Spreadsheet ID below to finish.",
       icon: <CheckCircle2 className="text-[#0D3B66]" size={36} />,
       content: (
         <div className="space-y-6 md:space-y-8 max-w-sm mx-auto">
            <SetupForm sheetId={sheetId} setSheetId={setSheetId} loading={loading} onSubmit={handleSetup} />
            <div className="bg-amber-50 border border-amber-200/50 p-4 md:p-6 rounded-2xl md:rounded-3xl">
               <p className="text-[9px] md:text-[10px] text-amber-900 font-bold leading-relaxed px-2 text-left">
                  <span className="uppercase text-[8px] md:text-[9px] tracking-widest block mb-1 opacity-50">Pro Tip</span>
                  The Sheet ID is the long string of letters and numbers in your browser URL:
                  <span className="block mt-2 font-mono bg-white p-2 rounded-lg text-[8px] md:text-[9px] border border-amber-900/10 leading-tight">.../d/<span className="bg-amber-100 px-1 rounded-sm text-amber-600">SHEET_ID_HERE</span>/edit...</span>
               </p>
            </div>
         </div>
       )
    }
  ], [sheetId, loading, handleSetup]);

  const currentStepData = steps[currentStep - 1];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFBF7]">
        <ErrorState 
          error={error} 
          onRetry={() => {
            setError(null);
            setCurrentStep(4);
          }}
          onReset={() => {
            setError(null);
            setSheetId('');
            setCurrentStep(4);
          }}
        />
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-center">
        <div className="absolute inset-0 bg-[#0D3B66]/[0.02] animate-pulse" />
        <div className="z-10 animate-premium space-y-12 flex flex-col items-center">
          <div className="relative flex items-center justify-center w-40 h-40">
            <div className="h-40 w-40 border-[1px] border-green-500/10 rounded-full animate-slow-ping absolute inset-0" />
            <div className="h-32 w-32 border-[1.5px] border-green-500/30 rounded-full flex items-center justify-center relative bg-white/40 backdrop-blur-md shadow-2xl">
                <div className="h-20 w-20 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_-10px_rgba(34,197,94,0.4)] transition-all">
                   <CheckCircle2 size={40} strokeWidth={2} />
                </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.05em] uppercase text-[#0D3B66] leading-none">
              All Good!
            </h1>
            <p className="text-[#0D3B66]/30 font-black uppercase tracking-[0.8em] text-[10px] md:text-xs">
              Connection Verified
            </p>
          </div>
          
          <div className="flex justify-center pt-8">
             <div className="h-[2px] w-16 bg-[#0D3B66]/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-loading" style={{width: '60%'}} />
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-start md:justify-center p-4 md:p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 -left-64 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#0D3B66]/5 rounded-full blur-[80px] md:blur-[100px] animate-float pointer-events-none" />
      
      {/* Top Controls */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-50 flex justify-between items-center max-w-6xl mx-auto w-full">
         <div className="flex items-center gap-2">
            <div className="flex gap-1 md:gap-1.5 transition-all">
               {[1, 2, 3, 4].map(idx => (
                 <div 
                   key={idx} 
                   className={`h-1 rounded-full transition-all duration-700 ${
                     idx <= currentStep ? 'w-6 md:w-10 bg-[#0D3B66]' : 'w-2 md:w-4 bg-[#0D3B66]/10'
                   }`}
                 />
               ))}
            </div>
            <span className="ml-2 md:ml-4 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-[#0D3B66]/40">
              0{currentStep} / 04
            </span>
         </div>

         <div className="flex items-center gap-3 md:gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-white border border-[#0D3B66]/10 text-[#0D3B66] font-black uppercase text-[8px] md:text-[9px] tracking-[0.3em] hover:bg-[#0D3B66]/5 transition-all">
              <LogOut size={12} className="md:w-3.5 md:h-3.5" /> <span className="hidden xs:inline">Sign Out</span>
            </button>
         </div>
      </div>

      <div className="w-full max-w-3xl relative z-10 animate-premium mt-16 md:mt-0">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16 px-4">
          <div className="h-16 w-16 md:h-24 md:w-24 bg-white text-[#0D3B66] rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center mb-6 md:mb-10 shadow-2xl mx-auto animate-float border border-[#0D3B66]/5">
            {React.cloneElement(currentStepData.icon, { className: "md:w-9 md:h-9 w-6 h-6" })}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-3 md:mb-4 leading-none text-[#0D3B66]">
            {currentStepData.title}
          </h1>
          <p className="text-[#0D3B66]/50 font-medium text-xs md:text-sm max-w-md mx-auto leading-relaxed px-4 text-balance text-center">
            {currentStepData.subtitle}
          </p>
        </div>

        {/* Content Area */}
        <div className="px-2 md:px-4 mb-8 md:mb-16 min-h-[350px] md:min-h-[400px] flex flex-col justify-center">
            <div key={currentStep} className="animate-slide-up bg-white p-0.5 md:p-1 rounded-[2.5rem] md:rounded-[4rem] shadow-premium">
              <div className="p-6 md:p-12 overflow-hidden text-center">
                {currentStepData.content}
              </div>
            </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 gap-6">
           <div className="flex items-center justify-center gap-3 md:gap-6">
              {userData?.sheetId && currentStep < totalSteps && (
                <button 
                  onClick={skipHelp} 
                  className="px-6 py-4 rounded-xl text-[#0D3B66]/40 font-black uppercase text-[10px] tracking-[0.3em] hover:text-[#0D3B66] transition-all"
                >
                  Skip Help
                </button>
              )}
              
              {currentStep < totalSteps && (
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-4 bg-[#0D3B66] text-[#FDFBF7] font-black uppercase text-[10px] tracking-[0.4em] py-5 px-12 rounded-[2rem] shadow-2xl hover:scale-105 active:scale-95 transition-all text-center"
                >
                  Continue <ChevronRight size={18} />
                </button>
              )}
           </div>

           {currentStep > 1 && (
             <button 
               onClick={prevStep}
               className="flex items-center gap-2 text-[#0D3B66]/30 hover:text-[#0D3B66] font-black uppercase text-[9px] tracking-[0.4em] transition-all group"
             >
               <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Go Back
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
