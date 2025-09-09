import './globals.css';

export const metadata = {
  title: 'O Poder Supremo — Conversational Landing',
  description: 'Domine sua mente. Execute. Decida.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;
  return (
    <html lang="pt-BR">
      <head>
        {pixelId ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`
              }}
            />
            <noscript>
              <img height="1" width="1" style={{display:'none'}}
                   src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} />
            </noscript>
          </>
        ) : null}
      </head>
      <body className="min-h-screen bg-[#0b0b0f] text-[#eaeaf2]">
        {children}
      </body>
    </html>
  );
}
