
import React, { useEffect, useState } from 'react';

// Daftar hewan "Full Body" yang lucu dan aesthetic
const PETS = [
  { icon: '🐈', name: 'Kitty' },
  { icon: '🐇', name: 'Bunny' },
  { icon: '🐿️', name: 'Squirrel' },
  { icon: '🐼', name: 'Panda' },
  { icon: '🐧', name: 'Pingui' },
  { icon: '🦄', name: 'Uni' },
  { icon: '🐢', name: 'Turtle' },
  { icon: '🦌', name: 'Deer' }
];

export const PetAnimation: React.FC = () => {
  const [activePets, setActivePets] = useState<{ id: number; icon: string; delay: number; duration: number; top: number }[]>([]);

  useEffect(() => {
    // Spawn beberapa pet secara acak di area atas layar
    const newPets = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      icon: PETS[Math.floor(Math.random() * PETS.length)].icon,
      delay: Math.random() * -20, // Negative delay agar posisi awal acak di tengah jalan
      duration: 50 + Math.random() * 30, // Sangat perlahan (50 - 80 detik)
      top: 15 + (i * 28) 
    }));
    setActivePets(newPets);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-48 pointer-events-none z-[60] overflow-hidden">
      <style>
        {`
          /* Animasi Utama: Berjalan dari Kanan ke Kiri dan Sebaliknya */
          @keyframes walk-cycle {
            0% { transform: translateX(115vw) scaleX(1); }
            48% { transform: translateX(-15vw) scaleX(1); }
            50% { transform: translateX(-15vw) scaleX(-1); }
            98% { transform: translateX(115vw) scaleX(-1); }
            100% { transform: translateX(115vw) scaleX(1); }
          }
          
          /* Animasi Langkah (Walking/Stepping): Mensimulasikan gerakan kaki */
          @keyframes walk-step {
            0%, 50%, 100% { 
              transform: translateY(0) rotate(0deg) scaleY(1) scaleX(1); 
            }
            15% { 
              /* Langkah Kiri: Angkat dan miring ke depan */
              transform: translateY(-10px) rotate(10deg) scaleY(1.1) scaleX(0.95); 
            }
            25% { 
              /* Menapak: Squash sedikit saat kaki menyentuh tanah */
              transform: translateY(0) rotate(0deg) scaleY(0.85) scaleX(1.1); 
            }
            65% { 
              /* Langkah Kanan: Angkat dan miring ke belakang */
              transform: translateY(-10px) rotate(-10deg) scaleY(1.1) scaleX(0.95); 
            }
            75% { 
              /* Menapak: Squash lagi */
              transform: translateY(0) rotate(0deg) scaleY(0.85) scaleX(1.1); 
            }
          }

          .queen-pet-container {
            position: absolute;
            animation: walk-cycle linear infinite;
            will-change: transform;
          }

          .queen-pet-body {
            font-size: 2.8rem;
            animation: walk-step 2s ease-in-out infinite;
            filter: drop-shadow(0 8px 10px rgba(0,0,0,0.1));
            display: flex;
            align-items: center;
            justify-content: center;
            transform-origin: bottom center;
          }
          
          .crown-mini {
            position: absolute;
            top: -14px;
            right: -6px;
            font-size: 0.9rem;
            animation: bounce 2s infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
        `}
      </style>
      {activePets.map((pet) => (
        <div
          key={pet.id}
          className="queen-pet-container"
          style={{
            top: `${pet.top}px`,
            animationDuration: `${pet.duration}s`,
            animationDelay: `${pet.delay}s`,
          }}
        >
          <div className="queen-pet-body relative">
            {pet.icon}
            <span className="crown-mini">👑</span>
          </div>
        </div>
      ))}
    </div>
  );
};
