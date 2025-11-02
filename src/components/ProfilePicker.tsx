
import { QUICK_PROFILES, QuickProfile } from '../constants';

export default function ProfilePicker({ onSelect }: { onSelect: (p: QuickProfile) => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950 bg-cover bg-center bg-no-repeat min-h-screen font-sans"
      style={{
      }}
    >
      <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
        <h2
          className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-6"
        >
          Who's watching?
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          {(!QUICK_PROFILES || QUICK_PROFILES.length === 0) && (
            <div className="text-neutral-300">No profiles available</div>
          )}
          {QUICK_PROFILES.map((p, idx) => (
            <div
              key={p.label}
              onClick={() => onSelect(p)}
              className="group flex flex-col items-center gap-3 cursor-pointer"
              style={{ minWidth: '140px' }}
            >
              <div className="relative flex items-center justify-center aspect-square w-32 h-32 md:w-36 md:h-36 overflow-hidden rounded-2xl ring-2 ring-white/20 group-hover:ring-brand-500 group-hover:ring-4 group-hover:scale-105 transition bg-white/10 backdrop-blur-sm shadow-2xl border border-white/20">
                <img
                  src={p.avatarUrl}
                  alt={p.label + ' avatar'}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-sm md:text-base font-medium text-white/90 group-hover:text-white text-center drop-shadow font-sans">
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
