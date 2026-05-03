'use client';
import { useState, useEffect } from 'react';
import { useTasks } from '@/context/TaskContext';
import TaskItem from '@/components/TaskItem';

export default function OverviewPage() {
  const { tasks, getSmartDate } = useTasks();
  const [filter, setFilter] = useState('all');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const todayStart = new Date().setHours(0,0,0,0);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const todayTasks = tasks.filter(t => t.deadline && new Date(t.deadline).setHours(0,0,0,0) === todayStart).length;
  const overdueTasks = tasks.filter(t => t.deadline && new Date(t.deadline).getTime() < now && !t.isCompleted).length;
  
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let filteredTasks = tasks;
  if (filter === 'pending') filteredTasks = tasks.filter(t => !t.isCompleted);
  if (filter === 'completed') filteredTasks = tasks.filter(t => t.isCompleted);

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const groupName = getSmartDate(task.deadline);
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-start">
        <h1 className="text-3xl font-black bg-white p-3 px-6 border-4 border-black rounded-[1.5rem] shadow-[4px_4px_0_rgba(0,0,0,1)] inline-block">
          📊 Overview Tugasmu!
        </h1>
      </div>

      {/* --- BAGIAN STATISTIK (Susunan Atas-Bawah) --- */}
      <div className="flex flex-col gap-5">
        
        {/* Baris 1: Tiga Kotak Angka */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-blue-300 py-5 px-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
            <span className="text-4xl font-black">{totalTasks}</span>
            <span className="font-bold text-base mt-1">Total Tugas</span>
          </div>
          <div className="bg-green-300 py-5 px-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
            <span className="text-4xl font-black">{todayTasks}</span>
            <span className="font-bold text-base mt-1">Hari Ini</span>
          </div>
          <div className="bg-red-300 py-5 px-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
            <span className="text-4xl font-black">{overdueTasks}</span>
            <span className="font-bold text-base mt-1">Terlambat</span>
          </div>
        </div>

        {/* Baris 2: Progress Selesai (Dibuat memanjang horizontal) */}
        <div className="bg-white py-4 px-6 rounded-2xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-4 transition-transform hover:-translate-y-1">
          <span className="font-bold text-base whitespace-nowrap">Progress:</span>
          {/* Bar Loadernya */}
          <div className="flex-1 h-8 bg-gray-200 border-4 border-black rounded-full relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-green-400 transition-all duration-1000 ease-out" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="text-2xl font-black">{progressPercent}%</span>
        </div>

      </div>

      {/* --- BAGIAN FILTER & DAFTAR TUGAS --- */}
      <div className="flex flex-col mt-4">
          {/* Tombol Filter */}
        <div className="flex gap-2 bg-white p-2 rounded-2xl border-4 border-black w-full shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <button 
            onClick={() => setFilter('all')} 
            className={`flex-1 py-3 font-black rounded-xl border-2 transition-colors ${filter === 'all' ? 'bg-yellow-300 border-black' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}
          >
            Semua
          </button>
          <button 
            onClick={() => setFilter('pending')} 
            className={`flex-1 py-3 font-black rounded-xl border-2 transition-colors ${filter === 'pending' ? 'bg-yellow-300 border-black' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}
          >
            Belum
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            className={`flex-1 py-3 font-black rounded-xl border-2 transition-colors ${filter === 'completed' ? 'bg-yellow-300 border-black' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}
          >
            Selesai
          </button>
        </div>

        {/* List Tugas */}
        <div className="space-y-6">
          {Object.keys(groupedTasks).length === 0 && (
            <div className="bg-white p-10 rounded-[2rem] border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] text-center mt-2 transition-all">
              <div className="text-6xl mb-3">🥳</div>
              <h2 className="text-3xl font-black mb-2 text-black">Tidak ada tugas!!</h2>
              <p className="text-lg font-bold text-gray-600">waktunya istirahat😴😴</p>
            </div>
          )}
          
          {Object.keys(groupedTasks).map((groupName) => (
            <div key={groupName} className="bg-white p-6 rounded-[2rem] border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] mt-2">
              <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-5 inline-block">{groupName}</h2>
              <div className="space-y-4">
                {groupedTasks[groupName].map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}