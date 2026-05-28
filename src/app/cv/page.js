"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Award, UserCheck } from "lucide-react";

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 print:bg-white print:text-black print:pt-0 print:pb-0">
      <div className="max-w-4xl mx-auto relative z-10 print:max-w-full print:mx-0">
        
        {/* Tepa tugmalar (PDF qilish paytida yashirinadi) */}
        <div className="flex justify-between items-center mb-10 print:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Asosiy sahifaga qaytish
          </Link>
          <button onClick={handlePrint} className="bg-lime-400 text-black px-6 py-3 rounded-full font-bold hover:bg-lime-300 transition-all flex items-center gap-2 shadow-lg shadow-lime-400/20">
            <Download size={18} /> PDF Yuklab olish
          </button>
        </div>

        {/* ASOSIY CV KARTASI */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 print:bg-white print:border-none print:p-0">
          
          {/* Header qismi */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12 print:flex-row print:gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl overflow-hidden flex-shrink-0 relative print:border-2 print:border-gray-200">
              <img src="/me.jpg" alt="Xurshidbek Xoldorjonov" className="w-full h-full object-cover grayscale-[20%]" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black mb-2 print:text-gray-900">Xurshidbek Xoldorjonov</h1>
              <h2 className="text-xl text-lime-400 font-bold mb-4 print:text-emerald-700">Grafik Dizayner</h2>
              <p className="text-gray-400 leading-relaxed mb-6 print:text-gray-700 text-sm md:text-base">
                Men grafik dizayn, brending va qadoqlash sohalarida o'ziga ishonch bilan faoliyat yurituvchi, tez o'rganuvchan va mas'uliyatli mutaxassisman. Loyihalarda ham vizual estetika, ham mijoz talabiga to'la javob beruvchi yechimlarni taqdim etishga intilaman.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 print:text-gray-600">
                <span className="flex items-center gap-2"><MapPin size={16} className="text-lime-400 print:text-emerald-600"/> O'zbekiston, Toshkent</span>
                <span className="flex items-center gap-2"><Mail size={16} className="text-lime-400 print:text-emerald-600"/> xurshidbekxoldorjonov3@gmail.com</span>
                <span className="flex items-center gap-2"><Phone size={16} className="text-lime-400 print:text-emerald-600"/> +998 (77) 704-74-49</span>
                <span className="flex items-center gap-2 text-blue-400 print:text-blue-600 font-semibold">@khurshidbeyDSN</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 print:grid-cols-2">
            
            {/* ISH TAJRIBASI VA TA'LIM */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 print:text-gray-900 border-b border-white/10 print:border-gray-300 pb-2">
                <Briefcase className="text-lime-400 print:text-emerald-600"/> Amaliy Ish Tajribasi
              </h3>
              <div className="space-y-6 mb-10">
                
                <div className="relative pl-6 border-l border-lime-400/30 print:border-emerald-600/50">
                  <div className="absolute w-3 h-3 bg-lime-400 print:bg-emerald-600 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="font-bold text-lg print:text-gray-800">EduLand (Xususiy maktab)</h4>
                  <p className="text-sm text-lime-400 print:text-emerald-600 font-medium mb-1">Grafik Dizayner (2025)</p>
                  <p className="text-sm text-gray-400 print:text-gray-600">Ta'lim muassasasi uchun turli xil vizual materiallar tayyorlash.</p>
                </div>

                <div className="relative pl-6 border-l border-lime-400/30 print:border-emerald-600/50">
                  <div className="absolute w-3 h-3 bg-white/20 print:bg-gray-400 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="font-bold text-lg print:text-gray-800">Shoha.tour & Par Fu Dor</h4>
                  <p className="text-sm text-lime-400 print:text-emerald-600 font-medium mb-1">Brend Dizayner (2025)</p>
                  <p className="text-sm text-gray-400 print:text-gray-600">Turizm va kosmetika loyihalari uchun noldan brend identikasi yaratish.</p>
                </div>

                <div className="relative pl-6 border-l border-lime-400/30 print:border-emerald-600/50">
                  <div className="absolute w-3 h-3 bg-white/20 print:bg-gray-400 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="font-bold text-lg print:text-gray-800">Tasnim</h4>
                  <p className="text-sm text-lime-400 print:text-emerald-600 font-medium mb-1">Qadoqlash Dizayneri (2025)</p>
                  <p className="text-sm text-gray-400 print:text-gray-600">Sotuv belgisi uchun vizual jozibali qadoqlash (packaging) dizaynlarini ishlab chiqish.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 print:text-gray-900 border-b border-white/10 print:border-gray-300 pb-2">
                <GraduationCap className="text-lime-400 print:text-emerald-600"/> Ta'lim
              </h3>
              <div className="space-y-4 mb-10">
                <div className="relative pl-6 border-l border-lime-400/30 print:border-emerald-600/50">
                  <div className="absolute w-3 h-3 bg-lime-400 print:bg-emerald-600 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="font-bold print:text-gray-800">Toshkent Davlat Iqtisodiyot Universiteti</h4>
                  <p className="text-sm text-gray-400 print:text-gray-600">Talaba (2025 - hozirgi vaqtgacha)</p>
                </div>
                <div className="relative pl-6 border-l border-lime-400/30 print:border-emerald-600/50">
                  <div className="absolute w-3 h-3 bg-white/20 print:bg-gray-400 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="font-bold print:text-gray-800">Farg'ona Davlat Texnika Universiteti</h4>
                  <p className="text-sm text-gray-400 print:text-gray-600">1-bosqich talabasi (2024-2025)</p>
                </div>
              </div>
            </div>

            {/* TEXNIK BAZA VA SIFATLAR */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 print:text-gray-900 border-b border-white/10 print:border-gray-300 pb-2">
                <Code className="text-lime-400 print:text-emerald-600"/> Dasturiy Bilimlar
              </h3>
              
              <div className="mb-10 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300 print:text-gray-800 font-semibold">Adobe Photoshop</span><span className="text-lime-400 font-bold">9/10</span></div>
                  <div className="w-full bg-white/10 print:bg-gray-200 rounded-full h-2"><div className="bg-lime-400 print:bg-emerald-500 h-2 rounded-full w-[90%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300 print:text-gray-800 font-semibold">Adobe Illustrator</span><span className="text-lime-400 font-bold">9/10</span></div>
                  <div className="w-full bg-white/10 print:bg-gray-200 rounded-full h-2"><div className="bg-lime-400 print:bg-emerald-500 h-2 rounded-full w-[90%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300 print:text-gray-800 font-semibold">Figma</span><span className="text-lime-400 font-bold">8/10</span></div>
                  <div className="w-full bg-white/10 print:bg-gray-200 rounded-full h-2"><div className="bg-lime-400 print:bg-emerald-500 h-2 rounded-full w-[80%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300 print:text-gray-800 font-semibold">CorelDRAW</span><span className="text-lime-400 font-bold">5/10</span></div>
                  <div className="w-full bg-white/10 print:bg-gray-200 rounded-full h-2"><div className="bg-lime-400 print:bg-emerald-500 h-2 rounded-full w-[50%]"></div></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 print:text-gray-900 border-b border-white/10 print:border-gray-300 pb-2">
                <Award className="text-lime-400 print:text-emerald-600"/> Shaxsiy Sifatlar & Tillar
              </h3>
              <div className="mb-6 flex flex-wrap gap-2">
                {["O'ziga ishonch", "Tez o'rganuvchan", "Ma'suliyatli", "Chiqishuvchan"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 print:bg-gray-100 print:text-gray-800 border border-white/10 print:border-gray-300 rounded-lg text-sm">{skill}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 print:text-gray-800 mb-10">
                <div className="flex justify-between border-b border-white/5 print:border-gray-300 pb-1"><span>O'zbek:</span> <span className="font-bold text-white print:text-black">9/10</span></div>
                <div className="flex justify-between border-b border-white/5 print:border-gray-300 pb-1"><span>Tojik:</span> <span className="font-bold text-white print:text-black">9/10</span></div>
                <div className="flex justify-between border-b border-white/5 print:border-gray-300 pb-1"><span>Ingliz:</span> <span className="font-bold text-white print:text-black">8/10</span></div>
                <div className="flex justify-between border-b border-white/5 print:border-gray-300 pb-1"><span>Rus:</span> <span className="font-bold text-white print:text-black">3/10</span></div>
              </div>

              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 print:text-gray-900 border-b border-white/10 print:border-gray-300 pb-2">
                <UserCheck className="text-lime-400 print:text-emerald-600"/> Soha bo'yicha ustozlar
              </h3>
              <ul className="space-y-2 text-gray-400 print:text-gray-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-lime-400 print:bg-emerald-600 rounded-full"></div> <b>Davron Rahmonov</b> — "Najot Ta'lim" da Grafik dizayner mentori</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-lime-400 print:bg-emerald-600 rounded-full"></div> <b>Maqsadjon Olimjanov</b> — "Najot Ta'lim" da Grafik dizayner mentori</li>
              </ul>

            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}