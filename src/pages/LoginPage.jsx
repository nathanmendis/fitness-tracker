import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Mail, Lock, User, ArrowRight, Loader2, ChevronLeft } from 'lucide-react';

import AuthHeader from '../components/auth/AuthHeader';
import SocialAuth from '../components/auth/SocialAuth';
import FormInput from '../components/auth/FormInput';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setMessage(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid, name: formData.name, email: formData.email,
          createdAt: new Date().toISOString(), sheetId: ''
        });
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) { setError("Please enter your email first."); return; }
    setLoading(true); setError(null); setMessage(null);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setMessage("Reset link sent! Check your inbox.");
      setTimeout(() => setIsReset(false), 5000);
    } catch (err) { setError(err.message.replace('Firebase: ', '')); }
    finally { setLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid, name: user.displayName, email: user.email,
          createdAt: new Date().toISOString(), sheetId: ''
        });
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-[140%] bg-gradient-to-b from-[#0D3B66] to-[#0D3B66]/80 -translate-y-1/2 rounded-[100%] blur-[100px] opacity-10 pointer-events-none" />
      
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50">
        <Link to="/" className="group flex items-center gap-3 px-5 py-3 bg-white/20 hover:bg-white/40 border border-white/40 backdrop-blur-xl rounded-2xl text-[#0D3B66] transition-all duration-500">
          <div className="h-8 w-8 bg-[#0D3B66] text-[#FDFBF7] rounded-xl flex items-center justify-center shadow-lg group-hover:-translate-x-1 transition-transform">
            <ChevronLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100">Back home</span>
        </Link>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <AuthHeader 
          subtitle={isReset ? "Recover Account" : isLogin ? "Welcome Back" : "Create Account"} 
        />

        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 shadow-[0_50px_100px_-20px_rgba(13,59,102,0.15)]">
          {(error || message) && (
            <div className={`mb-8 p-4 border rounded-xl text-[9px] font-black uppercase tracking-widest text-center ${error ? 'bg-red-500/5 border-red-500/20 text-red-700' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700'}`}>
              {error || message}
            </div>
          )}

          {isReset ? (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <FormInput label="Email Address" icon={Mail} type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="name@example.com" />
              <button disabled={loading} className="w-full bg-[#0D3B66] text-[#FDFBF7] font-black uppercase py-5 rounded-[1.5rem] tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-[11px]">
                {loading ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Send Reset Link"}
              </button>
              <button type="button" onClick={() => setIsReset(false)} className="w-full text-[10px] font-black text-[#0D3B66]/40 uppercase tracking-widest hover:text-[#0D3B66] transition-colors text-center">
                Back to Log In
              </button>
            </form>
          ) : (
            <>
              <form onSubmit={handleAuth} className="space-y-5 md:space-y-6">
                {!isLogin && (
                  <FormInput label="Full Name" icon={User} type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your Name" />
                )}
                <FormInput label="Email Address" icon={Mail} type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="name@example.com" />
                <FormInput 
                  label="Password" 
                  icon={Lock} 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  placeholder="••••••••" 
                  rightElement={isLogin && <button type="button" onClick={() => setIsReset(true)} className="text-[9px] font-black text-[#0D3B66]/40 hover:text-[#0D3B66] uppercase tracking-widest">Forgot?</button>}
                />
                <button disabled={loading} className="group w-full bg-[#0D3B66] text-[#FDFBF7] font-black uppercase py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-[11px] flex items-center justify-center gap-3 mt-6">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <>{isLogin ? "Log In" : "Sign Up"} <ArrowRight size={18} /></>}
                </button>
              </form>
              <SocialAuth onGoogleSignIn={handleGoogleSignIn} loading={loading} />
            </>
          )}
        </div>

        {!isReset && (
          <p className="mt-8 md:mt-12 text-center pb-8">
            <span className="text-[10px] md:text-[11px] font-bold text-[#0D3B66]/30 uppercase tracking-[0.2em] mr-2">
              {isLogin ? "New here?" : "Already member?"}
            </span>
            <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] md:text-[11px] font-black text-[#0D3B66] uppercase tracking-[0.2em] hover:underline decoration-2 underline-offset-8 transition-all">
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
