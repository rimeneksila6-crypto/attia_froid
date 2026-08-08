<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference', 'name', 'category', 'description', 'price',
        'stock_status', 'is_new_arrival', 'images', 'specs',
    ];

    protected $casts = [
        'images' => 'array',
        'specs' => 'array',
        'is_new_arrival' => 'boolean',
    ];
}
