import { TaskProvider } from '@/context/TaskContext';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Taskify',
  description: 'To-do list dengan algoritma Max-Heap',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-sky-200 text-black font-sans min-h-screen flex flex-col">
        <TaskProvider>
          <nav className="bg-white border-b-4 border-black p-4 flex flex-wrap justify-between shadow-[0_4px_0_rgba(0,0,0,1)] z-10 sticky top-0">
            <div className='flex'>
                <Link href="/" className="font-black px-4 py-2">Taskify</Link>  
            </div>
            <div className='flex gap-4'>
                <Link href="/" className="font-black hover:bg-yellow-200 px-4 py-2 rounded-xl border-2 border-transparent hover:border-black transition-all">🏠 Overview</Link>
                <Link href="/today" className="font-black hover:bg-green-200 px-4 py-2 rounded-xl border-2 border-transparent hover:border-black transition-all">🎯 Hari Ini</Link>
                <Link href="/upcoming" className="font-black hover:bg-purple-200 px-4 py-2 rounded-xl border-2 border-transparent hover:border-black transition-all">🌅 Mendatang</Link>
                <Link href="/add" className="font-black bg-blue-400 border-2 border-black px-4 py-2 rounded-xl shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">➕ Tambah</Link>
            </div>
            
          </nav>
          
          <div className="flex-1 max-w-6xl w-full mx-auto p-6">
            {children}
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}