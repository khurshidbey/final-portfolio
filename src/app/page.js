"use client";
import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Send, Sparkles, Layers, Code, Palette, Bot, FileText, Heart } from "lucide-react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Barchasi"); 

  const categories = [
    "Barchasi", 
    "Brend dizayni", 
    "Qadoqlash", 
    "Infografikalar", 
    "AI Vizuallar", 
    "Avtomatlashtirish", 
    "Web Dasturlash",
    "SMD posterlar",
    "Poligrafiya"
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID
        );
        // TARTIBLASH: order_num ga qarab eng kattasi birinchi bo'ladi
        const sorted = response.documents.sort((a, b) => (b.order_num || 0) - (a.order_num || 0));
        setProjects(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLike = async (projectId, currentLikes) => {
    const isLiked = localStorage.getItem(`liked_${projectId}`);
    if (isLiked) return; 

    setProjects(projects.map(p => p.$id === projectId ? { ...p, likes: (p.likes || 0) + 1 } : p));
    localStorage.setItem(`liked_${projectId}`, "true"); 

    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID,
        projectId,
        { likes: (currentLikes || 0) + 1 }
      );
    } catch (error) {
      console.error("Layk bosishda xatolik:", error);
    }
  };

  const filteredProjects = activeCategory === "Barchasi" 
    ? projects 
    : projects.filter(p => (p.category || "Boshqa") === activeCategory);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center relative overflow-hidden">
      <header className="w-full max-w-6xl flex justify-between items-center py-6 px-6 z-20 relative">
        <div className="font-bold text-2xl tracking-tighter cursor-pointer">
          khurshid<span className="text-lime-400">bey</span>
        </div>
      </header>

      <section id="home" className="min-h-screen flex items-center pt-10 relative w-full -mt-20 overflow-hidden bg-[#050505]">
        <div className="absolute right-0 top-0 w-full md:w-[65%] h-full z-0 pointer-events-none">
          <motion.div initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="w-full h-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-lime-500/20 to-emerald-600/20 blur-[120px] mix-blend-screen animate-pulse z-10" />
            <motion.img animate={{ y: [-15, 10, -15] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} src="/me.jpg" alt="khurshidbey" className="w-full h-full object-cover object-top opacity-100 relative z-0 grayscale-[20%]" />
            <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#050505] to-transparent z-10" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10" />
          </motion.div>
        </div>

        <div className="w-full max-w-6xl mx-auto z-10 flex items-center justify-start relative px-6 md:px-12">
          <div className="flex-1 text-left flex flex-col items-start max-w-2xl mt-20 md:mt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <span className="px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full text-lime-400 text-sm font-semibold tracking-wider uppercase mb-6 inline-block backdrop-blur-sm shadow-lg shadow-lime-500/5">
                Grafik Dizayner & AI Content Creator
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight drop-shadow-2xl">
             Xurshidbek <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">Xoldorjonov</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-gray-300 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium drop-shadow-md bg-[#050505]/40 p-2 rounded-xl backdrop-blur-sm border border-white/5">
              Brendingizga moslashtirilgan vizual dizaynlar va sun'iy intellekt orqali raqamli loyihalaringizni yangi bosqichga olib chiqaman.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap justify-start gap-4">
              <button onClick={() => scrollToSection('projects')} className="bg-lime-400 text-black px-8 py-4 rounded-full font-bold hover:bg-lime-300 hover:scale-105 transition-all shadow-xl shadow-lime-400/20">Loyihalarni ko'rish</button>
              <Link href="/cv" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:border-lime-400 hover:text-lime-400 hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"><FileText size={18} /> Rezyume (CV)</Link>
              <Link href="/prompts" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25"><Sparkles size={18} /> AI Prompts</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl z-10 py-24 px-6 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Nimalar qila <span className="text-lime-400">olaman?</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">G'oyalaringizni zamonaviy texnologiyalar va estetik dizayn orqali vizual reallikka aylantiraman.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-gradient-to-br from-lime-500/10 to-emerald-900/20 border border-lime-500/30 p-8 md:p-10 rounded-[2.5rem] hover:border-lime-400 transition-all duration-500 group relative overflow-hidden shadow-[0_0_40px_rgba(163,230,53,0.05)]">
            <div className="absolute top-0 right-0 p-6">
              <span className="bg-lime-500/20 text-lime-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Asosiy Yo'nalish</span>
            </div>
            <div className="w-16 h-16 bg-lime-400/20 text-lime-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform"><Palette size={32} /></div>
            <h3 className="text-2xl font-black mb-4 text-white">Grafik Dizayn</h3>
            <p className="text-gray-400 text-base leading-relaxed">Brend identikasi, qadoqlash (packaging) va ijtimoiy tarmoqlar uchun estetik dizaynlar tayyorlash. Brendingizning vizual tilini yarataman.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-900/20 border border-purple-500/30 p-8 md:p-10 rounded-[2.5rem] hover:border-purple-400 transition-all duration-500 group relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.05)]">
            <div className="absolute top-0 right-0 p-6">
              <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Asosiy Yo'nalish</span>
            </div>
            <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform"><Layers size={32} /></div>
            <h3 className="text-2xl font-black mb-4 text-white">AI Content Creation</h3>
            <p className="text-gray-400 text-base leading-relaxed">Noyob Promptlar va sun'iy intellekt orqali yuqori sifatli vizuallar, posterlar va raqamli kontentlar yaratish. Chegarasiz fantaziya.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] hover:border-blue-400/30 transition-all duration-500 group">
            <div className="w-14 h-14 bg-blue-400/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Bot size={28} /></div>
            <h3 className="text-xl font-bold mb-3 text-gray-200">Avtomatlashtirish</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Sun'iy intellekt va maxsus botlar orqali raqamli ishlarni tezlashtirish hamda jarayonlarni tizimli avtomatlashtirish.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] hover:border-emerald-400/30 transition-all duration-500 group">
            <div className="w-14 h-14 bg-emerald-400/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Code size={28} /></div>
            <h3 className="text-xl font-bold mb-3 text-gray-200">Developer</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Tezkor, interaktiv va qulay veb ilovalar hamda arxitekturalar dasturlash (Next.js, React).</p>
          </div>
        </div>
      </section>

      <section id="projects" className="w-full max-w-6xl z-10 py-24 px-6 border-t border-white/5 relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">Mening <span className="text-lime-400">Loyihalarim</span></h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === category ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/30' : 'bg-white/5 border border-white/10 text-gray-400 hover:border-lime-400 hover:text-lime-400'}`}>
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">Loyihalar yuklanmoqda...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border border-dashed border-white/10 rounded-3xl">Bu kategoriyada hozircha loyihalar yo'q.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isLiked = typeof window !== 'undefined' ? localStorage.getItem(`liked_${project.$id}`) : false;

              return (
                <motion.div key={project.$id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-lime-400/50 transition-colors group flex flex-col relative">
                  
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <button onClick={() => handleLike(project.$id, project.likes)} className={`transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
                      <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "scale-110" : "hover:scale-110 transition-transform"} />
                    </button>
                    <span className="text-sm font-semibold text-white">{project.likes || 0}</span>
                  </div>

                  <div className="h-56 w-full overflow-hidden bg-black/50 relative z-10">
                    {project.image_url ? <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-gray-600">Rasm yo'q</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow relative z-10 bg-black/20">
                    <div className="text-xs text-lime-400 font-bold uppercase tracking-wider mb-2">{project.category || "Boshqa"}</div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">{project.description}</p>
                    <Link href={`/project/${project.$id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-lime-400 hover:text-lime-300 transition-colors mt-auto">
                      Batafsil ko'rish <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <section id="contact" className="w-full max-w-4xl z-10 py-32 px-6 border-t border-white/5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Hamkorlik <span className="text-pink-400">qilamizmi?</span></h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">Keling, loyihangizni birga muhokama qilamiz va uni vizual reallikka aylantiramiz.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://t.me/khurshidbeyDSN" target="_blank" rel="noreferrer" className="group relative inline-flex items-center gap-3 bg-lime-400 px-10 py-5 rounded-2xl font-bold text-black hover:bg-lime-300 hover:scale-105 transition-all shadow-xl shadow-lime-400/20">
              <Send size={22} className="group-hover:rotate-12 transition-transform text-black" /> Telegram orqali bog'lanish
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}