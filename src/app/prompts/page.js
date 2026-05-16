"use client";
import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Heart, Copy, CheckCircle2 } from "lucide-react";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID
        );
        setPrompts(response.documents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const handleLike = async (promptId, currentLikes) => {
    const isLiked = localStorage.getItem(`liked_prompt_${promptId}`);
    if (isLiked) return; 

    setPrompts(prompts.map(p => p.$id === promptId ? { ...p, likes: (p.likes || 0) + 1 } : p));
    localStorage.setItem(`liked_prompt_${promptId}`, "true"); 

    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID,
        promptId,
        { likes: (currentLikes || 0) + 1 }
      );
    } catch (error) { console.error(error); }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} /> Asosiyga qaytish
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold mb-6">
            <Sparkles size={16} /> AI Prompt Engineering
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Sehrli <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">So'zlar Kutubxonasi</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Men yaratgan yuqori sifatli AI vizuallar va ularning orqasida yotgan "Prompt" (buyruq) matnlari. Yoqqanini nusxalab oling!</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">Sehrli so'zlar yuklanmoqda...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {prompts.map((prompt) => {
              const isLiked = typeof window !== 'undefined' ? localStorage.getItem(`liked_prompt_${prompt.$id}`) : false;

              return (
                <motion.div key={prompt.$id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col group">
                  
                  <div className="h-64 w-full relative overflow-hidden">
                    {/* LAYK TUGMASI RASM USTIDA */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <button onClick={() => handleLike(prompt.$id, prompt.likes)} className={`transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'}`}>
                        <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "scale-110" : "hover:scale-110 transition-transform"} />
                      </button>
                      <span className="text-sm font-semibold">{prompt.likes || 0}</span>
                    </div>

                    <img src={prompt.image_url} alt={prompt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow bg-black/20">
                    <h3 className="text-xl font-bold mb-4 text-purple-300">{prompt.title}</h3>
                    
                    <div className="relative bg-black/40 border border-white/5 p-4 rounded-xl font-mono text-sm text-gray-300 leading-relaxed mb-4">
                      {prompt.prompt_text}
                      <button 
                        onClick={() => copyToClipboard(prompt.prompt_text, prompt.$id)}
                        className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 text-gray-400 hover:text-white"
                        title="Nusxa olish"
                      >
                        {copiedId === prompt.$id ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}