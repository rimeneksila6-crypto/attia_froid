import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../lib/api'

const stockLabels = {
  disponible: { label: 'EN STOCK', color: 'text-success bg-success/10' },
  limite: { label: 'LIMITÉ', color: 'text-secondary bg-secondary/10' },
  rupture: { label: 'EN RUPTURE', color: 'text-error bg-error/10' },
}

function getStockStatus(product) {
  if (!product.en_stock) return 'rupture'
  if (product.stock !== null && product.stock !== undefined && product.stock <= 3) return 'limite'
  return 'disponible'
}

function productImage(product) {
  return `/ProductsImages/${product.reference}.jfif`
}

export default function Catalogue() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products', { params: { per_page: 100 } }),
          api.get('/categories'),
        ])
        setProducts(productsRes.data.data || [])
        setCategories(categoriesRes.data || [])
      } catch (err) {
        setError('Impossible de charger le catalogue pour le moment.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const suggestions = useMemo(() => {
    if (!search) return []
    const q = search.toLowerCase()
    return products
      .filter((p) => p.nom.toLowerCase().includes(q) || p.reference.toLowerCase().includes(q))
      .slice(0, 6)
  }, [search, products])

  const goToProduct = (id) => {
    setShowSuggestions(false)
    setSearch('')
    navigate(`/catalogue/${id}`)
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.nom.toLowerCase().includes(search.toLowerCase()) ||
        p.reference.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !category || String(p.category_id) === String(category)
      const status = getStockStatus(p)
      const matchesStock = !inStockOnly || status === 'disponible' || status === 'limite'
      return matchesSearch && matchesCategory && matchesStock
    })
  }, [search, category, inStockOnly, products])

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16 text-center text-sm text-on-surface-variant">
        Chargement du catalogue...
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16 text-center text-sm text-error">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-10">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Catalogue</h1>
          <p className="text-xs text-on-surface-variant">
            <span className="font-mono text-primary-container">{products.length}</span> produits listés
          </p>
        </div>
      </div>

      {/* Recherche avancée */}
      <div className="relative rounded-lg border border-white/10 bg-surface-container-low p-4 mb-8 flex flex-wrap gap-3 items-center">
        <label className="relative flex-1 min-w-[220px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">
            search
          </span>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true) }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full bg-surface-container border border-outline-variant rounded pl-9 pr-3 py-2.5 text-xs focus:border-primary-container focus:outline-none"
            placeholder="Nom ou référence produit..."
          />
        </label>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-20 rounded-lg border border-white/10 bg-surface-container-low shadow-lg overflow-hidden">
            {suggestions.map((p) => (
              <button
                key={p.id}
                onClick={() => goToProduct(p.id)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-xs hover:bg-surface-container transition"
              >
                <span>
                  <span className="font-display font-medium">{p.nom}</span>
                  <span className="text-on-surface-variant ml-2 font-mono text-[10px]">{p.reference}</span>
                </span>
                <span className="font-mono text-primary-container">
                  {Number(p.prix).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DT
                </span>
              </button>
            ))}
          </div>
        )}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-surface-container border border-outline-variant rounded px-3 py-2.5 text-xs focus:border-primary-container focus:outline-none"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.nom}</option>
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
          {filtered.map((p) => {
            const status = getStockStatus(p)
            return (
              <Link
                to={`/catalogue/${p.id}`}
                key={p.id}
                className="rounded-lg border border-white/10 bg-surface-container-low overflow-hidden hover:border-primary-container hover:shadow-frost transition"
              >
                <div className="h-40 bg-surface-container overflow-hidden">
                  <img src={productImage(p)} alt={p.nom} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-[10px] text-on-surface-variant">Réf: {p.reference}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${stockLabels[status].color}`}>
                      {stockLabels[status].label}
                    </span>
                  </div>
                  <p className="text-[11px] text-primary-container mb-1">{p.category?.nom}</p>
                  <p className="font-display font-semibold text-sm mb-2">{p.nom}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">
                      {Number(p.prix).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DT
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      {status === 'rupture' ? 'event_busy' : 'add_shopping_cart'}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <p className="text-center text-[11px] text-on-surface-variant mt-8">
        Affichage de {filtered.length} sur {products.length} produits
      </p>
    </div>
  )
}
