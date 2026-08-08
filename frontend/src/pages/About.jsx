const values = [
  { icon: 'precision_manufacturing', title: 'Fabrication sur mesure', desc: "Chaque projet est étudié et fabriqué selon les contraintes réelles du client." },
  { icon: 'workspace_premium', title: 'Qualité et innovation', desc: "Composants durables, technologies récentes, contrôle qualité rigoureux." },
  { icon: 'support_agent', title: 'Accompagnement complet', desc: "De l'étude technique à l'installation et au support après-vente." },
]

export default function About() {
  return (
    <div>
      <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16 text-center">
        <span className="badge-mono border border-primary-container/40 text-primary-container">
          À PROPOS
        </span>
        <h1 className="font-display font-bold text-3xl mt-4 mb-4">
          30 ans d'expertise au service du froid
        </h1>
        <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Attia Froid conçoit et fabrique des équipements de réfrigération
          professionnelle pour les métiers de la cafétéria, du fast-food, de
          la boulangerie et de l'hôtellerie, basée à Kélibia, Tunisie.
        </p>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-lg border border-white/10 bg-surface-container-low p-6">
              <span className="material-symbols-outlined text-3xl text-primary-container mb-4 block">
                {v.icon}
              </span>
              <h3 className="font-display font-semibold text-base mb-2">{v.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-low border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display font-extrabold text-3xl text-primary-container">30 ans</p>
            <p className="text-xs text-on-surface-variant">D'expérience</p>
          </div>
          <div>
            <p className="font-display font-extrabold text-3xl text-primary-container">10k+</p>
            <p className="text-xs text-on-surface-variant">Installations</p>
          </div>
          <div>
            <p className="font-display font-extrabold text-3xl text-primary-container">24/7</p>
            <p className="text-xs text-on-surface-variant">Support technique</p>
          </div>
        </div>
      </section>
    </div>
  )
}
