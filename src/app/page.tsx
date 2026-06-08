import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* ---- Navigation ---- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl overflow-hidden ring-2 ring-indigo-400/50 shadow-lg">
              <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Zuniq Invoices
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
              My Invoices
            </Link>
            <Link
              href="/new"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all hover:scale-105"
            >
              <span className="text-lg">⚡</span> Create Free Invoice
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- Hero Section ---- */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            🎉 Free & Unlimited – No credit card required
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Invoices,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500">
              just talk to it.
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The AI‑powered invoice generator that replaces boring forms with a smart conversational assistant. 
            Chat with our AI, answer a few questions, and get a professional invoice instantly — for free, forever.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/new"
              className="inline-flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            >
              <span className="text-2xl">⚡</span> Create Your First Invoice
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-sm transition-all"
            >
              <span>🎥</span> See how it works
            </a>
          </div>
        </div>
      </section>

      {/* ---- Trust / Social Proof ---- */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "100%", label: "Free" },
            { value: "∞", label: "Unlimited Invoices" },
            { value: "AI‑Powered", label: "Smart Assistant" },
            { value: "PDF", label: "Professional Downloads" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl font-extrabold text-indigo-600">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Features ---- */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Why you’ll love <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Zuniq</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "💬",
              title: "Chat with AI",
              desc: "No more filling out forms. Just tell our AI assistant about your business, your client, and your services, and it builds the invoice for you — in seconds.",
            },
            {
              icon: "📄",
              title: "Premium Invoices",
              desc: "Every invoice is designed to look like it came from a $100k design studio. Add your logo, set tax rates, and even embed a QR code for payment.",
            },
            {
              icon: "📊",
              title: "Invoice History",
              desc: "All your invoices are saved (optionally sign in to keep them private). View, edit, download, or delete anytime. Track paid and unpaid effortlessly.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300"
            >
              <div className="text-5xl mb-6">{f.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Chat with the AI",
                desc: "Answer simple questions about your invoice. The AI is friendly, never repeats itself, and understands when you correct it.",
              },
              {
                step: "2",
                title: "Review & Edit",
                desc: "See a live preview as you chat. Switch to edit mode to tweak any field — even add multiple items, tax, and discount.",
              },
              {
                step: "3",
                title: "Save & Download",
                desc: "Finalize your invoice and download a polished PDF. Optionally sign in to keep your invoices in your private dashboard.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Story ---- */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Built from a real frustration</h2>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-2xl mx-auto">
            One day, my younger brother told me his biggest headache: invoices. He was paying for tools and still wasting time. 
            I'm a problem solver – I love tackling complex challenges. That moment, Zuniq AI Invoices sparked in my mind. 
            My brother works in Dubai, and from that day I built this app. Now, it saves you time and money, just like I hoped.
          </p>
          <p className="mt-6 text-indigo-300 font-semibold">— Built with ❤️ for freelancers and small businesses</p>
        </div>
      </section>

      {/* ---- Donation / Support ---- */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">❤️ Support the project</h2>
          <p className="text-indigo-100 text-lg mb-8">
            Zuniq Invoices is 100% free and unlimited. If it saves you time and money, consider buying me a coffee 
            to help keep the project alive and improving.
          </p>
          <a
            href="https://www.buymeacoffee.com/zuniq" // 👈 replace with your actual donation link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-105"
          >
            ☕ Buy me a coffee
          </a>
          <p className="mt-4 text-indigo-200 text-sm">
            Every little bit helps us keep the service free and add new features.
          </p>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>© 2026 Zuniq Invoices.</span>
            <span className="hidden md:inline">|</span>
            <span>Built for freelancers & small businesses.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-gray-900 transition">My Invoices</Link>
            <Link href="/new" className="hover:text-gray-900 transition">Create New</Link>
            <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
