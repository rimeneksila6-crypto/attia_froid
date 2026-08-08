import { useState } from 'react'
// import axios from '../../lib/api' // TODO: brancher sur /api/admin/products?is_new_arrival + toggle

const initialArrivals = [
  { id: 1, name: 'Compresseur AF-500 Pro', ref: 'REF-7729-XC', qty: 14, eta: "14:30 Aujourd'hui", dock: 'Dock 04', isNew: true },
  { id: 2, name: 'Évaporateur Mural 12kW', ref: 'REF-2104-EV', qty: 8, eta: 'Demain, 09:00', dock: 'Dock 01', isNew: false },
  { id: 3, name: 'Module Contrôle Digital v4', ref: 'REF-9092-MD', qty: 45, eta: "16:45 Aujourd'hui", dock: 'Dock 06', isNew: true },
  { id: 4, name: 'Condenseur Bi-Ventilateur', ref: 'REF-4451-CV', qty: 3, eta: '12 Jan, 11:30', dock: 'Dock 02', isNew: false },
]

export default function AdminArrivals() {
  const [arrivals, setArrivals] = useState(initialArrivals)

  const toggleNew = (id) => {
    // TODO: axios.put(`/admin/products/${id}`, { is_new_arrival: !current })
    setArrivals((prev) => prev.map((a) => (a.id === id ? { ...a, isNew: !a.isNew } : a)))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Gestion des Arrivages</h1>
          <p className="text-xs text-on-surface-variant">Flux logistique et mise en avant des nouveautés.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-1.5 text-xs !px-4 !py-2">
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Exporter
          </button>
          <button className="btn-primary flex items-center gap-1.5 text-xs !px-4 !py-2">
            <span className="material-symbols-outlined text-[16px]">add</span>
            Nouvel arrivage
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: 'local_shipping', label: 'Arrivées Prévues', value: '12' },
          { icon: 'schedule', label: "Inbound Aujourd'hui", value: '04' },
          { icon: 'warehouse', label: 'Capacité Stock', value: '84%' },
          { icon: 'emergency_home', label: 'Alertes Qualité', value: '01', color: 'text-error' },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-on-surface-variant">{k.label}</span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant/50">{k.icon}</span>
            </div>
            <p className={`font-display font-extrabold text-2xl ${k.color || ''}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-surface-container-low overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] text-on-surface-variant border-b border-white/10">
              <th className="px-5 py-3 font-medium">Référence / Produit</th>
              <th className="px-5 py-3 font-medium">Quantité</th>
              <th className="px-5 py-3 font-medium">Arrivée</th>
              <th className="px-5 py-3 font-medium">Mise en avant</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {arrivals.map((a) => (
              <tr key={a.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3">
                  <p className="font-medium">{a.name}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant">{a.ref}</p>
                </td>
                <td className="px-5 py-3 font-mono text-xs">{a.qty} unités</td>
                <td className="px-5 py-3 text-xs text-on-surface-variant">{a.eta} · {a.dock}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleNew(a.id)}
                    className={`w-10 h-5 rounded-full relative transition ${a.isNew ? 'bg-primary-container' : 'bg-surface-container'}`}
                  >
                    <span className={`w-4 h-4 rounded-full bg-on-primary-container absolute top-0.5 transition ${a.isNew ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <button className="w-7 h-7 rounded border border-outline-variant flex items-center justify-center hover:border-primary-container transition">
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 text-[11px] text-on-surface-variant">
          <span>AFFICHAGE 1-{arrivals.length} SUR 12 ARRIVAGES</span>
        </div>
      </div>
    </div>
  )
}
