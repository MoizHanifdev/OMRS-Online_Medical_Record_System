import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'The Modern Operating System for Medical Records';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030712', // bg-background (dark mode)
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1e3a8a 0%, #030712 70%)',
            color: 'white',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '16px' }}>
            <div style={{ 
              width: '64px', height: '64px', backgroundColor: '#3b82f6', borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '32px', fontWeight: 'bold' 
            }}>
              O
            </div>
            <span style={{ fontSize: '48px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>OMRS</span>
          </div>
          
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '80%',
              marginBottom: '40px',
              color: '#f8fafc',
            }}
          >
            {title}
          </div>

          <div style={{ fontSize: '24px', color: '#94a3b8' }}>
            omrs.health
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
