
import React, { useEffect, useState } from 'react';
import { generateSoulMotto } from '../geminiService';

interface SoulCrystalProps {
  name: string;
  emotion: string;
  totems: any[];
  onClose: () => void;
}

const SoulCrystal: React.FC<SoulCrystalProps> = ({ name, emotion, totems, onClose }) => {
  const [motto, setMotto] = useState('凝聚灵气中...');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchMotto = async () => {
      const text = await generateSoulMotto(name, emotion, totems);
      setMotto(text);
      setIsVisible(true);
    };
    fetchMotto();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-6">
      <div className={`relative w-full max-w-sm aspect-[9/16] glass-panel rounded-lg border-amber-500/20 flex flex-col items-center justify-between p-12 transition-all duration-1000 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        
        {/* 顶部装饰 */}
        <div className="w-full flex justify-between items-start">
           <div className="flex flex-col">
             <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Soul Crystal</span>
             <span className="text-zinc-400 font-ritual text-xl mt-1">{name}</span>
           </div>
           <div className="text-[10px] text-amber-500/50 font-mono">NO. {Math.floor(Math.random()*1000000)}</div>
        </div>

        {/* 核心晶体视觉 */}
        <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-500/10 blur-[60px] animate-pulse"></div>
            <div className="w-32 h-32 border border-amber-500/30 rotate-45 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <div className="w-24 h-24 border border-teal-500/20 rotate-[22deg]"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl filter blur-[1px]">💎</span>
            </div>
        </div>

        {/* 判词内容 */}
        <div className="text-center space-y-6">
            <p className="text-zinc-300 font-light text-lg leading-relaxed tracking-widest italic px-4 whitespace-pre-wrap">
                {motto}
            </p>
            <div className="h-px w-12 bg-amber-500/30 mx-auto"></div>
            <p className="text-[9px] text-zinc-600 tracking-[0.4em] uppercase">结晶日期：{new Date().toLocaleDateString()}</p>
        </div>

        {/* 操作区 */}
        <div className="w-full space-y-4">
            <button 
                onClick={onClose}
                className="w-full py-3 border border-zinc-800 text-[10px] tracking-widest text-zinc-500 uppercase hover:text-white hover:border-zinc-500 transition-all"
            >
                散去幻境
            </button>
            <p className="text-[8px] text-zinc-700 text-center italic">“长按屏幕截图，留存这一瞬的纯净。”</p>
        </div>
      </div>
    </div>
  );
};

export default SoulCrystal;
