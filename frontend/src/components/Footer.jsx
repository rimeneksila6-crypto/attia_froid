import { Link } from 'react-router-dom'
import logo from '../assets/logo-pinguin.png'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <img src={logo} alt="Attia Froid" className="w-9 h-9 rounded object-contain mb-3" />
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Solutions de refrigeration haute performance pour les professionnels
            de l'agroalimentaire et de l'hotellerie.
          </p>
        </div>
        <div>
          <p className="font-display font-semibold text-xs tracking-wide text-primary-container mb-3">
            SECTEURS
          </p>
          <ul className="space-y-2 text-xs text-on-surface-variant">
            <li>Cafeteria</li>
            <li>Fast-food</li>
            <li>Boulangerie</li>
            <li>Hotellerie</li>
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-xs tracking-wide text-primary-container mb-3">
            SUPPORT
          </p>
          <ul className="space-y-2 text-xs text-on-surface-variant">
            <li>Support technique</li>
            <li>Pieces detachees</li>
            <li>Garantie</li>
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-xs tracking-wide text-primary-container mb-3">
            CONTACT
          </p>
          <ul className="space-y-2 text-xs text-on-surface-variant font-mono">
            <li>55 836 100</li>
            <li>attia_froid@hotmail.com</li>
            <li>Av Ali Belhouane, Kelibia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[11px] text-on-surface-variant/70">
        <span>(c) {new Date().getFullYear()} Attia Froid, Kelibia, Tunisie.</span>
        <span className="hidden sm:inline">|</span>
        <Link to="/politique-confidentialite" className="hover:text-primary-container transition">
          Politique de confidentialite
        </Link>
        <span className="hidden sm:inline">|</span>
        <Link to="/conditions-utilisation" className="hover:text-primary-container transition">
          Conditions d'utilisation
        </Link>
      </div>
    </footer>
  )
}
