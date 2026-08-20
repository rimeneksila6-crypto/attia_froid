<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== CATEGORIES ===" . PHP_EOL;
foreach (App\Models\Category::all(["id","nom"]) as $c) {
    echo $c->id . " | " . $c->nom . PHP_EOL;
}

echo PHP_EOL . "=== PRODUCTS ===" . PHP_EOL;
$prodCols = Illuminate\Support\Facades\Schema::getColumnListing("products");
echo "product columns: " . implode(", ", $prodCols) . PHP_EOL;
