import { NavLink } from 'react-router-dom'

const items = [
  { to: '/admin', label: 'Tableau de bord', icon: 'dashboard', end: true },
  { to: '/admin/produits', label: 'Produits', icon: 'inventory_2' },
  { to: '/admin/arrivages', label: 'Arrivages', icon: 'local_shipping' },
  { to: '/admin/devis', label: 'Devis', icon: 'request_quote' },
  { to: '/admin/avis', label: 'Avis clients', icon: 'reviews' },
  { to: '/admin/parametres', label: 'Paramètres', icon: 'settings' },
]

export default function AdminSidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-surface-container-lowest min-h-screen hidden md:block">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center font-display font-extrabold text-on-primary-container text-xs">
          AF
        </div>
        <span className="font-display font-semibold text-sm">Admin</span>
      </div>
      <nav className="px-3 space-y-1">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition ${
                isActive
                  ? 'bg-primary-container/10 text-primary-container'
                  : 'text-on-surface-variant hover:bg-white/5'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px]">{i.icon}</span>
            {i.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
