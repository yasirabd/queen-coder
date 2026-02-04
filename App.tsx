
import React, { useState, useEffect } from 'react';
import { AppState, Student } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TutorialScreen } from './components/TutorialScreen';
import { LearningPortal } from './components/LearningPortal';
import { Leaderboard } from './components/Leaderboard';
import { PetAnimation } from './components/PetAnimation';
import { Sparkles, GraduationCap, Trophy, Cat } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [students, setStudents] = useState<Student[]>([]);
  const [showPets, setShowPets] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('ns_queen_coder_students');
    const savedShowPets = localStorage.getItem('ns_queen_coder_show_pets');
    
    if (saved) {
      setStudents(JSON.parse(saved));
    }
    if (savedShowPets !== null) {
      setShowPets(JSON.parse(savedShowPets));
    }
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('ns_queen_coder_students', JSON.stringify(students));
    }
  }, [students]);

  useEffect(() => {
    localStorage.setItem('ns_queen_coder_show_pets', JSON.stringify(showPets));
  }, [showPets]);

  const handleStartLearning = (names: string[], className: string) => {
    // Menggabungkan nama-nama menjadi satu identitas grup
    const combinedName = names.filter(n => n.trim() !== '').join(', ');
    const newStudent: Student = {
      name: combinedName,
      className,
      points: 0,
      level: 1,
      completedChallenges: []
    };
    // Untuk saat ini kita simpan sebagai array namun hanya berisi 1 grup/user aktif
    setStudents([newStudent]);
    setAppState(AppState.TUTORIAL);
  };

  const handleFinishTutorial = () => {
    setAppState(AppState.LEARNING);
  };

  const updateStudentProgress = (points: number, challengeId: string) => {
    const updated = [...students];
    if (updated.length > 0) {
      const student = updated[0];
      if (!student.completedChallenges.includes(challengeId)) {
        student.points += points;
        student.completedChallenges.push(challengeId);
        student.level = Math.floor(student.completedChallenges.length / 2) + 1;
        setStudents(updated);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Queen's Pets Animation Overlay - Conditionally Rendered */}
      {showPets && <PetAnimation />}

      <nav className="p-4 bg-white/95 border-b-4 border-brave-pink/20 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brave-pink rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3 glow-pink">
            <Sparkles size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-resistance-blue leading-none">
              NURUS SUNNAH
            </span>
            <span className="text-sm font-bold text-brave-pink tracking-widest">
              QUEEN CODER
            </span>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Pet Toggle Button */}
          <button
            onClick={() => setShowPets(!showPets)}
            title={showPets ? "Sembunyikan Peliharaan" : "Munculkan Peliharaan"}
            className={`p-3 rounded-xl transition-all border-2 ${showPets ? 'bg-brave-pink/10 border-brave-pink text-brave-pink' : 'bg-gray-100 border-gray-200 text-gray-400'} hover:scale-110 active:scale-95`}
          >
            <Cat size={20} />
          </button>

          {appState !== AppState.WELCOME && (
            <>
              <button 
                onClick={() => setAppState(AppState.LEARNING)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-sm ${appState === AppState.LEARNING || appState === AppState.TUTORIAL ? 'bg-brave-pink text-white shadow-lg scale-105' : 'text-resistance-blue hover:bg-soft-pink/20'}`}
              >
                <GraduationCap size={20} className="hidden sm:inline" /> BELAJAR
              </button>
              <button 
                onClick={() => setAppState(AppState.LEADERBOARD)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-sm ${appState === AppState.LEADERBOARD ? 'bg-resistance-blue text-white shadow-lg scale-105' : 'text-resistance-blue hover:bg-resistance-blue/10'}`}
              >
                <Trophy size={20} className="hidden sm:inline" /> PERINGKAT
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        {appState === AppState.WELCOME && (
          <WelcomeScreen onStart={handleStartLearning} />
        )}

        {appState === AppState.TUTORIAL && (
          <TutorialScreen onFinish={handleFinishTutorial} />
        )}

        {appState === AppState.LEARNING && students.length > 0 && (
          <LearningPortal 
            student={students[0]} 
            onProgress={updateStudentProgress}
          />
        )}

        {appState === AppState.LEADERBOARD && (
          <Leaderboard students={students} />
        )}
      </main>

      <footer className="p-8 text-center border-t border-brave-pink/10">
        <div className="flex justify-center gap-2 mb-2">
          <div className="w-8 h-1 bg-brave-pink rounded-full"></div>
          <div className="w-8 h-1 bg-hero-green rounded-full"></div>
          <div className="w-8 h-1 bg-resistance-blue rounded-full"></div>
        </div>
        <p className="text-resistance-blue/60 text-sm font-bold uppercase tracking-widest">
          &copy; 2025 Nurus Sunnah Queen Coder • Solidarity in Coding 👸
        </p>
      </footer>
    </div>
  );
};

export default App;
