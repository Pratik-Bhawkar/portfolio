import { Component, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; info?: string }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    try {
      const info = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
      this.setState({ info })
      // eslint-disable-next-line no-console
      console.error('App crashed:', error)
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
          <div className="max-w-lg w-full rounded-xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            {this.state.info && (
              <p className="text-sm text-neutral-400 mb-4">{this.state.info}</p>
            )}
            <div className="flex gap-3">
              <button
                className="rounded bg-brand-500 px-4 py-2 text-sm font-semibold"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
              <button
                className="rounded border border-white/10 px-4 py-2 text-sm"
                onClick={() => {
                  try { localStorage.removeItem('pb:selectedProfile') } catch {}
                  window.location.reload()
                }}
              >
                Clear Profile & Reload
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
