<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id', 'company_name', 'contact_name', 'phone',
        'email', 'message', 'quantity', 'status',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
