<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;

class QuoteRequestController extends Controller
{
    // POST /api/devis (public)
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'nullable|exists:products,id',
            'company_name' => 'nullable|string',
            'contact_name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'message' => 'nullable|string',
            'quantity' => 'integer|min:1',
        ]);

        $quote = QuoteRequest::create($data);

        // TODO: notifier l'admin par email (Mail::to(...)->send(new NewQuoteRequest($quote)))

        return response()->json($quote, 201);
    }

    // GET /api/admin/devis (protégé)
    public function index()
    {
        return QuoteRequest::with('product')->latest()->paginate(15);
    }

    public function update(Request $request, QuoteRequest $quoteRequest)
    {
        $data = $request->validate(['status' => 'required|in:nouveau,traite,archive']);
        $quoteRequest->update($data);

        return $quoteRequest;
    }
}
