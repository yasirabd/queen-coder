
import React, { useState, useEffect, useRef } from 'react';
import { Student, Challenge, GradeResult } from '../types';
import { generateChallenge } from '../services/geminiService';
import { pythonService } from '../services/pythonService';
import { Play, CheckCircle, AlertCircle, HelpCircle, Loader2, Terminal, ArrowRight, Code, Zap, Info } from 'lucide-react';

interface Props {
  student: Student;
  onProgress: (points: number, challengeId: string) => void;
}

export const LearningPortal: React.FC<Props> = ({ student, onProgress }) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  
  const lastLevelFetched = useRef<number | null>(null);

  const fetchNewChallenge = async () => {
    setLoading(true);
    try {
      const newChallenge = await generateChallenge(student.level);
      setChallenge(newChallenge);
      setCode(newChallenge.startingCode);
      setResult(null);
      setShowHint(false);
      lastLevelFetched.current = student.level;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch pertama kali
    if (challenge === null) {
      fetchNewChallenge();
    }
    pythonService.init();
  }, []);

  const handleRun = async () => {
    if (!challenge) return;
    setGrading(true);
    const gradeResult = await pythonService.grade(code, challenge.testCases);
    setResult(gradeResult);
    setGrading(false);

    if (gradeResult.passed) {
      onProgress(challenge.points, challenge.id);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-8">
        <div className="relative">
          <div className="w-24 h-24 border-8 border-brave-pink/20 border-t-brave-pink rounded-full animate-spin" />
          <Code className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brave-pink" size={32} />
        </div>
        <div className="text-center">
          <p className="text-resistance-blue font-black text-3xl mb-2 tracking-tighter uppercase">Lagi Masak Soal... 👑</p>
          <p className="text-brave-pink font-bold uppercase tracking-widest text-sm">Biar Para Queen bisa nge-slay!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 h-full">
      {/* Sidebar - Challenge Info */}
      <div className="flex flex-col gap-8 h-full">
        <div className="bg-resistance-blue rounded-[2.5rem] p-8 shadow-2xl border-4 border-white flex justify-between items-center text-white">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} className="w-16 h-16 rounded-2xl border-4 border-brave-pink bg-white shadow-lg transform group-hover:rotate-6 transition-transform" alt="avatar" />
              <div className="absolute -bottom-2 -right-2 bg-hero-green text-white p-1 rounded-lg shadow-md"><Zap size={14} fill="currentColor"/></div>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight leading-tight mb-1">Para Queen 👑</h2>
              <p className="text-white/60 text-xs font-bold truncate max-w-[200px] mb-2">{student.name}</p>
              <div className="flex gap-3 items-center">
                <span className="bg-brave-pink text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Aura Lvl {student.level}</span>
                <span className="text-hero-green font-black text-sm">{student.points} W Points</span>
              </div>
            </div>
          </div>
        </div>

        {challenge && (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-2 border-brave-pink/10 flex-1 flex flex-col overflow-hidden">
            <div className="mb-6">
              <h3 className="text-3xl font-black text-resistance-blue mb-4 tracking-tighter uppercase leading-tight">{challenge.title}</h3>
              <div className="bg-soft-pink/10 p-8 rounded-[2rem] text-resistance-blue/80 leading-relaxed font-bold italic border-l-8 border-brave-pink whitespace-pre-wrap text-lg">
                "{challenge.description}"
              </div>
            </div>

            <div className="mb-6 bg-blue-50 border-l-4 border-resistance-blue p-4 rounded-r-2xl flex items-start gap-3">
              <Info className="text-resistance-blue shrink-0 mt-1" size={20} />
              <div className="text-xs text-resistance-blue/80 font-bold leading-tight">
                <span className="uppercase block mb-1">Tips Queen:</span>
                Kalo ada <code className="bg-white px-1 rounded">Input</code>, artinya kode kamu harus pake <code className="bg-white px-1 rounded">input()</code> ya!
              </div>
            </div>

            <div className="space-y-6 mb-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <h4 className="font-black text-resistance-blue text-sm uppercase tracking-[0.3em] flex items-center gap-3">
                <Terminal size={20} className="text-brave-pink" /> Misi Biar W (Test Cases) 👑
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {challenge.testCases.map((tc, i) => (
                  <div key={i} className="flex flex-col bg-resistance-blue rounded-3xl p-6 border-2 border-brave-pink/20 shadow-lg group hover:border-brave-pink transition-all">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                      <span className="text-white/40">Skenario #{i + 1}</span>
                      {result?.testResults[i]?.passed && <span className="text-white flex items-center gap-2 bg-hero-green px-3 py-1 rounded-full border border-white/20 shadow-sm">SLAYED <CheckCircle size={12}/></span>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="text-[10px] text-brave-pink font-black tracking-widest uppercase flex items-center gap-2">
                          <ArrowRight size={12}/> Input
                        </div>
                        <div className="font-mono bg-white/5 p-4 rounded-xl text-white border border-white/10 group-hover:bg-white/10 transition-colors shadow-inner whitespace-pre-line min-h-[50px]">
                          {tc.input || <span className="text-white/20 italic">No Input</span>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] text-hero-green font-black tracking-widest uppercase flex items-center gap-2">
                          <CheckCircle size={12}/> Expected
                        </div>
                        <div className="font-mono bg-white p-4 rounded-xl text-hero-green border-2 border-hero-green font-black shadow-lg min-h-[50px]">
                          {tc.expectedOutput}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-soft-pink/20">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-xs font-black text-brave-pink hover:text-resistance-blue transition-colors bg-soft-pink/20 px-6 py-3 rounded-2xl border border-brave-pink/20"
              >
                <HelpCircle size={18} /> {showHint ? 'TUTUP BOCORAN' : 'TANYA PUH SEPUH? 👑'}
              </button>
              {showHint && (
                <div className="mt-4 text-sm bg-hero-green text-white p-6 rounded-[2rem] shadow-xl animate-slide-up font-bold border-2 border-white/20">
                  🛡️ Tips Puh Sepuh: {challenge.hint}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Code Editor & Execution Section */}
      <div className="flex flex-col gap-10">
        <div className="flex-1 bg-resistance-blue rounded-[3rem] overflow-hidden flex flex-col shadow-[0_30px_60px_rgba(0,0,114,0.3)] border-8 border-white relative min-h-[550px]">
          <div className="flex items-center justify-between px-10 py-6 bg-white/10 border-b border-white/10 backdrop-blur-md">
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-brave-pink shadow-[0_0_10px_#F784C5] animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-hero-green shadow-[0_0_10px_#1B602F]" />
              <div className="w-4 h-4 rounded-full bg-white/30" />
            </div>
            <span className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">Mantra_Queen.py 👑</span>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-transparent text-white font-mono p-10 resize-none focus:outline-none text-xl leading-relaxed selection:bg-brave-pink/40 caret-brave-pink custom-scrollbar"
            placeholder="# Ketik logikamu di sini, no cap..."
          />

          <div className="p-8 bg-white/5 backdrop-blur-xl flex justify-between items-center border-t border-white/10">
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest italic">Nurus Sunnah Slay Squad</p>
            <button
              onClick={handleRun}
              disabled={grading}
              className="group flex items-center gap-4 px-12 py-5 bg-brave-pink hover:bg-soft-pink text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_15px_40px_rgba(247,132,197,0.5)] active:scale-95 hover:scale-105"
            >
              {grading ? <Loader2 className="animate-spin" size={24} /> : <Play size={24} className="fill-current" />} 
              GASKEUN 👑
            </button>
          </div>
        </div>

        {/* Execution Status Card */}
        <div className={`rounded-[3rem] p-10 border-4 transition-all duration-700 ${result?.passed ? 'bg-hero-green text-white border-white/30 shadow-[0_20px_40px_rgba(27,96,47,0.4)] scale-[1.03]' : result ? 'bg-brave-pink text-white border-white/30 shadow-[0_20px_40px_rgba(247,132,197,0.3)]' : 'bg-white border-brave-pink/20 opacity-60'}`}>
          {result ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-2xl ${result.passed ? 'bg-white text-hero-green animate-bounce' : 'bg-white text-brave-pink animate-pulse'}`}>
                    {result.passed ? <CheckCircle size={36} /> : <AlertCircle size={36} />}
                  </div>
                  <div>
                    <h4 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1">
                      {result.passed ? 'W MOMENT! ✨' : 'L MOMENT (FIX IT)! 💪'}
                    </h4>
                    <p className={`text-sm font-bold uppercase tracking-widest ${result.passed ? 'text-white/70' : 'text-white/80'}`}>
                      {result.passed ? 'Left no crumbs! Slay parah.' : 'Dikit lagi Queen, no cap!'}
                    </p>
                  </div>
                </div>
                {result.passed && (
                  <div className="bg-white text-hero-green px-6 py-3 rounded-2xl font-black text-xl shadow-lg">+ {challenge?.points} W Pts</div>
                )}
              </div>

              {!result.passed && (
                <div className="bg-white/10 rounded-[2rem] p-6 border border-white/20 space-y-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">Kenapa Enggak W?:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                    <div className="space-y-1">
                      <div className="text-white/50 text-[10px]">MAUNYA:</div>
                      <div className="text-white font-black bg-white/10 p-2 rounded-lg break-all">{result.testResults.find(tr => !tr.passed)?.expected}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-white/50 text-[10px]">TAPI TERNYATA:</div>
                      <div className="text-white font-black bg-resistance-blue/40 p-2 rounded-lg italic break-all">"{result.testResults.find(tr => !tr.passed)?.actual}"</div>
                    </div>
                  </div>
                </div>
              )}

              {result.passed && (
                <button
                  onClick={fetchNewChallenge}
                  className="w-full py-6 bg-white text-hero-green font-black text-2xl rounded-[2.5rem] flex items-center justify-center gap-4 hover:bg-gray-50 shadow-2xl transition-all active:scale-95 uppercase tracking-widest"
                >
                  NEXT CHALLENGE (BET) <ArrowRight size={28} />
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-4 opacity-40">
              <Zap size={48} className="text-resistance-blue" />
              <p className="font-black text-xl uppercase tracking-[0.4em] italic text-resistance-blue">Nunggu Kode Slay Kalian... 👑</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
