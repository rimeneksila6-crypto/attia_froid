import { useState } from 'react'
// import axios from '../../lib/api' // TODO: brancher sur /api/admin/devis (GET, PUT status)

const initialQuotes = [
  { id: 1, client: 'Hôtel Regency', ref: 'RF-2024-001', products: ['Chambre Froide Pro v2', 'Compresseur X-400'], date: '24 Oct 2023', status: 'nouveau', contact: 'Jean Dupont — Direction Technique', location: 'Nice, France', budget: '15 400,00 €', deadline: 'Immédiat (sous 15 jours)' },
  { id: 2, client: 'Le Gourmet Palace', ref: 'RF-2024-042', products: ['Vitrine Réfrigérée Design'], date: '22 Oct 2023', status: 'traite', contact: 'Sophie Martin — Achats', location: 'Tunis, Tunisie', budget: '6 200,00 €', deadline: '1 mois' },
  { id: 3, client: 'Logistique Nord', ref: 'RF-2023-998', products: ['Système Split Industriel'], date: '15 Oct 2023', status: 'archive', contact: 'Karim B. — Logistique', location: 'Sfax, Tunisie', budget: '9 800,00 €', deadline: 'Flexible' },
]

const statusLabels = {
  nouveau: { label: 'Nouveau', color: 'text-primary-container bg-primary-container/10' },
  traite: { label: 'Traité', color: 'text-success bg-success/10' },
  archive: { label: 'Archivé', color: 'text-on-surface-variant bg-white/5' },
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [selected, setSelected] = useState(initialQuotes[0])

  const updateStatus = (id, status) => {
    // TODO: axios.put(`/admin/devis/${id}`, { status })
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)))
    if (selected?.id === id) setSelected((s) => ({ ...s, status }))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Gestion des Devis</h1>
          <p className="text-xs text-on-surface-variant">{quotes.length} demandes reçues.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border border-white/10 bg-surface-container-low overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] text-on-surface-variant border-b border-white/10">
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Produits</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => setSelected(q)}
                  className={`border-b border-white/5 last:border-0 cursor-pointer hover:bg-white/5 ${selected?.id === q.id ? 'bg-primary-container/5' : ''}`}
                >
                  <td className="px-5 py-3">
                    <p className="font-medium">{q.client}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">REF: {q.ref}</p>
                  </td>
                  <td className="px-5 py-3 text-xs text-on-surface-variant">{q.products.join(', ')}</td>
                  <td className="px-5 py-3 text-xs text-on-surface-variant">{q.date}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] px-2 py-1 rounded-full ${statusLabels[q.status].color}`}>
                      {statusLabels[q.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                      visibility
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="rounded-lg border border-white/10 bg-surface-container-low p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-sm">Détails de la demande</h2>
              <span className={`text-[11px] px-2 py-1 rounded-full ${statusLabels[selected.status].color}`}>
                {statusLabels[selected.status].label}
              </span>
            </div>
            <p className="font-display font-semibold text-base mb-3">{selected.client}</p>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-on-surface-variant mb-0.5">Contact</p>
                <p>{selected.contact}</p>
              </div>
              <div>
                <p className="text-on-surface-variant mb-0.5">Localisation</p>
                <p>{selected.location}</p>
              </div>
              <div>
                <p className="text-on-surface-variant mb-0.5">Budget estimé</p>
                <p className="font-mono">{selected.budget}</p>
              </div>
              <div>
                <p className="text-on-surface-variant mb-0.5">Échéance</p>
                <p>{selected.deadline}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => updateStatus(selected.id, 'traite')}
                className="btn-primary flex-1 !px-3 !py-2 text-xs"
              >
                Marquer traité
              </button>
              <button
                onClick={() => updateStatus(selected.id, 'archive')}
                className="btn-secondary flex-1 !px-3 !py-2 text-xs"
              >
                Archiver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
