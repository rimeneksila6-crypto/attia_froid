export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="w-9 h-9 rounded bg-primary-container flex items-center justify-center font-display font-extrabold text-on-primary-container text-sm mb-3">
            AF
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Solutions de réfrigération haute performance pour les professionnels
            de l'agroalimentaire et de l'hôtellerie.
          </p>
        </div>
        <div>
          <p className="font-display font-semibold text-xs tracking-wide text-primary-container mb-3">
            SECTEURS
          </p>
          <ul className="space-y-2 text-xs text-on-surface-variant">
            <li>Cafétéria</li>
            <li>Fast-food</li>
            <li>Boulangerie</li>
            <li>Hôtellerie</li>
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-xs tracking-wide text-primary-container mb-3">
            SUPPORT
          </p>
          <ul className="space-y-2 text-xs text-on-surface-variant">
            <li>Support technique</li>
            <li>Pièces détachées</li>
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
            <li>Av Ali Belhouane, Kélibia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11px] text-on-surface-variant/70">
        © {new Date().getFullYear()} Attia Froid, Kélibia, Tunisie.
      </div>
    </footer>
  )
}
