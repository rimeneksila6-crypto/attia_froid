<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        "phone",
        "email",
        "address",
        "hours_week",
        "hours_sat",
        "hours_sun",
        "instagram",
    ];
}
