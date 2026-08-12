<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'reference', 'nom', 'category_id', 'description',
        'prix', 'stock', 'en_stock', 'nouveau', 'specs',
    ];

    protected $casts = [
        'specs' => 'array',
        'en_stock' => 'boolean',
        'nouveau' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('ordre');
    }
}