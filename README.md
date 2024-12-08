# Aplikasi Catatan (Notes App) oleh Sahabat Tani Group

Aplikasi pembuatan catatan sederhana berbasis React yang memungkinkan pengguna untuk membuat, mengedit, mencari, dan menghapus catatan. Aplikasi ini berinteraksi dengan API RESTful untuk menyimpan dan mengambil catatan.

## Fitur

- Membuat catatan baru dengan judul, tanggal (sesuai tanggal dan waktu pembuatan catatan), dan isi catatan.
- Melihat semua catatan.
- Mencari catatan berdasarkan judul atau isi catatan.
- Mengedit catatan yang ada (judul, tanggal, dan isi catatan).
- Menghapus catatan.
- Batasan karakter untuk judul dan isi catatan agar catatan lebih ringkas.
- Memberikan validasi untuk inputan judul dan isi catatan

## Teknologi yang Digunakan

- **Frontend:** React, CSS
- **Backend:** API RESTful (diasumsikan berjalan di `http://localhost:5000/api/notes`)
- **Database:** MySQL

---

## Instalasi

### Prasyarat

Pastikan Anda memiliki perangkat lunak berikut terinstal:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

### Langkah-langkah

1. Clone repositori ini:

   ```bash
   git clone https://github.com/mochachmar/merdeka-backend-project.git
   cd merdeka-backend-project
   ```

2. Setup Database (MySQL):

   ```sql
   CREATE DATABASE notes_db;
   USE notes_db;

   CREATE TABLE notes (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       title TEXT NOT NULL,
       datetime DATETIME NOT NULL,
       note LONGTEXT NOT NULL
   );
   ```

3. Instal dependensi untuk client dan server:

   ```cmd
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Mulai aplikasi:

   - **Frontend:**

     ```cmd
     cd client
     npm start
     ```

   - **Backend:**
     ```cmd
     cd server
     node index.js
     ```

5. Pastikan server backend berjalan di `http://localhost:5000`.

---

## API Endpoints

Pastikan server backend Anda mendukung endpoint API berikut:

1. **Mengambil semua catatan**

   - URL: `GET /api/notes`
   - Respons: Mengembalikan array objek catatan.

   ```json
   [
     {
       "id": 1,
       "title": "Catatan Contoh",
       "datetime": "2024-12-01T14:00:00Z",
       "note": "Ini adalah catatan contoh."
     }
   ]
   ```

2. **Membuat catatan baru**

   - URL: `POST /api/notes`
   - Body: Objek JSON dengan `title`, `datetime`, dan `note`.

   ```json
   {
     "title": "Catatan Baru",
     "datetime": "2024-12-08T10:00:00Z",
     "note": "Konten catatan di sini."
   }
   ```

   - Respons: Objek catatan yang dibuat.

3. **Mengambil satu catatan**

   - URL: `GET /api/notes/:id`
   - Respons: Objek catatan tunggal.

   ```json
   {
     "id": 1,
     "title": "Catatan Contoh",
     "datetime": "2024-12-01T14:00:00Z",
     "note": "Ini adalah catatan contoh."
   }
   ```

4. **Mencari catatan**

   - URL: `GET /api/notes/search?query=<search-query>`
   - Respons: Array objek catatan yang sesuai dengan query pencarian.

   ```json
   [
     {
       "id": 1,
       "title": "Catatan Contoh",
       "datetime": "2024-12-01T14:00:00Z",
       "note": "Ini adalah catatan contoh."
     }
   ]
   ```

5. **Memperbarui catatan**

   - URL: `PUT /api/notes/:id`
   - Body: Objek JSON dengan pembaruan `title`, `datetime`, dan/atau `note`.

   ```json
   {
     "title": "Catatan Diperbarui",
     "datetime": "2024-12-08T12:00:00Z",
     "note": "Konten catatan yang diperbarui."
   }
   ```

   - Respons: Objek catatan yang diperbarui.

6. **Menghapus catatan**
   - URL: `DELETE /api/notes/:id`
   - Respons: Pesan keberhasilan.
   ```json
   {
     "message": "Catatan berhasil dihapus."
   }
   ```

---

## Penggunaan

1. **Membuat Catatan Baru**

   - Masukkan judul, tanggal, dan isi catatan di form yang ada di bagian atas.
   - Klik tombol "Buat" untuk menyimpan catatan.

2. **Menampilkan Semua Catatan**

   - Semua catatan akan ditampilkan di bagian utama aplikasi.

3. **Menampilkan Salah Satu Catatan Melalui Fitur Pencarian Catatan**

   - Masukkan kata kunci pencarian di kolom input pencarian di bagian atas.
   - Catatan yang ditampilkan akan diperbarui berdasarkan query.
   - Hasilnya akan menampilkan salah satu card catatan yang sesuai dengan pencarian

4. **Mengubah Catatan (judul, tanggal, dan catatan)**

   - Klik tombol edit pada kartu catatan.
   - Perbarui detail catatan (judul, tanggal, dan isi catatan) di edit.
   - Klik "Simpan" untuk menerapkan perubahan.

5. **Menghapus Catatan**
   - Klik tombol hapus pada kartu catatan.
   - Konfirmasi penghapusan di prompt.

---
