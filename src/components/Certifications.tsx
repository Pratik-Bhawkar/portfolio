import { CERTIFICATIONS } from '../constants'

export default function Certifications() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {CERTIFICATIONS.map((c) => {
        const issuedText = c.issued || c.year || ''
        const isNvidia = /nvidia/i.test(c.issuer || '')
        const isForageLike = /amazon|walmart|quantium|forage/i.test(c.issuer || '')
        const fallbackUrl = c.url
          ? c.url
          : isNvidia && c.credentialId
          ? `https://www.google.com/search?q=${encodeURIComponent(`site:courses.nvidia.com/certificates ${c.credentialId}`)}`
          : isForageLike
          ? `https://www.google.com/search?q=${encodeURIComponent(`site:theforage.com ${c.name} ${c.credentialId ?? ''}`)}`
          : undefined

        const content = (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-glow hover:border-white/20 hover:bg-white/10 transition h-full">
            <div className="text-base font-semibold">{c.name}</div>
            <div className="text-sm text-neutral-400">{c.issuer}{issuedText ? ` • ${issuedText}` : ''}</div>
            {c.credentialId && (
              <div className="mt-1 text-xs text-neutral-500">Credential ID: {c.credentialId}</div>
            )}
            <div className="mt-3 text-sm font-semibold text-brand-500">
              {(c.url || fallbackUrl) ? 'Open credential →' : ''}
            </div>
          </div>
        )

        return (c.url || fallbackUrl) ? (
          <a
            key={c.name}
            href={c.url || fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full"
            title={c.url ? 'Open credential' : 'Search credential'}
          >
            {content}
          </a>
        ) : (
          <div key={c.name} className="h-full">
            {content}
          </div>
        )
      })}
    </div>
  )
}
