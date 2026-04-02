import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { auth } from './lib/firebase';
import { useAuth } from './context/AuthContext';
import { useFitnessData } from './hooks/useFitnessData';

import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ProfileReport from './pages/ProfileReport';
import LoginPage from './pages/LoginPage';
import SetupPage from './pages/SetupPage';
import LandingPage from './pages/LandingPage';

function App() {
  const { user, userData, loading: authLoading } = useAuth();
  const [showSetup, setShowSetup] = useState(false);

  // Custom hook to manage all fitness-related data and logic
  const fitnessData = useFitnessData(user, userData);

  const handleLogout = () => signOut(auth);

  if (authLoading) return <LoadingState />;

  // Public Routes
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Setup Flow
  if (!userData?.sheetId || showSetup) {
    return <SetupPage onComplete={() => setShowSetup(false)} />;
  }

  // Loading & Error States
  if (fitnessData.loading && !fitnessData.profile) return <LoadingState />;
  if (fitnessData.error) return (
    <ErrorState 
      error={fitnessData.error} 
      onRetry={fitnessData.loadAllData} 
      onReset={() => setShowSetup(true)} 
    />
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDFBF7] font-sans relative">
        <TopNavbar
          profile={{
            ...fitnessData.profile,
            Name: userData.name || fitnessData.profile?.Name
          }}
          onSync={fitnessData.loadAllData}
          isSyncing={fitnessData.loading}
          onLogout={handleLogout}
          onShowSetup={() => setShowSetup(true)}
        />

        <main className="max-w-6xl mx-auto px-4 pt-12 pb-20">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  profile={fitnessData.profile} 
                  goals={fitnessData.goals} 
                  schedule={fitnessData.schedule} 
                  workouts={fitnessData.workouts} 
                  currentWeight={fitnessData.currentWeight} 
                  progressPercent={fitnessData.progressPercent} 
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProfileReport 
                  profile={fitnessData.profile} 
                  progress={fitnessData.progress} 
                  currentWeight={fitnessData.currentWeight} 
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
