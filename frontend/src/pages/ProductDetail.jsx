import { useParams, Link } from 'react-router-dom'
// import axios from '../lib/api' // TODO: brancher sur GET /api/products/{ref}

// Même jeu de données que Catalogue.jsx pour l'instant — à remplacer par l'API
const allProducts = [
  {
    ref: 'AF-902-DX', name: 'Congélateur Arctic Double Porte', category: 'Réfrigération',
    price: '2 450,00', stock: 'disponible',
    description: "Congélateur professionnel double porte, conçu pour un usage intensif en cuisine industrielle. Isolation renforcée et régulation électronique précise.",
    specs: [
      { label: 'Dimensions', value: '140 x 80 x 200 cm' },
      { label: 'Capacité', value: '1 200 L' },
      { label: 'Plage de température', value: '-18°C à -22°C' },
      { label: 'Alimentation', value: '220V / 50Hz' },
      { label: 'Classe énergétique', value: 'A+' },
    ],
  },
  {
    ref: 'AF-V-400', name: 'Vitrine Panoramique Pâtisserie', category: 'Boulangerie',
    price: '4 100,00', stock: 'limite',
    description: "Vitrine réfrigérée panoramique pensée pour la mise en valeur des produits de pâtisserie, avec éclairage LED intégré.",
    specs: [
      { label: 'Dimensions', value: '200 x 90 x 130 cm' },
      { label: 'Vitrage', value: 'Triple vitrage anti-buée' },
      { label: 'Plage de température', value: '+2°C à +8°C' },
      { label: 'Éclairage', value: 'LED basse consommation' },
    ],
  },
  {
    ref: 'SL-350-H', name: 'Trancheur Gravité Industriel', category: 'Boucherie',
    price: '1 890,00', stock: 'rupture',
    description: "Trancheur à gravité pour découpe précise en environnement professionnel de boucherie.",
    specs: [
      { label: 'Diamètre lame', value: '350 mm' },
      { label: 'Épaisseur de coupe', value: '0 à 15 mm' },
      { label: 'Alimentation', value: '220V / 50Hz' },
    ],
  },
  {
    ref: 'AF-CF-M1', name: 'Chambre Froide Modulaire V1', category: 'Hôtellerie',
    price: '6 200,00', stock: 'disponible',
    description: "Chambre froide modulaire assemblable sur mesure selon la configuration de votre cuisine.",
    specs: [
      { label: 'Volume', value: 'Sur mesure' },
      { label: 'Panneaux', value: 'Isolation PU 80mm' },
      { label: 'Groupe froid', value: 'Inclus' },
    ],
  },
  {
    ref: 'AF-TPB-01', name: 'Titan Professional Brewer', category: 'Cafétéria',
    price: '8 450,00', stock: 'disponible',
    description: "Machine à café professionnelle grand débit pour cafétérias à forte affluence.",
    specs: [
      { label: 'Débit', value: '120 tasses/heure' },
      { label: 'Réservoir', value: '5 L' },
      { label: 'Alimentation', value: '220V / 50Hz' },
    ],
  },
  {
    ref: 'AF-CVB-02', name: 'Convotherm Pro-Bake', category: 'Boulangerie',
    price: '12 900,00', stock: 'limite',
    description: "Four à convection professionnel avec régulation d'hygrométrie pour boulangeries et pâtisseries.",
    specs: [
      { label: 'Capacité', value: '10 niveaux GN 1/1' },
      { label: 'Régulation', value: 'Hygrométrie programmable' },
      { label: 'Alimentation', value: 'Triphasé 380V' },
    ],
  },
]

const stockLabels = {
  disponible: { label: 'EN STOCK', color: 'text-success bg-success/10' },
  limite: { label: 'LIMITÉ', color: 'text-secondary bg-secondary/10' },
  rupture: { label: 'EN RUPTURE', color: 'text-error bg-error/10' },
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = allProducts.find((p) => p.ref === id)
  const related = allProducts.filter((p) => p.category === product?.category && p.ref !== id).slice(0, 3)

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16 text-center">
        <p className="text-sm text-on-surface-variant mb-4">Produit introuvable.</p>
        <Link to="/catalogue" className="text-primary-container hover:underline text-sm">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-10">
      <Link to="/catalogue" className="text-xs text-on-surface-variant hover:text-primary-container transition mb-6 inline-flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Retour au catalogue
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div>
          <div className="rounded-lg border border-white/10 bg-surface-container-low h-80 md:h-96 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-8xl text-on-surface-variant/20">
              ac_unit
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded border border-white/10 bg-surface-container-low h-16 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg text-on-surface-variant/20">image</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-xs text-on-surface-variant">Réf: {product.ref}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${stockLabels[product.stock].color}`}>
              {stockLabels[product.stock].label}
            </span>
          </div>
          <p className="text-xs text-primary-container mb-1">{product.category}</p>
          <h1 className="font-display font-bold text-2xl mb-4">{product.name}</h1>
          <p className="font-mono text-2xl mb-6">{product.price} DT <span className="text-xs text-on-surface-variant">HT</span></p>

          <p className="text-sm text-on-surface-variant leading-relaxed mb-8">{product.description}</p>

          <Link
            to="/devis"
            state={{ product: product.ref }}
            className="btn-primary w-full text-center block mb-3"
          >
            Demander un devis pour ce produit
          </Link>
          <a href="tel:55836100" className="btn-secondary w-full text-center block">
            Appeler un conseiller
          </a>

          {/* Specs */}
          <div className="mt-10">
            <h2 className="font-display font-semibold text-sm mb-4">Spécifications techniques</h2>
            <table className="w-full text-xs">
              <tbody>
                {product.specs.map((s) => (
                  <tr key={s.label} className="border-b border-white/5">
                    <td className="py-2.5 text-on-surface-variant">{s.label}</td>
                    <td className="py-2.5 text-right font-mono">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-xl mb-6">Produits similaires</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                to={`/catalogue/${p.ref}`}
                key={p.ref}
                className="rounded-lg border border-white/10 bg-surface-container-low overflow-hidden hover:border-primary-container transition"
              >
                <div className="h-32 bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/20">ac_unit</span>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] text-on-surface-variant mb-1">Réf: {p.ref}</p>
                  <p className="font-display font-semibold text-sm mb-2">{p.name}</p>
                  <span className="font-mono text-sm">{p.price} DT</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
