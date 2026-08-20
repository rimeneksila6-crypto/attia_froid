import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setNotFound(false)
      try {
        const res = await api.get(`/products/${id}`)
        if (cancelled) return
        setProduct(res.data)

        if (res.data.category_id) {
          const relRes = await api.get('/products', {
            params: { category_id: res.data.category_id, per_page: 100 },
          })
          if (cancelled) return
          const others = (relRes.data.data || []).filter((p) => p.id !== res.data.id)
          setRelated(others.slice(0, 3))
        }
      } catch (err) {
        if (!cancelled) setNotFound(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16 text-center text-sm text-on-surface-variant">
        Chargement...
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16 text-center">
        <p className="text-sm text-on-surface-variant mb-4">Produit introuvable.</p>
        <Link to="/catalogue" className="text-primary-container hover:underline text-sm">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  const status = getStockStatus(product)
  const specs = Array.isArray(product.specs) ? product.specs : null

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-10">
      <Link to="/catalogue" className="text-xs text-on-surface-variant hover:text-primary-container transition mb-6 inline-flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Retour au catalogue
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div>
          <div className="rounded-lg border border-white/10 bg-surface-container-low h-80 md:h-96 overflow-hidden">
            <img src={productImage(product)} alt={product.nom} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-xs text-on-surface-variant">Réf: {product.reference}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${stockLabels[status].color}`}>
              {stockLabels[status].label}
            </span>
          </div>
          <p className="text-xs text-primary-container mb-1">{product.category?.nom}</p>
          <h1 className="font-display font-bold text-2xl mb-4">{product.nom}</h1>
          <p className="font-mono text-2xl mb-6">
            {Number(product.prix).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DT{' '}
            <span className="text-xs text-on-surface-variant">HT</span>
          </p>

          <p className="text-sm text-on-surface-variant leading-relaxed mb-8">{product.description}</p>

          <Link
            to="/devis"
            state={{ product: product.reference }}
            className="btn-primary w-full text-center block mb-3"
          >
            Demander un devis pour ce produit
          </Link>
          <a href="tel:55836100" className="btn-secondary w-full text-center block">
            Appeler un conseiller
          </a>

          {/* Specs */}
          {specs && specs.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display font-semibold text-sm mb-4">Spécifications techniques</h2>
              <table className="w-full text-xs">
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label} className="border-b border-white/5">
                      <td className="py-2.5 text-on-surface-variant">{s.label}</td>
                      <td className="py-2.5 text-right font-mono">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-xl mb-6">Produits similaires</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                to={`/catalogue/${p.id}`}
                key={p.id}
                className="rounded-lg border border-white/10 bg-surface-container-low overflow-hidden hover:border-primary-container transition"
              >
                <div className="h-32 bg-surface-container overflow-hidden">
                  <img src={productImage(p)} alt={p.nom} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] text-on-surface-variant mb-1">Réf: {p.reference}</p>
                  <p className="font-display font-semibold text-sm mb-2">{p.nom}</p>
                  <span className="font-mono text-sm">
                    {Number(p.prix).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} DT
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
