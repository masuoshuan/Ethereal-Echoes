
import React, { useState } from 'react';
import { Emotion } from '../types';

interface WaterBowlProps {
  currentEmotion: Emotion;
  onSelect: (e: Emotion) => void;
}

const WaterBowl: React.FC<WaterBowlProps> = ({ currentEmotion, onSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const emotions = [
    { type: Emotion.TIRED, label: '倦', icon: '💧' },
    { type: Emotion.MISSING, label: '念', icon: '❄️' },
    { type: Emotion.CALM, label: '寂', icon: '🌿' },
    { type: Emotion.OBLIVION, label: '忘', icon: '🌑' },
  ];

  const handleMainClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if ('vibrate' in navigator) navigator.vibrate(10);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 顶部文字 */}
      <div className="z-10 text-zinc-600 uppercase tracking-[1em] text-[10px] mb-8 font-light opacity-60">仪式核心</div>

      <div 
        onClick={handleMainClick}
        className="w-60 h-60 rounded-full glass-panel flex flex-col items-center justify-center cursor-pointer relative group transition-all duration-1000 border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-full opacity-40"></div>
        
        {/* 烛火显示 */}
        <div className="z-10 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-2xl shadow-inner relative">
           <span className="text-5xl filter brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-[flicker-ani_0.2s_infinite_alternate]">
            🕯️
           </span>
        </div>
      </div>

      {/* 状态文字 */}
      <div className="z-10 mt-10 text-zinc-500 text-[10px] font-ritual tracking-[0.4em] opacity-40">
        虚空无碍，听凭回响
      </div>

      {/* 悬浮切换球 */}
      <button 
        onClick={handleMainClick}
        className={`absolute top-10 -right-4 w-10 h-10 rounded-full glass-panel border-white/10 flex items-center justify-center text-sm transition-all duration-500 z-20 ${isMenuOpen ? 'rotate-180 bg-amber-500/20 opacity-100' : 'opacity-30 hover:opacity-100'}`}
      >
        ☯️
      </button>

      {/* 情感轨道 */}
      {isMenuOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none z-30">
          {emotions.map((e, idx) => {
            const angle = (idx * (360 / emotions.length) - 90) * (Math.PI / 180);
            const radius = 160;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <button
                key={e.type}
                onClick={(ev) => { ev.stopPropagation(); onSelect(e.type); setIsMenuOpen(false); }}
                className={`absolute pointer-events-auto glass-panel w-14 h-14 rounded-full flex flex-col items-center justify-center border-white/10 hover:bg-white/10 transition-all animate-scale-in`}
                style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
              >
                <span className="text-xl opacity-70">{e.icon}</span>
                <span className="text-[8px] text-zinc-500 font-ritual mt-1">{e.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WaterBowl;
