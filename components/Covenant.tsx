
import React, { useState, useEffect, useRef } from 'react';

interface CovenantProps {
  onComplete: (name: string) => void;
}

const Covenant: React.FC<CovenantProps> = ({ onComplete }) => {
  const [isIgniting, setIsIgniting] = useState(false);
  const [isBurnt, setIsBurnt] = useState(false);
  const [name, setName] = useState('');
  const [showContract, setShowContract] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startIgnition = () => {
    timerRef.current = window.setTimeout(() => {
      setIsIgniting(false);
      setIsBurnt(true);
      if ('vibrate' in navigator) navigator.vibrate([10, 50, 10, 100]);
      setTimeout(() => setShowContract(true), 1500);
    }, 2000);
    setIsIgniting(true);
  };

  const cancelIgnition = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsIgniting(false);
  };

  return (
    <div className="absolute inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-8 overflow-hidden">
      {!isBurnt ? (
        <div className="flex flex-col items-center justify-center space-y-16 animate-pulse">
           <div 
             onPointerDown={startIgnition}
             onPointerUp={cancelIgnition}
             onPointerLeave={cancelIgnition}
             className={`relative w-40 h-40 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-700 ${isIgniting ? 'scale-90 bg-amber-500/5 border-amber-500/30' : ''}`}
           >
              {isIgniting && (
                <div className="absolute inset-0 rounded-full animate-ping bg-amber-500/10"></div>
              )}
              <div className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase text-center px-4">
                {isIgniting ? '火星溅跃中...' : '长按划燃火柴'}
              </div>
           </div>
           <p className="text-zinc-700 font-light tracking-widest text-xs">于黑暗中寻觅一处回响</p>
        </div>
      ) : !showContract ? (
        <div className="flex flex-col items-center animate-fade-in">
           <div className="w-1 bg-amber-600/50 h-24 rounded-full flicker relative shadow-[0_0_50px_rgba(245,158,11,0.5)]">
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-12 bg-amber-500 rounded-full blur-xl opacity-60"></div>
           </div>
           <p className="mt-12 text-zinc-400 font-ritual text-xl tracking-[0.5em] animate-pulse">
             光已亮起。
           </p>
        </div>
      ) : (
        <div className="max-w-md w-full glass-panel p-10 rounded-sm space-y-12 animate-fade-in">
          <div className="space-y-4 text-center">
            <h2 className="text-zinc-400 font-ritual text-3xl tracking-widest">灵魂契约</h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto"></div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-900 p-4 text-2xl font-light focus:outline-none focus:border-amber-500/50 transition-all text-center tracking-[0.3em] text-amber-100"
                placeholder="在此签下真名"
                autoFocus
              />
            </div>
            
            <p className="text-zinc-600 text-[10px] text-center leading-relaxed tracking-widest px-4">
              “我同意在这片净土中保留我的回响，<br/>接受它的衰败，并用思念来喂养它。”
            </p>

            <button 
              disabled={!name.trim()}
              onClick={() => onComplete(name)}
              className="w-full py-5 border border-zinc-800 hover:border-amber-500/50 hover:text-amber-200 transition-all text-zinc-500 uppercase tracking-[0.5em] text-xs disabled:opacity-10 group"
            >
              签署并契入
              <div className="h-0.5 w-0 group-hover:w-full bg-amber-500/20 transition-all mx-auto mt-1"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Covenant;
