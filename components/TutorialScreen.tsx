
import React, { useState, useEffect } from 'react';
import { BookOpen, Terminal, ArrowRight, Sparkles, Play, Loader2, CheckCircle } from 'lucide-react';
import { pythonService } from '../services/pythonService';

interface Props {
  onFinish: () => void;
}

export const TutorialScreen: React.FC<Props> = ({ onFinish }) => {
  const [code, setCode] = useState('print("Hello World")');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [isW, setIsW] = useState(false);

  useEffect(() => {
    pythonService.init();
  }, []);

  const handleRunTutorial = async () => {
    setRunning(true);
    const result = await pythonService.runCode(code);
    setOutput(result.output || result.error || '');
    setRunning(false);
    
    if (result.output?.toLowerCase().includes('hello world')) {
      setIsW(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in py-8">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-black text-resistance-blue tracking-tighter uppercase leading-none">Tutorial: <span className="text-brave-pink">Aura Queen 👑</span></h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-sm">Gak Slay Kalo Gak Hello World, No Cap!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card rounded-[3rem] p-10 space-y-8 border-2 border-brave-pink/20 shadow-xl">
          <div className="flex items-center gap-4 text-resistance-blue font-black text-2xl uppercase tracking-tight">
            <div className="p-3 bg-brave-pink text-white rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8" />
            </div>
            Bahasa Rizz 👑
          </div>
          <p className="text-resistance-blue/70 leading-relaxed text-lg font-bold">
            Python itu bahasa paling "Real" di dunia coding. Kita pake <code className="text-brave-pink bg-brave-pink/10 px-2 py-1 rounded">print()</code> buat ngasih tau dunia kalo kita itu Queen! 👑
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-hero-green text-white flex-shrink-0 flex items-center justify-center font-black shadow-md">1</div>
              <p className="text-resistance-blue/80 font-bold">Ketik <code className="text-brave-pink font-black">print</code> terus buka kurung <code className="text-brave-pink font-black">()</code>.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-resistance-blue text-white flex-shrink-0 flex items-center justify-center font-black shadow-md">2</div>
              <p className="text-resistance-blue/80 font-bold">Di dalem kurung, kasih tanda kutip <code className="text-brave-pink font-black">"..."</code> biar teksnya kebaca, ong!</p>
            </div>
          </div>
          
          {isW && (
            <div className="bg-hero-green text-white p-4 rounded-2xl font-black flex items-center gap-3 animate-bounce">
              <CheckCircle size={24} /> REAL! Kamu dapet W hari ini!
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-resistance-blue rounded-[3rem] p-8 shadow-[0_25px_60px_rgba(0,0,114,0.4)] border-8 border-white overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-brave-pink" />
                <div className="w-3 h-3 rounded-full bg-hero-green" />
              </div>
              <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">Latihan_Slay.py</span>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent text-white font-mono text-xl focus:outline-none resize-none min-h-[120px]"
              spellCheck={false}
            />
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleRunTutorial}
                disabled={running}
                className="bg-brave-pink text-white px-6 py-2 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-transform"
              >
                {running ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
                RUN KODE 👑
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-[10px] text-white/30 mb-2 font-black uppercase tracking-widest">HASILNYA:</div>
              <div className="font-mono text-hero-green bg-white p-4 rounded-xl text-lg font-black min-h-[60px]">
                {output}
              </div>
            </div>
          </div>
          
          <button 
            onClick={onFinish}
            disabled={!isW}
            className={`group flex items-center justify-center gap-4 w-full py-6 text-white font-black text-2xl rounded-[2rem] shadow-2xl transition-all transform active:scale-95 uppercase tracking-widest ${isW ? 'bg-hero-green hover:bg-[#124d20] scale-[1.02]' : 'bg-gray-300 cursor-not-allowed opacity-50'}`}
          >
            {isW ? 'GASKEUN TANTANGAN 👑' : 'Coba Run "Hello World" Dulu Queen 👑'} <ArrowRight className="group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border-4 border-dashed border-brave-pink/30 text-center shadow-lg">
        <p className="text-resistance-blue font-black text-lg flex items-center justify-center gap-3 italic">
          <Sparkles className="w-6 h-6 text-brave-pink animate-pulse" /> 
          Ketelitian itu rizz paling tinggi buat Queen 👑 Coder! 
          <Sparkles className="w-6 h-6 text-brave-pink animate-pulse" />
        </p>
      </div>
    </div>
  );
};
