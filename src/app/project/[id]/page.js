"use client";
import { useEffect, useState, use } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Heart, MessageSquare, Send, User, ExternalLink, Download } from "lucide-react";

export default function ProjectDetail({ params }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchProjectAndComments = async () => {
      try {
        const proj = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID,
          projectId
        );
        setProject(proj);

        const comms = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          "comments", // DIQQAT: Comments ID ni yozish esdan chiqmasin
          [Query.equal("projectId", projectId), Query.orderDesc("$createdAt")]
        );
        setComments(comms.documents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectAndComments();
  }, [projectId]);

  const handleLike = async () => {
    const isLiked = localStorage.getItem(`liked_${project.$id}`);
    if (isLiked) return; 

    setProject({ ...project, likes: (project.likes || 0) + 1 });
    localStorage.setItem(`liked_${project.$id}`, "true"); 

    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID,
        project.$id,
        { likes: (project.likes || 0) + 1 }
      );
    } catch (error) { console.error(error); }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return alert("Ism va fikringizni kiriting!");
    setCommentLoading(true);
    
    try {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        "comments", // DIQQAT: Comments ID ni yozish esdan chiqmasin
        "unique()",
        { projectId: projectId, name: newComment.name, text: newComment.text }
      );
      
      setComments([response, ...comments]);
      setNewComment({ name: "", text: "" });
    } catch (error) {
      alert("Xato: " + error.message);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-lime-400 animate-pulse font-bold">Loyiha yuklanmoqda...</div>;
  if (!project) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loyiha topilmadi :(</div>;

  const isLiked = typeof window !== 'undefined' ? localStorage.getItem(`liked_${project.$id}`) : false;
  const gallery = project.gallery_urls ? JSON.parse(project.gallery_urls) : [];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-lime-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Tepa Qism: Orqaga va Layk */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Orqaga
          </Link>
          
          <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isLiked ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'}`}>
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} /> 
            <span className="font-bold">{project.likes || 0} Layk</span>
          </button>
        </div>

        {/* Asosiy Rasm */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden mb-8 border border-white/10 shadow-2xl shadow-lime-500/5">
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          </div>
          
          {/* Kategoriya */}
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1.5 bg-lime-500/10 border border-lime-500/20 text-lime-400 text-xs font-bold uppercase tracking-wider rounded-lg">
              {project.category || "Boshqa"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">{project.title}</h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">{project.description}</p>
          
          {/* YANGILANGAN: Chiroyli va katta Havola / PDF tugmalari */}
          {(project.github_link || project.pdf_url) && (
            <div className="flex flex-wrap items-center gap-4 mt-10">
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-lime-400 px-8 py-4 rounded-2xl font-bold transition-all group">
                  <ExternalLink size={20} className="text-lime-400 group-hover:scale-110 transition-transform" /> Loyihani ko'rish
                </a>
              )}
              {project.pdf_url && (
                <a href={project.pdf_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400 px-8 py-4 rounded-2xl font-bold transition-all group">
                  <Download size={20} className="text-blue-400 group-hover:-translate-y-1 transition-transform" /> PDF Formatida ko'rish
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* PINTEREST USLUBIDAGI GALEREYA (Masonry Layout) */}
        {gallery.length > 0 && (
          <div className="mb-24 pt-10 border-t border-white/5">
            <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-3">
              Kengaytirilgan Vizuallar
            </h2>
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {gallery.map((url, i) => (
                <div key={i} className="rounded-[1.5rem] overflow-hidden border border-white/10 break-inside-avoid shadow-lg shadow-black/50">
                  <img src={url} alt={`Gallery image ${i + 1}`} className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700 ease-in-out cursor-zoom-in" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IZOHLAR QISMI */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><MessageSquare className="text-lime-400"/> Loyiha muhokamasi ({comments.length})</h2>
          
          <form onSubmit={handleCommentSubmit} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-[2rem] mb-16 shadow-xl">
            <h3 className="text-lg font-semibold mb-6 text-gray-200">Fikringizni qoldiring (Login shart emas 😎)</h3>
            <div className="flex flex-col gap-5">
              <input type="text" placeholder="Ismingiz (yoki taxallus)" required value={newComment.name} onChange={e => setNewComment({...newComment, name: e.target.value})} className="bg-black/40 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-lime-400 w-full md:w-1/2 text-white transition-colors" />
              <textarea placeholder="Loyiha haqida nima deysiz?" required rows="4" value={newComment.text} onChange={e => setNewComment({...newComment, text: e.target.value})} className="bg-black/40 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-lime-400 w-full resize-none text-white transition-colors"></textarea>
              <button type="submit" disabled={commentLoading} className="self-end bg-lime-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-lime-300 hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-lime-400/20">
                {commentLoading ? "Yuborilmoqda..." : "Fikrni yuborish"} <Send size={18}/>
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-6">
            {comments.length === 0 ? (
              <div className="text-center py-10 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-gray-400">Hozircha izohlar yo'q. Birinchi bo'lib o'z izohingizni qoldiring!</p>
              </div>
            ) : (
              comments.map(comment => (
                <div key={comment.$id} className="bg-black/40 border border-white/5 p-6 md:p-8 rounded-[2rem] flex gap-5 hover:border-white/10 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-full flex items-center justify-center text-lime-400 flex-shrink-0 border border-lime-500/10"><User size={22}/></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-100 text-lg mb-2">{comment.name}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}