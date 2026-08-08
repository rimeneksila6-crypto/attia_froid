<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // GET /api/avis (public, approuvés uniquement)
    public function index()
    {
        return Review::where('is_approved', true)->latest()->paginate(10);
    }

    // POST /api/avis (public — passe en attente de modération)
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        return response()->json(Review::create($data), 201);
    }

    // GET /api/admin/avis (protégé — tous, y compris non approuvés)
    public function indexAdmin()
    {
        return Review::latest()->paginate(15);
    }

    public function approve(Review $review)
    {
        $review->update(['is_approved' => true]);

        return $review;
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->noContent();
    }
}
