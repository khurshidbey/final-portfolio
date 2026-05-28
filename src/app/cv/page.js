"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Award, UserCheck, X } from "lucide-react";

export default function CVPage() {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [printTheme, setPrintTheme] = useState('dark');

  const triggerPrint = (theme) => {
    setPrintTheme(theme);
    setShowPdfModal(false);
    setTimeout(() => {
      window.print();
    }, 300); // Kichik pauza stil o'zgarishi uchun
  };

  return (
    <main className={`min-h-screen ${printTheme === 'light' ? 'bg-white' : 'bg-[#050505]'} text-white pt-24 pb-20 px-6 relative transition-colors duration-300`}>
      
      {/* Chop etish uchun dinamik stillar */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: ${printTheme === 'light' ? '#ffffff' : '#050505'} !important;
            color: ${printTheme === 'light' ? '#000000' : '#ffffff'} !important;
          }
          .print-text { color: ${printTheme === 'light' ? '#000000' : '#ffffff'} !important; }
          .print-text-muted { color: ${printTheme === 'light' ? '#4b5563' : '#9ca3af'} !important; }
          .print-bg-card { background-color: ${printTheme === 'light' ? '#f9fafb' : 'rgba(255,255,255,0.05)'} !important; }
          .print-border { border-color: ${printTheme === 'light' ? '#e5e7eb' : 'rgba(255,255,255,0.1)'} !important; }
          .no-print { display: none !important; }
          @page { margin: 0.5cm; }
        }
      `}} />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Tepa tugmalar */}
        <div className="flex justify-between items-center mb-10 no-print">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Asosiy sahifaga qaytish
          </Link>
          <button onClick={() => setShowPdfModal(true)} className="bg-lime-400 text-black px-6 py-3 rounded-full font-bold hover:bg-lime-300 transition-all flex items-center gap-2 shadow-lg shadow-lime-400/20">
            <Download size={18} /> PDF Yuklab olish
          </button>
        </div>

        {/* ASOSIY CV KARTASI - Eski kreativ dizayn */}
        <div className="print-bg-card print-border border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
          
          {/* Header qismi */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
            <div className="w-40 h-40 bg-lime-500 rounded-[2rem] overflow-hidden flex-shrink-0 relative shadow-[0_0_30px_rgba(163,230,53,0.3)]">
              <img src="/me.jpg" alt="Xurshidbek Xoldorjonov" className="w-full h-full object-cover grayscale-[10%]" />
            </div>
            
            <div className="flex-1 pt-2">
              <h1 className="text-4xl md:text-5xl font-black mb-3 print-text">Xurshidbek Xoldorjonov</h1>
              <h2 className="text-xl text-lime-400 font-bold mb-4 tracking-wide">Grafik Dizayner, AI Content Creator & Developer</h2>
              <p className="print-text-muted leading-relaxed mb-6 text-sm md:text-base max-w-2xl">
                Men dizayn va texnologiya tutashgan nuqtada ishlayman. Sun'iy intellekt va zamonaviy grafik dizayn orqali brendlar uchun estetik, mukammal vizual yechimlarni taqdim etaman.
              </p>
              
              <div className="flex flex-wrap gap-5 text-sm print-text-muted font-medium">
                <span className="flex items-center gap-2"><MapPin size={16} className="text-lime-400"/> O'zbekiston, Toshkent</span>
                <span className="flex items-center gap-2"><Mail size={16} className="text-lime-400"/> xurshidbekxoldorjonov3@gmail.com</span>
                <span className="flex items-center gap-2"><Phone size={16} className="text-lime-400"/> +998 (77) 704-74-49</span>
                <span className="flex items-center gap-2 text-blue-400 font-semibold">@khurshidbeyDSN</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* CHAP USTUN */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 print-text">
                <Briefcase className="text-lime-400" size={28}/> Amaliy Ish Tajribasi
              </h3>
              
              <div className="relative border-l border-lime-400/20 ml-3 space-y-8 pb-4">
                
                {/* ZetMedia */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-lime-400 rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_#a3e635]"></div>
                  <h4 className="font-bold text-lg print-text">ZetMedia (Marketing jamoasi)</h4>
                  <p className="text-sm text-lime-400 font-medium mb-1">Grafik Dizayner (Hozirgi)</p>
                  <p className="text-sm print-text-muted">SMD Posterlar va Reelscoverlar dizayni yaratish.</p>
                </div>

                {/* RomaTools */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-white/30 rounded-full -left-[6.5px] top-1.5"></div>
                  <h4 className="font-bold text-lg print-text">RomaTools</h4>
                  <p className="text-sm text-lime-400 font-medium mb-1">Dizayner</p>
                  <p className="text-sm print-text-muted">Marketpleys kartochkalari yasash.</p>
                </div>

                {/* EduLand */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-white/30 rounded-full -left-[6.5px] top-1.5"></div>
                  <h4 className="font-bold text-lg print-text">EduLand (Xususiy maktab)</h4>
                  <p className="text-sm text-lime-400 font-medium mb-1">Grafik Dizayner (2025)</p>
                  <p className="text-sm print-text-muted">Ta'lim muassasasi uchun turli xil vizual materiallar tayyorlash.</p>
                </div>

                {/* Shoha.tour & Par Fu Dor */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-white/30 rounded-full -left-[6.5px] top-1.5"></div>
                  <h4 className="font-bold text-lg print-text">Shoha.tour & Par Fu Dor</h4>
                  <p className="text-sm text-lime-400 font-medium mb-1">Brend Dizayner (2025)</p>
                  <p className="text-sm print-text-muted">Turizm va kosmetika loyihalari uchun noldan brend identikasi yaratish.</p>
                </div>

                {/* Tasnim */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-white/30 rounded-full -left-[6.5px] top-1.5"></div>
                  <h4 className="font-bold text-lg print-text">Tasnim</h4>
                  <p className="text-sm text-lime-400 font-medium mb-1">Qadoqlash Dizayneri (2025)</p>
                  <p className="text-sm print-text-muted">Sotuv belgisi uchun vizual jozibali qadoqlash (packaging) dizaynlarini ishlab chiqish.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-8 mt-10 flex items-center gap-3 print-text">
                <GraduationCap className="text-lime-400" size={28}/> Ta'lim
              </h3>
              
              <div className="relative border-l border-lime-400/20 ml-3">
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-lime-400 rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_#a3e635]"></div>
                  <h4 className="font-bold text-lg print-text">Najot Ta'lim</h4>
                  <p className="text-sm text-lime-400 font-medium mb-1">Standart grafik dizayn kursi (2025)</p>
                  <p className="text-sm print-text-muted">Kursni muvaffaqiyatli tamomlaganman.</p>
                </div>
              </div>
            </div>

            {/* O'NG USTUN */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 print-text">
                <Code className="text-lime-400" size={28}/> Dasturiy Bilimlar
              </h3>
              
              {/* Eski Progress barlar */}
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-bold print-text">Adobe Photoshop</span><span className="text-lime-400 font-bold">9/10</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2.5"><div className="bg-lime-400 h-2.5 rounded-full w-[90%] shadow-[0_0_10px_#a3e635]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-bold print-text">Adobe Illustrator</span><span className="text-lime-400 font-bold">9/10</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2.5"><div className="bg-lime-400 h-2.5 rounded-full w-[90%] shadow-[0_0_10px_#a3e635]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-bold print-text">Figma</span><span className="text-lime-400 font-bold">8/10</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2.5"><div className="bg-lime-400 h-2.5 rounded-full w-[80%] shadow-[0_0_10px_#a3e635]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-bold print-text">CorelDRAW</span><span className="text-lime-400 font-bold">5/10</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2.5"><div className="bg-lime-400 h-2.5 rounded-full w-[50%] shadow-[0_0_10px_#a3e635]"></div></div>
                </div>
              </div>

              {/* Yangi qo'shilgan texnik bilimlar (Tags sifatida) */}
              <div className="mb-12">
                <p className="text-sm print-text-muted mb-3 font-medium">Qo'shimcha texnik ko'nikmalar:</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Next.js', 'React', 'Gemini API', 'Prompt Engineering'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-lime-500/10 text-lime-400 border border-lime-500/20 rounded-md text-xs font-bold uppercase tracking-wider">{skill}</span>
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 print-text">
                <Award className="text-lime-400" size={28}/> Shaxsiy Sifatlar & Tillar
              </h3>
              
              <div className="mb-8 flex flex-wrap gap-3">
                {["O'ziga ishonch", "Tez o'rganuvchan", "Ma'suliyatli", "Chiqishuvchan"].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/5 print-border border border-white/10 print-text rounded-xl text-sm font-medium">{skill}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-6 text-sm print-text mb-12 bg-white/5 print-bg-card p-6 rounded-2xl border print-border border-white/10">
                <div className="flex justify-between"><span>O'zbek:</span> <span className="font-bold">9/10</span></div>
                <div className="flex justify-between"><span>Tojik:</span> <span className="font-bold">9/10</span></div>
                <div className="flex justify-between"><span>Ingliz:</span> <span className="font-bold">8/10</span></div>
                <div className="flex justify-between"><span>Rus:</span> <span className="font-bold">3/10</span></div>
              </div>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 print-text">
                <UserCheck className="text-lime-400" size={28}/> Soha bo'yicha ustozlar
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border print-border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-lime-400/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                  <h4 className="font-bold text-lg print-text relative z-10">Davron Rahmonov</h4>
                  <p className="text-xs print-text-muted mt-1 relative z-10">"Najot Ta'lim" da Grafik dizayner mentori</p>
                </div>
                <div className="p-4 border print-border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-lime-400/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                  <h4 className="font-bold text-lg print-text relative z-10">Maqsadjon Olimjanov</h4>
                  <p className="text-xs print-text-muted mt-1 relative z-10">"Najot Ta'lim" da Grafik dizayner mentori</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* PDF YUKLASH DARCHASI (MODAL) */}
      <AnimatePresence>
        {showPdfModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-lime-500/30 rounded-[2rem] w-full max-w-md p-8 shadow-2xl shadow-lime-500/10 relative"
            >
              <button onClick={() => setShowPdfModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-lime-500/10 text-lime-400 rounded-full flex items-center justify-center mb-6">
                <Download size={30} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">PDF Yuklab olish</h2>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">CV ni kompyuterga yoki telefonga saqlash uchun o'zingizga yoqqan orqa fon rangini tanlang:</p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => triggerPrint('dark')} 
                  className="w-full py-4 bg-black border border-lime-500 hover:bg-lime-500/10 text-lime-400 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(163,230,53,0.1)] flex justify-center items-center gap-2"
                >
                  <div className="w-4 h-4 bg-[#050505] border border-lime-500 rounded-full"></div> Qora fonda (Kreativ)
                </button>
                
                <button 
                  onClick={() => triggerPrint('light')} 
                  className="w-full py-4 bg-white border border-gray-200 hover:bg-gray-100 text-black rounded-xl font-bold transition-all flex justify-center items-center gap-2"
                >
                  <div className="w-4 h-4 bg-white border border-gray-400 rounded-full"></div> Oq fonda (Rasmiy)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}