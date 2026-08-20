<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$p = App\Models\Product::first();
echo "reference: " . $p->reference . PHP_EOL;
echo "nom: " . $p->nom . PHP_EOL;
echo "category_id: " . $p->category_id . PHP_EOL;
echo "description: " . $p->description . PHP_EOL;
echo "prix: " . $p->prix . PHP_EOL;
echo "stock: " . $p->stock . PHP_EOL;
echo "en_stock: " . var_export($p->en_stock, true) . PHP_EOL;
echo "nouveau: " . var_export($p->nouveau, true) . PHP_EOL;
echo "specs (raw): " . $p->getRawOriginal("specs") . PHP_EOL;

$catCols = Illuminate\Support\Facades\Schema::getColumnListing("categories");
echo PHP_EOL . "category cols: " . implode(", ", $catCols) . PHP_EOL;
$c = App\Models\Category::first();
echo "cat nom: " . $c->nom . " | slug: " . $c->slug . PHP_EOL;
