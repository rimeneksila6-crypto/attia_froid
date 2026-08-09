// app/Http/Controllers/Api/ProductController.php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products (public, avec recherche/filtre)
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images']);

        if ($request->filled('q')) {
            $search = $request->q;
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'like', "%{$search}%")
                  ->orWhere('reference', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('en_stock')) {
            $query->where('en_stock', $request->boolean('en_stock'));
        }

        return $query->latest()->paginate(12);
    }

    // GET /api/products/{id}
    public function show(Product $product)
    {
        return $product->load(['category', 'images']);
    }

    // POST /api/admin/products
    public function store(Request $request)
    {
        $data = $request->validate([
            'reference' => 'required|string|unique:products,reference',
            'nom' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'prix' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'en_stock' => 'boolean',
            'nouveau' => 'boolean',
            'specs' => 'nullable|array',
        ]);

        $product = Product::create($data);

        return response()->json($product, 201);
    }

    // PUT /api/admin/products/{id}
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'reference' => 'required|string|unique:products,reference,' . $product->id,
            'nom' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'prix' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'en_stock' => 'boolean',
            'nouveau' => 'boolean',
            'specs' => 'nullable|array',
        ]);

        $product->update($data);

        return response()->json($product);
    }

    // DELETE /api/admin/products/{id}
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Produit supprimé']);
    }
}