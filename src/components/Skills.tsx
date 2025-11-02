import { SKILLS } from '../constants'

export default function Skills() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {SKILLS.map((s) => (
        <div
          key={s}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-center text-neutral-200 hover:border-white/20 hover:bg-white/10 transition w-full"
        >
          {s}
        </div>
      ))}
    </div>
  )
}
