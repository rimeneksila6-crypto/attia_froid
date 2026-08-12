import { useState, useEffect } from "react"
import api from "../../lib/api"

export default function AdminReviews() {
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    setLoading(true)
    setError("")
    try {
      const res = await api.get("/admin/avis")
      const data = res.data.data
      setPending(data.filter((r) => !r.is_approved))
      setApproved(data.filter((r) => r.is_approved))
    } catch (err) {
      setError("Erreur lors du chargement des avis.")
    } finally {
      setLoading(false)
    }
  }

  async function approve(r) {
    try {
      await api.put(`/admin/avis/${r.id}/approve`)
      setPending((prev) => prev.filter((p) => p.id !== r.id))
      setApproved((prev) => [{ ...r, is_approved: true }, ...prev])
    } catch (err) {
      alert("Erreur lors de l'approbation.")
    }
  }

  async function reject(id) {
    try {
      await api.delete(`/admin/avis/${id}`)
      setPending((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert("Erreur lors du rejet.")
    }
  }

  async function archive(id) {
    try {
      await api.delete(`/admin/avis/${id}`)
      setApproved((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      alert("Erreur lors de l'archivage.")
    }
  }

  const avg = (approved.reduce((s, a) => s + a.rating, 0) / (approved.length || 1)).toFixed(1)
  const total = pending.length + approved.length
  const approvalRate = total ? Math.round((approved.length / total) * 100) : 0

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display font-bold text-2xl mb-1">Moderation des Avis</h1>
      <p className="text-xs text-on-surface-variant mb-8">
        {pending.length} avis en attente de validation.
      </p>

      {error && <p className="text-error text-xs mb-4">{error}</p>}

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Performance Globale</p>
          <p className="font-display font-extrabold text-2xl">{avg} <span className="text-xs font-normal text-on-surface-variant">/ 5.0</span></p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Taux d'approbation</p>
          <p className="font-display font-extrabold text-2xl text-success">{approvalRate}%</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Total avis</p>
          <p className="font-display font-extrabold text-2xl text-primary-container">{total}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-on-surface-variant">Chargement...</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
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
                      <p className="text-[11px] text-on-surface-variant">{new Date(r.created_at).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <span className="text-secondary text-xs">{"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant italic mb-3">"{r.comment}"</p>
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

          <div>
            <h2 className="font-display font-semibold text-sm mb-4">Avis publies</h2>
            <div className="space-y-3">
              {approved.length === 0 && (
                <p className="text-xs text-on-surface-variant">Aucun avis publie.</p>
              )}
              {approved.map((r) => (
                <div key={r.id} className="rounded-lg border border-white/10 bg-surface-container-low p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{r.name}</p>
                    <span className="text-secondary text-xs">{"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}</span>
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
      )}
    </div>
  )
}
