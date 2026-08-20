import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../assets/logo-pinguin.png'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/a-propos', label: 'Secteurs' },
  { to: '/contact', label: 'Contact' },
  { to: '/avis', label: 'Avis' },
]
export default function Navbar() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-margin-desktop py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Attia Froid" className="w-9 h-9 rounded object-contain" />
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
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            className="md:hidden w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary-container transition"
          >
            <span className="material-symbols-outlined text-[20px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile plein ecran */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-surface px-4 py-6">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-3 rounded text-base ${
                    isActive
                      ? 'text-primary-container bg-primary-container/10'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/devis"
              onClick={() => setMenuOpen(false)}
              className="btn-primary text-center mt-3 sm:hidden"
            >
              Devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
