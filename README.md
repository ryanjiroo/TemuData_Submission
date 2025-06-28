# Panduan Menjalankan Aplikasi

Berikut adalah langkah-langkah lengkap untuk menjalankan aplikasi ini:

---

## 1. Clone Repository

Jika belum, clone repository ini terlebih dahulu:

```bash
git clone https://github.com/ryanjiroo/TemuData_Submission/
cd nama-folder-project
```

---

## 2. Install Dependensi

### a. Backend (Laravel)

```bash
composer install
```

### b. Frontend (Vite)

```bash
npm install
```

---

## 3. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Lalu sesuaikan pengaturan database pada file `.env`:

```
DB_CONNECTION=pgsql
DB_URL=postgresql://postgres.dlauefkhnkwwefkvfyeu:@Testing12345@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=temudataku
DB_USERNAME=root
DB_PASSWORD=

```

---

## 4. Generate App Key

```bash
php artisan key:generate
```

---

## 6. Jalankan Aplikasi

### a. Jalankan Backend Laravel

```bash
php artisan serve
```

### b. Jalankan Frontend Vite

```bash
npm run dev
```

---

## 7. Akses Aplikasi

Buka browser dan akses:

```
http://127.0.0.1:8000
```

---

## 8. Login atau Registrasi

### a. Registrasi User Baru

Klik tombol **Register** dan isi form.

### b. Atau login sebagai Admin:

- **Email:** `test@example.com`  
- **Password:** `password`

---

## Selesai 🎉

Aplikasi siap digunakan. Selamat ngoding!
