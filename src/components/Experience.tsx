import { EXPERIENCES } from '../constants'

export default function Experience() {
  return (
    <ol className="relative border-s border-white/10">
      {EXPERIENCES.map((e, idx) => (
        <li key={e.role + idx} className="mb-10 ms-6">
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/80 ring-4 ring-neutral-950">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="6" />
            </svg>
          </span>
          <h3 className="text-lg font-semibold">{e.role}</h3>
          <p className="text-sm text-neutral-400">{e.company} • {e.period}</p>
          <p className="mt-2 text-neutral-300">{e.summary}</p>
        </li>
      ))}
    </ol>
  )
}
