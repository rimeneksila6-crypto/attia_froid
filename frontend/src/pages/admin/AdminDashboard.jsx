// TODO: remplacer les données factices par des appels à l'API Laravel
// (GET /api/admin/products/count, GET /api/admin/devis, GET /api/admin/avis, etc.)

const kpis = [
  {
    icon: 'kitchen',
    label: 'Total Produits',
    value: '1 248',
    trend: '+12%',
    trendColor: 'text-success',
  },
  {
    icon: 'assignment_late',
    label: 'Nouveaux Devis',
    value: '42',
    trend: 'Urgent',
    trendColor: 'text-error',
    sub: 'Délai moyen : 4h 12m',
  },
  {
    icon: 'feedback',
    label: 'Avis en attente',
    value: '18',
    trend: "Aujourd'hui",
    trendColor: 'text-secondary',
  },
  {
    icon: 'local_shipping',
    label: 'Nouveaux Arrivages',
    value: '5',
    trend: 'Arrivée',
    trendColor: 'text-primary-container',
    sub: 'Prévu pour : 14:00',
  },
]

const activity = [
  {
    icon: 'description',
    iconColor: 'text-primary-container',
    title: 'Nouveau Devis #DE-4092',
    detail: 'Hôtel Regency Hammamet · Équipement Cuisine Industrielle',
    meta: '4 250,00 €',
    time: 'Il y a 14 min',
  },
  {
    icon: 'grade',
    iconColor: 'text-secondary',
    title: 'Avis Client à Modérer',
    detail: 'M. Ahmed K. · "Installation rapide et efficace"',
    time: 'Il y a 1h',
    actions: true,
  },
  {
    icon: 'update',
    iconColor: 'text-on-surface-variant',
    title: 'Mise à jour Inventaire',
    detail: 'Réfrigérateur Triple Porte Modèle X-200 · +5 unités',
    time: 'Il y a 2h',
  },
]

const systemStatus = [
  { label: 'Base de données', value: 'OPÉRATIONNEL', color: 'text-success' },
  { label: 'Serveur de Devis', value: '12ms LATENCE', color: 'text-primary-container' },
  { label: 'Stockage Cloud', value: '82% UTILISÉ', color: 'text-secondary' },
]

const shortcuts = [
  { icon: 'coffee', label: 'Cafétéria' },
  { icon: 'bakery_dining', label: 'Boulangerie' },
  { icon: 'restaurant', label: 'Hospitalité' },
  { icon: 'hotel', label: 'Hôtellerie' },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Console d'Administration</h1>
          <p className="text-xs text-on-surface-variant">
            Bienvenue sur l'interface de contrôle technique Attia Froid.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-1.5 text-xs !px-4 !py-2">
            <span className="material-symbols-outlined text-[16px]">rate_review</span>
            Modérer Avis
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-white/10 bg-surface-container-low p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-on-surface-variant">{k.label}</span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant/50">
                {k.icon}
              </span>
            </div>
            <p className="font-display font-extrabold text-2xl mb-1">{k.value}</p>
            <p className={`text-[11px] ${k.trendColor}`}>{k.trend}</p>
            {k.sub && <p className="text-[10px] text-on-surface-variant/70 mt-0.5">{k.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-sm">Flux d'activité récent</h2>
            <span className="text-[11px] text-primary-container cursor-pointer hover:underline">
              Voir tout
            </span>
          </div>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <span className={`material-symbols-outlined text-[20px] ${a.iconColor} mt-0.5`}>
                  {a.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-on-surface-variant truncate">{a.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  {a.meta && (
                    <p className="font-mono text-xs text-primary-container">{a.meta}</p>
                  )}
                  {a.actions ? (
                    <div className="flex gap-1 mt-1">
                      <button className="w-6 h-6 rounded bg-success/10 text-success flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </button>
                      <button className="w-6 h-6 rounded bg-error/10 text-error flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-[10px] text-on-surface-variant/70">{a.time}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <label className="relative block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">
                search
              </span>
              <input
                className="w-full bg-surface-container border border-outline-variant rounded pl-9 pr-3 py-2.5 text-xs focus:border-primary-container focus:outline-none"
                placeholder="Référence produit, client..."
              />
            </label>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <h3 className="font-display font-semibold text-xs mb-4">État du Système</h3>
            <div className="space-y-3">
              {systemStatus.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">{s.label}</span>
                  <span className={`font-mono ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <h3 className="font-display font-semibold text-xs mb-4">Raccourcis Secteurs</h3>
            <div className="grid grid-cols-2 gap-2">
              {shortcuts.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 rounded border border-white/10 px-2.5 py-2 text-[11px] text-on-surface-variant hover:border-primary-container hover:text-primary-container transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
