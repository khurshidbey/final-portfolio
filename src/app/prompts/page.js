"use client";
import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Copy, X, Check } from "lucide-react";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID
        );
        setPrompts(response.documents.reverse());
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchPrompts();
  }, []);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Asosiy sahifaga qaytish
          </Link>
          <div className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full font-bold flex items-center gap-2 border border-purple-500/20">
            <Sparkles size={18} /> {prompts.length} ta Prompt
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4">AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Prompts</span> Galereyasi</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Men yaratgan eng yaxshi vizuallar uchun maxsus yozilgan promptlar. Rasm ustiga bosing va promptni o'zingiz uchun oling.</p>
        </div>

        {loading ? (
          <div className="text-center text-purple-400 animate-pulse font-bold text-xl">Promptlar yuklanmoqda...</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {prompts.map((prompt) => (
              <div 
                key={prompt.$id} 
                onClick={() => setSelectedPrompt(prompt)}
                className="rounded-3xl overflow-hidden border border-white/10 break-inside-avoid shadow-lg shadow-black/50 cursor-pointer group relative"
              >
                <img src={prompt.image_url} alt={prompt.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="font-bold text-lg text-white">{prompt.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POP-UP MODAL (Darcha) */}
      <AnimatePresence>
        {selectedPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
              <button onClick={() => setSelectedPrompt(null)} className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto bg-black flex-shrink-0">
                <img src={selectedPrompt.image_url} alt={selectedPrompt.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-4">{selectedPrompt.title}</h2>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex-grow mb-6 relative group">
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{selectedPrompt.prompt_text}</p>
                </div>
                <button 
                  onClick={() => handleCopy(selectedPrompt.$id, selectedPrompt.prompt_text)} 
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copiedId === selectedPrompt.$id ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-[1.02]'}`}
                >
                  {copiedId === selectedPrompt.$id ? <><Check size={20}/> Nusxa olindi!</> : <><Copy size={20}/> Promptni nusxalash</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}