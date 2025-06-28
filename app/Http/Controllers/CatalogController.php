<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\URL; // Tambahkan ini

class CatalogController extends Controller
{
    private function getCurrentCart(Request $request)
    {
        $cart = null;

        if ($request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)
                ->where('status', 'active')
                ->first();
        } else {
            $sessionId = Session::getId();
            $cart = Cart::where('session_id', $sessionId)
                ->where('status', 'active')
                ->first();
        }

        if (!$cart) {
            $cart = new Cart();
            $cart->user_id = $request->user() ? $request->user()->id : null;
            $cart->session_id = $request->user() ? null : Session::getId();
            $cart->status = 'active';
            $cart->save();
        }

        return $cart;
    }

    public function showCatalogPage(Request $request)
    {
        $catalogs = Catalog::all()->map(function ($catalog) {
            if ($catalog->file) {
                if (filter_var($catalog->file, FILTER_VALIDATE_URL)) {
                    $catalog->file_url = $catalog->file;
                } else {
                    $catalog->file_url = Storage::url($catalog->file);
                }
            } else {
                $catalog->file_url = null;
            }
            return $catalog;
        });

        return Inertia::render('Catalog', [
            'catalogs' => $catalogs,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function showCartPage(Request $request)
    {
        $cart = $this->getCurrentCart($request);
        $cart->load('items.catalog');

        $subtotal = 0;
        $itemsWithDetails = $cart->items->map(function ($item) use (&$subtotal) {
            $itemTotal = $item->price * $item->quantity;
            $subtotal += $itemTotal;

            if ($item->catalog) { // Pastikan item->catalog tidak null
                if ($item->catalog->file) {
                    if (filter_var($item->catalog->file, FILTER_VALIDATE_URL)) {
                        $item->catalog->file_url = $item->catalog->file;
                    } else {
                        $item->catalog->file_url = Storage::url($item->catalog->file);
                    }
                } else {
                    $item->catalog->file_url = null;
                }
            } else {
                $item->catalog = (object)['file_url' => null, 'title' => 'Produk Tidak Ditemukan']; // Default jika catalog null
            }
            return $item;
        });

        $vat = $subtotal * 0.10;
        $total = $subtotal + $vat;

        return Inertia::render('Cart', [
            'cartItems' => $itemsWithDetails,
            'subtotal' => $subtotal,
            'vat' => $vat,
            'total' => $total,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'catalog_id' => 'required|exists:catalogs,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $catalog = Catalog::find($request->catalog_id);
        $cart = $this->getCurrentCart($request);

        $cartItem = $cart->items()->where('catalog_id', $catalog->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'catalog_id' => $catalog->id,
                'quantity' => $request->quantity,
                'price' => $catalog->price,
            ]);
        }

        return back()->with('success', 'Item berhasil ditambahkan ke keranjang!');
    }

    public function reAddToCart(Request $request)
    {
        $request->validate([
            'catalog_id' => 'required|exists:catalogs,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $catalog = Catalog::find($request->catalog_id);
        if (!$catalog) {
            return response()->json(['message' => 'Produk tidak ditemukan.'], 404);
        }

        $cart = $this->getCurrentCart($request);

        $cartItem = $cart->items()->where('catalog_id', $catalog->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'catalog_id' => $catalog->id,
                'quantity' => $request->quantity,
                'price' => $catalog->price,
            ]);
        }

        return response()->json(['message' => 'Produk berhasil ditambahkan ke keranjang!', 'cartItemCount' => $cart->items()->sum('quantity')]);
    }

    public function updateCartItem(Request $request, CartItem $cartItem)
    {
        $cart = $this->getCurrentCart($request);
        if ($cartItem->cart_id !== $cart->id) {
            return back()->withErrors(['message' => 'Aksi tidak sah.'])->withInput();
        }

        $request->validate(['quantity' => 'required|integer|min:1']);

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return back()->with('success', 'Kuantitas berhasil diperbarui.');
    }

    public function removeCartItem(Request $request, CartItem $cartItem)
    {
        $cart = $this->getCurrentCart($request);
        if ($cartItem->cart_id !== $cart->id) {
            return back()->withErrors(['message' => 'Aksi tidak sah.'])->withInput();
        }

        $cartItem->delete();
        return back()->with('success', 'Item berhasil dihapus.');
    }

    public function clearCart(Request $request)
    {
        $cart = $this->getCurrentCart($request);
        $cart->items()->delete();
        return back()->with('success', 'Keranjang berhasil dikosongkan.');
    }

    public function checkout(Request $request)
    {
        if (!$request->user()) {
            return redirect()->route('login')->with('error', 'Anda harus login untuk melanjutkan ke checkout.');
        }

        $cart = $this->getCurrentCart($request);
        $cart->load('items.catalog');

        if ($cart->items->isEmpty()) {
            return back()->withErrors(['message' => 'Keranjang Anda kosong. Tidak dapat checkout.'])->withInput();
        }

        $subtotal = $cart->items->sum(function ($item) {
            return $item->price * $item->quantity;
        });
        $vat = $subtotal * 0.10;
        $totalAmountWithVat = $subtotal + $vat;

        return Inertia::render('Checkout', [
            'cartItems' => $cart->items->map(function ($item) {
                if ($item->catalog) { // Pastikan item->catalog tidak null
                    if ($item->catalog->file) {
                        if (filter_var($item->catalog->file, FILTER_VALIDATE_URL)) {
                            $item->catalog->file_url = $item->catalog->file;
                        } else {
                            $item->catalog->file_url = Storage::url($item->catalog->file);
                        }
                    } else {
                        $item->catalog->file_url = null;
                    }
                } else {
                    $item->catalog = (object)['file_url' => null, 'title' => 'Produk Tidak Ditemukan']; // Default jika catalog null
                }
                return $item;
            }),
            'subtotal' => $subtotal,
            'vat' => $vat,
            'total' => $totalAmountWithVat,
            'user' => $request->user()->only('id', 'name', 'email'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function processOrder(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized. Harap login untuk melanjutkan ke checkout.'], 401);
        }

        $cart = $this->getCurrentCart($request);
        $cart->load('items.catalog');

        if ($cart->items->isEmpty()) {
            return response()->json(['message' => 'Keranjang Anda kosong. Tidak dapat memproses pesanan.'], 400);
        }

        $subtotal = $cart->items->sum(function ($item) {
            return $item->price * $item->quantity;
        });
        $vat = $subtotal * 0.10;
        $totalAmountWithVat = $subtotal + $vat;

        DB::beginTransaction();

        try {
            $order = Order::create([
                'user_id' => $request->user()->id,
                'total_amount' => $totalAmountWithVat,
                'status' => 'pending',
            ]);

            foreach ($cart->items as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'catalog_id' => $cartItem->catalog_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                ]);
            }

            $cart->items()->delete();
            $cart->status = 'converted';
            $cart->save();

            DB::commit();

            return response()->json(['message' => 'Pesanan berhasil dibuat!', 'orderId' => $order->id]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order processing failed: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal membuat pesanan: ' . $e->getMessage()], 500);
        }
    }

    public function getOrderHistory(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized. Harap login untuk melihat riwayat pesanan.'], 401);
        }

        $orders = Order::where('user_id', $request->user()->id)
            ->with('items.catalog')
            ->orderBy('created_at', 'desc')
            ->get();

        $orders = $orders->map(function ($order) {
            $order->items->map(function ($item) {
                if ($item->catalog) { // Pastikan item->catalog tidak null
                    if ($item->catalog->file) {
                        if (filter_var($item->catalog->file, FILTER_VALIDATE_URL)) {
                            $item->catalog->file_url = $item->catalog->file;
                        } else {
                            $item->catalog->file_url = Storage::url($item->catalog->file);
                        }
                    } else {
                        $item->catalog->file_url = null;
                    }
                } else {
                    $item->catalog = (object)['file_url' => null, 'title' => 'Produk Tidak Ditemukan']; // Default jika catalog null
                }
                return $item;
            });
            return $order;
        });

        return response()->json(['orders' => $orders]);
    }
}
