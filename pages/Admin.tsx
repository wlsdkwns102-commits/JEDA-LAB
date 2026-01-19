import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem, Category } from '../types';
import { getPortfolioData, savePortfolioData, getCategories, saveCategories, getGalleryLayout, saveGalleryLayout } from '../store';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [categories, setCategoriesList] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [galleryColumns, setGalleryColumns] = useState<number>(3);
  
  const [categoryConfirmDeleteId, setCategoryConfirmDeleteId] = useState<string | null>(null);
  const [itemConfirmDeleteId, setItemConfirmDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState<Partial<PortfolioItem>>({
    title: '',
    category: '',
    summary: '',
    overview: '',
    problem: '',
    strategy: '',
    thumbnail: '',
    images: [],
    duration: '',
    client: '',
    featured: false
  });

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthorized) {
      setItems(getPortfolioData());
      const cats = getCategories();
      setCategoriesList(cats);
      setGalleryColumns(getGalleryLayout());
      if (!form.category && cats.length > 0) {
        setForm(prev => ({ ...prev, category: cats[0].name }));
      }
    }
  }, [isAuthorized]);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호는 123454321
    if (password === '123454321') {
      setIsAuthorized(true);
    } else {
      showStatus('Access Denied.', 'error');
      setPassword('');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setForm(prev => ({ ...prev, thumbnail: base64 }));
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64Promises = (Array.from(files) as File[]).map(file => fileToBase64(file));
      const base64s = await Promise.all(base64Promises);
      setForm(prev => ({ ...prev, images: [...(prev.images || []), ...base64s] }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleLayoutChange = (cols: number) => {
    setGalleryColumns(cols);
    saveGalleryLayout(cols);
    showStatus('Layout Updated.');
  };

  const handleAddCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;
    if (categories.some(c => c.name === trimmedName)) {
      showStatus('Exists.', 'error');
      return;
    }
    const newCategory: Category = { id: `cat_${Date.now()}`, name: trimmedName };
    const newList = [...categories, newCategory];
    setCategoriesList(newList);
    saveCategories(newList);
    setNewCategoryName('');
    showStatus('Category Added.');
  };

  const executeCategoryDelete = (id: string) => {
    setIsDeleting(true);
    setTimeout(() => {
      const categoryToDelete = categories.find(c => c.id === id);
      const newList = categories.filter(c => c.id !== id);
      setCategoriesList(newList);
      saveCategories(newList);
      if (categoryToDelete && form.category === categoryToDelete.name) {
        setForm(prev => ({ ...prev, category: newList.length > 0 ? newList[0].name : '' }));
      }
      setCategoryConfirmDeleteId(null);
      setIsDeleting(false);
      showStatus('Removed.');
    }, 300);
  };

  const handleSave = () => {
    if (!form.title || !form.thumbnail || !form.category) return showStatus('Missing Data.', 'error');
    let newItems: PortfolioItem[];
    if (editingId) {
        newItems = items.map(i => i.id === editingId ? { ...i, ...form } as PortfolioItem : i);
    } else {
        const newItem = { ...form, id: Date.now().toString() } as PortfolioItem;
        newItems = [...items, newItem];
    }
    savePortfolioData(newItems);
    setItems(newItems);
    resetForm();
    showStatus('Stored.');
  };

  const resetForm = () => {
    setForm({ title: '', category: categories.length > 0 ? categories[0].name : '', summary: '', overview: '', problem: '', strategy: '', thumbnail: '', images: [], duration: '', client: '', featured: false });
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
    setEditingId(null);
  };

  const executeItemDelete = (id: string) => {
    setIsDeleting(true);
    setTimeout(() => {
      const newItems = items.filter(i => i.id !== id);
      savePortfolioData(newItems);
      setItems(newItems);
      setItemConfirmDeleteId(null);
      setIsDeleting(false);
      showStatus('Deleted.');
    }, 300);
  };

  const handleEdit = (item: PortfolioItem) => {
    setForm(item);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="bg-white p-12 sm:p-20 w-full max-w-lg aspect-square flex flex-col items-center justify-center shadow-2xl">
          <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col items-center">
            <h1 className="text-[12px] font-bold uppercase tracking-[0.5em] mb-20 text-center text-black">Studio Access</h1>
            
            <div className="w-full relative mb-16">
              <input 
                autoFocus
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="패스워드"
                className="w-full border-b border-black py-4 focus:outline-none text-center text-4xl tracking-tighter placeholder:text-zinc-300 placeholder:text-2xl"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-black text-white py-6 text-[12px] font-bold uppercase tracking-[0.5em] hover:bg-zinc-800 transition-all duration-300 active:scale-95"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-6 sm:px-12 py-40">
      {statusMessage && (
        <div className={`fixed top-12 right-12 z-[100] px-8 py-4 editorial-caps text-[9px] font-bold ${statusMessage.type === 'error' ? 'bg-red-500 text-white' : 'bg-black text-white'}`}>
          {statusMessage.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-24 border-b border-zinc-100 pb-16 space-y-12 lg:space-y-0">
        <div>
           <h1 className="text-7xl font-serif font-black italic tracking-tighter">Control_Panel.</h1>
           <p className="text-zinc-400 text-sm mt-4 tracking-widest uppercase">Manage Content Index</p>
        </div>
        <button type="button" onClick={() => setIsAuthorized(false)} className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300 hover:text-black transition">Terminate Session</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        <div className="lg:col-span-5 space-y-20">
           {/* Form Section */}
           <div className="bg-white p-12 border border-zinc-100 space-y-12">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300 border-b pb-6">Project Metadata</h2>
              <div className="space-y-10">
                 <div className="space-y-4">
                   <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Title</label>
                   <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-black transition" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Category</label>
                      <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border-b border-zinc-100 py-3 bg-transparent focus:outline-none">
                         {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Pin Home</label>
                      <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="block w-6 h-6 accent-black mt-2" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-4">
                     <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Client</label>
                     <input type="text" value={form.client} onChange={e => setForm({...form, client: e.target.value})} className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-black transition" />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Duration</label>
                     <input type="text" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-black transition" />
                   </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Summary</label>
                    <textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} rows={2} className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-black transition resize-none" />
                 </div>

                 <div className="space-y-4">
                   <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Thumbnail (Main Image)</label>
                   <input ref={thumbnailInputRef} type="file" onChange={handleThumbnailUpload} className="w-full text-[10px] text-zinc-400" />
                   {form.thumbnail && <img src={form.thumbnail} className="w-24 h-16 object-cover grayscale" alt="Thumbnail Preview" />}
                 </div>

                 <div className="space-y-4">
                   <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Project Gallery (Detailed Images)</label>
                   <input ref={galleryInputRef} type="file" multiple onChange={handleGalleryUpload} className="w-full text-[10px] text-zinc-400" />
                   {form.images && form.images.length > 0 && (
                     <div className="grid grid-cols-3 gap-2 mt-4">
                       {form.images.map((img, idx) => (
                         <div key={idx} className="relative group/img aspect-video bg-zinc-50 border border-zinc-100 overflow-hidden">
                           <img src={img} className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition" alt={`Gallery ${idx}`} />
                           <button 
                             onClick={() => removeGalleryImage(idx)}
                             className="absolute top-1 right-1 bg-white/80 text-black text-[8px] w-4 h-4 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition"
                           >
                             ×
                           </button>
                         </div>
                       ))}
                     </div>
                   )}
                 </div>

                 <div className="flex gap-4 pt-12">
                   <button type="button" onClick={handleSave} className="flex-1 bg-black text-white py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition">Commit</button>
                   <button type="button" onClick={resetForm} className="flex-1 border border-black py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-50 transition">Clear</button>
                 </div>
              </div>
           </div>

           {/* Layout & Categories */}
           <div className="bg-zinc-50 p-12 space-y-12">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300 border-b pb-6">System Config</h2>
              <div className="space-y-8">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Layout</span>
                    <div className="flex space-x-2">
                       {[2, 3].map(c => <button key={c} onClick={() => handleLayoutChange(c)} className={`w-8 h-8 text-[10px] border transition ${galleryColumns === c ? 'bg-black text-white border-black' : 'border-zinc-200'}`}>{c}</button>)}
                    </div>
                 </div>
                 <div className="space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest block">Categories</span>
                    {categories.map(c => (
                       <div key={c.id} className="flex justify-between items-center border-b border-zinc-100 py-3">
                          <span className="text-sm font-medium">{c.name}</span>
                          <button onClick={() => executeCategoryDelete(c.id)} className="text-[9px] font-bold text-red-300 hover:text-red-500 uppercase tracking-widest">Remove</button>
                       </div>
                    ))}
                    <div className="flex gap-4 pt-4">
                       <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="New Label" className="flex-1 bg-transparent border-b border-zinc-200 py-2 text-xs focus:outline-none" />
                       <button onClick={handleAddCategory} className="text-[10px] font-bold uppercase tracking-[0.3em]">Add</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-7">
           <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300 border-b pb-6 mb-12">Registry Index ({items.length})</h2>
           <div className="space-y-1 border-y border-zinc-100">
              {items.map(item => (
                <div key={item.id} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center py-10 px-6 hover:bg-zinc-50 transition-all border-b border-zinc-50 last:border-0">
                   <div className="flex gap-10 items-center mb-6 sm:mb-0">
                     <div className="w-16 h-16 bg-zinc-100 overflow-hidden">
                        <img src={item.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="" />
                     </div>
                     <div>
                       <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-300 mb-2 block">{item.category}</span>
                       <h3 className="text-xl font-serif font-bold group-hover:italic transition-all">{item.title}</h3>
                     </div>
                   </div>
                   <div className="flex space-x-12">
                      <button onClick={() => handleEdit(item)} className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300 hover:text-black transition">Modify</button>
                      <button onClick={() => executeItemDelete(item.id)} className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-300 hover:text-red-500 transition">Erase</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}