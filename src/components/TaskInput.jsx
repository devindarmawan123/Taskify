import { useState, useEffect } from 'react';

export default function TaskInput({ onAddTask, onSaveEdit, editingTask, onCancelEdit }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(2);
  const [deadline, setDeadline] = useState('');

  // Jika sedang dalam mode edit, isi form dengan data tugas yang mau diedit
  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setPriority(editingTask.priority);
      setDeadline(editingTask.deadline || '');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const taskData = {
      id: editingTask ? editingTask.id : Date.now(),
      text,
      priority: Number(priority),
      deadline: deadline, 
    };

    if (editingTask) {
      onSaveEdit(taskData);
    } else {
      onAddTask(taskData);
    }
    
    // Reset form
    setText('');
    setPriority(2);
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-8">
      <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
        {editingTask ? '✏️ Ayo Perbaiki Tugasmu!' : '✨ Tambah Tugas Baru!'}
      </h2>

      <div className="flex flex-col gap-4">
        {/* Input Nama Tugas */}
        <div>
          <label className="block font-bold text-gray-700 mb-2">Masukan Tugasmu! 📝</label>
          <input
            type="text"
            placeholder="Masukan Tugasmu di sini..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-yellow-50 text-black border-4 border-black rounded-2xl px-5 py-3 text-lg focus:outline-none focus:bg-yellow-100 transition-colors"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Input Priority */}
          <div className="flex-1">
            <label className="block font-bold text-gray-700 mb-2">Seberapa Penting? 🌟</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-blue-50 text-black border-4 border-black rounded-2xl px-5 py-3 text-lg focus:outline-none focus:bg-blue-100 font-bold cursor-pointer"
            >
              <option value={3}>🚨 SANGAT PENTING! (Tinggi)</option>
              <option value={2}>🎈 Penting (Sedang)</option>
              <option value={1}>🐢 Santai (Rendah)</option>
            </select>
          </div>

          {/* Input Deadline */}
          <div className="flex-1">
            <label className="block font-bold text-gray-700 mb-2">Masukan Deadlinenya? ⏰</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-pink-50 text-black border-4 border-black rounded-2xl px-5 py-3 text-lg focus:outline-none focus:bg-pink-100"
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-green-400 hover:bg-green-500 text-black font-extrabold text-xl py-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            {editingTask ? 'Simpan Perubahan! 💾' : 'Gas Tambah! 🚀'}
          </button>
          
          {editingTask && (
            <button
              type="button"
              onClick={() => {
                onCancelEdit();
                setText('');
                setPriority(2);
                setDeadline('');
              }}
              className="bg-gray-300 hover:bg-gray-400 text-black font-extrabold text-xl py-4 px-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              Batal ❌
            </button>
          )}
        </div>
      </div>
    </form>
  );
}