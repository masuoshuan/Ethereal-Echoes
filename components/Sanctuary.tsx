
import React, { useState, useEffect, useRef } from 'react';
import { Emotion, Totem, AnchorType } from '../types';
import { EMOTION_CONFIG } from '../constants';
import WaterBowl from './WaterBowl';
import TotemItem from './TotemItem';
import { getDivineWhisper, analyzeSoulEnergy } from '../geminiService';
import SoulCrystal from './SoulCrystal';
import AddTotemModal from './AddTotemModal';

interface SanctuaryProps {
  userName: string;
  emotion: Emotion;
  setEmotion: (e: Emotion) => void;
  totems: Totem[];
  onWipe: (id: string) => void;
  onAddOil: (id: string) => void;
  onAddTotem: (totem: any) => void;
  onForgetTotem: (id: string) => void;
  onSwitchToWall: () => void;
}

const Sanctuary: React.FC<SanctuaryProps> = ({ userName, emotion, setEmotion, totems, onWipe, onAddOil, onAddTotem, onForgetTotem, onSwitchToWall }) => {
  const [whisper, setWhisper] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [soulEnergy, setSoulEnergy] = useState<{emotion: string, guidance: string} | null>(null);
  const [isCrystallizing, setIsCrystallizing] = useState(false);
  const [isAddingTotem, setIsAddingTotem] = useState(false);
  const [showSummonBeam, setShowSummonBeam] = useState(false);
  const [anchor, setAnchor] = useState<AnchorType>('冈仁波齐');
  const [isSelectingAnchor, setIsSelectingAnchor] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const loadWhisper = async () => {
      const w = await getDivineWhisper(emotion);
      setWhisper(w);
    };
    loadWhisper();

    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        const analysis = await analyzeSoulEnergy(transcript);
        setSoulEnergy(analysis);
        setTimeout(() => setSoulEnergy(null), 8000);
      };

      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, [emotion]);

  const startVoiceRitual = () => {
    if (recognitionRef.current) {
      try {
        setIsRecording(true);
        recognitionRef.current.start();
        if ('vibrate' in navigator) navigator.vibrate(20);
      } catch (e) {
        setIsRecording(false);
      }
    }
  };

  const handleAddTotem = (data: any) => {
    onAddTotem(data);
    setIsAddingTotem(false);
    setShowSummonBeam(true);
    setTimeout(() => setShowSummonBeam(false), 3000);
    if ('vibrate' in navigator) navigator.vibrate([30, 100, 30, 200]);
  };

  const avgSync = totems.length > 0 
    ? totems.reduce((acc, t) => acc + t.maintenanceLevel, 0) / totems.length 
    : 99.8;
    
  const config = EMOTION_CONFIG[emotion];
  const anchorOptions: AnchorType[] = ['家', '冈仁波齐', '荒野', '古刹', '深海', '虚空'];

  return (
    <div className={`relative w-full h-full transition-colors duration-[3000ms] bg-gradient-to-b ${config.color} flex flex-col items-center overflow-hidden`}>
      
      {/* 极锐利垂直圣光 */}
      <div className="conical-beam-container">
        <div className="divine-beam-cone" style={{ 
          opacity: isAddingTotem || showSummonBeam ? 0.9 : 0.45,
          transition: 'opacity 3s ease'
        }}></div>
      </div>

      {/* 顶部导航 */}
      <div className="absolute top-12 w-full px-12 flex justify-between items-center z-50">
        <div className="flex flex-col">
          <span className="text-zinc-600 text-[9px] tracking-[0.5em] uppercase mb-1">守护者</span>
          <span className="text-xl font-ritual tracking-[0.3em] text-amber-100/90">{userName}</span>
        </div>
        <div className="flex gap-10">
          <button onClick={onSwitchToWall} className="text-zinc-500 hover:text-zinc-200 text-[11px] tracking-widest uppercase transition-colors">回音壁</button>
          <div className="w-px h-4 bg-zinc-800 self-center"></div>
          <button onClick={() => setIsCrystallizing(true)} className="text-zinc-600 hover:text-zinc-400 text-[11px] tracking-widest uppercase transition-colors">结晶</button>
        </div>
      </div>

      {/* 主滚动区 */}
      <div className="flex-1 w-full flex flex-col items-center justify-start pt-36 pb-60 overflow-y-auto z-10 scrollbar-hide">
        
        {/* 神谕判词 */}
        <div className="text-center mb-16 px-12 max-w-sm min-h-[5rem] flex items-center justify-center">
          <p className="text-zinc-300 font-light text-base leading-relaxed tracking-widest animate-fade-in text-center italic opacity-90">
            {soulEnergy ? (
              <span className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] block">
                “{soulEnergy.guidance}”
              </span>
            ) : (
              whisper || "虚空静候回响..."
            )}
          </p>
        </div>

        {/* 仪式核心水钵 - 现仅负责展示与心境切换 */}
        <div className="relative mb-12">
          <WaterBowl 
            currentEmotion={emotion} 
            onSelect={setEmotion} 
          />
        </div>

        {/* 独立召唤按钮 - 卷轴/塔尖样式 */}
        <div className="flex flex-col items-center mb-28 group animate-fade-in">
           <button 
             onClick={() => setIsAddingTotem(true)}
             className="w-16 h-16 rounded-full glass-panel border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:bg-white/5 active:scale-95 transition-all relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">🛕</span>
           </button>
           <span className="mt-4 text-[10px] text-zinc-600 tracking-[0.8em] uppercase font-light opacity-60">唤醒记忆</span>
        </div>

        {/* 语音交互球 - 悬浮在侧边 */}
        <button 
          onClick={startVoiceRitual}
          className={`fixed right-8 bottom-36 w-14 h-14 rounded-full border border-white/5 flex items-center justify-center transition-all duration-700 z-50 ${isRecording ? 'bg-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.6)]' : 'glass-panel opacity-40 hover:opacity-100'}`}
        >
          <span className={`text-2xl ${isRecording ? 'animate-pulse' : ''}`}>{isRecording ? '·' : '🎙️'}</span>
        </button>

        {/* 图腾列表 */}
        <div className={`w-full max-w-lg px-12 flex flex-col items-center space-y-48 pb-60 transition-opacity duration-1000 ${emotion === Emotion.OBLIVION ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          {totems.map((totem) => (
            <TotemItem 
              key={totem.id} 
              totem={totem} 
              onWipe={() => onWipe(totem.id)} 
              onAddOil={() => onAddOil(totem.id)}
            />
          ))}
          {totems.length === 0 && (
             <div className="py-24 opacity-20 text-center">
                <p className="text-[11px] text-zinc-500 tracking-[1em] uppercase italic">虚空无物，点击上方塔尖唤醒</p>
             </div>
          )}
        </div>
      </div>

      {/* 底部动态状态栏 - 包含锚点选择 */}
      <div className="fixed bottom-0 left-0 w-full p-12 flex justify-between items-end bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-50">
        <div className="pointer-events-auto flex flex-col gap-3">
           <div 
             onClick={() => setIsSelectingAnchor(!isSelectingAnchor)}
             className="flex items-center gap-4 cursor-pointer group"
           >
             <div className="w-2 h-2 bg-amber-500 rounded-full flicker shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div>
             <span className="text-[12px] text-amber-500 tracking-[0.6em] uppercase font-ritual group-hover:underline decoration-amber-500/30 underline-offset-4 transition-all">
                灵境锚点 · {anchor}
             </span>
           </div>
           
           {/* 锚点选择器 */}
           {isSelectingAnchor && (
             <div className="flex flex-wrap gap-3 max-w-[200px] mt-2 animate-fade-in">
               {anchorOptions.map(opt => (
                 <button 
                   key={opt}
                   onClick={() => { setAnchor(opt); setIsSelectingAnchor(false); }}
                   className={`px-3 py-1 rounded-full text-[9px] tracking-widest uppercase border transition-all ${anchor === opt ? 'border-amber-500/50 text-amber-200 bg-amber-500/10' : 'border-zinc-800 text-zinc-600 hover:text-zinc-400'}`}
                 >
                   {opt}
                 </button>
               ))}
             </div>
           )}

           <div className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase flex gap-4 opacity-70">
             <span>SYNC_LEVEL: {avgSync.toFixed(1)}%</span>
             <span>PURE_RATE: 0.992</span>
           </div>
        </div>
        
        <div className="pointer-events-auto flex gap-6">
           <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center opacity-30 hover:opacity-100 transition-all cursor-help" title="焚香">🏮</div>
           <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center opacity-30 hover:opacity-100 transition-all cursor-help" title="诵经">📿</div>
        </div>
      </div>

      {isCrystallizing && (
        <SoulCrystal name={userName} emotion={emotion} totems={totems} onClose={() => setIsCrystallizing(false)} />
      )}

      {isAddingTotem && (
        <AddTotemModal onAdd={handleAddTotem} onClose={() => setIsAddingTotem(false)} />
      )}
    </div>
  );
};

export default Sanctuary;
