<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'catalog_id',
        'quantity',
        'price',
    ];

    /**
     * Relasi ke keranjang induk.
     */
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * Relasi ke item katalog.
     */
    public function catalog()
    {
        return $this->belongsTo(Catalog::class);
    }
}