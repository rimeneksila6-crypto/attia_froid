import { useState } from 'react'
// import axios from '../../lib/api' // TODO: brancher sur GET/PUT /api/admin/settings

export default function AdminSettings() {
  const [form, setForm] = useState({
    phone: '55 836 100',
    email: 'attia_froid@hotmail.com',
    address: 'Av Ali Belhouane, Kélibia, Tunisie',
    hoursWeek: '08:00 - 18:00',
    hoursSat: '08:00 - 13:00',
    hoursSun: 'Fermé',
    instagram: 'instagram.com/froidattia',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    // TODO: axios.put('/admin/settings', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="font-display font-bold text-2xl mb-1">Paramètres</h1>
      <p className="text-xs text-on-surface-variant mb-8">
        Informations affichées sur le site public.
      </p>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-6">
          <h2 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary-container">contact_phone</span>
            Contact & Localisation
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">Téléphone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm font-mono focus:border-primary-container focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">Email professionnel</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1">Adresse (Kélibia)</label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-surface-container-low p-6">
          <h2 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary-container">schedule</span>
            Horaires d'exploitation
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant">Lundi - Vendredi</span>
              <input
                value={form.hoursWeek}
                onChange={(e) => setForm({ ...form, hoursWeek: e.target.value })}
                className="w-40 bg-surface-container border border-outline-variant rounded px-3 py-1.5 text-xs font-mono focus:border-primary-container focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant">Samedi</span>
              <input
                value={form.hoursSat}
                onChange={(e) => setForm({ ...form, hoursSat: e.target.value })}
                className="w-40 bg-surface-container border border-outline-variant rounded px-3 py-1.5 text-xs font-mono focus:border-primary-container focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant">Dimanche</span>
              <input
                value={form.hoursSun}
                onChange={(e) => setForm({ ...form, hoursSun: e.target.value })}
                className="w-40 bg-surface-container border border-outline-variant rounded px-3 py-1.5 text-xs font-mono focus:border-primary-container focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-surface-container-low p-6">
          <h2 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary-container">share</span>
            Présence digitale
          </h2>
          <div>
            <label className="block text-[11px] text-on-surface-variant mb-1">Instagram</label>
            <input
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-sm focus:border-primary-container focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">save</span>
            Enregistrer
          </button>
          {saved && (
            <span className="text-xs text-success flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Paramètres mis à jour
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
