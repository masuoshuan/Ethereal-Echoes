
import React, { useState, useEffect } from 'react';

interface EchoWallProps {
  onBack: () => void;
}

const EchoWall: React.FC<EchoWallProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<string[]>([
    "Wunderlist，谢谢你帮我记住了所有的第一次约会。",
    "有些东西，消失了比存在更让我心动。",
    "晚安，全世界。",
    "我在这里留下一点光，愿你看到。",
    "记忆不是为了折磨，是为了证明我们活过。"
  ]);
  const [input, setInput] = useState('');

  const sendEcho = () => {
    if (!input.trim()) return;
    setMessages(prev => [input, ...prev.slice(0, 10)]);
    setInput('');
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      {/* Meteor Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-45"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animation: `meteor ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${i * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="p-8 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors uppercase text-xs tracking-widest">
          ← 回到圣殿
        </button>
        <h2 className="text-zinc-400 font-light tracking-[0.5em] text-sm italic">回音墙</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-12">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className="text-center animate-fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <p className="text-zinc-300 font-light text-lg italic tracking-wide leading-relaxed">
              "{msg}"
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest">匿名回响</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 glass m-6 rounded-lg space-y-4">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在这里，向消失的一切道别..."
          className="w-full bg-transparent border-none text-zinc-300 placeholder-zinc-700 resize-none focus:outline-none text-sm h-24"
        />
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-zinc-600">文字如流星划过，转瞬即逝。</span>
          <button 
            onClick={sendEcho}
            className="px-6 py-2 border border-zinc-700 hover:border-white transition-colors text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white"
          >
            发出回响
          </button>
        </div>
      </div>

      <style>{`
        @keyframes meteor {
          0% { transform: translate(-100px, -100px) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          40% { transform: translate(400px, 400px) rotate(45deg); opacity: 0; }
          100% { transform: translate(400px, 400px) rotate(45deg); opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EchoWall;
