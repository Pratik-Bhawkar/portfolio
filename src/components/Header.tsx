import { BRAND_NAME } from '../constants'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Header({ onSwitchProfile }: { onSwitchProfile?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'backdrop-blur bg-neutral-950/80 shadow-glow' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="">
            <span
              className="font-sans font-extrabold uppercase text-lg sm:text-xl tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
              style={{ letterSpacing: '0.04em' }}
            >
              <span className="text-brand-500">P</span>
              <span className="text-white">RATIK </span>
              <span className="text-brand-500">B</span>
              <span className="text-white">HAWKAR</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-neutral-300 hover:text-white transition-colors"
              >
                {n.label}
              </a>
            ))}
            {onSwitchProfile && (
              <button
                onClick={onSwitchProfile}
                className="ml-2 rounded border border-white/10 px-3 py-1.5 text-sm font-semibold text-neutral-200 hover:bg-white/5"
              >
                Switch Profile
              </button>
            )}
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded px-2 py-1.5 text-neutral-200 hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-neutral-950/95">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex flex-col gap-2">
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-2 py-2 text-neutral-300 hover:bg-white/5 hover:text-white"
                >
                  {n.label}
                </a>
              ))}
              {onSwitchProfile && (
                <button
                  onClick={() => {
                    setOpen(false)
                    onSwitchProfile()
                  }}
                  className="mt-1 rounded border border-white/10 px-3 py-2 text-center font-semibold text-neutral-200 hover:bg-white/5"
                >
                  Switch Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
