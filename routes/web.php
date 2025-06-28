<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CatalogController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rute web untuk halaman (Inertia)
    Route::get('/catalogs', [CatalogController::class, 'showCatalogPage'])->name('catalogs');
    Route::get('/cart', [CatalogController::class, 'showCartPage'])->name('cart');
    Route::get('/orders', function () {
        return Inertia::render('OrderHistory');
    })->name('orders');

    // Rute web untuk Operasi Keranjang (menggantikan API)
    Route::post('/cart/add', [CatalogController::class, 'addToCart'])->name('cart.add');
    Route::patch('/cart-items/{cartItem}', [CatalogController::class, 'updateCartItem'])->name('cart.updateItem');
    Route::delete('/cart-items/{cartItem}', [CatalogController::class, 'removeCartItem'])->name('cart.removeItem');
    Route::delete('/cart/clear', [CatalogController::class, 'clearCart'])->name('cart.clear');

    // Rute untuk proses checkout
    Route::post('/checkout', [CatalogController::class, 'checkout'])->name('checkout');

    // Rute baru untuk memproses konfirmasi pesanan dari halaman Checkout.jsx
    Route::post('/process-order', [CatalogController::class, 'processOrder'])->name('process.order');

    // Rute untuk halaman sukses pesanan
    Route::get('/order/success/{orderId}', function ($orderId) {
        return Inertia::render('OrderSuccess', ['orderId' => $orderId]);
    })->name('order.success');

    // API route for order history
    Route::get('/api/orders', [CatalogController::class, 'getOrderHistory'])->name('api.orders');

    // NEW API ROUTE FOR RE-ADD TO CART FROM ORDER HISTORY
    Route::post('/api/re-add-to-cart', [CatalogController::class, 'reAddToCart'])->name('api.reAddToCart');
});

require __DIR__.'/auth.php';