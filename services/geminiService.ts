
import { GoogleGenAI, Type } from "@google/genai";
import { Challenge } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChallenge = async (level: number): Promise<Challenge> => {
  const topics = [
    "Cetak Teks (print) - Cuma nampilin tulisan doang.",
    "Variabel Dasar - Simpen nama atau status (ex: status = 'Slay').",
    "Angka & Umur - Simpen angka buat diitung (ex: aura = 100).",
    "Gabungin Teks (Concatenation) - Gabungin kata-kata pake tanda + atau f-string.",
    "Matematika Dasar - Tambah (+), Kurang (-), Kali (*) yang simpel aja.",
    "List Sederhana - Bikin daftar belanjaan seblak atau outfit.",
    "Input User - Nanya sesuatu ke user pake input().",
    "IF Statement - Cek kondisi (ex: if aura > 90: print('Slay')).",
  ];

  const currentTopic = topics[Math.min(level - 1, topics.length - 1)];

  const prompt = `Buatkan satu soal latihan pemrograman Python untuk siswi SMP kelas 7/8 (Gen Alpha).
  
  TOPIK: ${currentTopic}
  LEVEL: ABSOLUTE BEGINNER (SANGAT MUDAH).
  BAHASA: Gunakan bahasa GAUL GENERASI ALPHA INDONESIA (slang: slay, no cap, rizz, ate, crumbs, puh sepuh, bet, real, aura, W, L).
  TONE: Semangat, seru, dan mendukung. Gunakan emoji mahkota 👑 untuk memanggil user "Queen".
  
  PENGECEKAN KETAT INPUT/OUTPUT:
  1. Deskripsi WAJIB menyebutkan format output yang diminta secara eksplisit.
  2. 'testCases.input' harus menyediakan data yang dibutuhkan oleh input(). Jika ada 2 input(), sediakan 2 baris data dipisah \\n.
  3. 'testCases.expectedOutput' adalah HASIL AKHIR dari print(). JANGAN masukkan teks prompt dari input() ke dalam expectedOutput.
     CONTOH SALAH: Jika kode 'nama = input("Siapa?")', expectedOutput JANGAN berisi "Siapa?Alya". Cukup "Alya" (atau apapun yang di-print).
  4. Pastikan spasi dan huruf besar/kecil di expectedOutput konsisten dengan instruksi di deskripsi.
  5. Jika topik adalah 'Cetak Teks', testCases.input biasanya kosong.
  
  CONTOH BENAR:
  Deskripsi: "Minta input nama, terus print 'Halo [nama] Slay 👑'!"
  Input: "Alya"
  Expected Output: "Halo Alya Slay 👑"`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          startingCode: { type: Type.STRING },
          testCases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                input: { type: Type.STRING },
                expectedOutput: { type: Type.STRING }
              },
              required: ["input", "expectedOutput"]
            },
            minItems: 2
          },
          hint: { type: Type.STRING }
        },
        required: ["title", "description", "testCases", "startingCode", "hint"]
      }
    }
  });

  const data = JSON.parse(response.text);
  
  return {
    id: `challenge-${Date.now()}`,
    level,
    points: 10,
    ...data
  };
};
