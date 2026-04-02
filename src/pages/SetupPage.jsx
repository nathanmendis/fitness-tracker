import React, { useState } from 'react';
import { db, auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Database, LogOut } from 'lucide-react';

import SetupForm from '../components/setup/SetupForm';
import SetupGuide from '../components/setup/SetupGuide';

const SetupPage = ({ onComplete }) => {
  const { user, userData, setUserData } = useAuth();
  const [sheetId, setSheetId] = useState(userData?.sheetId || '');
  const [loading, setLoading] = useState(false);

  const handleSetup = async (e) => {
    e.preventDefault();
    if (!sheetId.trim()) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { sheetId: sheetId.trim() });
      setUserData(prev => ({ ...prev, sheetId: sheetId.trim() }));
      if (onComplete) onComplete();
    } catch (err) {
      alert("Failed to save changes");
    } finally { setLoading(false); }
  };

  const handleLogout = () => signOut(auth);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-[#0D3B66]/5 rounded-full blur-[100px] animate-float pointer-events-none" />
      
      <div className="absolute top-8 right-8 animate-premium">
        <div className="flex items-center gap-4">
          {userData?.sheetId && (
            <button onClick={onComplete} className="px-6 py-3 rounded-xl bg-white border border-[#0D3B66]/10 text-[#0D3B66] font-black uppercase text-[9px] tracking-[0.3em] hover:bg-[#0D3B66]/5 transition-all shadow-sm">
              Cancel
            </button>
          )}
          <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#0D3B66] text-[#FDFBF7] font-black uppercase text-[9px] tracking-[0.3em] hover:scale-105 transition-all shadow-xl">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl relative z-10 animate-premium">
        <div className="text-center mb-16 text-[#0D3B66]">
          <div className="h-20 w-20 bg-[#0D3B66] text-[#FDFBF7] rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl mx-auto animate-float">
            <Database size={36} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-4 leading-none">Connect Data</h1>
          <p className="text-[#0D3B66]/40 font-black uppercase tracking-[0.4em] text-[9px]">Step 1: Configuration</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <SetupForm sheetId={sheetId} setSheetId={setSheetId} loading={loading} onSubmit={handleSetup} />
          <SetupGuide />
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
