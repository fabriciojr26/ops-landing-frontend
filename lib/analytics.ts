export type CapiPayload = {
  event_name: string;
  event_id: string;
  payload?: any;
  user_data?: { fbp?: string; fbc?: string };
  ts?: number;
  url?: string;
};

export async function capiSend(p: CapiPayload) {
  const base = process.env.NEXT_PUBLIC_API_BASE || '';
  if (!base) return { ok: false, reason: 'API base missing' };
  try {
    const res = await fetch(`${base}/capi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
      cache: 'no-store',
    });
    return await res.json();
  } catch (e) { return { ok: false, error: String(e) }; }
}
