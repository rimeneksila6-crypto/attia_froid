<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $products = Product::with('category')->get()->map(function ($p) {
            $stockLabel = $p->en_stock ? 'disponible' : 'rupture de stock';
            return "- {$p->nom} (reference: {$p->reference}, categorie: " . ($p->category->nom ?? 'N/A') . ", prix: {$p->prix} DT, {$stockLabel})";
        })->join("\n");

        $systemPrompt = "Tu es l'assistant virtuel d'Attia Froid, une entreprise tunisienne d'equipements professionnels de refrigeration et de restauration (cafeteria, fast-food, boulangerie, hotellerie). "
            . "Reponds toujours en francais, de maniere courte, professionnelle et utile. "
            . "Voici le catalogue actuel des produits disponibles:\n{$products}\n\n"
            . "Si le client demande un produit qui n'est pas dans la liste, propose de le contacter via la page Devis ou Contact. "
            . "Ne invente jamais de prix ou de produits qui ne sont pas dans la liste ci-dessus.";

        $response = Http::timeout(60)->post('http://localhost:11434/api/generate', [
            'model' => 'mistral',
            'prompt' => $systemPrompt . "\n\nQuestion du client: " . $request->message,
            'stream' => false,
        ]);

        if (!$response->successful()) {
            return response()->json(['error' => 'AI service unavailable'], 503);
        }

        return response()->json([
            'reply' => $response->json('response'),
        ]);
    }
}
