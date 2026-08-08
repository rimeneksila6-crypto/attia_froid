import { useState } from 'react'
// import axios from '../../lib/api' // TODO: brancher sur /api/admin/products (index, store, update, destroy)

const initialProducts = [
  { id: 1, name: 'Armoire Positive Inox', ref: 'AF-902-DK', category: 'Réfrigération', price: '2 400,00', stock: 'disponible' },
  { id: 2, name: 'Congélateur Coffre Pro', ref: 'AF-CF500-XT', category: 'Congélation', price: '3 150,00', stock: 'limite' },
  { id: 3, name: 'Vitrine Réfrigérée Panoramique', ref: 'AF-VRP-120', category: 'Exposition', price: '4 800,00', stock: 'rupture' },
  { id: 4, name: 'Table de Préparation Froid', ref: 'AF-TP-3D', category: 'Préparation', price: '1 620,00', stock: 'disponible' },
]

const stockLabels = {
  disponible: { label: 'En stock', color: 'text-success bg-success/10' },
  limite: { label: 'Limité', color: 'text-secondary bg-secondary/10' },
  rupture: { label: 'Rupture', color: 'text-error bg-error/10' },
  sur_commande: { label: 'Sur commande', color: 'text-primary-container bg-primary-container/10' },
}

const emptyForm = { name: '', ref: '', category: '', price: '', stock: 'disponible' }

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ref.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (p) => {
    setEditing(p.id)
    setForm(p)
    setModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editing) {
      // TODO: axios.put(`/admin/products/${editing}`, form)
      setProducts((prev) => prev.map((p) => (p.id === editing ? { ...form, id: editing } : p)))
    } else {
      // TODO: axios.post('/admin/products', form)
      setProducts((prev) => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => {
    // TODO: axios.delete(`/admin/products/${id}`)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Gestion des Produits</h1>
          <p className="text-xs text-on-surface-variant">
            {products.length} produits référencés dans le catalogue.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-1.5 text-xs !px-4 !py-2">
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          Ajouter un produit
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Total Produits</p>
          <p className="font-display font-extrabold text-2xl">{products.length}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Stock Faible</p>
          <p className="font-display font-extrabold text-2xl text-secondary">
            {products.filter((p) => p.stock === 'limite' || p.stock === 'rupture').length}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <p className="text-xs text-on-surface-variant mb-1">Statut Système</p>
          <p className="font-display font-extrabold text-2xl text-success">OPTIMAL</p>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <label className="relative flex-1 min-w-[240px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">
            search
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded pl-9 pr-3 py-2.5 text-xs focus:border-primary-container focus:outline-none"
            placeholder="Rechercher par nom ou référence..."
          />
        </label>
        <button className="border border-outline-variant rounded px-3 py-2 text-xs flex items-center gap-1.5 text-on-surface-variant hover:border-primary-container transition">
          <span className="material-symbols-outlined text-[16px]">filter_list</span>
          Filtres
        </button>
        <button className="border border-outline-variant rounded px-3 py-2 text-xs flex items-center gap-1.5 text-on-surface-variant hover:border-primary-container transition">
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          Exporter
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-white/10 bg-surface-container-low overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] text-on-surface-variant border-b border-white/10">
              <th className="px-5 py-3 font-medium">Nom & Réf</th>
              <th className="px-5 py-3 font-medium">Catégorie</th>
              <th className="px-5 py-3 font-medium">Prix</th>
              <th className="px-5 py-3 font-medium">Statut Stock</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant">{p.ref}</p>
                </td>
                <td className="px-5 py-3 text-on-surface-variant">{p.category}</td>
                <td className="px-5 py-3 font-mono text-xs">{p.price} DT</td>
                <td className="px-5 py-3">
                  <span className={`text-[11px] px-2 py-1 rounded-full ${stockLabels[p.stock]?.color}`}>
                    {stockLabels[p.stock]?.label}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      aria-label="Modifier"
                      className="w-7 h-7 rounded border border-outline-variant flex items-center justify-center hover:border-primary-container transition"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      aria-label="Supprimer"
                      className="w-7 h-7 rounded border border-outline-variant flex items-center justify-center hover:border-error hover:text-error transition"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-xs text-on-surface-variant">
                  Aucun produit ne correspond à la recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 text-[11px] text-on-surface-variant">
          <span>AFFICHAGE 1-{filtered.length} SUR {products.length} PRODUITS</span>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px]">chevron_left</span>
            </button>
            <button className="w-7 h-7 rounded border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add / edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-lg border border-white/10 bg-surface-container-low p-6">
            <h2 className="font-display font-bold text-lg mb-4">
              {editing ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-[11px] text-on-surface-variant mb-1">Nom</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-container focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-on-surface-variant mb-1">Référence</label>
                  <input
                    required
                    value={form.ref}
                    onChange={(e) => setForm({ ...form, ref: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-sm font-mono focus:border-primary-container focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-on-surface-variant mb-1">Catégorie</label>
                  <input
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-container focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-on-surface-variant mb-1">Prix (DT)</label>
                  <input
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-sm font-mono focus:border-primary-container focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-on-surface-variant mb-1">Stock</label>
                  <select
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-container focus:outline-none"
                  >
                    <option value="disponible">En stock</option>
                    <option value="limite">Limité</option>
                    <option value="rupture">Rupture</option>
                    <option value="sur_commande">Sur commande</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary !px-4 !py-2 text-xs">
                  Annuler
                </button>
                <button type="submit" className="btn-primary !px-4 !py-2 text-xs">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
