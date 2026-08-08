import { useState } from 'react'
// import axios from '../lib/api' // TODO: brancher sur GET /api/avis et POST /api/avis

const initialReviews = [
  { id: 1, name: 'Jean Dupont', role: 'Directeur, Grand Hôtel', rating: 5, comment: "Une excellence technique constante. Installation propre, mise en service rapide." },
  { id: 2, name: 'Marie Lambert', role: 'Chef, Le Gourmet', rating: 5, comment: "Un accompagnement irréprochable de projet, jusqu'à la mise en service." },
  { id: 3, name: 'Ahmed K.', role: 'Hôtel Regency Hammamet', rating: 4, comment: "Installation rapide et efficace, quelques ajustements mineurs en post-livraison." },
]

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [submitted, setSubmitted] = useState(false)

  const average = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // await axios.post('/avis', form) // passera en attente de modération côté admin
    setSubmitted(true)
    setForm({ name: '', rating: 5, comment: '' })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-margin-desktop py-14">
      <h1 className="font-display font-bold text-2xl mb-2">Avis Clients</h1>

      <div className="flex items-center gap-3 mb-10">
        <span className="font-display font-extrabold text-3xl">{average}</span>
        <div>
          <div className="text-secondary text-sm">{'★'.repeat(Math.round(average))}{'☆'.repeat(5 - Math.round(average))}</div>
          <p className="text-xs text-on-surface-variant">{reviews.length} avis</p>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-sm">{r.name}</p>
              <span className="text-secondary text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mb-2">{r.role}</p>
            <p className="text-sm text-on-surface-variant leading-relaxed">"{r.comment}"</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-surface-container-low p-6">
        <h2 className="font-display font-semibold text-sm mb-4">Laisser un avis</h2>

        {submitted ? (
          <p className="text-sm text-success flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Merci ! Votre avis sera publié après modération.
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
                    className={`text-xl ${n <= form.rating ? 'text-secondary' : 'text-outline-variant'}`}
                  >
                    ★
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
            <button type="submit" className="btn-primary">Publier mon avis</button>
          </form>
        )}
      </div>
    </div>
  )
}
