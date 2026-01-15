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
    if (password === '1111') {
      setIsAuthorized(true);
    } else {
      showStatus('Access Denied.', 'error');
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

  const handleStartEditCategory = (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (cat) {
      setEditingCategoryId(id);
      setEditCategoryName(cat.name);
    }
  };

  const handleSaveCategoryEdit = () => {
    const trimmedName = editCategoryName.trim();
    if (!trimmedName || !editingCategoryId) return;
    const newList = categories.map(c => c.id === editingCategoryId ? { ...c, name: trimmedName } : c);
    setCategoriesList(newList);
    saveCategories(newList);
    setEditingCategoryId(null);
    showStatus('Updated.');
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
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
        <form onSubmit={handleLogin} className="bg-white p-12 w-full max-w-sm">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-center">Studio Access</h1>
          <input 
            autoFocus
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="PIN (1111)"
            className="w-full border-b border-zinc-200 py-4 mb-12 focus:outline-none focus:border-black text-center text-4xl tracking-tighter"
          />
          <button type="submit" className="w-full bg-black text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-800 transition">Enter</button>
        </form>
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
                 <div className="space-y-4">
                   <label className="text-[9px] uppercase font-bold text-zinc-300 tracking-widest">Thumbnail</label>
                   <input type="file" onChange={handleThumbnailUpload} className="w-full text-[10px] text-zinc-400" />
                   {form.thumbnail && <img src={form.thumbnail} className="w-20 h-12 object-cover grayscale" alt="" />}
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