import { useState } from 'react'
// import axios from '../../lib/api' // TODO: brancher sur /api/admin/avis (index, approve, destroy)

const initialPending = [
  { id: 1, name: 'Jean-Marc Dupont', company: 'Industries Agro-Lyon', date: '12 Oct 2023', rating: 5 },
  { id: 2, name: 'Hélène Vasseur', company: 'Traiteur Gourmet Paris', date: '11 Oct 2023', rating: 4 },
]

const initialApproved = [
  { id: 3, name: 'Marc Leroi', rating: 5, comment: null },
  { id: 4, name: 'Sophie Laurent', rating: 5, comment: "Excellent accompagnement lors de l'installation. Équipe très technique." },
  { id: 5, name: 'Thierry Blanc', rating: 4, comment: 'Matériel esthétique et silencieux. Parfait pour une cuisine ouverte.' },
]

export default function AdminReviews() {
  const [pending, setPending] = useState(initialPending)
  const [approved, setApproved] = useState(initialApproved)

  const approve = (r) => {
    // TODO: axios.put(`/admin/avis/${r.id}/approve`)
    setPending((prev) => prev.filter((p) => p.id !== r.id))
    setApproved((prev) => [{ ...r, comment: null }, ...prev])
  }

  const reject = (id) => {
    // TODO: axios.delete(`/admin/avis/${id}`)
    setPending((prev) => prev.filter((p) => p.id !== id))
  }

  const archive = (id) => {
    // TODO: axios.delete(`/admin/avis/${id}`)
    setApproved((prev) => prev.filter((a) => a.id !== id))
  }

  const avg = (approved.reduce((s, a) => s + a.rating, 0) / (approved.length || 1)).toFixed(1)

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display font-bold text-2xl mb-1">Modération des Avis</h1>
      <p className="text-xs text-on-surface-variant mb-8">
        {pending.length} avis en attente de validation.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Performance Globale</p>
          <p className="font-display font-extrabold text-2xl">{avg} <span className="text-xs font-normal text-on-surface-variant">/ 5.0</span></p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Taux d'approbation</p>
          <p className="font-display font-extrabold text-2xl text-success">92%</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Temps de réponse</p>
          <p className="font-display font-extrabold text-2xl text-primary-container">4.2h</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending */}
        <div>
          <h2 className="font-display font-semibold text-sm mb-4">En attente de validation</h2>
          <div className="space-y-3">
            {pending.length === 0 && (
              <p className="text-xs text-on-surface-variant">Aucun avis en attente.</p>
            )}
            {pending.map((r) => (
              <div key={r.id} className="rounded-lg border border-white/10 bg-surface-container-low p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{r.name}</p>
                    <p className="text-[11px] text-on-surface-variant">{r.company} · {r.date}</p>
                  </div>
                  <span className="text-secondary text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => approve(r)}
                    className="flex-1 rounded bg-success/10 text-success text-xs py-1.5 flex items-center justify-center gap-1 hover:bg-success/20 transition"
                  >
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Approuver
                  </button>
                  <button
                    onClick={() => reject(r.id)}
                    className="flex-1 rounded bg-error/10 text-error text-xs py-1.5 flex items-center justify-center gap-1 hover:bg-error/20 transition"
                  >
                    <span className="material-symbols-outlined text-[14px]">cancel</span>
                    Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approved */}
        <div>
          <h2 className="font-display font-semibold text-sm mb-4">Avis publiés</h2>
          <div className="space-y-3">
            {approved.map((r) => (
              <div key={r.id} className="rounded-lg border border-white/10 bg-surface-container-low p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{r.name}</p>
                  <span className="text-secondary text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                {r.comment && (
                  <p className="text-xs text-on-surface-variant italic mb-2">"{r.comment}"</p>
                )}
                <button
                  onClick={() => archive(r.id)}
                  className="text-[11px] text-on-surface-variant hover:text-error transition"
                >
                  Archiver
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
