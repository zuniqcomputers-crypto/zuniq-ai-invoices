import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl overflow-hidden ring-2 ring-indigo-400/50">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-xl font-bold text-gray-900">Zuniq Invoices</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
            My Invoices
          </Link>
          <Link
            href="/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition"
          >
            <span className="text-lg">+</span> Create Free Invoice
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Invoices, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">just talk to it.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The AI‑powered invoice generator that replaces boring manual forms with a smart conversational assistant. 
          Chat with the AI, answer a few questions, and get a professional invoice instantly — for free.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/new"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition"
          >
            <span className="text-xl">⚡</span> Create Your First Invoice
          </Link>
          <a
            href="https://zuniq-ai-invoices.vercel.app/new"
            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-sm transition"
          >
            🎥 See Demo
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why choose Zuniq?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "💬",
                title: "Chat with AI",
                desc: "No more filling out forms. Just tell our AI assistant about your business, your client, and your services, and it builds the invoice for you — in seconds.",
              },
              {
                icon: "📄",
                title: "Professional PDFs",
                desc: "Every invoice is designed to look premium, with your logo, a clean table, tax calculations, and even a QR code for payment.",
              },
              {
                icon: "📊",
                title: "Dashboard & History",
                desc: "All your invoices are saved, so you can view, edit, download, or delete them anytime. Track paid and unpaid invoices effortlessly.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { step: "1", title: "Chat with the AI", desc: "Answer simple questions about your invoice. The AI is friendly and never repeats itself." },
            { step: "2", title: "Review & Edit", desc: "See a live preview as you chat. You can edit any field before finalizing." },
            { step: "3", title: "Save & Download", desc: "Save your invoice to your private dashboard and download a polished PDF." },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">{item.step}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Built from a real frustration</h2>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-2xl mx-auto">
            One day, my younger brother told me his biggest headache: invoices. He was paying for tools and still wasting time. 
            I'm a problem solver – I love tackling complex challenges. That moment, Zuniq AI Invoices sparked in my mind. 
            My brother works in Dubai, and from that day I built this app. Now, it saves you time and money, just like I hoped.
          </p>
          <p className="mt-6 text-indigo-300 font-semibold">— Built with ❤️ for freelancers and small businesses</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Start invoicing for free</h2>
        <p className="text-gray-600 mb-8 text-lg">No sign‑up. No credit card. Just create your first invoice in seconds.</p>
        <Link
          href="/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition"
        >
          <span className="text-2xl">⚡</span> Create Free Invoice Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 Zuniq Invoices. Built with ❤️ for freelancers.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-gray-700">My Invoices</Link>
            <Link href="/new" className="hover:text-gray-700">Create New</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
