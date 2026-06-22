Berikut adalah dokumen kelanjutan PRD yang berfokus pada **Spesifikasi API Endpoint** beserta pemetaannya terhadap halaman/layanan di **Web Admin** dan **Mobile User (Mahasiswa)**.

---

# Product Requirement Document (PRD) — API & Interface Mapping

## 1. Arsitektur Umum & Autentikasi

- **Base URL:** `https://api.siakad.kampus.ac.id/v1`
- **Autentikasi:** Menggunakan **Bearer JWT Token** yang disertakan pada Header `Authorization: Bearer <token>` untuk setiap _restricted_ API.
- **Format Respons:** JSON Standard (menampilkan `status`, `message`, dan `data`).

---

## 2. Fitur 1: Kartu Rencana Studi (KRS)

### A. Sisi Mobile User (Mahasiswa)

- **Halaman di Mobile:** 1. _Dashboard KRS:_ Menampilkan status KRS saat ini (Sudah Isi/Belum/Menunggu Persetujuan) dan sisa kuota SKS.

2.  _Form Pilih Matakuliah:_ List matakuliah yang tersedia di semester tersebut beserta detil jadwal.

- **Daftar API:**
- `GET /mahasiswa/krs/status` $\rightarrow$ Mengambil status KRS aktif, batas maksimal SKS berdasarkan IPK lalu, dan jumlah SKS yang sudah diambil.
- `GET /mahasiswa/krs/matakuliah-tersedia` $\rightarrow$ List seluruh `jadwal_kuliah` yang ditawarkan pada semester aktif (dilengkapi filter hari/paket semester).
- `POST /mahasiswa/krs/pilih` $\rightarrow$ Mengajukan pilihan jadwal kuliah (Sistem melakukan validasi bentrok jam dan kuota kelas di backend).
- _Payload:_ `{"jadwal_ids": [10, 12, 15]}`

- `DELETE /mahasiswa/krs/batal/{id}` $\rightarrow$ Membatalkan matakuliah pilihan selama masa krs belum dikunci/disetujui.

### B. Sisi Web Admin (Akademik)

- **Halaman di Web:**

1. _Manajemen Jadwal & Kuota:_ Tempat admin menginput jadwal kuliah per prodi.
2. _Monitoring KRS Mahasiswa:_ Melihat mahasiswa mana saja yang sudah atau belum mengisi KRS.

- **Daftar API:**
- `POST /admin/jadwal` $\rightarrow$ Membuat data master `jadwal_kuliah` baru.
- `PUT /admin/jadwal/{id}` $\rightarrow$ Mengubah jadwal atau menambah kuota kelas jika penuh.
- `GET /admin/krs/rekap` $\rightarrow$ Mengambil statistik pengisian KRS mahasiswa (Total aktif, sudah isi, pending approval).

---

## 3. Fitur 2: Kartu Hasil Studi (KHS) & Transkrip

### A. Sisi Mobile User (Mahasiswa)

- **Halaman di Mobile:**

1. _Halaman KHS Semester:_ Dropdown pilihan tahun akademik/semester untuk melihat nilai huruf, IPS, dan IPK.
2. _Halaman Transkrip:_ Kumulasi seluruh nilai dari semester 1 hingga sekarang.

- **Daftar API:**
- `GET /mahasiswa/khs?tahun_akademik=2025/2026&semester=ganjil` $\rightarrow$ Mengambil daftar nilai matakuliah pada semester tersebut beserta IPS (Indeks Prestasi Semester). _Middleware akan mengecek status pembayaran terlebih dahulu._
- `GET /mahasiswa/transkrip` $\rightarrow$ Mengambil riwayat seluruh nilai yang sudah lulus untuk menghitung IPK total.

### B. Sisi Web Admin (Akademik)

- **Halaman di Web:**

1. _Input Nilai Kolektif:_ Tempat admin atau dosen menginput komponen nilai mahasiswa per kelas.
2. _Manajemen Bobot Nilai:_ Pengaturan skala nilai (misal: 85-100 = A, bobot 4).

- **Daftar API:**
- `GET /admin/kelas/{jadwal_id}/mahasiswa` $\rightarrow$ Menampilkan list mahasiswa yang mengambil kelas tersebut untuk persiapan input nilai.
- `POST /admin/nilai/input-kolektif` $\rightarrow$ Mengunggah nilai mahasiswa (bisa via form web atau import Excel).
- _Payload:_ `{"jadwal_id": 10, "nilai_data": [{"nim": "202601", "tugas": 80, "uts": 75, "uas": 85}]}`

---

## 4. Fitur 3: Pembayaran (Finansial)

### A. Sisi Mobile User (Mahasiswa)

- **Halaman di Mobile:**

1. _Halaman Riwayat & Tagihan:_ Menampilkan nominal UKT berjalan, status (Lunas/Belum), nomor Virtual Account (VA), dan tata cara pembayaran.

- **Daftar API:**
- `GET /mahasiswa/tagihan/aktif` $\rightarrow$ Mengambil data tagihan semester baru beserta batas waktu pembayaran.
- `POST /mahasiswa/tagihan/{id}/request-va` $\rightarrow$ Memicu integrasi ke Payment Gateway untuk generate/mendapatkan nomor Virtual Account.

### B. Sisi Web Admin (Keuangan)

- **Halaman di Web:**

1. _Dashboard Keuangan:_ Grafik pemasukan UKT, daftar mahasiswa menunggak, dan approval manual jika ada kendala sistem.

- **Daftar API:**
- `GET /admin/keuangan/rekap-tagihan` $\rightarrow$ Menampilkan list seluruh mahasiswa beserta status bayar mereka (bisa difilter per prodi/angkatan).
- `POST /admin/keuangan/webhook-callback` $\rightarrow$ **API Endpoint Khusus (Public)** untuk menerima notifikasi otomatis dari Payment Gateway ketika mahasiswa selesai membayar guna mengubah status menjadi `lunas`.

---

## 5. Fitur 4: Pengumuman & Notifikasi

### A. Sisi Mobile User (Mahasiswa)

- **Halaman di Mobile:**

1. _Feed Pengumuman / Berita:_ List pengumuman kampus berbentuk kartu (cards) kronologis.
2. _Detail Pengumuman:_ Membaca isi lengkap teks dan mengunduh lampiran (PDF/Gambar).

- **Daftar API:**
- `GET /mahasiswa/pengumuman` $\rightarrow$ Mengambil list pengumuman yang ditargetkan untuk mahasiswa tersebut (termasuk filter angkatan).
- `GET /mahasiswa/pengumuman/{id}` $\rightarrow$ Mengambil detail isi pengumuman spesifik.

### B. Sisi Web Admin (Humas / Akademik)

- **Halaman di Web:**

1. _Content Management System (CMS) Pengumuman:_ Form editor text (WYSIWYG) untuk membuat, mengedit, mengunggah file lampiran, dan memilih target audiens pengumuman.

- **Daftar API:**
- `POST /admin/pengumuman` $\rightarrow$ Membuat pengumuman baru sekaligus memicu _Firebase Push Notification_ ke aplikasi mobile user.
- _Payload:_ multipart/form-data (untuk teks + file lampiran).

- `DELETE /admin/pengumuman/{id}` $\rightarrow$ Menghapus atau menarik kembali pengumuman yang sudah terbit.

---

## 6. Fitur 5: Absensi (Presensi Perkuliahan)

### A. Sisi Mobile User (Mahasiswa)

- **Halaman di Mobile:**

1. _List Kehadiran:_ Menampilkan persentase kehadiran di setiap matakuliah (misal: Pemrograman Web: 90%).
2. _Kamera Scanner / Input Kode:_ Halaman untuk melakukan scan QR Code yang ditampilkan dosen di kelas.

- **Daftar API:**
- `GET /mahasiswa/absensi/rekap` $\rightarrow$ Menampilkan daftar matakuliah dan akumulasi kehadiran mahasiswa (untuk validasi syarat $\ge$ 75% ikut UAS).
- `POST /mahasiswa/absensi/scan` $\rightarrow$ Mengirim token QR code atau kode unik untuk mencatat kehadiran.
- _Payload:_ `{"sesi_id": 105, "qr_token": "xyz789securetokeN"}`

### B. Sisi Web Admin / Dosen (Web Interface)

- **Halaman di Web:**

1. _Jurnal Perkuliahan & Sesi:_ Membuka pertemuan baru (Pertemuan 1-16) dan mengenerate QR Code dinamis di proyektor kelas.
2. _Rekap Presensi Kelas:_ Mengubah status kehadiran mahasiswa secara manual jika ada yang izin/sakit membawa surat fisik.

- **Daftar API:**
- `POST /admin/absensi/sesi/buka` $\rightarrow$ Dosen/Admin membuka sesi kelas baru dan menghasilkan `qr_code_token` dinamis.
- `GET /admin/absensi/sesi/{sesi_id}/realtime` $\rightarrow$ Menampilkan daftar mahasiswa yang berhasil masuk/melakukan presensi secara _real-time_ di layar proyektor.
- `PUT /admin/absensi/mahasiswa/ubah-status` $\rightarrow$ Mengubah status absensi mahasiswa secara manual (misal dari 'alfa' menjadi 'sakit').
