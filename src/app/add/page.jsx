'use client';
import { useState, useEffect } from 'react';
import { useTasks } from '@/context/TaskContext';
import { useRouter } from 'next/navigation';

export default function AddTaskPage() {
  const { addTask } = useTasks();
  const router = useRouter();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(2);
  const [deadline, setDeadline] = useState('');
  const [isNoDeadline, setIsNoDeadline] = useState(false);

  // Fungsi untuk mendapatkan waktu saat ini dengan format yang benar
  const getCurrentFormattedTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  // Set nilai default saat halaman dimuat
  useEffect(() => {
    setDeadline(getCurrentFormattedTime());
  }, []);

  // Fungsi yang dijalankan saat checkbox "Tidak ada deadline" di-klik
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsNoDeadline(checked);
    
    if (checked) {
      setDeadline(''); // Kosongkan input jika dicentang
    } else {
      setDeadline(getCurrentFormattedTime()); // Kembalikan ke waktu sekarang jika batal dicentang
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ id: Date.now(), text, priority: Number(priority), deadline });
    router.push('/');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-[2rem] border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
      <h1 className="text-3xl font-black mb-6 border-b-4 border-black pb-2 inline-block">✨ Tambah Tugas!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block font-black mb-2 text-lg">Nama Tugas 📝</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} required placeholder="Masukan Tugasmu di sini..."
            className="w-full bg-yellow-50 border-4 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:bg-yellow-100" />
        </div>
        
        <div>
          <label className="block font-black mb-2 text-lg">Seberapa Penting? 🌟</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-blue-50 border-4 border-black rounded-2xl px-4 py-3 font-bold cursor-pointer focus:outline-none focus:bg-blue-100">
            <option value={3}>🚨 Sangat Penting!</option>
            <option value={2}>🎈 Penting</option>
            <option value={1}>🐢 Santai</option>
          </select>
        </div>
        
        <div>
          <label className="block font-black mb-2 text-lg">Kapan Selesai? ⏰</label>
          <input 
            type="datetime-local" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)}
            disabled={isNoDeadline} // Kunci input kalau checkbox dicentang
            className={`w-full bg-pink-50 border-4 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:bg-pink-100 transition-all ${isNoDeadline ? 'opacity-50 cursor-not-allowed grayscale' : ''}`} 
          />
          
          {/* Fitur baru: Checkbox Tidak ada deadline */}
          <div className="flex items-center gap-3 mt-4 bg-gray-100 p-3 rounded-xl border-2 border-black w-fit">
            <input 
              type="checkbox" 
              id="noDeadline"
              checked={isNoDeadline}
              onChange={handleCheckboxChange}
              className="w-6 h-6 cursor-pointer accent-black"
            />
            <label htmlFor="noDeadline" className="font-bold cursor-pointer text-gray-700 select-none">
              Tidak ada deadline 🌈
            </label>
          </div>
        </div>
        
        <button type="submit" className="bg-green-400 hover:bg-green-500 font-black text-xl py-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] mt-4 active:translate-y-1 active:shadow-none transition-all">
          Gas Tambah! 🚀
        </button>
      </form>
    </div>
  );
}