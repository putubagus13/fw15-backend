# Readme Tix Event Backend - Aplikasi Pembelian Tiket Event (Backend)

Selamat datang di repositori backend aplikasi web Tix Event! Ini adalah bagian dari aplikasi sederhana yang digunakan untuk pembelian tiket event dan membuat event. Aplikasi ini menggunakan framework Express JS dan beberapa teknologi lain seperti JWT, RestAPI, dan Axios. Repository frontend dapat diakses di [sini](https://github.com/putubagus13/fw15-frontend).

## Fitur Utama

- **Autentikasi**: Sistem otentikasi menggunakan JWT (JSON Web Tokens) untuk menjaga keamanan akun pengguna.

- **Manajemen Event**: Admin aplikasi dapat membuat, mengedit, dan menghapus event. Pengguna yang membuat event juga dapat mengelola detail event mereka.

- **Pembelian Tiket**: Pengguna dapat membeli tiket event yang tersedia dengan mudah.

- **RestAPI**: Backend menyediakan endpoint-endpoint RestAPI yang digunakan oleh frontend untuk berkomunikasi dengan server.

- **Keamanan**: Kami menempatkan keamanan sebagai prioritas utama. Data pengguna dan transaksi dienkripsi dan dilindungi dengan baik.

## Teknologi Utama

Aplikasi Tix Event Backend dibangun dengan menggunakan teknologi berikut:

- **Express JS**: Framework Node.js yang digunakan untuk membuat server backend.

- **PosgreSQL**: Database NoSQL yang digunakan untuk menyimpan data event, tiket, pengguna, dan informasi lainnya.

- **JWT (JSON Web Tokens)**: Digunakan untuk otentikasi dan otorisasi pengguna.

- **RestAPI**: Digunakan untuk berkomunikasi dengan frontend dan menyediakan layanan kepada pengguna.

- **Axios**: Library HTTP client untuk membuat permintaan HTTP dari frontend ke backend.

## Pengembangan Lokal

Jika Anda ingin menjalankan Tix Event Backend di lingkungan pengembangan lokal Anda, ikuti langkah-langkah berikut:

1. Clone repositori ini:

   ```bash
   git clone https://github.com/putubagus13/fw15-backend.git
   cd fw15-backend
   ```

2. Instal semua dependensi:

   ```bash
   npm install
   ```

3. Buat berkas konfigurasi `.env` berdasarkan `.env.example` dan sesuaikan dengan pengaturan Anda.

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

5. Server backend akan berjalan di [http://localhost:8888](http://localhost:8888).

## Kontribusi

Kami sangat terbuka terhadap kontribusi! Jika Anda ingin berkontribusi pada pengembangan Tix Event Backend, silakan buat _fork_ repositori ini dan kirim _pull request_ setelah melakukan perubahan yang dibutuhkan.

## Laporan Masalah

Jika Anda menemukan masalah atau bug dalam backend aplikasi, harap buat _issue_ di repositori ini atau hubungi tim pengembangan kami di [email@example.com](mailto:email@example.com).

## Lisensi

Aplikasi Tix Event Backend dilisensikan di bawah Lisensi MIT. Lihat berkas [LICENSE](LICENSE) untuk detailnya.

Terima kasih telah menggunakan Tix Event Backend! Kami berharap Anda menikmati pengalaman menggunakan aplikasi Tix Event.

---
© 2023 Tix Event. Dikembangkan oleh [Nama Perusahaan Anda](https://www.example.com).
