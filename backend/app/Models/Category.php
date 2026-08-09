// app/Models/Category.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['nom', 'slug'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}