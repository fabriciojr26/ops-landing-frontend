import ChatDock from '../components/ChatDock';

export default function Page() {
  const checkout = process.env.NEXT_PUBLIC_CHECKOUT_URL || '#';
  return (
    <main className="min-h-screen">
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">O Poder Supremo</h1>
          <p className="text-lg text-gray-300 mb-6">
            Reprograme sua mente. Aplique microvitórias. Decida hoje.
          </p>
          <div className="flex gap-3">
            <a href={checkout} className="px-5 py-3 rounded-xl font-semibold bg-[#7c3aed]">Quero meu acesso agora</a>
            <a href="#detalhes" className="px-4 py-3 rounded-xl border border-[#2c2c3a]">Ver detalhes</a>
          </div>
        </div>
        <div className="bg-[#12121a] border border-[#1f1f2a] rounded-2xl p-4">
          <img src="/capa_do_livro.png" alt="O Poder Supremo" className="rounded-xl w-full" />
        </div>
      </section>

      <section id="detalhes" className="px-6 pb-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
        <div className="bg-[#12121a] border border-[#1f1f2a] rounded-2xl p-4">Controle emocional em 20s: respiração 4–4–4.</div>
        <div className="bg-[#12121a] border border-[#1f1f2a] rounded-2xl p-4">Foco e hábito: 1% por dia. Protocolo de 7 minutos.</div>
        <div className="bg-[#12121a] border border-[#1f1f2a] rounded-2xl p-4">Autoconfiança: scripts de decisão para crises.</div>
      </section>

      <ChatDock />
    </main>
  );
}
