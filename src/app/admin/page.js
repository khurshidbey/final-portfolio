"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { databases, storage, account } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import { Trash2, Sparkles, FolderKanban, ShieldAlert, Pencil, XCircle, X } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  
  const [authLoading, setAuthLoading] = useState(true); 
  const [activeTab, setActiveTab] = useState("projects"); 

  const [hoveredZone, setHoveredZone] = useState("main"); 

  // --- LOYIHALAR UCHUN STATE ---
  const [editingProjectId, setEditingProjectId] = useState(null); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [gallery, setGallery] = useState([]); 
  const [category, setCategory] = useState("Infografikalar"); 
  
  // Yangi qo'shilgan statelar (Tartib va Karousel)
  const [orderNum, setOrderNum] = useState(0);
  const [isCarousel, setIsCarousel] = useState(false);

  // Eskisini saqlab turish uchun state-lar
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [existingPdfUrl, setExistingPdfUrl] = useState(null);
  const [existingGallery, setExistingGallery] = useState([]);

  const [projects, setProjects] = useState([]);

  // --- PROMPTLAR UCHUN STATE ---
  const [editingPromptId, setEditingPromptId] = useState(null);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptText, setPromptText] = useState("");
  const [promptImage, setPromptImage] = useState(null);
  const [existingPromptImage, setExistingPromptImage] = useState(null);
  const [promptsList, setPromptsList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0); 

  useEffect(() => {
    const checkAuth = async () => {
      try { await account.get(); setAuthLoading(false); } 
      catch (error) { router.push("/login"); }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (authLoading) return;
    const fetchData = async () => {
      try {
        const projResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID
        );
        setProjects(projResponse.documents.reverse());

        const promptResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID
        );
        setPromptsList(promptResponse.documents.reverse());
      } catch (error) { console.error("Xato:", error); }
    };
    fetchData();
  }, [refresh, authLoading]);

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (activeTab === "prompts") {
          setPromptImage(file); alert("Prompt rasmi nusxalandi!");
        } else {
          if (hoveredZone === "gallery") {
            setGallery(prev => [...prev, file]); // Rasmni ustiga qo'shadi
            alert("Rasm Galereyaga qo'shildi!");
          } else {
            setImage(file); alert("Asosiy rasm nusxalandi!");
          }
        }
      }
    }
  };

  const resetProjectForm = () => {
    setEditingProjectId(null); setTitle(""); setDescription(""); setLink(""); 
    setImage(null); setPdfFile(null); setGallery([]); setCategory("Infografikalar");
    setExistingImageUrl(null); setExistingPdfUrl(null); setExistingGallery([]);
    setOrderNum(0); setIsCarousel(false);
  };

  const resetPromptForm = () => {
    setEditingPromptId(null); setPromptTitle(""); setPromptText(""); 
    setPromptImage(null); setExistingPromptImage(null);
  };

  const removeExistingGalleryImage = (index) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index));
  };
  const removeNewGalleryImage = (index) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditProjectClick = (item) => {
    setActiveTab("projects");
    setEditingProjectId(item.$id);
    setTitle(item.title);
    setDescription(item.description);
    setLink(item.github_link || "");
    setCategory(item.category || "Infografikalar");
    setExistingImageUrl(item.image_url);
    setExistingPdfUrl(item.pdf_url);
    setExistingGallery(item.gallery_urls ? JSON.parse(item.gallery_urls) : []);
    setOrderNum(item.order_num || 0);
    setIsCarousel(item.is_carousel || false);
    
    setImage(null); setPdfFile(null); setGallery([]); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!editingProjectId && !image) return alert("Iltimos, asosiy rasm yuklang!");
    setLoading(true);
    try {
      let finalImageUrl = existingImageUrl;
      if (image) {
        const uploadedFile = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), image);
        finalImageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      }

      let finalPdfUrl = existingPdfUrl;
      if (pdfFile) {
        const uploadedPdf = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), pdfFile);
        finalPdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedPdf.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      }

      let finalGalleryUrlsArray = [...existingGallery]; // Eskilarini saqlab qolamiz
      if (gallery.length > 0) {
        for (const file of gallery) {
          const uploadedGal = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), file);
          const galUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedGal.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
          finalGalleryUrlsArray.push(galUrl); // Yangilarini eskilariga qo'shamiz
        }
      }

      const payload = { 
        title, description, github_link: link, image_url: finalImageUrl, pdf_url: finalPdfUrl, 
        gallery_urls: finalGalleryUrlsArray.length > 0 ? JSON.stringify(finalGalleryUrlsArray) : null, 
        category,
        order_num: parseInt(orderNum) || 0,
        is_carousel: isCarousel
      };

      if (editingProjectId) {
        await databases.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, editingProjectId, payload);
        alert("✅ Loyiha muvaffaqiyatli yangilandi!");
      } else {
        await databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, ID.unique(), payload);
        alert("🎉 Yangi loyiha saqlandi!");
      }
      
      resetProjectForm(); e.target.reset(); setRefresh(prev => prev + 1);
    } catch (error) { alert("Xato: " + error.message); } finally { setLoading(false); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Rostdan ham bu loyihani o'chirmoqchimisiz?")) return;
    try { await databases.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, id); setRefresh(prev => prev + 1); } catch (error) { alert(error.message); }
  };

  const handleEditPromptClick = (item) => {
    setActiveTab("prompts"); setEditingPromptId(item.$id); setPromptTitle(item.title);
    setPromptText(item.prompt_text); setExistingPromptImage(item.image_url);
    setPromptImage(null); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!editingPromptId && !promptImage) return alert("Rasm yuklang!");
    setLoading(true);
    try {
      let finalImageUrl = existingPromptImage;
      if (promptImage) {
        const uploadedFile = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), promptImage);
        finalImageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      }
      const payload = { title: promptTitle, prompt_text: promptText, image_url: finalImageUrl };

      if (editingPromptId) {
        await databases.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID, editingPromptId, payload);
        alert("✅ Prompt yangilandi!");
      } else {
        await databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID, ID.unique(), payload);
        alert("✨ Yangi prompt saqlandi!");
      }
      resetPromptForm(); e.target.reset(); setRefresh(prev => prev + 1);
    } catch (error) { alert("Xato: " + error.message); } finally { setLoading(false); }
  };

  const handleDeletePrompt = async (id) => {
    if (!window.confirm("O'chirasizmi?")) return;
    try { await databases.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID, id); setRefresh(prev => prev + 1); } catch (error) { alert(error.message); }
  };

  const handleLogout = async () => { await account.deleteSession("current"); router.push("/"); };

  if (authLoading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white"><ShieldAlert className="text-lime-400 animate-pulse" size={50}/></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Boshqaruv Paneli</h1>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button onClick={() => { setActiveTab("projects"); resetPromptForm(); }} className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${activeTab === "projects" ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}><FolderKanban size={18}/> Loyihalar</button>
            <button onClick={() => { setActiveTab("prompts"); resetProjectForm(); }} className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${activeTab === "prompts" ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}><Sparkles size={18}/> AI Prompts</button>
          </div>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full hover:bg-red-500/20 transition">Saytdan Chiqish</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div key={activeTab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md h-fit">
            {activeTab === "projects" ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-xl font-semibold flex items-center gap-2 ${editingProjectId ? 'text-amber-400' : 'text-blue-400'}`}>
                    {editingProjectId ? <><Pencil size={20}/> Loyihani tahrirlash</> : <><FolderKanban/> Yangi loyiha qo'shish</>}
                  </h2>
                  {editingProjectId && <button type="button" onClick={resetProjectForm} className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"><XCircle size={16}/> Bekor qilish</button>}
                </div>
                <form onSubmit={handleProjectSubmit} onPaste={handlePaste} className="flex flex-col gap-4">
                  <input type="text" placeholder="Loyiha nomi" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white" />
                  
                  <div className="flex gap-4">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-2/3 bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white appearance-none cursor-pointer">
                      <option value="Brend dizayni">Brend dizayni</option>
                      <option value="Qadoqlash">Qadoqlash</option>
                      <option value="Infografikalar">Infografikalar</option>
                      <option value="AI Vizuallar">AI Vizuallar</option>
                      <option value="Avtomatlashtirish">Avtomatlashtirish</option>
                      <option value="Web Dasturlash">Web Dasturlash</option>
                      <option value="Boshqa">Boshqa</option>
                      <option value="SMD posterlar">SMD posterlar</option>
                      <option value="Poligrafiya">Poligrafiya</option>
                    </select>
                    <input type="number" placeholder="Tartib" value={orderNum} onChange={(e) => setOrderNum(e.target.value)} className="w-1/3 bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white" title="Katta raqam yuqorida turadi" />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer bg-black/50 border border-white/10 p-4 rounded-xl hover:border-blue-500 transition-colors">
                    <input type="checkbox" checked={isCarousel} onChange={(e) => setIsCarousel(e.target.checked)} className="w-5 h-5 accent-blue-500" />
                    <span className="text-gray-300 font-medium text-sm">Karousel rejimida ko'rsatish (Uzluksiz dizayn)</span>
                  </label>

                  <textarea placeholder="Loyiha haqida batafsil..." required rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 resize-none text-white"></textarea>
                  <input type="text" placeholder="Loyiha havolasi (Link)" value={link} onChange={(e) => setLink(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 text-white" />
                  
                  {/* ASOSIY RASM */}
                  <div onMouseEnter={() => setHoveredZone("main")} className={`relative border-2 border-dashed ${editingProjectId && !image ? 'border-amber-400/30' : 'border-white/20'} p-6 rounded-xl text-center bg-black/30 hover:border-blue-500 transition-all overflow-hidden group`}>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="pointer-events-none relative z-0 flex flex-col items-center justify-center">
                      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📥</span>
                      <p className="text-sm text-gray-300 font-semibold mb-1">Asosiy rasm (Majburiy)</p>
                      {editingProjectId && !image ? <p className="text-amber-400 text-xs mt-1">Hozirgi rasm saqlanib qoladi. Yangilash uchun tashlang.</p> : <p className="text-xs text-gray-500">Faylni tashlang (Ctrl+V)</p>}
                      {image && <p className="text-lime-400 text-xs mt-2 font-bold">Yangi rasm: {image.name}</p>}
                    </div>
                  </div>

                  {/* GALEREYA VA TARTIBLASH */}
                  <div className="flex flex-col gap-2 border border-white/10 p-4 rounded-xl bg-black/20">
                    <div onMouseEnter={() => setHoveredZone("gallery")} className="relative border-2 border-dashed border-white/20 p-4 rounded-xl text-center hover:border-blue-500 transition-all overflow-hidden group bg-black/30">
                      <input type="file" multiple accept="image/*" onChange={(e) => setGallery(prev => [...prev, ...Array.from(e.target.files)])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="pointer-events-none relative z-0 flex flex-col items-center justify-center">
                        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🖼️</span>
                        <p className="text-sm text-gray-300 font-semibold mb-1">Galereya (Ko'p rasm)</p>
                        <p className="text-xs text-gray-500">Rasmlarni tashlang (Ctrl+V)</p>
                      </div>
                    </div>
                    
                    {/* Boshqaruv paneli (Tagida chiqadi) */}
                    {(existingGallery.length > 0 || gallery.length > 0) && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {existingGallery.map((url, i) => (
                          <div key={i} className="relative w-14 h-14 rounded-lg border border-white/20">
                            <img src={url} className="w-full h-full object-cover rounded-lg opacity-80" />
                            <button type="button" onClick={() => removeExistingGalleryImage(i)} className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 hover:scale-110 transition-transform z-20"><X size={12}/></button>
                          </div>
                        ))}
                        {gallery.map((file, i) => (
                          <div key={`new-${i}`} className="relative bg-lime-500/20 border border-lime-500/30 text-lime-400 flex items-center justify-center w-14 h-14 rounded-lg text-[10px] text-center p-1 break-all overflow-hidden">
                            {file.name.substring(0, 10)}...
                            <button type="button" onClick={() => removeNewGalleryImage(i)} className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 hover:scale-110 transition-transform z-20"><X size={12}/></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* PDF */}
                  <div className="relative border-2 border-dashed border-white/20 p-6 rounded-xl text-center bg-black/30 hover:border-blue-500 transition-all overflow-hidden group">
                    <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="pointer-events-none relative z-0 flex flex-col items-center justify-center">
                      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</span>
                      <p className="text-sm text-gray-300 font-semibold mb-1">PDF Taqdimot</p>
                      {editingProjectId && existingPdfUrl && !pdfFile ? <p className="text-amber-400 text-xs mt-1">Eski PDF saqlanadi.</p> : <p className="text-xs text-gray-500">PDF faylni tashlang</p>}
                      {pdfFile && <p className="text-lime-400 text-xs mt-2 font-bold">Yangi PDF: {pdfFile.name}</p>}
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className={`mt-2 py-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-gray-600' : editingProjectId ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-[1.02]' : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:scale-[1.02]'}`}>
                    {loading ? "Kuting..." : editingProjectId ? "O'zgarishlarni Saqlash" : "Loyihani Saqlash"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-xl font-semibold flex items-center gap-2 ${editingPromptId ? 'text-amber-400' : 'text-purple-400'}`}>
                    {editingPromptId ? <><Pencil size={20}/> Promptni tahrirlash</> : <><Sparkles/> Yangi Prompt qo'shish</>}
                  </h2>
                  {editingPromptId && <button type="button" onClick={resetPromptForm} className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"><XCircle size={16}/> Bekor qilish</button>}
                </div>
                <form onSubmit={handlePromptSubmit} onPaste={handlePaste} className="flex flex-col gap-4">
                  <input type="text" placeholder="Sarlavha" required value={promptTitle} onChange={(e) => setPromptTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 text-white" />
                  <textarea placeholder="Prompt matnini yozing..." required rows="6" value={promptText} onChange={(e) => setPromptText(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 resize-none font-mono text-sm text-gray-300"></textarea>
                  <div className={`relative border-2 border-dashed ${editingPromptId && !promptImage ? 'border-amber-400/30' : 'border-white/20'} p-6 rounded-xl text-center bg-black/30 hover:border-purple-500 transition-all overflow-hidden group`}>
                    <input type="file" accept="image/*" onChange={(e) => setPromptImage(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="pointer-events-none relative z-0 flex flex-col items-center justify-center">
                      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🤖</span>
                      <p className="text-sm text-gray-300 font-semibold mb-1">AI rasmini yuklang</p>
                      {editingPromptId && !promptImage ? <p className="text-amber-400 text-xs mt-1">Eski rasm saqlanadi.</p> : <p className="text-xs text-gray-500">Faylni tashlang (Ctrl+V)</p>}
                      {promptImage && <p className="text-lime-400 text-xs mt-2 font-bold">Yangi: {promptImage.name}</p>}
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className={`mt-2 py-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-gray-600' : editingPromptId ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-[1.02]' : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.02]'}`}>
                    {loading ? "Kuting..." : editingPromptId ? "Promptni Yangilash" : "Promptni Saqlash"}
                  </button>
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
                  <div key={item.$id} className={`flex items-center justify-between bg-black/40 p-4 rounded-2xl border ${editingProjectId === item.$id ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-white/5'} hover:border-white/10 transition`}>
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 relative">
                        <img src={item.image_url} className="w-full h-full object-cover" />
                        <div className="absolute top-0 left-0 bg-black/70 text-[10px] px-1 font-bold rounded-br-lg">{item.order_num || 0}</div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white truncate max-w-[150px]">{item.title}</h3>
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">{item.category || "Boshqa"}</span>
                        {item.is_carousel && <span className="ml-2 text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Karousel</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditProjectClick(item)} className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-colors"><Pencil size={16} /></button>
                      <button onClick={() => handleDeleteProject(item.$id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
              ) : (
                promptsList.length === 0 ? <p className="text-gray-500 text-center py-10">Hozircha promptlar yo'q.</p> :
                promptsList.map(item => (
                  <div key={item.$id} className={`flex items-center justify-between bg-black/40 p-4 rounded-2xl border ${editingPromptId === item.$id ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-white/5'} hover:border-white/10 transition`}>
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0"><img src={item.image_url} className="w-full h-full object-cover" /></div>
                      <div><h3 className="font-bold text-white truncate max-w-[150px]">{item.title}</h3><p className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">{item.prompt_text}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditPromptClick(item)} className="p-3 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500 hover:text-white transition-colors"><Pencil size={16} /></button>
                      <button onClick={() => handleDeletePrompt(item.$id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                    </div>
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