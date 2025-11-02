import { ReactNode } from 'react'

export default function Section({
  id,
  title,
  children,
  subtitle,
  bgClassName,
  overlayClassName,
}: {
  id: string
  title: ReactNode
  subtitle?: string
  children: ReactNode
  bgClassName?: string
  overlayClassName?: string
}) {
  const hasBg = Boolean(bgClassName && bgClassName.trim().length > 0)
  return (
    <section id={id} className={`section-strip scroll-mt-24 py-12 sm:py-16 lg:py-20 ${hasBg ? `relative ${bgClassName}` : ''}`}>
      {hasBg && (
        <div
          className={`absolute inset-0 ${overlayClassName ? overlayClassName : 'bg-black/60'} pointer-events-none`}
          aria-hidden="true"
        />
      )}
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${hasBg ? 'relative z-10' : ''}`}>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && <p className="mt-1 text-neutral-400">{subtitle}</p>}
          </div>
          <div className="hidden md:block h-px flex-1 ml-6 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        {children}
      </div>
    </section>
  )
}
