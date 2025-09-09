'use client';

import { useEffect, useState } from 'react';

type Reply = { message: string; buttons?: string[]; nextState?: string };

export default function ChatDock() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<'IDLE'|'GOAL_SELECTED'|'OBJECTION'|'OTHER'>('IDLE');
  const [goal, setGoal] = useState<string|null>(null);
  const [history, setHistory] = useState<Reply[]>([]);
  const base = process.env.NEXT_PUBLIC_API_BASE || '';

  useEffect(() => {
    if (!open) return;
    callGemini('IDLE', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function callGemini(nextState: string, g: string|null) {
    if (!base) {
      setHistory(prev => [...prev, { message: 'API base não configurada (NEXT_PUBLIC_API_BASE).' }]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${base}/gemini/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: nextState, goal: g, count: history.length }),
      });
      const data = await res.json();
      setHistory(prev => [...prev, { message: data.message, buttons: data.buttons, nextState: data.nextState }]);
      if (data.nextState) setState(data.nextState);
    } catch {
      setHistory(prev => [...prev, { message: 'Falha ao conectar. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  }

  function onButton(b: string) {
    if (['Controle emocional','Foco/Hábito','Autoconfiança','Influência/Carreira'].includes(b)) {
      setGoal(b); callGemini('GOAL_SELECTED', b);
    } else {
      callGemini(state, goal);
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {!open ? (
        <button className="px-5 py-3 rounded-xl font-semibold bg-[#7c3aed] shadow-xl" onClick={() => setOpen(true)}>
          Falar com o Especialista
        </button>
      ) : (
        <div className="bg-[#12121a] border border-[#232332] rounded-2xl p-4 w-[360px] max-w-[90vw] shadow-2xl">
          <div className="flex justify-between items-center pb-2 border-b border-[#232332]">
            <div className="font-semibold">Especialista do Poder Supremo</div>
            <button onClick={() => setOpen(false)} className="text-sm text-gray-400">fechar</button>
          </div>
          <div className="space-y-3 mt-3 max-h-[55vh] overflow-auto pr-1">
            {history.map((h, i) => (
              <div key={i} className="text-sm leading-relaxed">
                <div className="mb-2">{h.message}</div>
                <div className="flex flex-wrap gap-2">
                  {h.buttons?.map((b, idx) => (
                    <button key={idx} className="px-3 py-2 rounded-lg bg-[#1e1e2b] border border-[#2c2c3a]"
                            onClick={() => onButton(b)}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {loading ? <div className="text-xs text-gray-400">Digitando…</div> : null}
          </div>
        </div>
      )}
    </div>
  );
}
