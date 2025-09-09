
# Frontend — OPS Landing Conversacional

## Setup
```bash
npm i
cp .env.local.example .env.local
npm run dev
```

## .env.local
```
NEXT_PUBLIC_PIXEL_ID=1777549206178175
NEXT_PUBLIC_CHECKOUT_URL=https://pay.kiwify.com.br/EQhHnRy
# ex.: https://ops-api-xxxxx.koyeb.app
NEXT_PUBLIC_API_BASE=
```

## Netlify
- Build: `npm run build` | Publish: `.next` | Plugin: `@netlify/plugin-nextjs`
- Defina as envs acima.
