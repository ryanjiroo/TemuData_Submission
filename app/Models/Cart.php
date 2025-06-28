<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
        'status',
    ];

    /**
     * Relasi ke item-item di keranjang.
     */
    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Relasi ke pengguna pemilik keranjang.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}