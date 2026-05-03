'use client';
import { useTasks } from '@/context/TaskContext';
import TaskItem from '@/components/TaskItem';

export default function UpcomingPage() {
  const { tasks, getSmartDate } = useTasks();
  
  // Filter tugas untuk besok dan seterusnya (kecuali Hari ini dan Kemarin)
  const upcomingTasks = tasks.filter(task => {
    const smart = getSmartDate(task.deadline);
    return smart !== "Hari ini 🎯" && smart !== "Kemarin 🕰️";
  });

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black bg-white p-4 border-4 border-black rounded-[2rem] shadow-[6px_6px_0_rgba(0,0,0,1)] inline-block">
        🌅 Tugas Mendatang
      </h1>

      <div className="bg-white p-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] min-h-[300px]">
        {upcomingTasks.length === 0 ? (
           <div className="text-center mt-10">
             <div className="text-7xl mb-4">🛌</div>
             <h2 className="text-3xl font-black mb-2 text-black">Santai aja kawan!</h2>
             <p className="text-lg font-bold text-gray-500">Belum ada tugas untuk hari-hari berikutnya.</p>
           </div>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}