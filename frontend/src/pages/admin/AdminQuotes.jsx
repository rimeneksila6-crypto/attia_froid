import { useState, useEffect } from "react"
import api from "../../lib/api"

const statusLabels = {
  nouveau: { label: "Nouveau", color: "text-primary-container bg-primary-container/10" },
  traite: { label: "Traite", color: "text-success bg-success/10" },
  archive: { label: "Archive", color: "text-on-surface-variant bg-white/5" },
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchQuotes()
  }, [])

  async function fetchQuotes() {
    setLoading(true)
    setError("")
    try {
      const res = await api.get("/admin/devis")
      const data = res.data.data
      setQuotes(data)
      if (data.length > 0) setSelected(data[0])
    } catch (err) {
      setError("Erreur lors du chargement des devis.")
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id, status) {
    try {
      const res = await api.put(`/admin/devis/${id}`, { status })
      setQuotes((prev) => prev.map((q) => (q.id === id ? res.data : q)))
      if (selected?.id === id) setSelected(res.data)
    } catch (err) {
      alert("Erreur lors de la mise a jour du statut.")
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Gestion des Devis</h1>
          <p className="text-xs text-on-surface-variant">{quotes.length} demandes recues.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-on-surface-variant">Chargement...</p>
      ) : error ? (
        <p className="text-error">{error}</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg border border-white/10 bg-surface-container-low overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] text-on-surface-variant border-b border-white/10">
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-xs text-on-surface-variant">
                      Aucune demande de devis.
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr
                      key={q.id}
                      onClick={() => setSelected(q)}
                      className={`border-b border-white/5 last:border-0 cursor-pointer hover:bg-white/5 ${selected?.id === q.id ? "bg-primary-container/5" : ""}`}
                    >
                      <td className="px-5 py-3">
                        <p className="font-medium">{q.contact_name}</p>
                        <p className="font-mono text-[10px] text-on-surface-variant">{q.company_name || "-"}</p>
                      </td>
                      <td className="px-5 py-3 text-xs text-on-surface-variant">
                        {q.product?.nom || "Non specifie"}
                      </td>
                      <td className="px-5 py-3 text-xs text-on-surface-variant">
                        {new Date(q.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-[11px] px-2 py-1 rounded-full ${statusLabels[q.status]?.color}`}>
                          {statusLabels[q.status]?.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                          visibility
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="rounded-lg border border-white/10 bg-surface-container-low p-6 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-sm">Details de la demande</h2>
                <span className={`text-[11px] px-2 py-1 rounded-full ${statusLabels[selected.status]?.color}`}>
                  {statusLabels[selected.status]?.label}
                </span>
              </div>
              <p className="font-display font-semibold text-base mb-3">{selected.contact_name}</p>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-on-surface-variant mb-0.5">Entreprise</p>
                  <p>{selected.company_name || "-"}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant mb-0.5">Telephone</p>
                  <p>{selected.phone}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant mb-0.5">Email</p>
                  <p>{selected.email}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant mb-0.5">Produit</p>
                  <p>{selected.product?.nom || "Non specifie"} {selected.quantity ? `(x${selected.quantity})` : ""}</p>
                </div>
                {selected.message && (
                  <div>
                    <p className="text-on-surface-variant mb-0.5">Message</p>
                    <p>{selected.message}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => updateStatus(selected.id, "traite")}
                  className="btn-primary flex-1 !px-3 !py-2 text-xs"
                >
                  Marquer traite
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "archive")}
                  className="btn-secondary flex-1 !px-3 !py-2 text-xs"
                >
                  Archiver
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
