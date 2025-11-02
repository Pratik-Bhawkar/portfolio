import { useEffect, useRef, useState } from 'react';

// You need to provide a local ta-dum sound file in /src/assets/ta-dum.mp3
const COLORS = ['#E50914', '#FFA600', '#FFD600', '#00C853', '#2979FF', '#B10DC9'];

export default function NetflixIntro({ onFinish, brandName = 'NETFLIX' }: { onFinish?: () => void; brandName?: string }) {
  const [phase, setPhase] = useState<'n' | 'explode' | 'converge' | 'netflix'>('n');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Sequence: N (0.5s) -> explode (0.7s) -> converge (0.7s) -> netflix (1s)
    const timers = [
      setTimeout(() => setPhase('explode'), 500),
      setTimeout(() => setPhase('converge'), 1200),
      setTimeout(() => setPhase('netflix'), 1900),
      setTimeout(() => onFinish && onFinish(), 2900),
    ];
    // Best-effort play; ignore autoplay rejections
    try {
      const p = audioRef.current?.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } catch {}
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black" style={{transition: 'background 0.5s'}}>
      <audio ref={audioRef} src="/src/assets/ta-dum.mp3" preload="auto" />
      {/* Skip button to avoid confusion if user wants to bypass intro */}
      <button
        onClick={() => onFinish && onFinish()}
        className="absolute top-4 right-4 rounded bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
        aria-label="Skip intro"
      >
        Skip
      </button>
      {/* Stylized PB */}
      {phase === 'n' && (
        <div className="netflix-n" style={{ fontSize: '8rem', color: '#E50914', fontWeight: 'bold', letterSpacing: '0.2em', transition: 'opacity 0.5s' }}>
          P&nbsp;B
        </div>
      )}
      {/* Exploding strips */}
      {phase === 'explode' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {COLORS.map((color, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `calc(50% + ${(i - 2.5) * 120}px)`,
              top: '50%',
              width: '60px',
              height: '100vh',
              background: color,
              boxShadow: `0 0 64px 16px ${color}`,
              transform: `translate(-50%, -50%) scaleY(1.2)`,
              opacity: 0.85,
              borderRadius: '16px',
              transition: 'all 0.7s',
              animation: `explode-strip 0.7s forwards`,
              animationDelay: `${i * 0.05}s`,
            }} />
          ))}
        </div>
      )}
      {/* Converging strips */}
      {phase === 'converge' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {COLORS.map((color, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '60px',
              height: '100vh',
              background: color,
              boxShadow: `0 0 64px 16px ${color}`,
              transform: `translate(-50%, -50%) scaleY(1.2)`,
              opacity: 0.85,
              borderRadius: '16px',
              transition: 'all 0.7s',
              animation: `converge-strip 0.7s forwards`,
              animationDelay: `${i * 0.05}s`,
            }} />
          ))}
        </div>
      )}
      {/* Custom wordmark */}
      {phase === 'netflix' && (
        <div style={{ fontSize: '5rem', color: '#E50914', fontWeight: 'bold', letterSpacing: '0.1em', transition: 'opacity 0.5s' }}>
          {brandName}
        </div>
      )}
      <style>{`
        @keyframes explode-strip {
          0% { left: 50%; opacity: 0.85; }
          100% { left: calc(50% + 360px); opacity: 0.5; }
        }
        @keyframes converge-strip {
          0% { left: calc(50% + 360px); opacity: 0.5; }
          100% { left: 50%; opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
