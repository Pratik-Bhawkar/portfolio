import { useEffect, useState } from 'react'
import { DEFAULT_GITHUB_USERNAME, GITHUB_TOKEN } from '../constants'
import { GITHUB_REPOS_ENDPOINT } from '../constants'

type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
}

export default function GithubProjects() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorCode, setErrorCode] = useState<number | null>(null)

  console.log('🎯 GithubProjects component mounted')

  // Static mode: use a single configured endpoint, no UI or token handling
  const username = DEFAULT_GITHUB_USERNAME
  const endpoint = GITHUB_REPOS_ENDPOINT

  console.log('📍 Username:', username)
  console.log('📍 Endpoint:', endpoint)
  console.log('📍 Token exists:', !!GITHUB_TOKEN)

  const CACHE_KEY = 'pb:ghCache'
  const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

  const getDefaultEndpoint = (u: string) =>
    `https://api.github.com/users/${encodeURIComponent(u)}/repos?sort=updated&per_page=100`

  const effectiveEndpoint = () => (endpoint && endpoint.trim() ? endpoint.trim() : getDefaultEndpoint(username))

  const loadCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed || !Array.isArray(parsed.data)) return null
  if (parsed.endpoint !== (endpoint || getDefaultEndpoint(username))) return null
      if (Date.now() - parsed.ts > CACHE_TTL_MS) return null
      return parsed as { data: Repo[]; ts: number }
    } catch {
      return null
    }
  }

  const saveCache = (data: Repo[]) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data, ts: Date.now(), username, endpoint: endpoint || getDefaultEndpoint(username) })
      )
    } catch {}
  }

  const fetchRepos = (opts?: { bypassCache?: boolean }) => {
    setLoading(true)
    setError(null)
    setErrorCode(null)

    if (!opts?.bypassCache) {
      const cached = loadCache()
      if (cached) {
        console.log('✅ Loaded', cached.data.length, 'repos from cache')
        setRepos(cached.data)
        setLoading(false)
        // background refresh
        setTimeout(() => fetchRepos({ bypassCache: true }), 0)
        return
      }
    }

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    // Add token for authenticated requests (higher rate limit)
    if (GITHUB_TOKEN && GITHUB_TOKEN.trim()) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN.trim()}`
      console.log('🔑 Using authenticated request')
    } else {
      console.log('⚠️ No token - using unauthenticated request')
    }

    // Helper to fetch all pages for the default endpoint using Link headers
    const fetchAllPages = async (): Promise<Repo[]> => {
      const startUrl = new URL(effectiveEndpoint())
      const perPage = Number(startUrl.searchParams.get('per_page')) || 100
      let page = 1
      const all: Repo[] = []
      // Safety cap to avoid unbounded requests
      const MAX_PAGES = 10
      while (page <= MAX_PAGES) {
        const url = new URL(startUrl)
        url.searchParams.set('page', String(page))
        const res = await fetch(url.toString(), { headers })
        const data = await res.json()
        if (!res.ok) {
          setErrorCode(res.status || null)
          throw new Error(typeof data?.message === 'string' ? data.message : 'Failed to load')
        }
        if (!Array.isArray(data)) {
          // Unexpected response shape
          break
        }
        all.push(...(data as Repo[]))
        const link = res.headers.get('Link') || ''
        const hasNext = link.includes('rel="next"')
        if (!hasNext || (data as unknown[]).length < perPage) break
        page += 1
      }
      return all
    }

    const run = async () => {
      try {
        let result: Repo[] = []
        console.log('🚀 Fetching repos from:', effectiveEndpoint())
        // Always paginate in static mode
        result = await fetchAllPages()
        console.log('✅ Fetched', result.length, 'repos total')
        setRepos(result)
        saveCache(result)
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Network error'
        console.error('❌ Error fetching repos:', msg, e)
        setRepos([])
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    run()
  }

  useEffect(() => {
    // Show cache immediately if present, then fetch
    const cached = loadCache()
    if (cached) {
      setRepos(cached.data)
      setLoading(false)
      setTimeout(() => fetchRepos({ bypassCache: true }), 0)
    } else {
      fetchRepos()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading && repos.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  // Show repos even if there's an error or still loading (graceful degradation)
  return (
    <div className="space-y-4">
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-neutral-500">
          Repos loaded: {repos.length} | Loading: {loading ? 'Yes' : 'No'} | Error: {error || 'None'}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-white/10 bg-white/5 p-4 shadow-glow hover:border-white/20 hover:bg-white/10 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold group-hover:text-brand-500 transition">{repo.name}</h3>
              {repo.stargazers_count > 0 && <span className="text-xs text-neutral-400">⭐ {repo.stargazers_count}</span>}
            </div>
            <p className="text-sm text-neutral-400 line-clamp-2 mb-3">{repo.description || 'No description available'}</p>
            {repo.language && <span className="inline-block text-xs px-2 py-1 rounded bg-white/10 text-neutral-300">{repo.language}</span>}
          </a>
        ))}
      </div>
    </div>
  )
}

