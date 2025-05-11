import { useState } from 'react';
import './App.css';

export default function OmegaPanel() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://eu2.make.com/1856794/scenarios/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      const data = await res.json();
      setResponse(data.reply || '✅ Görev iletildi. Yanıt Make.com üzerinden alınacaktır.');
    } catch (err) {
      setResponse('❌ Hata: Mesaj gönderilemedi.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">OMEGA</h1>
      <p className="text-sm text-gray-400 mb-8">Geliştiren: Blives Company</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <textarea
          rows={4}
          placeholder="Komutunuzu yazın..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-900 border border-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>

      {response && (
        <div className="mt-6 w-full max-w-xl bg-gray-800 p-4 rounded-xl border border-blue-800">
          <p className="text-blue-300 font-medium">Yanıt:</p>
          <p className="mt-2 text-white whitespace-pre-line">{response}</p>
        </div>
      )}

      <footer className="mt-10 text-xs text-gray-500">
        Omega AI © {new Date().getFullYear()} — Developed by Blives
      </footer>
    </div>
  );
}
