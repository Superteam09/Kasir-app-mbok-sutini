# Aplikasi Kasir + Landing Page Pemesanan Online

Aplikasi kasir (POS) berbasis web yang bisa diakses online oleh beberapa staff (owner &
kasir), dilengkapi landing page pemesanan online untuk pelanggan (diakses lewat link atau
scan QR code).

## Fitur

- **Login staff** dengan dua peran: **Owner** (akses penuh) dan **Kasir** (operasional harian).
- **Kasir (POS)** — buat transaksi langsung di tempat, pilih menu, hitung total, catat metode
  pembayaran (tunai/transfer).
- **Pesanan Online** — daftar pesanan yang masuk dari landing page pelanggan, real-time,
  dengan tombol ubah status (Menunggu → Dikonfirmasi → Disiapkan → Siap → Selesai) dan tandai
  sudah/belum bayar.
- **Kelola Menu** (khusus owner) — atur kategori dan daftar menu beserta harga, deskripsi,
  gambar, dan status tersedia/habis.
- **Kelola Staff** (khusus owner) — atur siapa yang berperan sebagai owner/kasir.
- **Link & QR** — halaman untuk mendapatkan link pemesanan online dan QR code yang bisa
  dicetak/ditempel di meja.
- **Landing page pelanggan** (`/order`, tanpa login) — pelanggan lihat menu, pilih barang,
  isi data singkat, kirim pesanan, lalu diarahkan ke halaman status pesanan yang
  ter-update otomatis.
- **Mata uang ganda (USD + Riel)** — harga selalu disimpan dalam USD, tapi ditampilkan
  sekaligus perkiraan dalam Riel di semua layar (kasir, pesanan online, halaman pelanggan),
  misalnya `$4.00 (~16.400៛)`. Kursnya diatur owner di halaman **Pengaturan** dan langsung
  berlaku ke semua layar tanpa perlu deploy ulang.

Pembayaran pada versi ini **manual** (tunai/transfer, dikonfirmasi langsung oleh kasir) —
belum terhubung ke payment gateway.

## Teknologi

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- [Supabase](https://supabase.com/) — database Postgres, autentikasi, dan realtime
  (paket gratis, tidak perlu kartu kredit, dan tidak ada larangan pemakaian untuk bisnis)
- Siap di-deploy gratis ke [Netlify](https://www.netlify.com/) — dipilih karena paket
  gratisnya **tidak melarang pemakaian komersial/bisnis** (beda dengan paket gratis Vercel
  yang resmi hanya untuk pemakaian pribadi/non-komersial)

---

> **Sudah pernah deploy sebelum ada fitur mata uang Riel?** Anda tidak perlu mengulang dari
> awal. Cukup buka project Supabase yang sudah ada → **SQL Editor** → **New query** → salin isi
> file `supabase/tambahan-kurs-riel.sql` dari paket ini → **Run**. Lalu unggah ulang kode
> terbaru ke GitHub (Tahap 3) dan Netlify akan otomatis deploy ulang.

## 1. Membuat Project Supabase (Database + Login)

1. Buka [supabase.com](https://supabase.com/), buat akun, lalu klik **New Project**.
2. Isi nama project, password database (simpan baik-baik), pilih region terdekat (mis.
   Singapore), lalu buat project. Tunggu 1-2 menit sampai siap.
3. Di sidebar kiri, buka **SQL Editor** → **New query**.
4. Buka file `supabase/schema.sql` yang ada di paket ini, salin seluruh isinya, tempel ke
   SQL Editor, lalu klik **Run**. Ini akan membuat semua tabel, aturan keamanan (RLS), dan
   beberapa kategori contoh.
5. Buka menu **Project Settings → API**. Catat dua nilai berikut, akan dipakai di langkah
   berikutnya:
   - **Project URL** → jadi `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → jadi `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. (Opsional tapi disarankan) Di **Authentication → Providers**, pastikan Email aktif. Di
   **Authentication → Settings**, Anda bisa mematikan "Confirm email" saat masih tahap
   uji coba supaya akun staff bisa langsung login tanpa verifikasi email dulu.

## 2. Menjalankan di Komputer Sendiri (opsional, untuk uji coba)

```bash
npm install
cp .env.local.example .env.local
# lalu edit .env.local, isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Buka `http://localhost:3000`.

## 3. Unggah Kode ke GitHub (supaya Netlify bisa membacanya)

GitHub adalah tempat penyimpanan kode online. Tidak perlu install apa pun atau mengetik
perintah teknis:

1. Buka [github.com](https://github.com), buat akun gratis.
2. Klik tombol **+** di pojok kanan atas → **New repository**. Beri nama bebas (mis.
   `kasir-app`), biarkan pengaturan lain default, klik **Create repository**.
3. Di halaman repo yang baru dibuat, cari link **uploading an existing file** → klik.
4. Extract file zip project ini di komputer Anda, lalu **drag semua isi foldernya** (semua
   file & folder di dalamnya, bukan folder zip itu sendiri) ke halaman GitHub tadi.
5. Scroll ke bawah, klik **Commit changes**.

## 4. Deploy ke Netlify (agar online & bisa diakses banyak user)

1. Buka [netlify.com](https://www.netlify.com/), klik **Sign up**, pilih daftar dengan akun
   GitHub (paling mudah, tidak perlu kartu kredit).
2. Klik **Add new site → Import an existing project**, pilih **GitHub**, lalu pilih
   repository `kasir-app` yang tadi dibuat.
3. Netlify otomatis mengenali ini project Next.js dan mengisi pengaturan build — biarkan
   default (tidak perlu diubah).
4. Sebelum klik deploy, buka bagian **Environment variables**, tambahkan satu per satu:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL dari Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key dari Supabase
   - `NEXT_PUBLIC_RESTO_NAME` = nama restoran Anda (tampil di judul & landing page)
5. Klik **Deploy**. Setelah selesai (1-3 menit), Netlify memberi Anda link publik, misalnya
   `https://nama-resto.netlify.app` — inilah alamat aplikasi Anda yang online.
6. (Opsional) Di **Site configuration → Domain management** Anda bisa menyambungkan domain
   sendiri atau mengganti subdomain `.netlify.app` menjadi nama yang lebih sesuai.

## 5. Membuat Akun Owner Pertama

1. Buka `https://nama-resto.netlify.app/login`.
2. Klik tab **Daftar Akun Baru**, isi nama, email, password → **Buat Akun**.
   Akun **pertama** yang mendaftar otomatis menjadi **Owner**.
3. Login. Anda akan masuk ke Dashboard.
4. Untuk menambah kasir: minta staff mendaftar sendiri di halaman yang sama dengan
   email/password yang Anda tentukan — akun mereka otomatis berperan **Kasir**. Anda bisa
   mengelola/ubah role di menu **Staff**.
5. Buka menu **Pengaturan**, cek/atur kurs 1 USD berapa Riel (default 4.100). Ini yang
   dipakai untuk menampilkan harga dalam Riel di semua layar. Bisa diubah kapan saja sesuai
   kurs yang berlaku.

## 6. Mengisi Menu & Membagikan Link Pemesanan

1. Masuk ke menu **Menu**, tambahkan kategori (mis. Makanan Utama, Minuman) lalu tambahkan
   item menu beserta harga.
2. Masuk ke menu **Link & QR**, salin link atau unduh QR code, lalu cetak/tempel di meja
   atau bagikan ke pelanggan.
3. Pelanggan yang membuka link/scan QR akan melihat menu, bisa memesan, lalu mendapat
   halaman status pesanan yang otomatis ter-update.
4. Pesanan yang masuk akan langsung muncul di menu **Pesanan Online** milik staff.

---

## Catatan Penting / Batasan Versi Ini (v1)

- **Kenapa Netlify, bukan Vercel** — paket gratis Vercel ("Hobby") resmi hanya boleh untuk
  pemakaian pribadi/non-komersial; situs yang menerima/memproses pesanan pelanggan seperti
  ini termasuk pemakaian komersial menurut aturan mereka. Netlify dipilih karena paket
  gratisnya tidak punya larangan seperti itu. Batasan Netlify gratis: kuota ±300
  "credit"/bulan (kira-kira setara 15 GB traffic) — untuk satu restoran biasanya cukup jauh.
- **Project Supabase gratis akan "tidur"** kalau tidak diakses 7 hari berturut-turut — data
  tidak hilang, tinggal buka dashboard Supabase dan klik **Resume project** untuk
  mengaktifkan kembali (perlu dilakukan manual, aplikasi tidak bisa membangunkannya sendiri).
- **Pembayaran manual** — belum ada integrasi payment gateway. Pelanggan memesan dulu,
  bayar tunai/transfer dikonfirmasi langsung oleh kasir.
- **Halaman status pesanan** dapat diakses siapa pun yang memegang link/kode pesanannya
  (tidak perlu login) — praktis untuk pelanggan, tapi berarti link tersebut sebaiknya
  tidak disebar sembarangan. Cukup aman untuk kebutuhan v1 karena isinya hanya rincian
  pesanan makanan.
- **Penambahan staff** dilakukan lewat pendaftaran mandiri (self sign-up) + owner mengatur
  rolenya — dipilih supaya tidak perlu menyimpan kunci rahasia (service role key) di
  aplikasi yang online. Jika ke depan ingin owner bisa membuat akun staff langsung dari
  dashboard (tanpa staff mendaftar sendiri), ini bisa ditambahkan lewat Supabase Edge
  Function.
- Struktur database sudah disiapkan untuk berkembang: menambah meja/nomor antrian, laporan
  penjualan lebih lengkap, cetak struk, hingga integrasi payment gateway (mis. ABA PayWay)
  bisa dibangun di atas skema yang sama.

## Struktur Folder Singkat

```
app/
  (staff)/         halaman staff yang perlu login (dashboard, pos, orders, menu, staff, share)
  order/           landing page pelanggan (public) + halaman status pesanan
  login/           halaman login & daftar staff
components/        komponen UI bersama (navigasi staff)
lib/               helper Supabase, tipe data, format angka/tanggal
supabase/schema.sql  skrip SQL untuk membuat semua tabel & aturan keamanan
```
