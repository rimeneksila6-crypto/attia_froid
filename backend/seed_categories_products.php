<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$now = now();

// 1) New categories (Réfrigération already exists as id 1)
$categories = [
    ["nom" => "Cuisson", "slug" => "cuisson"],
    ["nom" => "Pâtisserie", "slug" => "patisserie"],
    ["nom" => "Préparation", "slug" => "preparation"],
    ["nom" => "Pizzeria & Pasta", "slug" => "pizzeria-pasta"],
    ["nom" => "Inox & Ventilation", "slug" => "inox-ventilation"],
    ["nom" => "Café", "slug" => "cafe"],
    ["nom" => "Lavage & Hygiène", "slug" => "lavage-hygiene"],
    ["nom" => "Snack Salé/Sucré", "slug" => "snack-sale-sucre"],
];

$catIds = ["Réfrigération" => 1];

foreach ($categories as $cat) {
    $existing = DB::table("categories")->where("slug", $cat["slug"])->first();
    if ($existing) {
        $catIds[$cat["nom"]] = $existing->id;
        echo "Skip (exists): " . $cat["nom"] . PHP_EOL;
        continue;
    }
    $id = DB::table("categories")->insertGetId([
        "nom" => $cat["nom"],
        "slug" => $cat["slug"],
        "created_at" => $now,
        "updated_at" => $now,
    ]);
    $catIds[$cat["nom"]] = $id;
    echo "Created category: " . $cat["nom"] . " (id $id)" . PHP_EOL;
}

// 2) Products keyed by category name
$products = [
    "Réfrigération" => [
        ["REF-002", "Armoire réfrigérée 1 porte GN 2/1", "Armoire réfrigérée professionnelle en inox, idéale pour restaurants et hôtels", 3200.00, 8],
        ["REF-003", "Congélateur professionnel coffre 400L", "Congélateur coffre grande capacité pour stockage longue durée", 2100.00, 6],
        ["REF-004", "Table réfrigérée 3 portes GN 1/1", "Table de travail réfrigérée avec plan de travail inox", 3800.00, 4],
        ["REF-005", "Saladette réfrigérée 4 bacs GN 1/6", "Saladette compacte pour préparation à froid", 2600.00, 7],
    ],
    "Cuisson" => [
        ["CUI-001", "Fourneau gaz 4 feux avec four", "Fourneau professionnel 4 feux avec four statique, structure inox", 4500.00, 3],
        ["CUI-002", "Friteuse électrique double bac 2x8L", "Friteuse professionnelle double cuve haute performance", 1800.00, 10],
        ["CUI-003", "Grill électrique double face", "Grill professionnel pour viandes et paninis, plaques striées", 2200.00, 6],
        ["CUI-004", "Sauteuse basculante électrique 40L", "Sauteuse basculante pour grandes préparations en cuisine collective", 5200.00, 2],
        ["CUI-005", "Four mixte professionnel 6 niveaux", "Four mixte vapeur/convection, programmable, capacité 6 GN 1/1", 9800.00, 2],
    ],
    "Pâtisserie" => [
        ["PAT-001", "Pétrin spirale 25kg", "Pétrin professionnel pour boulangerie et pâtisserie, cuve inox amovible", 5400.00, 3],
        ["PAT-002", "Laminoir à pâte 500mm", "Laminoir de table pour abaisser les pâtes, idéal pâtisserie/pizzeria", 3100.00, 4],
        ["PAT-003", "Étuve de fermentation 10 plateaux", "Étuve à porte vitrée, température et humidité contrôlées", 4200.00, 3],
        ["PAT-004", "Batteur mélangeur 20L", "Batteur mélangeur 3 vitesses avec fouet, batteur et crochet", 2900.00, 5],
        ["PAT-005", "Chariot à pâtisserie inox 10 plateaux", "Chariot de transport en inox pour plateaux de pâtisserie", 950.00, 8],
    ],
    "Préparation" => [
        ["PRE-001", "Éplucheuse à légumes 5kg", "Éplucheuse électrique professionnelle pour pommes de terre et carottes", 2400.00, 4],
        ["PRE-002", "Coupe-légumes multifonction", "Coupe-légumes professionnel avec disques interchangeables", 1900.00, 6],
        ["PRE-003", "Hachoir à viande n°22", "Hachoir professionnel haute capacité pour boucherie et restauration", 2700.00, 5],
        ["PRE-004", "Trancheuse à jambon 300mm", "Trancheuse professionnelle lame inox, réglage épaisseur précis", 2200.00, 4],
        ["PRE-005", "Machine sous vide de table", "Machine de mise sous vide compacte pour conservation professionnelle", 1600.00, 7],
    ],
    "Pizzeria & Pasta" => [
        ["PIZ-001", "Four à pizza électrique 2 étages", "Four à pizza professionnel double chambre, capacité 6 pizzas", 6200.00, 3],
        ["PIZ-002", "Table à pizza réfrigérée GN 1/3", "Table de préparation réfrigérée avec vitrine à ingrédients", 3400.00, 4],
        ["PIZ-003", "Pétrisseuse à pâte à pizza 10kg", "Pétrisseuse spécialisée pour pâte à pizza fine et napolitaine", 3900.00, 3],
        ["PIZ-004", "Four à pizza à bois artisanal", "Four traditionnel à bois pour pizzeria authentique", 8500.00, 1],
        ["PIZ-005", "Machine à pâtes fraîches", "Machine professionnelle pour tagliatelles, spaghettis et raviolis", 4100.00, 2],
    ],
    "Inox & Ventilation" => [
        ["INX-001", "Table de travail inox 150x70", "Table inox avec étagère basse, idéale cuisine professionnelle", 850.00, 12],
        ["INX-002", "Évier inox 2 bacs avec égouttoir", "Évier professionnel en acier inoxydable AISI 304", 1100.00, 8],
        ["INX-003", "Hotte aspirante professionnelle 2m", "Hotte inox avec filtres à graisse, extraction industrielle", 3600.00, 3],
        ["INX-004", "Étagère murale inox 3 niveaux", "Étagère de rangement mural en inox pour cuisine", 480.00, 15],
        ["INX-005", "Chariot de service inox 3 plateaux", "Chariot multi-usage en inox, roulettes pivotantes", 750.00, 10],
    ],
    "Café" => [
        ["CAF-001", "Machine à café espresso professionnelle 2 groupes", "Machine espresso pour cafétérias et restaurants, haute cadence", 7200.00, 2],
        ["CAF-002", "Moulin à café professionnel", "Moulin électrique à meules, réglage de mouture précis", 1400.00, 6],
        ["CAF-003", "Distributeur de café automatique", "Machine automatique grains, plusieurs boissons", 9500.00, 1],
        ["CAF-004", "Machine à café filtre grande capacité", "Cafetière professionnelle filtre, capacité 10L", 1200.00, 5],
        ["CAF-005", "Tasses et sous-tasses professionnelles (lot de 12)", "Vaisselle professionnelle pour service café", 320.00, 20],
    ],
    "Lavage & Hygiène" => [
        ["LAV-001", "Lave-vaisselle professionnel à capot", "Lave-vaisselle haute capacité, cycle rapide 2 minutes", 6800.00, 2],
        ["LAV-002", "Lavabo à commande au genou", "Lavabo inox avec commande sans contact pour hygiène", 690.00, 9],
        ["LAV-003", "Adoucisseur d'eau professionnel", "Adoucisseur pour protéger les équipements de cuisson et lavage", 2300.00, 3],
        ["LAV-004", "Table de sortie pour lave-vaisselle", "Table inox de réception en sortie de machine à laver", 780.00, 6],
        ["LAV-005", "Distributeur de savon mural inox", "Distributeur professionnel pour points de lavage", 210.00, 25],
    ],
    "Snack Salé/Sucré" => [
        ["SNK-001", "Crêpière électrique double", "Crêpière professionnelle 2 plaques, revêtement anti-adhésif", 1450.00, 6],
        ["SNK-002", "Gaufrier professionnel", "Gaufrier double plaques, production rapide", 1300.00, 5],
        ["SNK-003", "Vitrine chauffante pour snacks", "Vitrine de présentation chauffante pour viennoiseries et snacks salés", 2600.00, 4],
        ["SNK-004", "Toaster professionnel à convoyeur", "Toaster à défilement continu, haute cadence", 2100.00, 3],
        ["SNK-005", "Presse à panini professionnelle", "Presse double plaques striées pour sandwichs chauds", 1050.00, 7],
    ],
];

$created = 0;
$skipped = 0;
foreach ($products as $catName => $items) {
    $catId = $catIds[$catName] ?? null;
    if (!$catId) {
        echo "WARNING: no category id for $catName, skipping its products" . PHP_EOL;
        continue;
    }
    foreach ($items as $item) {
        [$ref, $nom, $desc, $prix, $stock] = $item;
        $exists = DB::table("products")->where("reference", $ref)->first();
        if ($exists) {
            $skipped++;
            continue;
        }
        DB::table("products")->insert([
            "reference" => $ref,
            "nom" => $nom,
            "category_id" => $catId,
            "description" => $desc,
            "prix" => $prix,
            "stock" => $stock,
            "en_stock" => $stock > 0,
            "nouveau" => false,
            "specs" => null,
            "created_at" => $now,
            "updated_at" => $now,
        ]);
        $created++;
    }
}

echo PHP_EOL . "Products created: $created, skipped (already existed): $skipped" . PHP_EOL;
echo "Total categories now: " . DB::table("categories")->count() . PHP_EOL;
echo "Total products now: " . DB::table("products")->count() . PHP_EOL;
