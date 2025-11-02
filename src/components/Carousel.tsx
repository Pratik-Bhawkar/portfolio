import { ReactNode, useRef } from 'react'

export default function Carousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 'prev' | 'next') => {
    const el = ref.current
    if (!el) return
    const amount = Math.floor(el.clientWidth * 0.9)
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-1 py-2"
      >
        {children}
      </div>
      <button
        onClick={() => scrollBy('prev')}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/80 p-2 ring-1 ring-white/10 hover:ring-white/30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        onClick={() => scrollBy('next')}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/80 p-2 ring-1 ring-white/10 hover:ring-white/30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
