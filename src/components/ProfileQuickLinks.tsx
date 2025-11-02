
import { QUICK_PROFILES } from '../constants';

export default function ProfileQuickLinks({ onSelect }: { onSelect: (p: typeof QUICK_PROFILES[number]) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-20 md:mt-24">
        <div className="flex items-center gap-3 text-neutral-400">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          <span className="text-sm uppercase tracking-widest">Quick Profiles</span>
        </div>

        <div className="mt-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 min-w-full">
            {QUICK_PROFILES.map((p) => (
              <div
                key={p.label}
                className="group relative flex-shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur transition hover:border-white/20 hover:bg-white/10 cursor-pointer"
                onClick={() => onSelect(p)}
              >
                <img src={p.avatarUrl} alt={p.label} className="w-12 h-12 object-cover rounded-full mb-2" />
                <div className="text-sm font-semibold">{p.label}</div>
                {p.desc && (
                  <div className="text-xs text-neutral-400 group-hover:text-neutral-300">{p.desc}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
