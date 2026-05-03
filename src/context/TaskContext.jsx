'use client';
import { createContext, useContext, useState } from 'react';
import { MaxHeap } from '@/utils/priorityQueue';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [pq] = useState(() => new MaxHeap());
  const [tasks, setTasks] = useState([]);

  const getSmartDate = (dateString) => {
    if (!dateString) return "Kapan-kapan 🌈"; // Kategori khusus buat yang tanpa deadline

    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0,0,0,0);
    const target = new Date(date);
    target.setHours(0,0,0,0);
    
    const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hari ini 🎯";
    if (diffDays === 1) return "Besok 🌅";
    if (diffDays === -1) return "Kemarin 🕰️";
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const addTask = (task) => {
    pq.insert({ ...task, isCompleted: false });
    setTasks(pq.getSorted());
  };

  const editTask = (id, updatedTask) => {
    const existingTask = pq.heap.find(t => t.id === id);
    if (existingTask) {
      pq.updateTask(id, { ...updatedTask, isCompleted: existingTask.isCompleted });
      setTasks(pq.getSorted());
    }
  };

  const toggleComplete = (id) => {
    const task = pq.heap.find(t => t.id === id);
    if (task) {
      pq.updateTask(id, { ...task, isCompleted: !task.isCompleted });
      setTasks(pq.getSorted());
    }
  };

  const deleteTask = (id) => {
    if(confirm("Yakin mau hapus tugas ini? 🗑️")) {
      pq.removeById(id);
      setTasks(pq.getSorted());
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, toggleComplete, deleteTask, getSmartDate }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);