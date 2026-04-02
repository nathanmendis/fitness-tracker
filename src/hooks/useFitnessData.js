import { useState, useEffect, useCallback } from 'react';
import { fetchSheetData } from '../utils/api';

export function useFitnessData(user, userData) {
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [progress, setProgress] = useState([]);
  const [params, setParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAllData = useCallback(async () => {
    if (!userData?.sheetId) return;
    
    setLoading(true);
    setError(null);
    try {
      const sheetId = userData.sheetId;
      const [pData, wData, gData, sData, progData, paramData] = await Promise.all([
        fetchSheetData(sheetId, 'Profile'), 
        fetchSheetData(sheetId, 'Workouts'), 
        fetchSheetData(sheetId, 'Goals'), 
        fetchSheetData(sheetId, 'Schedule'), 
        fetchSheetData(sheetId, 'Progress'), 
        fetchSheetData(sheetId, 'Parameters')
      ]);

      if (!pData.length && !wData.length && !gData.length) {
        throw new Error("Sheet synced but empty. Ensure Profile, Workouts, and Goals tabs exist.");
      }

      setProfile(pData[0] || {});
      setWorkouts(wData);
      setGoals(gData);
      setSchedule(sData);
      setParams(paramData[0] || null);

      const mappedProgress = progData.map(p => ({
        ...p,
        Weight: parseFloat(p.Weight)
      })).filter(p => !isNaN(p.Weight));

      setProgress(mappedProgress);
      
    } catch (err) {
      setError(err.message || "Failed to synchronize with your Google Sheet.");
    } finally {
      setLoading(false);
    }
  }, [userData?.sheetId]);

  useEffect(() => { 
    if (user && userData?.sheetId) {
      loadAllData(); 
    }
  }, [user, userData?.sheetId, loadAllData]);

  // Derived metrics
  const currentWeight = progress.length > 0 ? progress[progress.length - 1].Weight : 0;
  
  const progressPercent = (() => {
    if (!params?.StartingWeight || !params?.GoalWeight || !currentWeight) return null;
    const start = parseFloat(params.StartingWeight);
    const goal = parseFloat(params.GoalWeight);
    if (isNaN(start) || isNaN(goal) || start === goal) return null;
    const totalDiff = Math.abs(start - goal);
    const currentDiff = Math.abs(start - currentWeight);
    return Math.min(Math.round((currentDiff / totalDiff) * 100), 100);
  })();

  return {
    profile,
    goals,
    workouts,
    schedule,
    progress,
    params,
    loading,
    error,
    currentWeight,
    progressPercent,
    loadAllData
  };
}
