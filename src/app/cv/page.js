"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, Download, Briefcase, Sparkles, Terminal, 
  GraduationCap, Globe, MessageCircle, Mail 
} from "lucide-react";

export default function CVPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-lime-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Asosiy sahifaga qaytish
          </Link>
          
          <a href="/khurshidbey_CV.pdf" download className="flex items-center gap-2 bg-lime-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-lime-300 hover:scale-105 transition-all shadow-lg shadow-lime-400/20">
            <Download size={20} /> PDF Yuklab olish
          </a>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-10 items-center mb-20 bg-white/5 border border-white/10 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
            <div className="absolute inset-0 bg-lime-400 rounded-[3rem] rotate-6 opacity-20 animate-pulse" />
            <img src="/me.jpg" alt="khurshidbey" className="w-full h-full object-cover rounded-[3rem] border-2 border-white/10 relative z-10" />
          </div>
          
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black mb-4">khurshid<span className="text-lime-400">bey</span></h1>
            <h2 className="text-xl md:text-2xl text-lime-400 font-bold mb-6 tracking-wide">Grafik Dizayner, AI Content Creator & Developer</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Men dizayn va texnologiya tutashgan nuqtada ishlayman. Sun'iy intellekt va zamonaviy grafik dizayn orqali brendlar uchun estetik, mukammal vizual yechimlarni taqdim etaman.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
               <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                 <Globe size={16} className="text-lime-400" /> O'zbekiston, Toshkent
               </div>
               <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                 <Mail size={16} className="text-lime-400" /> xurshidbekxoldorjonov3@gmail.com
               </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-16">
            
            <section>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Briefcase className="text-lime-400"/> Ish Tajribasi</h3>
              <div className="space-y-10 border-l-2 border-white/10 ml-4 pl-8 relative">
                
                <div className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 bg-lime-400 rounded-full border-4 border-[#050505] shadow-[0_0_15px_#a3e635]"></div>
                  <h4 className="text-xl font-bold">Graphic Designer & AI Content Creator</h4>
                  <p className="text-lime-400/80 text-sm font-semibold mb-3">Freelance (Onlayn faoliyat) | 2023 - Hozir</p>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                    <li>Turli onlayn loyihalarda grafik dizayn va AI vizuallar tayyorlash.</li>
                    <li>Brendlar uchun qadoqlash (packaging), logotip va vizual identika yaratish.</li>
                    <li>Ijtimoiy tarmoqlar uchun zamonaviy dizaynlar va AI orqali generatsiya qilingan vizuallar.</li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 bg-white/20 rounded-full border-4 border-[#050505]"></div>
                  <h4 className="text-xl font-bold">Developer</h4>
                  <p className="text-gray-500 text-sm font-semibold mb-3">Loyiha asosida | 2024 - Hozir</p>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                    <li>Zamonaviy web ilovalar va interaktiv saytlar qurish.</li>
                    <li>Avtomatlashtirilgan tizimlar va Telegram botlar dasturlash.</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><GraduationCap className="text-lime-400"/> Ta'lim</h3>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                <h4 className="text-lg font-bold">Najot Ta'lim</h4>
                <p className="text-gray-400 text-sm mt-1">Grafik Dizayn yo'nalishi | 2025-yil</p>
                <p className="text-gray-500 text-xs mt-3 italic">"Dizayn va kreativlik — bu mening hayot tarzim."</p>
              </div>
            </section>

          </div>

          <div className="space-y-12">
            
            {/* TEXNIK BAZA SECTION */}
            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-lime-400"><Terminal size={24}/> Texnik Baza</h3>
              <div className="flex flex-wrap gap-2">
                {['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Next.js', 'React', 'Tailwind CSS', 'Python', 'Appwrite', 'Git/GitHub'].map(skill => {
                  // Asosiy qurollarni tekshiramiz
                  const isCoreSkill = skill === 'Adobe Photoshop' || skill === 'Adobe Illustrator';
                  
                  return (
                    <span 
                      key={skill} 
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                        isCoreSkill 
                          ? 'bg-lime-500/10 border border-lime-500/30 text-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.15)] scale-[1.02]' 
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {/* Agar asosiy qurol bo'lsa mitti puls uruvchi nuqta qo'shamiz */}
                      {isCoreSkill && <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-400"><Sparkles size={24}/> AI Ekspertiza</h3>
              <div className="flex flex-wrap gap-2">
                {['Prompt Engineering', 'AI Video Gen', 'Google Gemini', 'ChatGPT', 'AI Automatization'].map(skill => (
                  <span key={skill} className="bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl text-xs font-medium text-purple-300">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl font-black mb-4 relative z-10 text-white">Bog'lanish</h3>
              <p className="text-sm font-medium mb-6 text-gray-400 relative z-10">Yangi loyihalar va hamkorlik uchun men doim ochiqman!</p>
              <a href="https://t.me/khurshidbeyDSN" target="_blank" className="relative z-10 flex items-center justify-center gap-3 bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white py-4 px-6 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-[#2AABEE]/30">
                <MessageCircle size={24} /> @khurshidbeyDSN
              </a>
            </section>

          </div>
        </div>

      </div>
    </main>
  );
}