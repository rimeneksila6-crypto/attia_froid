import { useState, useEffect } from 'react'

export default function AdminTopbar() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-surface-container-lowest">
      <div className="flex items-center gap-6 text-xs text-on-surface-variant">
        <span className="text-primary-container font-display font-semibold">TABLEAU DE BORD</span>
        <span className="hidden sm:inline">ANALYSES</span>
        <span className="hidden sm:inline">LOGS</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Basculer le mode sombre"
          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary-container transition"
        >
          <span className="material-symbols-outlined text-[16px]">
            {dark ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
        <button
          aria-label="Notifications"
          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary-container transition"
        >
          <span className="material-symbols-outlined text-[16px]">notifications</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-[11px] font-display font-semibold">
          AD
        </div>
      </div>
    </header>
  )
}
