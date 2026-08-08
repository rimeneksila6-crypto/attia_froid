import { useState } from 'react'
import { useLocation } from 'react-router-dom'
// import axios from '../lib/api' // TODO: brancher sur POST /api/devis

export default function Quote() {
  const location = useLocation()
  const prefilledProduct = location.state?.product || ''

  const [form, setForm] = useState({
    product: prefilledProduct,
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    quantity: 1,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      // await axios.post('/devis', {
      //   product_id: form.product || null,
      //   company_name: form.companyName,
      //   contact_name: form.contactName,
      //   phone: form.phone,
      //   email: form.email,
      //   quantity: form.quantity,
      //   message: form.message,
      // })
      setSubmitted(true)
    } catch (err) {
      setError("Une erreur est survenue. Merci de réessayer ou de nous appeler directement.")
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <span className="material-symbols-outlined text-5xl text-success mb-4 block">
          check_circle
        </span>
        <h1 className="font-display font-bold text-xl mb-2">Demande envoyée</h1>
        <p className="text-sm text-on-surface-variant">
          Merci, votre demande de devis a bien été transmise. Notre équipe vous
          recontactera sous 24h.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-margin-desktop py-14">
      <span className="badge-mono border border-primary-container/40 text-primary-container">
        DEMANDE DE DEVIS
      </span>
      <h1 className="font-display font-bold text-2xl mt-4 mb-2">
        Parlons de votre projet
      </h1>
      <p className="text-sm text-on-surface-variant mb-8">
        Nos ingénieurs étudient votre besoin et vous répondent sous 24h, sans engagement.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {form.product && (
          <div className="rounded border border-primary-container/30 bg-primary-container/5 px-4 py-3 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary-container">
              inventory_2
            </span>
            Produit sélectionné : <span className="font-mono text-primary-container">{form.product}</span>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-on-surface-variant mb-1">
              Nom de l'entreprise
            </label>
            <input
              value={form.companyName}
              onChange={handleChange('companyName')}
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
              placeholder="Optionnel"
            />
          </div>
          <div>
            <label className="block text-[11px] text-on-surface-variant mb-1">
              Nom du contact *
            </label>
            <input
              required
              value={form.contactName}
              onChange={handleChange('contactName')}
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-on-surface-variant mb-1">
              Téléphone *
            </label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
              placeholder="55 836 100"
            />
          </div>
          <div>
            <label className="block text-[11px] text-on-surface-variant mb-1">
              Email *
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-on-surface-variant mb-1">
            Quantité
          </label>
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange('quantity')}
            className="w-32 bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm font-mono focus:border-primary-container focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-on-surface-variant mb-1">
            Détails de votre projet
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={handleChange('message')}
            className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none resize-none"
            placeholder="Contexte, contraintes techniques, délai souhaité..."
          />
        </div>

        {error && <p className="text-xs text-error">{error}</p>}

        <button type="submit" className="btn-primary w-full">
          Envoyer la demande
        </button>
      </form>
    </div>
  )
}
