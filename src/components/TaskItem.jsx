'use client';
import { useTasks } from '@/context/TaskContext';
import { useRouter } from 'next/navigation';

export default function TaskItem({ task }) {
  const { toggleComplete, deleteTask } = useTasks();
  const router = useRouter();

  const priorityConfig = {
    3: { label: 'SANGAT PENTING! 🚨', bgColor: 'bg-red-200' },
    2: { label: 'PENTING 🎈', bgColor: 'bg-orange-200' },
    1: { label: 'SANTAI 🐢', bgColor: 'bg-green-200' },
  };
  const config = priorityConfig[task.priority];

  // Hitung telat untuk nampilin teks peringatan merah
  const isOverdue = task.deadline && new Date(task.deadline).getTime() < Date.now() && !task.isCompleted;

  const taskStyle = task.isCompleted 
    ? "bg-gray-200 opacity-60 line-through grayscale" 
    : config.bgColor;

  return (
    <div className={`${taskStyle} p-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col md:flex-row gap-4 items-center justify-between transition-all`}>
      <div className="flex flex-col w-full">
        <span className="font-black text-black bg-white border-2 border-black rounded-full px-2 py-1 text-[10px] w-fit mb-1">
          {config.label}
        </span>
        <h3 className="text-lg font-black text-black leading-tight">
          {task.text}
        </h3>
        
        {/* Render teks deadline atau peringatan */}
        <p className={`font-bold text-xs mt-1 ${isOverdue ? 'text-red-600 animate-pulse' : 'text-black'}`}>
          {task.deadline ? (
            <>⏰ {new Date(task.deadline).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} {isOverdue && "(🚨 Telat!)"}</>
          ) : (
            "Tidak ada deadline 🌈"
          )}
        </p>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => router.push(`/edit/${task.id}`)}
          className="bg-yellow-300 border-2 border-black p-3 rounded-xl shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          ✏️
        </button>
        <button
          onClick={() => toggleComplete(task.id)}
          className={`${task.isCompleted ? 'bg-yellow-400' : 'bg-green-400'} border-2 border-black p-3 rounded-xl shadow-[2px_2px_0_rgba(0,0,0,1)] font-black active:translate-y-1 active:shadow-none min-w-[110px] text-sm transition-all`}
        >
          {task.isCompleted ? 'Batal ❌' : 'Selesai! ✅'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-400 border-2 border-black p-3 rounded-xl shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}