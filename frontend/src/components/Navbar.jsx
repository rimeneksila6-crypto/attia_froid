import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/a-propos', label: 'Secteurs' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-margin-desktop py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded bg-primary-container flex items-center justify-center font-display font-extrabold text-on-primary-container text-sm">
            AF
          </div>
          <span className="font-display font-extrabold tracking-wide text-sm md:text-base">
            ATTIA <span className="text-primary-container">FROID</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-on-surface-variant">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? 'text-primary-container' : 'hover:text-on-surface transition'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Basculer le mode sombre"
            className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary-container transition"
          >
            <span className="material-symbols-outlined text-[18px]">
              {dark ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
          <Link to="/devis" className="btn-primary hidden sm:inline-block">
            Devis
          </Link>
        </div>
      </div>
    </header>
  )
}
