<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products?search=&category=&in_stock=1
    public function index(Request $request)
    {
        $query = Product::query();

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('reference', 'like', "%{$search}%");
            });
        }

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        if ($request->boolean('in_stock')) {
            $query->whereIn('stock_status', ['disponible', 'limite']);
        }

        return $query->latest()->paginate(12);
    }

    public function show(Product $product)
    {
        return $product;
    }

    // Admin only (protected by auth:sanctum in routes/api.php)
    public function store(Request $request)
    {
        $data = $request->validate([
            'reference' => 'required|string|unique:products',
            'name' => 'required|string',
            'category' => 'required|in:cafeteria,fast_food,boulangerie,hotellerie',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'stock_status' => 'required|in:disponible,limite,rupture,sur_commande',
            'is_new_arrival' => 'boolean',
            'images' => 'nullable|array',
            'specs' => 'nullable|array',
        ]);

        return Product::create($data);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'reference' => 'sometimes|string|unique:products,reference,' . $product->id,
            'name' => 'sometimes|string',
            'category' => 'sometimes|in:cafeteria,fast_food,boulangerie,hotellerie',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'stock_status' => 'sometimes|in:disponible,limite,rupture,sur_commande',
            'is_new_arrival' => 'boolean',
            'images' => 'nullable|array',
            'specs' => 'nullable|array',
        ]);

        $product->update($data);

        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
