<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Total products: " . App\Models\Product::count() . PHP_EOL . PHP_EOL;
foreach (App\Models\Product::all(["id","reference","nom","category_id"]) as $p) {
    echo $p->reference . " | " . $p->nom . PHP_EOL;
}
