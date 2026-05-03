'use client';
import { useState, useEffect } from 'react';
import { useTasks } from '@/context/TaskContext';
import { useRouter, useParams } from 'next/navigation';

export default function EditTaskPage() {
  const { tasks, editTask } = useTasks();
  const router = useRouter();
  const params = useParams();
  const taskId = Number(params.id);

  const [text, setText] = useState('');
  const [priority, setPriority] = useState(2);
  const [deadline, setDeadline] = useState('');

  // Saat halaman load, cari data task yang mau di-edit
  useEffect(() => {
    const taskToEdit = tasks.find(t => t.id === taskId);
    if (taskToEdit) {
      setText(taskToEdit.text);
      setPriority(taskToEdit.priority);
      setDeadline(taskToEdit.deadline || '');
    } else {
      // Kalau ngga ketemu, balikin ke home
      router.push('/');
    }
  }, [taskId, tasks, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(taskId, { id: taskId, text, priority: Number(priority), deadline });
    router.push('/');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-[2rem] border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
      <h1 className="text-3xl font-black mb-6 border-b-4 border-black pb-2 inline-block">✏️ Edit Tugas!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block font-black mb-2 text-lg">Nama Tugas 📝</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} required 
            className="w-full bg-yellow-50 border-4 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:bg-yellow-100" />
        </div>
        <div>
          <label className="block font-black mb-2 text-lg">Seberapa Penting? 🌟</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-blue-50 border-4 border-black rounded-2xl px-4 py-3 font-bold cursor-pointer focus:outline-none focus:bg-blue-100">
            <option value={3}>🚨 SANGAT PENTING!</option>
            <option value={2}>🎈 Penting</option>
            <option value={1}>🐢 Santai</option>
          </select>
        </div>
        <div>
          <label className="block font-black mb-2 text-lg">Kapan Selesai? ⏰ (Opsional)</label>
          <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)}
            className="w-full bg-pink-50 border-4 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:bg-pink-100" />
        </div>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="flex-1 bg-green-400 hover:bg-green-500 font-black text-xl py-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
            Simpan Perubahan! 💾
          </button>
          <button type="button" onClick={() => router.push('/')} className="bg-gray-200 hover:bg-gray-300 font-black text-xl px-6 py-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}