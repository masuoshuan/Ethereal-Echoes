
import React, { useState } from 'react';
import { Totem } from '../types';

interface TotemItemProps {
  totem: Totem;
  onWipe: () => void;
  onAddOil: () => void;
}

const TotemItem: React.FC<TotemItemProps> = ({ totem, onWipe, onAddOil }) => {
  const [isWiping, setIsWiping] = useState(false);

  const handleWipe = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWiping(true);
    onWipe();
    setTimeout(() => setIsWiping(false), 800);
  };

  return (
    <div className="relative flex flex-col items-center animate-fade-in w-full group">
      {/* 装饰线 */}
      <div className="mb-10 opacity-20 flex items-center gap-6">
         <div className="w-16 h-px bg-gradient-to-r from-transparent to-white"></div>
         <span className="text-[10px] tracking-[0.6em] uppercase text-zinc-400 font-light italic">生命回响</span>
         <div className="w-16 h-px bg-gradient-to-l from-transparent to-white"></div>
      </div>

      {/* 圆形快照 - 保持真实影像色彩 */}
      <div className="relative w-64 h-64">
        
        {/* 背景光影 */}
        <div className="absolute inset-0 rounded-full blur-3xl opacity-10 transition-opacity duration-1000 group-hover:opacity-25"
             style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}></div>

        {/* 图片容器 */}
        <div className={`relative w-full h-full rounded-full border border-amber-500/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] transition-all duration-1000 ${isWiping ? 'scale-95 blur-sm' : 'group-hover:scale-[1.01]'}`}>
          {totem.image ? (
            <img 
              src={totem.image} 
              alt={totem.name} 
              className="w-full h-full object-cover transition-opacity duration-1000"
              style={{ 
                // 只根据尘埃调整透明度和轻微亮度，不使用灰度滤镜
                filter: `brightness(${1 - (totem.dustLevel / 400)})` 
              }}
            />
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <span className="text-5xl opacity-10">⌛</span>
            </div>
          )}
          
          {/* 尘埃层 - 极淡遮罩 */}
          <div 
            className="absolute inset-0 bg-white/5 pointer-events-none transition-opacity duration-1000"
            style={{ opacity: totem.dustLevel / 100 * 0.2 }}
          ></div>
        </div>

        {/* 右侧交互球 - 垂直堆叠在圆形右边缘外侧 */}
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
          <button 
            onClick={handleWipe} 
            className="w-14 h-14 rounded-full glass-panel border-white/10 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all shadow-2xl group/btn"
          >
            <span className="text-xl group-hover/btn:scale-110 transition-transform">✨</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddOil(); }} 
            className="w-14 h-14 rounded-full glass-panel border-amber-500/20 flex items-center justify-center hover:bg-amber-500/10 active:scale-90 transition-all shadow-2xl group/btn"
          >
            <span className="text-xl group-hover/btn:scale-110 transition-transform">🔥</span>
          </button>
        </div>
      </div>

      {/* 底部信息排版 */}
      <div className="mt-12 text-center flex flex-col items-center">
        <h3 className="text-zinc-100 font-ritual text-3xl tracking-[0.4em] mb-8 drop-shadow-lg">{totem.name}</h3>
        
        {/* 数据展示 */}
        <div className="flex items-center justify-center gap-12 opacity-50 mb-6">
           <div className="flex items-center gap-3">
             <span className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase">尘埃</span>
             <span className="text-xs font-mono text-zinc-400">{Math.floor(totem.dustLevel)}%</span>
           </div>
           <div className="w-px h-4 bg-zinc-800"></div>
           <div className="flex items-center gap-3">
             <span className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase">逸火</span>
             <span className="text-xs font-mono text-amber-500">{Math.floor(totem.maintenanceLevel)}%</span>
           </div>
        </div>

        {/* 底部细线条指示器 */}
        <div className="w-32 h-[1px] bg-zinc-900 overflow-hidden rounded-full">
          <div 
            className="h-full bg-amber-500/30 transition-all duration-1000" 
            style={{ width: `${totem.maintenanceLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TotemItem;
