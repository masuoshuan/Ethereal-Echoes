
import React, { useState } from 'react';
import { Totem } from '../types';

interface AddTotemModalProps {
  onAdd: (totem: Omit<Totem, 'id' | 'dustLevel' | 'maintenanceLevel' | 'lastInteraction'>) => void;
  onClose: () => void;
}

const AddTotemModal: React.FC<AddTotemModalProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [type, setType] = useState<'DIGITAL' | 'LIFE'>('LIFE');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
      name,
      description: desc,
      type,
      image
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-sm glass-panel p-8 rounded-lg space-y-8 animate-fade-in border-white/10">
        <div className="text-center">
          <h2 className="text-zinc-400 font-ritual text-2xl tracking-widest">召唤一段记忆</h2>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">Summoning Echo</p>
        </div>

        <div className="space-y-6">
          {/* 图片上传预览区 */}
          <div className="relative w-24 h-24 mx-auto group">
            <label className="cursor-pointer block w-full h-full rounded-full border border-dashed border-zinc-700 flex items-center justify-center overflow-hidden transition-all hover:border-amber-500/50">
              {image ? (
                <img src={image} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <span className="text-2xl opacity-20">＋</span>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            <p className="text-center text-[8px] text-zinc-600 mt-2">上传灵魂快照</p>
          </div>

          <div className="space-y-4">
             <input 
               type="text" 
               placeholder="赋予它一个真名..." 
               className="w-full bg-transparent border-b border-zinc-800 p-2 text-zinc-300 focus:outline-none focus:border-amber-500/50 transition-all text-center font-ritual text-lg"
               value={name}
               onChange={e => setName(e.target.value)}
             />
             <textarea 
               placeholder="写下关于它的判词 (选填)..." 
               className="w-full bg-transparent border-b border-zinc-800 p-2 text-zinc-500 text-xs focus:outline-none focus:border-amber-500/30 transition-all text-center resize-none h-12"
               value={desc}
               onChange={e => setDesc(e.target.value)}
             />
          </div>

          <div className="flex justify-center gap-6">
             <button 
               onClick={() => setType('LIFE')}
               className={`text-[10px] tracking-widest transition-all ${type === 'LIFE' ? 'text-amber-500 underline' : 'text-zinc-600'}`}
             >
               生命回响
             </button>
             <button 
               onClick={() => setType('DIGITAL')}
               className={`text-[10px] tracking-widest transition-all ${type === 'DIGITAL' ? 'text-teal-500 underline' : 'text-zinc-600'}`}
             >
               数字遗迹
             </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 border border-zinc-800 text-[10px] text-zinc-600 uppercase tracking-widest hover:text-white transition-all">
            取消
          </button>
          <button 
            disabled={!name}
            onClick={handleSubmit} 
            className="flex-1 py-3 border border-amber-500/20 bg-amber-500/5 text-[10px] text-amber-500 uppercase tracking-widest hover:bg-amber-500/10 transition-all disabled:opacity-20"
          >
            完成召唤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTotemModal;
