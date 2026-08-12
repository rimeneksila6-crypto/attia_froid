import { useState, useEffect } from "react";
import api from "../../lib/api";

export default function GestionArrivages() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [search]);

  async function fetchProducts() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/products", { params: { q: search } });
      setProducts(res.data.data);
    } catch (err) {
      setError("Erreur lors du chargement des produits.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(product) {
    // Mise à jour optimiste de l'affichage
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, nouveau: !p.nouveau } : p))
    );
    try {
      await api.put(`/admin/products/${product.id}/toggle-nouveau`);
    } catch (err) {
      // Si l'appel échoue, on annule le changement visuel
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, nouveau: product.nouveau } : p))
      );
      alert("Erreur lors de la mise à jour.");
    }
  }

  const nouveauxCount = products.filter((p) => p.nouveau).length;

  return (
    <div className="max-w-[1440px] mx-auto p-margin-mobile md:p-margin-desktop">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-[0.2em]">
              Flux Logistique
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-none">
            Gestion des Arrivages
          </h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-12">
        <div className="glass-card p-6 rounded-xl border border-primary/10 flex flex-col justify-between h-32">
          <span className="text-on-surface-variant font-label-mono text-xs uppercase">
            Total Produits
          </span>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold text-primary">{products.length}</span>
            <span className="material-symbols-outlined text-primary/40 text-3xl">
              inventory_2
            </span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl border border-secondary/10 flex flex-col justify-between h-32">
          <span className="text-on-surface-variant font-label-mono text-xs uppercase">
            Marqués Nouveaux
          </span>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold text-secondary">{nouveauxCount}</span>
            <span className="material-symbols-outlined text-secondary/40 text-3xl">
              new_releases
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-surface-container-high">
          <h3 className="font-headline-md text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">list_alt</span>
            Produits
          </h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none w-64"
            placeholder="Rechercher un produit..."
            type="text"
          />
        </div>

        {loading ? (
          <p className="p-6 text-on-surface-variant">Chargement...</p>
        ) : error ? (
          <p className="p-6 text-error">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest text-on-surface-variant font-label-mono text-xs uppercase border-b border-white/5">
                  <th className="px-6 py-4 font-normal">Référence / Produit</th>
                  <th className="px-6 py-4 font-normal">Catégorie</th>
                  <th className="px-6 py-4 font-normal">Stock</th>
                  <th className="px-6 py-4 font-normal text-right">Nouveau ?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-on-surface-variant">
                      Aucun produit trouvé.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-on-surface">{product.nom}</div>
                        <div className="text-xs font-label-mono text-outline">{product.reference}</div>
                      </td>
                      <td className="px-6 py-5 text-on-surface-variant text-sm">
                        {product.category?.nom || "—"}
                      </td>
                      <td className="px-6 py-5 font-label-mono">{product.stock}</td>
                      <td className="px-6 py-5 text-right">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            checked={product.nouveau}
                            onChange={() => handleToggle(product)}
                            className="sr-only toggle-checkbox"
                            type="checkbox"
                          />
                          <div
                            className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${
                              product.nouveau ? "bg-primary" : "bg-surface-variant"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${
                                product.nouveau ? "translate-x-5" : "left-0.5"
                              }`}
                            ></div>
                          </div>
                        </label>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}