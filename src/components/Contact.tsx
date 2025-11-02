import { CONTACT } from '../constants'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center">Get In Touch</h3>
        <p className="text-neutral-300 text-center mb-6">
          Feel free to reach out for opportunities, collaborations, or just to say hello!
        </p>
        <ul className="space-y-4 text-lg">
          <li className="flex items-center justify-center">
            <span className="text-neutral-400 w-20">Email:</span>
            <a className="hover:underline hover:text-brand-400 transition-colors" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </li>
          <li className="flex items-center justify-center">
            <span className="text-neutral-400 w-20">Phone:</span>
            <a className="hover:underline hover:text-brand-400 transition-colors" href={`tel:${CONTACT.phone}`}>
              {CONTACT.phone}
            </a>
          </li>
          <li className="flex items-center justify-center">
            <span className="text-neutral-400 w-20">Location:</span>
            <span className="text-neutral-300">{CONTACT.location}</span>
          </li>
          {CONTACT.linkedin && (
            <li className="flex items-center justify-center">
              <span className="text-neutral-400 w-20">LinkedIn:</span>
              <a className="hover:underline hover:text-brand-400 transition-colors" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                View Profile
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
