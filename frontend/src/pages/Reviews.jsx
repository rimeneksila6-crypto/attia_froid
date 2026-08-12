import { useState, useEffect } from 'react'
import api from '../lib/api'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    setLoading(true)
    try {
      const res = await api.get('/avis')
      setReviews(res.data.data)
    } catch (err) {
      setError('Erreur lors du chargement des avis.')
    } finally {
      setLoading(false)
    }
  }

  const average = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/avis', form)
      setSubmitted(true)
      setForm({ name: '', rating: 5, comment: '' })
    } catch (err) {
      setError("Une erreur est survenue. Merci de reessayer.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-margin-desktop py-14">
      <h1 className="font-display font-bold text-2xl mb-2">Avis Clients</h1>

      <div className="flex items-center gap-3 mb-10">
        <span className="font-display font-extrabold text-3xl">{average}</span>
        <div>
          <div className="text-secondary text-sm">{"\u2605".repeat(Math.round(average))}{"\u2606".repeat(5 - Math.round(average))}</div>
          <p className="text-xs text-on-surface-variant">{reviews.length} avis</p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-on-surface-variant mb-12">Chargement...</p>
      ) : (
        <div className="space-y-4 mb-12">
          {reviews.length === 0 && (
            <p className="text-sm text-on-surface-variant">Aucun avis pour le moment.</p>
          )}
          {reviews.map((r) => (
            <div key={r.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-display font-semibold text-sm">{r.name}</p>
                <span className="text-secondary text-xs">{"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">"{r.comment}"</p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-white/10 bg-surface-container-low p-6">
        <h2 className="font-display font-semibold text-sm mb-4">Laisser un avis</h2>

        {submitted ? (
          <p className="text-sm text-success flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Merci ! Votre avis sera publie apres moderation.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">Nom</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">Note</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setForm({ ...form, rating: n })}
                    className={`text-xl ${n <= form.rating ? "text-secondary" : "text-outline-variant"}`}
                  >
                    {"\u2605"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">Commentaire</label>
              <textarea
                required
                rows={3}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none resize-none"
              />
            </div>
            {error && <p className="text-xs text-error">{error}</p>}
            <button type="submit" className="btn-primary">Publier mon avis</button>
          </form>
        )}
      </div>
    </div>
  )
}
