<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Province extends Model
{
    use HasFactory;

    // Table name (optional if it matches the model name in plural)
    protected $table = 'provinces';

    // Fillable fields for mass assignment
    protected $fillable = [
        'code',
        'name',
    ];

    // Optional timestamps (enabled by default)
    public $timestamps = true;

    // Optional: Define relationships (if needed later)
    // public function districts()
    // {
    //     return $this->hasMany(District::class);
    // }
}
