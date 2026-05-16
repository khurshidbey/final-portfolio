"use client";
import { useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Agar avvalgi sessiya qolib ketgan bo'lsa, tozalab tashlaymiz
      try {
        await account.deleteSession("current");
      } catch (err) {
        // Eski sessiya yo'q bo'lsa, indamaymiz
      }

      // Yangi sessiya yaratish (Login qildirish)
      await account.createEmailPasswordSession(email, password);
      
      // Muvaffaqiyatli bo'lsa adminga o'tkazib yuboramiz
      router.push("/admin");
    } catch (err) {
      setError("Email yoki parol xato! Ruxsatsiz kirish taqiqlanadi 🛑");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden px-6">
      {/* Orqa fon effektlari */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-lime-500/10 to-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />

      <Link href="/" className="absolute top-10 left-10 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20">
        <ArrowRight size={20} className="rotate-180" /> Asosiy sahifa
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-black/50 border border-white/10 p-10 rounded-[2rem] backdrop-blur-xl relative z-10 shadow-2xl shadow-lime-500/10"
      >
        <div className="w-16 h-16 bg-lime-500/10 text-lime-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <Lock size={32} />
        </div>
        
        <h1 className="text-3xl font-black text-center mb-2">Maxfiy Hudud</h1>
        <p className="text-gray-400 text-center text-sm mb-8">Faqatgina admin uchun ruxsat berilgan.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <ShieldAlert size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="email" 
              placeholder="Admin Email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-xl outline-none focus:border-lime-400 text-white transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="password" 
              placeholder="Maxfiy Parol" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-xl outline-none focus:border-lime-400 text-white transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-lime-400 text-black font-bold py-4 rounded-xl mt-4 hover:bg-lime-300 hover:scale-[1.02] transition-all flex justify-center items-center gap-2"
          >
            {loading ? "Ruxsat tekshirilmoqda..." : "Tizimga kirish"} <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </main>
  );
}