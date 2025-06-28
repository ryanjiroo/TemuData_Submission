<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL; // Import URL Facade
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ini akan memaksa semua URL yang dihasilkan Laravel menjadi HTTPS saat di produksi
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
