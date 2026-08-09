// database/migrations/2024_01_01_000002_create_products_table.php
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
            $table->string('reference')->unique();
            $table->string('nom');
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2)->nullable();
            $table->integer('stock')->default(0);
            $table->boolean('en_stock')->default(true);
            $table->boolean('nouveau')->default(false); // pour Gestion Arrivages
            $table->json('specs')->nullable(); // specs techniques clé/valeur
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};