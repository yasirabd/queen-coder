
import React, { useState } from 'react';
import { Plus, X, Heart, Star, Sparkles } from 'lucide-react';

interface Props {
  onStart: (names: string[], className: string) => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  const [names, setNames] = useState<string[]>(['']);
  const [className, setClassName] = useState('7A');

  const addName = () => setNames([...names, '']);
  const removeName = (index: number) => setNames(names.filter((_, i) => i !== index));
  const updateName = (index: number, val: string) => {
    const next = [...names];
    next[index] = val;
    setNames(next);
  };

  const handleStart = () => {
    const validNames = names.filter(n => n.trim() !== '');
    if (validNames.length > 0) {
      onStart(validNames, className);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 py-6 md:py-12">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-hero-green text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-md animate-pulse">
          <Sparkles size={16} /> Coding High Rizz Only
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-resistance-blue drop-shadow-sm tracking-tighter leading-none">
          Yo, <span className="text-brave-pink">Queen 👑</span>
        </h1>
        <p className="text-gray-500 text-xl font-medium max-w-lg mx-auto">
          Siap nge-slay baris kode hari ini? No cap, coding itu gampang kalo kamu punya aura Queen! 👑
        </p>
      </div>

      <div className="w-full glass-card rounded-[3rem] p-10 shadow-2xl border-2 border-brave-pink/20">
        <div className="space-y-8">
          <div>
            <label className="block text-resistance-blue font-black mb-4 flex items-center gap-2 uppercase text-sm tracking-[0.2em]">
              <Star size={18} className="text-brave-pink" fill="currentColor" /> Siapa Aja Queen-nya? 👑
            </label>
            <div className="space-y-4">
              {names.map((name, idx) => (
                <div key={idx} className="flex gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updateName(idx, e.target.value)}
                    placeholder="Nama kamu (biar dapet aura W)"
                    className="flex-1 px-5 py-4 rounded-2xl border-2 border-soft-pink/30 focus:border-brave-pink focus:ring-8 focus:ring-brave-pink/10 focus:outline-none transition-all font-bold text-lg text-resistance-blue"
                  />
                  {names.length > 1 && (
                    <button 
                      onClick={() => removeName(idx)}
                      className="p-4 text-gray-300 hover:text-brave-pink transition-colors"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={addName}
              className="mt-4 flex items-center gap-2 text-brave-pink font-black hover:text-resistance-blue transition-colors text-sm uppercase tracking-wider"
            >
              <Plus size={20} /> Tambah Bestie 👑
            </button>
          </div>

          <div>
            <label className="block text-resistance-blue font-black mb-4 flex items-center gap-2 uppercase text-sm tracking-[0.2em]">
              <Heart size={18} className="text-hero-green" fill="currentColor" /> Base (Kelas) 👑
            </label>
            <div className="grid grid-cols-4 gap-4">
              {['7A', '7B', '8A', '8B'].map(c => (
                <button
                  key={c}
                  onClick={() => setClassName(c)}
                  className={`py-4 rounded-2xl border-4 font-black text-lg transition-all ${className === c ? 'bg-resistance-blue border-resistance-blue text-white shadow-xl scale-105' : 'border-soft-pink/20 text-soft-pink hover:border-brave-pink hover:text-brave-pink'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={names.every(n => n.trim() === '')}
            className="w-full py-6 bg-brave-pink text-white font-black text-2xl rounded-[2rem] shadow-[0_15px_30px_rgba(247,132,197,0.4)] hover:bg-rose-500 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            Mulai Slay Coding ✨
          </button>
        </div>
      </div>
    </div>
  );
};
