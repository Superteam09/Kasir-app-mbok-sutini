# Aplikasi Kasir + Landing Page Pemesanan Online

Aplikasi kasir (POS) berbasis web yang bisa diakses online oleh beberapa staff (owner &
kasir), dilengkapi landing page pemesanan online untuk pelanggan (diakses lewat link atau
scan QR code).

## Fitur

- **Login staff** dengan dua peran: **Owner** (akses penuh) dan **Kasir** (operasional harian).
- **Kasir (POS)** — buat transaksi langsung di tempat, pilih menu, hitung total, catat metode
  pembayaran (tunai/transfer).
- **Pesanan Online** — daftar pesanan yang masuk dari landing page pelanggan, real-time,
  dengan tombol ubah status (Menunggu → Dikonfirmasi → Disiapkan → Diantar → Selesai) dan
  tandai sudah/belum bayar. Pelanggan yang sedang membuka halaman status pesanannya akan
  melihat perubahan status ini secara otomatis, tanpa perlu refresh.
- **Alamat & foto patokan lokasi** — saat memesan, pelanggan mengisi alamat pengantaran dan
  boleh melampirkan foto (rumah/gang/patokan) supaya kurir lebih mudah menemukan lokasi.
- **Live Chat pesanan** — di halaman status pesanan, pelanggan bisa membuka tombol chat
  mengambang untuk berkirim pesan langsung ke admin tanpa keluar dari halaman. Staff membalas
  dari menu **Live Chat** di sisi kasir (daftar percakapan per pesanan, realtime, dengan
  penanda jumlah pesan yang belum dibaca).
- **Notifikasi pesanan & chat baru** — begitu ada pesanan online atau pesan live chat baru
  dari pelanggan, staff yang sedang membuka halaman mana pun akan mendengar bunyi notifikasi
  dan melihat lonceng di pojok kanan atas menyala dengan daftar notifikasinya. Kalau tab
  browser sedang tidak aktif (dan izin diberikan), notifikasi juga muncul sebagai notifikasi
  desktop dari browser.
- **Kelola Menu** — atur kategori dan daftar menu beserta harga, deskripsi, gambar, dan status
  tersedia/habis. Owner selalu bisa akses; kasir bisa diberi akses ke menu ini juga lewat
  **Izin Akses per Staff** di bawah.
- **Kelola Staff** (khusus owner) — hanya owner yang bisa membuat akun staff baru (langsung
  dari panel ini, staff tidak perlu daftar sendiri lagi), mengatur role owner/kasir, mengirim
  link reset password ke staff, dan menghapus akun yang sudah tidak dipakai.
- **Izin Akses per Staff** (khusus owner, bagian dari menu **Staff**) — owner bisa mengatur
  menu apa saja yang boleh dibuka tiap akun kasir (misalnya cuma **Kasir (POS)** saja, atau
  **Kasir** + **Menu**), baik saat membuat akun baru maupun kapan saja lewat tombol
  **Atur Akses** di daftar staff. Menu **Staff** dan **Pengaturan** selalu khusus Owner, tidak
  pernah bisa diberikan ke kasir mana pun. Kalau tidak diatur sama sekali, akun kasir tetap
  bisa akses semua menu selain dua itu (perilaku default, sama seperti sebelumnya).
- **Lupa Password** — di halaman Login ada link "Lupa password?" untuk kirim link reset ke
  email yang terdaftar (berlaku untuk owner maupun kasir).
- **Link & QR** — halaman untuk mendapatkan link pemesanan online dan QR code yang bisa
  dicetak/ditempel di meja.
- **Landing page pelanggan** (`/order`, tanpa login) — pelanggan lihat menu, pilih barang,
  isi data singkat, kirim pesanan, lalu diarahkan ke halaman status pesanan yang
  ter-update otomatis.
- **Mata uang ganda (USD + Riel)** — harga selalu disimpan dalam USD, tapi ditampilkan
  sekaligus perkiraan dalam Riel di semua layar (kasir, pesanan online, halaman pelanggan),
  misalnya `$4.00 (~16.400៛)`. Kursnya diatur owner di halaman **Pengaturan** dan langsung
  berlaku ke semua layar tanpa perlu deploy ulang.
- **Logo Restoran** — owner bisa upload logo dari halaman **Pengaturan**, langsung tampil di
  halaman login, halaman pemesanan pelanggan, halaman status pesanan, dan sidebar staff —
  menggantikan tampilan default (ikon/nama saja). Bisa diganti atau dihapus kapan saja tanpa
  perlu deploy ulang.
- **Nama Toko/Resto bisa diubah** — owner bisa mengganti nama toko kapan saja dari halaman
  **Pengaturan**, tanpa perlu deploy ulang. Nama baru langsung berlaku di halaman login,
  halaman pemesanan pelanggan, status pesanan, sidebar staff, dan judul tab browser.
- **Tampilan staff baru (lebih modern)** — semua halaman staff (Dashboard, Kasir, Pesanan
  Online, Menu, Staff, Live Chat, Pengaturan) memakai tampilan terang bergaya kartu dengan
  sidebar gelap sebagai aksen, kartu statistik berikon di Dashboard, dan tampilan produk
  bergambar di halaman Kasir — warna oranye/coklat khas resto tetap dipertahankan.
- **Retur & Batalkan transaksi** — kalau ada kesalahan input atau barang dikembalikan
  customer:
  - Di halaman **Kasir (POS)**, bagian "Riwayat Transaksi Kasir Hari Ini" punya tombol
    **Batalkan** (transaksi salah/tidak jadi) dan **Retur** (barang sudah dibawa tapi
    dikembalikan) untuk tiap transaksi yang sudah selesai.
  - Di halaman **Pesanan Online**, pesanan yang statusnya "Selesai" bisa ditandai **Retur**,
    dan pesanan yang masih berjalan bisa **Dibatalkan** (tombol Batalkan yang sudah ada
    sebelumnya). Ada juga tab filter baru **Retur** untuk melihat daftar pesanan yang
    diretur.
  - Transaksi/pesanan yang sudah Retur atau Dibatalkan otomatis tidak dihitung ke dalam
    "Penjualan selesai hari ini" di Dashboard.

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

> **Sudah pernah deploy sebelumnya?** Anda tidak perlu mengulang dari awal. Cukup buka project
> Supabase yang sudah ada → **SQL Editor** → **New query**, lalu jalankan (satu per satu,
> **Run** setiap selesai salin satu file) file-file tambahan yang belum pernah dijalankan:
> - `supabase/tambahan-kurs-riel.sql` (fitur mata uang Riel)
> - `supabase/tambahan-foto-lokasi.sql` (fitur alamat & foto patokan lokasi pengantaran)
> - `supabase/tambahan-live-chat.sql` (fitur live chat pelanggan ↔ admin)
> - `supabase/tambahan-kelola-akun.sql` (hanya owner bisa buat akun staff + lupa password)
> - `supabase/tambahan-logo.sql` (fitur upload logo restoran di halaman Pengaturan)
> - `supabase/tambahan-nama-toko.sql` (fitur ganti nama toko di halaman Pengaturan)
> - `supabase/tambahan-retur.sql` (fitur status "Retur" untuk transaksi/pesanan)
> - `supabase/tambahan-izin-akses-staff.sql` (fitur izin akses menu per-akun kasir)
> - `supabase/tambahan-aktifkan-realtime.sql` (**PENTING** — tanpa ini, status pesanan pelanggan,
>   live chat, dan notifikasi lonceng/badge staff TIDAK akan pernah otomatis update; pelanggan/staff
>   harus refresh manual dulu baru lihat data terbaru)
> - `supabase/tambahan-tutup-chat.sql` (fitur "Akhiri Percakapan" di halaman Live Chat staff,
>   supaya percakapan yang sudah selesai bisa dipindah ke tab Riwayat)
> - `supabase/tambahan-foto-menu.sql` (fitur upload foto menu langsung dari komputer/HP di halaman
>   Menu, menggantikan kolom URL Gambar manual — **jalankan setelah** `tambahan-izin-akses-staff.sql`
>   di atas, karena migrasi ini memakainya)
>
> (Fitur tampilan staff baru, notifikasi bunyi/lonceng untuk pesanan/chat baru, dan fitur "Cek
> Pesanan Saya" untuk pelanggan tidak butuh migrasi SQL apa pun — otomatis aktif begitu kode
> terbarunya di-deploy.)
>
> Kalau Anda menjalankan `tambahan-kelola-akun.sql`, JUGA perlu deploy Edge Function
> `admin-users` sekali (lihat bagian **6. Mengaktifkan Kelola Staff** di bawah) supaya tombol
> "Tambah Staff" & "Hapus Akun" berfungsi.
>
> Lalu unggah ulang kode terbaru ke GitHub (Tahap 3) dan Netlify akan otomatis deploy ulang.

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
   - `NEXT_PUBLIC_RESTO_NAME` = nama restoran Anda (nama awal — bisa diganti kapan saja nanti
     dari menu **Pengaturan** tanpa perlu deploy ulang)
5. Klik **Deploy**. Setelah selesai (1-3 menit), Netlify memberi Anda link publik, misalnya
   `https://nama-resto.netlify.app` — inilah alamat aplikasi Anda yang online.
6. (Opsional) Di **Site configuration → Domain management** Anda bisa menyambungkan domain
   sendiri atau mengganti subdomain `.netlify.app` menjadi nama yang lebih sesuai.

## 5. Membuat Akun Owner Pertama

1. Buka `https://nama-resto.netlify.app/login`.
2. Klik tab **Daftar Akun Baru** (tab ini otomatis hilang setelah akun owner pertama ada —
   normal, bukan bug), isi nama, email, password → **Buat Akun**. Akun **pertama** yang
   mendaftar otomatis menjadi **Owner**.
3. Login. Anda akan masuk ke Dashboard.
4. Buka menu **Pengaturan**, cek/atur kurs 1 USD berapa Riel (default 4.100). Ini yang
   dipakai untuk menampilkan harga dalam Riel di semua layar. Bisa diubah kapan saja sesuai
   kurs yang berlaku.

## 6. Mengaktifkan Kelola Staff (supaya owner bisa buat akun staff baru)

Setelah owner pertama dibuat, pendaftaran akun baru **otomatis tertutup** — hanya owner yang
bisa membuat akun staff baru, lewat menu **Staff**. Supaya tombol "Tambah Staff" & "Hapus
Akun" di menu itu berfungsi, perlu satu langkah setup tambahan **satu kali saja**: men-deploy
sebuah "Edge Function" (kode kecil yang jalan aman di sisi server Supabase, bukan di browser
— dibutuhkan karena membuat akun butuh kunci rahasia yang tidak boleh pernah ada di kode
website). Ini pakai Command Prompt/Terminal, tapi cuma 4 perintah:

1. Buka Command Prompt (Windows) atau Terminal (Mac), lalu pindah ke folder hasil extract
   zip aplikasi ini, misalnya:
   ```bash
   cd Downloads/kasir-app
   ```
2. Install Supabase CLI (sekali saja per komputer):
   ```bash
   npm install -g supabase
   ```
3. Login ke akun Supabase Anda (akan membuka browser, klik izinkan):
   ```bash
   supabase login
   ```
4. Deploy function-nya — ganti `XXXXXXXX` dengan **Reference ID** project Supabase Anda
   (dilihat di dashboard Supabase → **Project Settings → General**, tepat di bawah nama
   project):
   ```bash
   supabase functions deploy admin-users --project-ref XXXXXXXX
   ```
5. Kalau muncul tulisan "Deployed Function", berarti berhasil. Coba buka menu **Staff** di
   aplikasi, klik **+ Tambah Staff**, isi data staff baru, lalu **Buat Akun** — sampaikan
   email & password yang tampil ke staff yang bersangkutan.

Tidak perlu mengulang langkah ini lagi di masa depan kecuali kode `supabase/functions/admin-users`
berubah lagi (kalau begitu, cukup ulangi langkah 4 saja).

## 7. Mengisi Menu & Membagikan Link Pemesanan

1. Masuk ke menu **Menu**, tambahkan kategori (mis. Makanan Utama, Minuman) lalu tambahkan
   item menu beserta harga.
2. Masuk ke menu **Link & QR**, salin link atau unduh QR code, lalu cetak/tempel di meja
   atau bagikan ke pelanggan.
3. Pelanggan yang membuka link/scan QR akan melihat menu, bisa memesan, lalu mendapat
   halaman status pesanan yang otomatis ter-update.
4. Pesanan yang masuk akan langsung muncul di menu **Pesanan Online** milik staff.
5. (Opsional) Masuk ke menu **Pengaturan**, upload logo resto di bagian **Logo Restoran**
   supaya tampil di halaman login, halaman pemesanan pelanggan, dan sidebar staff.
6. (Opsional) Di menu **Pengaturan** juga ada bagian **Nama Toko/Resto** kalau Anda mau
   mengganti nama yang tampil di aplikasi tanpa perlu deploy ulang.

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
- **Notifikasi pesanan/chat baru hanya aktif selagi ada staff yang membuka aplikasi di
  browser** (tab boleh di-minimize/pindah tab lain, notifikasi desktop browser tetap muncul
  kalau izinnya sudah diberikan) — belum berupa notifikasi ke HP lewat WhatsApp/Telegram
  atau saat browser benar-benar tertutup, karena itu perlu layanan pihak ketiga berbayar.
  Disarankan salah satu HP/komputer kasir selalu login & membuka aplikasi selama jam buka.
- **Halaman status pesanan** dapat diakses siapa pun yang memegang link/kode pesanannya
  (tidak perlu login) — praktis untuk pelanggan, tapi berarti link tersebut sebaiknya
  tidak disebar sembarangan. Cukup aman untuk kebutuhan v1 karena isinya hanya rincian
  pesanan makanan.
- **Penambahan staff** hanya bisa dilakukan owner lewat menu **Staff** (lihat langkah 6) —
  pendaftaran mandiri (self sign-up) otomatis tertutup begitu akun owner pertama ada, supaya
  orang lain tidak bisa membuat akun stafnya sendiri. Ini butuh satu Supabase Edge Function
  kecil (`admin-users`) yang di-deploy sekali lewat Command Prompt/Terminal — lihat langkah 6
  untuk caranya.
- **Lupa password** ditangani lewat email reset bawaan Supabase (gratis, tanpa setup SMTP
  tambahan) — cukup andalkan link "Lupa password?" di halaman Login. Kalau owner sendiri
  lupa password DAN tidak bisa akses emailnya juga, satu-satunya jalan adalah reset manual
  lewat Supabase Dashboard → **Authentication → Users** → pilih user → **Send password
  recovery** atau **Reset password**.
- Struktur database sudah disiapkan untuk berkembang: menambah meja/nomor antrian, laporan
  penjualan lebih lengkap, cetak struk, hingga integrasi payment gateway (mis. ABA PayWay)
  bisa dibangun di atas skema yang sama.

## Struktur Folder Singkat

```
app/
  (staff)/            halaman staff yang perlu login (dashboard, pos, orders, chat, menu, staff, share, settings)
  order/              landing page pelanggan (public) + halaman status pesanan
  login/               halaman login, daftar staff (setup awal), & lupa password
  reset-password/      halaman atur password baru (dibuka dari link email reset)
  auth/callback/        penukar link email jadi sesi login (dipakai alur reset password)
components/            komponen UI bersama (navigasi staff, widget chat, dll)
lib/                   helper Supabase, tipe data, format angka/tanggal
supabase/schema.sql    skrip SQL untuk membuat semua tabel & aturan keamanan
supabase/functions/    Edge Function admin-users (buat/hapus akun staff, lihat langkah 6)
```
