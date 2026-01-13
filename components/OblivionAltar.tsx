
import React, { useState } from 'react';
import { Totem } from '../types';

interface OblivionAltarProps {
  totems: Totem[];
  onForget: (id: string) => void;
  onCancel: () => void;
}

const OblivionAltar: React.FC<OblivionAltarProps> = ({ totems, onForget, onCancel }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleForget = () => {
    if (!selectedId) return;
    setIsProcessing(true);
    if ('vibrate' in navigator) navigator.vibrate([100, 50, 200]);
    
    setTimeout(() => {
      onForget(selectedId);
      setIsProcessing(false);
      setSelectedId(null);
    }, 3000);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-10 glass-panel rounded-lg border-red-900/20 bg-black/40 animate-fade-in relative overflow-hidden">
      {/* 虚无背景效果 */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-gradient-radial from-zinc-800 to-transparent animate-pulse"></div>
      </div>

      <div className="text-center mb-10 relative z-10">
        <h2 className="text-zinc-500 font-ritual text-2xl tracking-[0.4em]">遗忘祭坛</h2>
        <p className="text-[9px] text-zinc-700 uppercase tracking-widest mt-2">Altar of Oblivion</p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-auto mt-6"></div>
      </div>

      {isProcessing ? (
        <div className="py-20 flex flex-col items-center space-y-8 animate-pulse">
           <div className="w-16 h-16 border border-zinc-700 rounded-full animate-ping"></div>
           <p className="text-zinc-500 text-xs tracking-[0.3em] font-light">正在将记忆归还虚无...</p>
        </div>
      ) : (
        <div className="space-y-8 relative z-10">
          <p className="text-zinc-500 text-[10px] text-center leading-relaxed tracking-widest opacity-60">
            “选一个你决定彻底放下的回响。<br/>一旦归还虚无，它将不再出现于此灵境。”
          </p>

          <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
            {totems.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`p-4 rounded border transition-all text-left group ${selectedId === t.id ? 'border-amber-500/50 bg-amber-500/5' : 'border-zinc-900 bg-white/5 hover:border-zinc-700'}`}
              >
                <div className="text-xs text-zinc-300 font-ritual tracking-wider mb-1">{t.name}</div>
                <div className="text-[7px] text-zinc-600 truncate">{t.description}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 border border-zinc-800 text-[9px] text-zinc-600 uppercase tracking-[0.3em] hover:text-zinc-300 transition-all"
            >
              心有不舍
            </button>
            <button 
              disabled={!selectedId}
              onClick={handleForget}
              className={`flex-1 py-3 border text-[9px] uppercase tracking-[0.3em] transition-all ${selectedId ? 'border-red-900/50 text-red-700 hover:bg-red-900/10' : 'border-zinc-900 text-zinc-800'}`}
            >
              永久告别
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OblivionAltar;
