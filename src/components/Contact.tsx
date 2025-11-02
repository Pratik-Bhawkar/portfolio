import { CONTACT } from '../constants'

export default function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
        <ul className="space-y-2 text-neutral-300">
          <li>
            <span className="text-neutral-400">Email:</span>{' '}
            <a className="hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            <span className="text-neutral-400">Phone:</span>{' '}
            <a className="hover:underline" href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
          </li>
          <li>
            <span className="text-neutral-400">Location:</span>{' '}
            <span>{CONTACT.location}</span>
          </li>
          {CONTACT.linkedin && (
            <li>
              <span className="text-neutral-400">LinkedIn:</span>{' '}
              <a className="hover:underline" href={CONTACT.linkedin} target="_blank" rel="noreferrer">{CONTACT.linkedin}</a>
            </li>
          )}
        </ul>
      </div>

      <form
        className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          const name = data.get('name')
          const email = data.get('email')
          const message = data.get('message')
          alert(`Thanks, ${name}! I will reach out to ${email}.\n\nMessage: ${message}`)
          e.currentTarget.reset()
        }}
      >
        <h3 className="text-lg font-semibold">Send a Message</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="name" required placeholder="Your Name" className="rounded bg-neutral-900 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-white/30" />
          <input name="email" required type="email" placeholder="Email" className="rounded bg-neutral-900 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-white/30" />
        </div>
        <textarea name="message" required placeholder="Message" rows={5} className="w-full rounded bg-neutral-900 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-white/30"></textarea>
        <button type="submit" className="rounded bg-brand-500 px-4 py-2 font-semibold text-white hover:opacity-90">Send</button>
      </form>
    </div>
  )
}
