import { Link } from 'react-router-dom'
import ShowroomGallery from '../components/ShowroomGallery'

const sectors = [
  { icon: 'coffee', title: 'Cafétéria', desc: "Comptoirs réfrigérés et vitrines d'exposition haute visibilité." },
  { icon: 'fastfood', title: 'Fast-food', desc: 'Stockage intensif et accès rapide pour flux tendus.' },
  { icon: 'bakery_dining', title: 'Boulangerie', desc: "Contrôle précis de l'hygrométrie et du froid positif." },
  { icon: 'hotel', title: 'Hôtellerie', desc: 'Solutions intégrées pour cuisines centrales et buffets.' },
]

const featured = [
  { ref: 'AF-900X', name: 'Armoire Positive Inox', price: '2 400,00 € HT', status: 'Disponible en stock', statusColor: 'text-success' },
  { ref: 'AF-GLASS-V', name: 'Vitrine Murale Ventilée', price: '3 150,00 € HT', status: 'Stock limité', statusColor: 'text-secondary' },
  { ref: 'AF-CUSTOM', name: 'Chambre Froide Modulaire', price: 'Sur devis uniquement', status: 'Fabrication sur mesure', statusColor: 'text-primary-container' },
  { ref: 'AF-POWER-X', name: 'Groupe Frigorifique Extérieur', price: '1 890,00 € HT', status: 'Disponible en stock', statusColor: 'text-success' },
]

const testimonials = [
  { name: 'Jean Dupont', role: 'Directeur, Grand Hôtel', quote: 'Une excellence technique constante. Installation propre, mise en service rapide.' },
  { name: 'Marie Lambert', role: 'Chef, Le Gourmet', quote: 'Un accompagnement technique irréprochable de projet, jusqu\'à la mise en service.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop pt-16 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge-mono border border-primary-container/40 text-primary-container">
            EXCELLENCE TECHNIQUE
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight mt-4 mb-4">
            Fabrication <span className="text-primary-container">sur Mesure</span>
          </h1>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-md mb-8">
            Conception et fabrication de systèmes de réfrigération haute
            performance, adaptés aux besoins les plus exigeants.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/catalogue" className="btn-primary">Voir le catalogue</Link>
            <Link to="/devis" className="btn-secondary">Demander un devis</Link>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-surface-container-low h-72 md:h-96 flex items-center justify-center">
          <span className="material-symbols-outlined text-8xl text-on-surface-variant/20">
            kitchen
          </span>
          <div className="absolute bottom-4 left-4 glass rounded px-4 py-2">
            <p className="badge-mono text-primary-container">UNITÉ SÉRIE-K</p>
            <p className="text-sm font-display font-semibold">Performance Arctique</p>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12">
        <p className="badge-mono text-primary-container mb-2">EXPERTISE SECTORIELLE</p>
        <h2 className="font-display font-bold text-2xl mb-8">Solutions par métier</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((s) => (
            <div
              key={s.title}
              className="rounded-lg border border-white/10 bg-surface-container-low p-6 hover:border-primary-container transition group"
            >
              <span className="material-symbols-outlined text-3xl text-primary-container mb-4 block">
                {s.icon}
              </span>
              <h3 className="font-display font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{s.desc}</p>
              <Link
                to="/catalogue"
                className="text-[11px] font-display font-semibold tracking-wide text-primary-container group-hover:underline"
              >
                DÉCOUVRIR →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-2xl">Équipements Phares</h2>
          <Link to="/catalogue" className="text-xs text-primary-container hover:underline">
            Voir tout le catalogue
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p) => (
            <Link
              to="/catalogue"
              key={p.ref}
              className="rounded-lg border border-white/10 bg-surface-container-low overflow-hidden hover:border-primary-container hover:shadow-frost transition"
            >
              <div className="h-32 bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/20">
                  ac_unit
                </span>
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] text-on-surface-variant mb-1">RÉF: {p.ref}</p>
                <p className="font-display font-semibold text-sm mb-1">{p.name}</p>
                <p className="font-mono text-sm text-primary-container mb-2">{p.price}</p>
                <p className={`text-[11px] ${p.statusColor}`}>● {p.status}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats & trust */}
      <section className="bg-surface-container-low border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display font-bold text-2xl mb-6">
              30 ans d'expertise au service du froid.
            </h2>
            <div className="flex gap-10">
              <div>
                <p className="font-display font-extrabold text-3xl text-primary-container">10k+</p>
                <p className="text-xs text-on-surface-variant">Installations</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-3xl text-primary-container">24/7</p>
                <p className="text-xs text-on-surface-variant">Support technique</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="badge-mono border border-outline-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span> CERTIFIÉ ISO 9001
            </span>
            <span className="badge-mono border border-outline-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">precision_manufacturing</span> FABRICATION LOCALE
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12">
        <h2 className="font-display font-bold text-2xl mb-8">Ils nous font confiance</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-lg border border-white/10 bg-surface-container-low p-6">
              <div className="text-secondary text-sm mb-3">★★★★★</div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">"{t.quote}"</p>
              <p className="font-display font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-on-surface-variant">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showroom */}
      <ShowroomGallery />
      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16">
        <div className="rounded-lg glass p-10 text-center">
          <h2 className="font-display font-bold text-2xl mb-3">
            Prêt à optimiser votre chaîne du froid ?
          </h2>
          <p className="text-sm text-on-surface-variant mb-6 max-w-md mx-auto">
            Nos ingénieurs sont à votre disposition pour une étude personnalisée.
          </p>
          <Link to="/devis" className="btn-primary">Contacter un expert</Link>
        </div>
      </section>
    </div>
  )
}



