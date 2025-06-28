<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Session; // Import Session Facade

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $cartItemCount = 0;
        $cart = null;

        if ($request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)
                        ->where('status', 'active')
                        ->first();
        } else {
            // Untuk user tamu, ambil berdasarkan session_id
            $sessionId = Session::getId();
            $cart = Cart::where('session_id', $sessionId)
                        ->where('status', 'active')
                        ->first();
        }

        if ($cart) {
            $cartItemCount = $cart->items()->sum('quantity');
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? $request->user()->only('id', 'name', 'email') : null,
            ],
            // 'ziggy' tidak digunakan lagi
            // 'ziggy' => function () use ($request) {
            //     return array_merge((new \Tightenco\Ziggy\Ziggy)->toArray(), [
            //         'location' => $request->url(),
            //     ]);
            // },
            'cartItemCount' => $cartItemCount,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'message' => fn () => $request->session()->get('message'),
            ],
            'errors' => fn () => $request->session()->get('errors')
                        ? $request->session()->get('errors')->getBag('default')->getMessages()
                        : (object) [],
        ]);
    }
}