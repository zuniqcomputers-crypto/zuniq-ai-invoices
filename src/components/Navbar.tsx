import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#4f46e5] rounded flex items-center justify-center text-white font-bold italic">Z</div>
          <span className="text-xl font-bold tracking-tighter text-[#0f0f14]">ZUNIQ<span className="text-[#4f46e5]">AI</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-500 hover:text-[#4f46e5]">Features</a>
          <a href="#pricing" className="text-sm font-medium text-slate-500 hover:text-[#4f46e5]">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-slate-500 hover:text-[#4f46e5]">FAQ</a>
          <Link href="/new" className="px-5 py-2.5 bg-[#4f46e5] text-white rounded-lg text-sm font-bold hover:bg-[#4338ca] transition-all shadow-md">
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
