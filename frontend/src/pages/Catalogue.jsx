import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from '../lib/api' // TODO: brancher sur GET /api/products?search=&category=&in_stock=

const allProducts = [
  { ref: 'AF-902-DX', name: 'Congélateur Arctic Double Porte', category: 'Réfrigération', price: '2 450,00', stock: 'disponible' },
  { ref: 'AF-V-400', name: 'Vitrine Panoramique Pâtisserie', category: 'Boulangerie', price: '4 100,00', stock: 'limite' },
  { ref: 'SL-350-H', name: 'Trancheur Gravité Industriel', category: 'Boucherie', price: '1 890,00', stock: 'rupture' },
  { ref: 'AF-CF-M1', name: 'Chambre Froide Modulaire V1', category: 'Hôtellerie', price: '6 200,00', stock: 'disponible' },
  { ref: 'AF-TPB-01', name: 'Titan Professional Brewer', category: 'Cafétéria', price: '8 450,00', stock: 'disponible' },
  { ref: 'AF-CVB-02', name: 'Convotherm Pro-Bake', category: 'Boulangerie', price: '12 900,00', stock: 'limite' },
]

const categories = ['Cafétéria', 'Boulangerie', 'Fast-food', 'Hôtellerie', 'Boucherie', 'Réfrigération']

const stockLabels = {
  disponible: { label: 'EN STOCK', color: 'text-success bg-success/10' },
  limite: { label: 'LIMITÉ', color: 'text-secondary bg-secondary/10' },
  rupture: { label: 'EN RUPTURE', color: 'text-error bg-error/10' },
}

export default function Catalogue() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.ref.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !category || p.category === category
      const matchesStock = !inStockOnly || p.stock === 'disponible' || p.stock === 'limite'
      return matchesSearch && matchesCategory && matchesStock
    })
  }, [search, category, inStockOnly])

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-10">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Catalogue</h1>
          <p className="text-xs text-on-surface-variant">
            <span className="font-mono text-primary-container">{allProducts.length}</span> produits listés
          </p>
        </div>
      </div>

      {/* Recherche avancée */}
      <div className="rounded-lg border border-white/10 bg-surface-container-low p-4 mb-8 flex flex-wrap gap-3 items-center">
        <label className="relative flex-1 min-w-[220px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">
            search
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded pl-9 pr-3 py-2.5 text-xs focus:border-primary-container focus:outline-none"
            placeholder="Nom ou référence produit..."
          />
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-xs focus:border-primary-container focus:outline-none"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer px-1">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-primary-container"
          />
          En stock uniquement
        </label>
      </div>

      {/* Grille produits */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-sm text-on-surface-variant">
          Aucun produit ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link
              to={`/catalogue/${p.ref}`}
              key={p.ref}
              className="rounded-lg border border-white/10 bg-surface-container-low overflow-hidden hover:border-primary-container hover:shadow-frost transition"
            >
              <div className="h-40 bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">
                  ac_unit
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] text-on-surface-variant">Réf: {p.ref}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${stockLabels[p.stock].color}`}>
                    {stockLabels[p.stock].label}
                  </span>
                </div>
                <p className="text-[11px] text-primary-container mb-1">{p.category}</p>
                <p className="font-display font-semibold text-sm mb-2">{p.name}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{p.price} DT</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    {p.stock === 'rupture' ? 'event_busy' : 'add_shopping_cart'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-center text-[11px] text-on-surface-variant mt-8">
        Affichage de {filtered.length} sur {allProducts.length} produits
      </p>
    </div>
  )
}
