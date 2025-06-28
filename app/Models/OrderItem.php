<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'catalog_id',
        'quantity',
        'price',
    ];

    /**
     * Relasi ke Order induk.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Relasi ke Catalog item yang dipesan.
     */
    public function catalog()
    {
        return $this->belongsTo(Catalog::class);
    }
}