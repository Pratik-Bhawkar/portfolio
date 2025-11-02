import { CONTACT } from '../constants'

export default function HireMe() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-center shadow-glow">
      <div className="text-sm uppercase tracking-widest text-neutral-400">Hire Me</div>
      <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold">Let's build something great</h3>
      <div className="mt-6 flex flex-col items-center justify-center gap-3">
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-2xl sm:text-3xl font-bold hover:underline"
        >
          {CONTACT.email}
        </a>
        <a
          href={`tel:${CONTACT.phone}`}
          className="text-xl sm:text-2xl text-neutral-300 hover:underline"
        >
          {CONTACT.phone}
        </a>
      </div>
      <div className="mt-6 text-neutral-400">{CONTACT.location}</div>
    </div>
  )
}
