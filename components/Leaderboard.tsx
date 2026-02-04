
import React from 'react';
import { Student } from '../types';
import { Trophy, Medal, Crown, Star, ShieldCheck } from 'lucide-react';

interface Props {
  students: Student[];
}

export const Leaderboard: React.FC<Props> = ({ students }) => {
  const sorted = [...students].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in py-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-brave-pink text-white px-8 py-2 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-xl">
          <ShieldCheck size={18} /> Hall of Rizz 👑
        </div>
        <h2 className="text-7xl font-black text-resistance-blue tracking-tighter leading-none uppercase">
          Istana <span className="text-brave-pink">W Queen 👑</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Peringkat Queen Paling Slay di Nurus Sunnah</p>
      </div>

      <div className="glass-card rounded-[3.5rem] overflow-hidden shadow-[0_30px_70px_rgba(247,132,197,0.2)] border-4 border-white">
        <table className="w-full">
          <thead>
            <tr className="bg-resistance-blue text-white uppercase text-xs tracking-[0.3em] font-black">
              <th className="px-10 py-8 text-left">Level Slay 👑</th>
              <th className="px-10 py-8 text-left">The Queen 👑</th>
              <th className="px-10 py-8 text-right">Poin Aura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brave-pink/10">
            {sorted.map((s, idx) => (
              <tr key={idx} className={`transition-all ${idx === 0 ? 'bg-brave-pink/5' : 'hover:bg-hero-green/5'}`}>
                <td className="px-10 py-8">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-3xl font-black text-2xl shadow-xl border-4 ${
                    idx === 0 ? 'bg-brave-pink border-white text-white rotate-6 scale-110' : 
                    idx === 1 ? 'bg-hero-green border-white text-white -rotate-6' :
                    idx === 2 ? 'bg-resistance-blue border-white text-white rotate-3' :
                    'bg-white border-gray-100 text-gray-300'
                  }`}>
                    {idx === 0 ? <Crown size={32} /> : 
                     idx === 1 ? <Medal size={32} /> :
                     idx === 2 ? <Medal size={32} /> :
                     idx + 1}
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} className="w-16 h-16 rounded-3xl border-4 border-white shadow-lg bg-gray-50 transform group-hover:scale-110 transition-transform" alt="avatar" />
                      {idx < 3 && <div className="absolute -top-3 -right-3 bg-white text-brave-pink rounded-full p-2 shadow-xl animate-bounce border-2 border-brave-pink"><Star size={16} fill="currentColor"/></div>}
                    </div>
                    <div>
                      <div className="font-black text-resistance-blue text-2xl tracking-tighter uppercase">{s.name}</div>
                      <div className="text-xs font-black text-brave-pink uppercase tracking-widest">Base {s.className} • Aura Lvl {s.level}</div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="inline-flex flex-col items-end">
                    <span className="text-4xl font-black text-resistance-blue tracking-tighter">{s.points}</span>
                    <span className="text-[10px] font-black text-hero-green uppercase tracking-widest">Rizz Points</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div className="text-center py-32 bg-gray-50/30">
            <Trophy className="mx-auto text-brave-pink/20 mb-6 animate-pulse" size={100} />
            <p className="text-resistance-blue font-black text-2xl uppercase tracking-[0.2em]">Takhtanya Masih Kosong, Ong!</p>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-3">Buruan belajar biar dapet aura W!</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6 py-6">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-brave-pink' : 'bg-hero-green'} opacity-20`} />
        ))}
      </div>
    </div>
  );
};
