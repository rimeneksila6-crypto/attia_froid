import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: brancher sur POST /api/contact (ou réutiliser /api/devis sans produit)
    setSent(true)
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-14">
      <h1 className="font-display font-bold text-2xl mb-2">Contact & Localisation</h1>
      <p className="text-sm text-on-surface-variant mb-10">
        Une question, un projet ? Notre équipe vous répond rapidement.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Map + info */}
        <div>
          <div className="rounded-lg border border-white/10 overflow-hidden mb-4 h-72">
            <iframe
              title="Localisation Attia Froid"
              className="w-full h-full grayscale invert-[0.9] contrast-[0.9]"
              loading="lazy"
              src="https://www.google.com/maps?q=Av+Ali+Belhouane,+K%C3%A9libia,+Tunisia&output=embed"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary-container text-[18px]">location_on</span>
              Av Ali Belhouane, Kélibia, Tunisie
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary-container text-[18px]">call</span>
              <a href="tel:55836100" className="hover:text-primary-container">55 836 100</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary-container text-[18px]">mail</span>
              <a href="mailto:attia_froid@hotmail.com" className="hover:text-primary-container">
                attia_froid@hotmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary-container text-[18px]">schedule</span>
              Lun–Sam, 8h–18h
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-6">
          {sent ? (
            <p className="text-sm text-success flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Message envoyé, nous revenons vers vous rapidement.
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
                <label className="block text-[11px] text-on-surface-variant mb-1">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-on-surface-variant mb-1">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full">Envoyer</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
