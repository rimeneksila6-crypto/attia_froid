<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique(); // ex: AF-900X
            $table->string('name');
            $table->enum('category', ['cafeteria', 'fast_food', 'boulangerie', 'hotellerie']);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable(); // null = "sur devis uniquement"
            $table->enum('stock_status', ['disponible', 'limite', 'rupture', 'sur_commande'])->default('disponible');
            $table->boolean('is_new_arrival')->default(false);
            $table->json('images')->nullable(); // tableau d'URLs
            $table->json('specs')->nullable(); // caractéristiques techniques clé/valeur
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
