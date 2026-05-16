"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { databases, storage, account } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import { Trash2, Sparkles, FolderKanban, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  
  const [authLoading, setAuthLoading] = useState(true); 
  const [activeTab, setActiveTab] = useState("projects"); 

  // --- LOYIHALAR UCHUN STATE ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [gallery, setGallery] = useState([]); 
  
  const [category, setCategory] = useState("Grafik dizayn"); 
  const [projects, setProjects] = useState([]);

  // --- PROMPTLAR UCHUN STATE ---
  const [promptTitle, setPromptTitle] = useState("");
  const [promptText, setPromptText] = useState("");
  const [promptImage, setPromptImage] = useState(null);
  const [promptsList, setPromptsList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0); 

  // XAVFSIZLIKNI TEKSHIRISH
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get(); 
        setAuthLoading(false); 
      } catch (error) {
        router.push("/login"); 
      }
    };
    checkAuth();
  }, [router]);

  // MA'LUMOTLARNI YUKLASH
  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        const projResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID
        );
        setProjects(projResponse.documents);

        const promptResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID
        );
        setPromptsList(promptResponse.documents);
      } catch (error) {
        console.error("Xato:", error);
      }
    };
    fetchData();
  }, [refresh, authLoading]);

  // LOYIHA SAQLASH
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Iltimos, asosiy rasm yuklang!");
    setLoading(true);
    try {
      const uploadedFile = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), image);
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

      let pdfUrl = null;
      if (pdfFile) {
        const uploadedPdf = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), pdfFile);
        pdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedPdf.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      }

      let galleryUrlsArray = [];
      if (gallery.length > 0) {
        for (const file of gallery) {
          const uploadedGal = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), file);
          const galUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedGal.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
          galleryUrlsArray.push(galUrl);
        }
      }

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID,
        ID.unique(),
        { 
          title, description, github_link: link, image_url: imageUrl, pdf_url: pdfUrl, 
          gallery_urls: galleryUrlsArray.length > 0 ? JSON.stringify(galleryUrlsArray) : null, category 
        }
      );
      alert("🎉 Loyiha saqlandi!");
      setTitle(""); setDescription(""); setLink(""); setImage(null); setPdfFile(null); setGallery([]); setCategory("Grafik dizayn");
      e.target.reset();
      setRefresh(prev => prev + 1);
    } catch (error) { alert("Xato: " + error.message); } finally { setLoading(false); }
  };

  // PROMPT SAQLASH
  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!promptImage) return alert("Rasm yuklang!");
    setLoading(true);
    try {
      const uploadedFile = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), promptImage);
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID,
        ID.unique(),
        { title: promptTitle, prompt_text: promptText, image_url: imageUrl }
      );
      alert("✨ Prompt saqlandi!");
      setPromptTitle(""); setPromptText(""); setPromptImage(null);
      e.target.reset();
      setRefresh(prev => prev + 1);
    } catch (error) { alert("Xato: " + error.message); } finally { setLoading(false); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("O'chirasizmi?")) return;
    try { await databases.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, id); setRefresh(prev => prev + 1); } catch (error) { alert(error.message); }
  };

  const handleDeletePrompt = async (id) => {
    if (!window.confirm("O'chirasizmi?")) return;
    try { await databases.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID, id); setRefresh(prev => prev + 1); } catch (error) { alert(error.message); }
  };

  const handleLogout = async () => { await account.deleteSession("current"); router.push("/"); };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <ShieldAlert size={50} className="text-lime-400 mb-4 animate-pulse" />
        <h1 className="text-xl font-bold font-mono text-gray-400">Maxfiylik tekshirilmoqda...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Boshqaruv Paneli
          </h1>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button onClick={() => setActiveTab("projects")} className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${activeTab === "projects" ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}>
              <FolderKanban size={18}/> Loyihalar
            </button>
            <button onClick={() => setActiveTab("prompts")} className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${activeTab === "prompts" ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}>
              <Sparkles size={18}/> AI Prompts
            </button>
          </div>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full hover:bg-red-500/20 transition">Saytdan Chiqish</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          
          <motion.div key={activeTab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md h-fit">
            {activeTab === "projects" ? (
              <>
                <h2 className="text-xl font-semibold mb-6 text-blue-400 flex items-center gap-2"><FolderKanban/> Yangi loyiha qo'shish</h2>
                <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4">
                  <input type="text" placeholder="Loyiha nomi" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white" />
                  
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white appearance-none cursor-pointer">
                    <option value="Brend dizayni">Brend dizayni</option>
                    <option value="Qadoqlash">Qadoqlash</option>
                    <option value="Grafik dizayn">Grafik dizayn</option>
                    <option value="AI Vizuallar">AI Vizuallar</option>
                    <option value="Avtomatlashtirish">Avtomatlashtirish</option>
                    <option value="Web Dasturlash">Web Dasturlash</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>

                  <textarea placeholder="Loyiha haqida batafsil..." required rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 resize-none text-white"></textarea>
                  <input type="text" placeholder="Loyiha havolasi (Link)" value={link} onChange={(e) => setLink(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white" />
                  <div className="border-2 border-dashed border-white/20 p-4 rounded-xl text-center bg-black/30"><p className="text-xs text-gray-400 mb-2">Asosiy Rasm (Majburiy)</p><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="text-xs text-gray-500 cursor-pointer" /></div>
                  <div className="border border-white/10 p-3 rounded-xl bg-black/30"><p className="text-xs text-gray-400 mb-2">Galereya (Ko'p rasm)</p><input type="file" multiple accept="image/*" onChange={(e) => setGallery(Array.from(e.target.files))} className="text-xs text-gray-500 cursor-pointer" /></div>
                  <div className="border border-white/10 p-3 rounded-xl bg-black/30"><p className="text-xs text-gray-400 mb-2">PDF Taqdimot</p><input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="text-xs text-gray-500 cursor-pointer" /></div>
                  <button type="submit" disabled={loading} className={`mt-2 py-4 rounded-xl font-bold text-white ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-blue-400'}`}>{loading ? "Kuting..." : "Loyihani Saqlash"}</button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6 text-purple-400 flex items-center gap-2"><Sparkles/> Yangi Prompt qo'shish</h2>
                <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
                  <input type="text" placeholder="Sarlavha (masalan: Kiberpank Qahvaxona)" required value={promptTitle} onChange={(e) => setPromptTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 text-white" />
                  <textarea placeholder="Haqiqiy Prompt matnini yozing (Copy qilish uchun)..." required rows="6" value={promptText} onChange={(e) => setPromptText(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 resize-none font-mono text-sm text-gray-300"></textarea>
                  <div className="border-2 border-dashed border-white/20 p-5 rounded-xl text-center bg-black/30 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400 mb-2">AI yaratgan rasmni yuklang</p>
                    <input type="file" accept="image/*" onChange={(e) => setPromptImage(e.target.files[0])} className="text-xs text-gray-500 cursor-pointer" />
                  </div>
                  <button type="submit" disabled={loading} className={`mt-2 py-4 rounded-xl font-bold text-white ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.02] transition'}`}>{loading ? "Kuting..." : "Promptni Saqlash"}</button>
                </form>
              </>
            )}
          </motion.div>

          <motion.div key={activeTab + "-list"} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md flex flex-col">
            <h2 className="text-xl font-semibold mb-6 flex justify-between items-center">
              Mavjud {activeTab === "projects" ? "Loyihalar" : "Promptlar"} 
              <span className={`py-1 px-3 rounded-full text-sm ${activeTab === "projects" ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                {activeTab === "projects" ? projects.length : promptsList.length} ta
              </span>
            </h2>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {activeTab === "projects" ? (
                projects.length === 0 ? <p className="text-gray-500 text-center py-10">Hozircha loyihalar yo'q.</p> :
                projects.map(item => (
                  <div key={item.$id} className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0"><img src={item.image_url} className="w-full h-full object-cover" /></div>
                      <div>
                        <h3 className="font-bold text-white truncate max-w-[150px]">{item.title}</h3>
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">{item.category || "Boshqa"}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteProject(item.$id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))
              ) : (
                promptsList.length === 0 ? <p className="text-gray-500 text-center py-10">Hozircha promptlar yo'q.</p> :
                promptsList.map(item => (
                  <div key={item.$id} className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0"><img src={item.image_url} className="w-full h-full object-cover" /></div>
                      <div><h3 className="font-bold text-white truncate max-w-[150px]">{item.title}</h3><p className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">{item.prompt_text}</p></div>
                    </div>
                    <button onClick={() => handleDeletePrompt(item.$id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}