import Carousel from './Carousel'
import { PROJECTS } from '../constants'

export default function Projects() {
  return (
    <Carousel>
      {PROJECTS.map((p) => (
        <a
          key={p.id}
          href={p.href || '#'}
          target={p.href ? '_blank' : undefined}
          rel={p.href ? 'noreferrer' : undefined}
          className="group snap-start w-72 sm:w-80 flex-shrink-0"
        >
          <div className="relative h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-glow">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-brand-500/20 via-transparent to-transparent" />
            <div className="absolute right-2 top-2 rounded bg-white/10 px-2 py-0.5 text-xs text-neutral-200 backdrop-blur">
              {p.tags?.[0] || 'Project'}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <div className="text-base font-semibold">{p.title}</div>
              {p.subtitle && <div className="text-xs text-neutral-400">{p.subtitle}</div>}
            </div>
          </div>
        </a>
      ))}
    </Carousel>
  )
}
