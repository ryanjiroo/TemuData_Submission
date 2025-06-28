<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Catalog; // Import model Catalog

class CatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Catalog::truncate();

        $catalogs = [
            [
                'title' => 'Data Analysis - Customer Analysis',
                'description' => 'Kamu akan belajar cara menganalisis pelanggan, mencari trend yang tersembunyi, dan bagaimana prospek pelanggan kedepannya.',
                'price' => 15000.00,
                'file' => 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
            [
                'title' => 'Machine Learning - NLP',
                'description' => 'Kamu akan belajar bagaimana cara mengolah teks, menganalisis sentiment, dan juga klasifikasi teks seperti spam detection dan sejenisnya.',
                'price' => 15000.00,
                'file' => 'https://media.istockphoto.com/id/2050481773/photo/natural-language-processing-nlp.webp?a=1&b=1&s=612x612&w=0&k=20&c=nHtyFYE7ocTDJxjU_h-eY-eLh1d5XRviWvJUwRo-7cY=',
            ],
            [
                'title' => 'Data Scientist - Churn Prediction',
                'description' => 'Kamu akan belajar mulai dari membersihkan data dan membuat model untuk memprediksi kemungkinan pelanggan melakukan churn.',
                'price' => 15000.00,
                'file' => 'https://media.istockphoto.com/id/2075626899/id/foto/analyst-utilizing-technology-and-dashboard-with-charts-data-science-and-big-data-technology.jpg?s=2048x2048&w=is&k=20&c=BlvnbttADFmkphhI9AWaiOhGSnX_QXRVyfU_XizmPdc=',
            ],
            [
                'title' => 'Machine Learning - Classification',
                'description' => 'Kamu akan belajar mulai dari pemrosesan data seperti feature enginering, encoding, dan labelling. Kamu juga akan menggunakan package untuk melakukan pemodelan klasifikasi.',
                'price' => 15000.00,
                'file' => 'https://img.freepik.com/free-photo/body-temperature-coronavirus-pandemic-thermal-image_53876-96156.jpg?t=st=1751029415~exp=1751033015~hmac=5be5c8b50e7e722e4eaf554b460abe183e935fa5f2967d28d22a0aeda0837ec0&w=1380',
            ],
            [
                'title' => 'Machine Learning - Computer Vision',
                'description' => 'Kamu akan belajar bagaimana mengolah gaambar dan membuat klasifikasi dari dataset yang disedikanan.',
                'price' => 15000.00,
                'file' => 'https://img.freepik.com/free-photo/body-temperature-coronavirus-pandemic-thermal-image_53876-96156.jpg?t=st=1751029415~exp=1751033015~hmac=5be5c8b50e7e722e4eaf554b460abe183e935fa5f2967d28d22a0aeda0837ec0&w=1380',
            ],
            [
                'title' => 'Machine Learning - Time Series',
                'description' => 'Kamu akan belajar pemrosesan data untuk tipe data time series serta pembuatan model model time series dari klasik hingga penggunaan neural network untuk time series.',
                'price' => 15000.00,
                'file' => 'https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_640.png',
            ],
        ];

        foreach ($catalogs as $catalogData) {
            Catalog::create($catalogData);
        }
    }
}