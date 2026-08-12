import { useState, useEffect } from "react";
import api from "../../lib/api";

const emptyForm = {
  reference: "",
  nom: "",
  category_id: "",
  description: "",
  prix: "",
  stock: "",
  en_stock: true,
  nouveau: false,
};

export default function GestionProduits() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  async function fetchCategories() {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories", err);
    }
  }

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

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(product) {
    setEditingId(product.id);
    setForm({
      reference: product.reference,
      nom: product.nom,
      category_id: product.category_id,
      description: product.description || "",
      prix: product.prix || "",
      stock: product.stock || "",
      en_stock: product.en_stock,
      nouveau: product.nouveau,
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, form);
      } else {
        await api.post("/admin/products", form);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      const msg =
        err.response?.data?.message || "Erreur lors de l'enregistrement.";
      alert(msg);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  }

  function stockLabel(product) {
    if (!product.en_stock) return { text: "Rupture", color: "bg-error text-error" };
    if (product.stock <= 5) return { text: "Limité", color: "bg-secondary text-secondary" };
    return { text: "En stock", color: "bg-green-500 text-green-500" };
  }

  return (
    <div className="max-w-[1440px] mx-auto p-margin-mobile md:p-margin-desktop">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mb-2">
            Gestion des Produits
          </h2>
          <p className="text-on-surface-variant font-body-lg max-w-xl">
            Supervisez l'inventaire complet des systèmes de réfrigération industrielle Arctic Precision.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-white text-surface px-8 py-4 rounded font-button-text flex items-center gap-3 shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          <span className="material-symbols-outlined">add_circle</span>
          AJOUTER UN PRODUIT
        </button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden frost-shadow">
        <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-high border-none text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary h-12 px-12"
              placeholder="Rechercher par référence ou nom..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
          </div>
        </div>

        {loading ? (
          <p className="p-6 text-on-surface-variant">Chargement...</p>
        ) : error ? (
          <p className="p-6 text-error">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest/30">
                  <th className="px-6 py-4 font-label-mono text-xs text-on-surface-variant tracking-widest uppercase">Nom & Réf</th>
                  <th className="px-6 py-4 font-label-mono text-xs text-on-surface-variant tracking-widest uppercase">Catégorie</th>
                  <th className="px-6 py-4 font-label-mono text-xs text-on-surface-variant tracking-widest uppercase">Prix</th>
                  <th className="px-6 py-4 font-label-mono text-xs text-on-surface-variant tracking-widest uppercase">Statut Stock</th>
                  <th className="px-6 py-4 font-label-mono text-xs text-on-surface-variant tracking-widest uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant">
                      Aucun produit trouvé.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const status = stockLabel(product);
                    return (
                      <tr key={product.id} className="group hover:bg-white/5 transition-colors">
                        <td className="px-6 py-6">
                          <p className="font-body-md font-semibold text-on-surface">{product.nom}</p>
                          <p className="font-label-mono text-xs text-primary/70">{product.reference}</p>
                        </td>
                        <td className="px-6 py-6">
                          <span className="inline-block px-3 py-1 bg-surface-container border-t border-primary/30 text-xs font-label-mono text-on-surface-variant">
                            {product.category?.nom || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-6 font-label-mono text-on-surface">
                          {product.prix ? Number(product.prix).toLocaleString("fr-TN", { minimumFractionDigits: 2 }) : "—"}{" "}
                          <span className="text-xs opacity-50">DT</span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${status.color.split(" ")[0]}`}></span>
                            <span className={`font-label-mono text-sm ${status.color.split(" ")[1]}`}>{status.text}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditModal(product)} className="text-on-surface-variant hover:text-primary">
                              <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="text-on-surface-variant hover:text-error">
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="glass-card frost-shadow bg-surface-container-high w-full max-w-lg p-8">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6">
              {editingId ? "Modifier le produit" : "Ajouter un produit"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-label-mono text-xs text-on-surface-variant block mb-1">Référence</label>
                <input
                  required
                  value={form.reference}
                  onChange={(e) => setForm({ ...form, reference: e.target.value })}
                  className="w-full bg-surface-container border-none text-on-surface h-11 px-4"
                />
              </div>
              <div>
                <label className="font-label-mono text-xs text-on-surface-variant block mb-1">Nom</label>
                <input
                  required
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="w-full bg-surface-container border-none text-on-surface h-11 px-4"
                />
              </div>
              <div>
                <label className="font-label-mono text-xs text-on-surface-variant block mb-1">Catégorie</label>
                <select
                  required
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  className="w-full bg-surface-container border-none text-on-surface h-11 px-4"
                >
                  <option value="">-- Choisir --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-label-mono text-xs text-on-surface-variant block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-surface-container border-none text-on-surface p-4"
                  rows="3"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-label-mono text-xs text-on-surface-variant block mb-1">Prix (DT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.prix}
                    onChange={(e) => setForm({ ...form, prix: e.target.value })}
                    className="w-full bg-surface-container border-none text-on-surface h-11 px-4"
                  />
                </div>
                <div className="flex-1">
                  <label className="font-label-mono text-xs text-on-surface-variant block mb-1">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full bg-surface-container border-none text-on-surface h-11 px-4"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <input
                    type="checkbox"
                    checked={form.en_stock}
                    onChange={(e) => setForm({ ...form, en_stock: e.target.checked })}
                  />
                  En stock
                </label>
                <label className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <input
                    type="checkbox"
                    checked={form.nouveau}
                    onChange={(e) => setForm({ ...form, nouveau: e.target.checked })}
                  />
                  Nouvel arrivage
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 text-on-surface-variant hover:text-on-surface"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-primary text-surface px-6 py-3 rounded font-button-text hover:bg-white transition-colors"
                >
                  {editingId ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}