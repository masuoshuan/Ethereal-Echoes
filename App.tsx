
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, Emotion, Totem, AnchorType } from './types';
import Covenant from './components/Covenant';
import Sanctuary from './components/Sanctuary';
import EchoWall from './components/EchoWall';

const STORAGE_KEY = 'ethereal_echoes_data';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<AppState>(AppState.INITIAL);
  const [userName, setUserName] = useState<string>('');
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(Emotion.NONE);
  const [anchor, setAnchor] = useState<AnchorType>('冈仁波齐');
  const [totems, setTotems] = useState<Totem[]>([]);

  // 从本地存储加载数据
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserName(parsed.userName || '');
        setTotems(parsed.totems || []);
        setAnchor(parsed.anchor || '冈仁波齐');
        if (parsed.userName) {
          setGameState(AppState.SANCTUARY);
        }
      } catch (e) {
        console.error("Failed to load local storage", e);
      }
    }
  }, []);

  // 监听变化并保存到本地
  useEffect(() => {
    if (userName) {
      const dataToSave = { userName, totems, anchor };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [userName, totems, anchor]);

  // 时间流逝导致的尘埃积累和逸火损耗
  useEffect(() => {
    if (gameState !== AppState.SANCTUARY) return;
    
    const interval = setInterval(() => {
      setTotems(prev => prev.map(t => ({
        ...t,
        dustLevel: Math.min(100, t.dustLevel + 0.3),
        maintenanceLevel: Math.max(0, t.maintenanceLevel - 0.1)
      })));
    }, 15000);
    
    return () => clearInterval(interval);
  }, [gameState]);

  const startRitual = () => {
    if (userName) {
      setGameState(AppState.SANCTUARY);
    } else {
      setGameState(AppState.COVENANT);
    }
  };
  
  const finishCovenant = (name: string) => {
    setUserName(name);
    setGameState(AppState.SANCTUARY);
  };

  const updateTotemDust = useCallback((id: string) => {
    setTotems(prev => prev.map(t => 
      t.id === id ? { ...t, dustLevel: Math.max(0, t.dustLevel - 20), lastInteraction: Date.now() } : t
    ));
    if ('vibrate' in navigator) navigator.vibrate(15);
  }, []);

  const addOil = useCallback((id: string) => {
    setTotems(prev => prev.map(t => 
      t.id === id ? { ...t, maintenanceLevel: Math.min(100, t.maintenanceLevel + 25) } : t
    ));
    if ('vibrate' in navigator) navigator.vibrate([15, 5, 15]);
  }, []);

  const addNewTotem = (newTotemData: Omit<Totem, 'id' | 'dustLevel' | 'maintenanceLevel' | 'lastInteraction'>) => {
    const newTotem: Totem = {
      ...newTotemData,
      id: `totem-${Date.now()}`,
      dustLevel: 0,
      maintenanceLevel: 100,
      lastInteraction: Date.now()
    };
    setTotems(prev => [newTotem, ...prev]);
  };

  const deleteTotem = (id: string) => {
    setTotems(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-amber-500/30">
      {gameState === AppState.INITIAL && (
        <div 
          className="flex flex-col items-center justify-center h-full space-y-12 cursor-pointer group"
          onClick={startRitual}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full scale-150 group-hover:bg-amber-500/10 transition-all duration-