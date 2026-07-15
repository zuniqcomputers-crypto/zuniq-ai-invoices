import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,#4f46e5_30%,transparent_100%)] animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-[2px] bg-white rounded-full z-10"></div>
            <div className="relative z-20 w-10 h-10 overflow-hidden rounded-full bg-white flex items-center justify-center">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
            </div>
          </div>
          <div className="flex flex-col text-left font-black tracking-tighter uppercase italic">
            <span>ZUNIQ<span className="text-indigo-600">AI</span></span>
          </div>
        </Link>
        <Link href="/new" className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Create Invoice</Link>
      </div>
    </nav>
  );
}
