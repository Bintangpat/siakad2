-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MAHASISWA', 'DOSEN', 'ADMIN', 'KEUANGAN');

-- CreateEnum
CREATE TYPE "StatusAkademik" AS ENUM ('AKTIF', 'CUTI', 'NON_AKTIF');

-- CreateEnum
CREATE TYPE "SemesterTipe" AS ENUM ('GANJIL', 'GENAP');

-- CreateEnum
CREATE TYPE "StatusApproval" AS ENUM ('PENDING', 'DISETUJUI', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusBayar" AS ENUM ('BELUM_DIBAYAR', 'LUNAS', 'KEDALUWARSA');

-- CreateEnum
CREATE TYPE "StatusSesi" AS ENUM ('BELUM_MULAI', 'DIBUKA', 'DITUTUP');

-- CreateEnum
CREATE TYPE "StatusKehadiran" AS ENUM ('HADIR', 'SAKIT', 'IZIN', 'ALFA');

-- CreateEnum
CREATE TYPE "TargetAudien" AS ENUM ('SEMUA', 'DOSEN', 'MAHASISWA');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mahasiswa" (
    "nim" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "angkatan" INTEGER NOT NULL,
    "status_akademik" "StatusAkademik" NOT NULL DEFAULT 'AKTIF',
    "dosen_wali_id" TEXT,

    CONSTRAINT "mahasiswa_pkey" PRIMARY KEY ("nim")
);

-- CreateTable
CREATE TABLE "dosen" (
    "nidn" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "spesialisasi" TEXT,

    CONSTRAINT "dosen_pkey" PRIMARY KEY ("nidn")
);

-- CreateTable
CREATE TABLE "mata_kuliah" (
    "kode_mk" TEXT NOT NULL,
    "nama_mk" TEXT NOT NULL,
    "sks" INTEGER NOT NULL,
    "semester_paket" INTEGER NOT NULL,

    CONSTRAINT "mata_kuliah_pkey" PRIMARY KEY ("kode_mk")
);

-- CreateTable
CREATE TABLE "jadwal_kuliah" (
    "id" SERIAL NOT NULL,
    "kode_mk" TEXT NOT NULL,
    "nidn_dosen" TEXT NOT NULL,
    "tahun_akademik" TEXT NOT NULL,
    "semester_tipe" "SemesterTipe" NOT NULL,
    "hari" TEXT NOT NULL,
    "jam_mulai" TIME NOT NULL,
    "jam_selesai" TIME NOT NULL,
    "ruangan" TEXT NOT NULL,
    "kuota" INTEGER NOT NULL,

    CONSTRAINT "jadwal_kuliah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "krs" (
    "id" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "jadwal_id" INTEGER NOT NULL,
    "status_approval" "StatusApproval" NOT NULL DEFAULT 'PENDING',
    "catatan_dosen" TEXT,

    CONSTRAINT "krs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skala_nilai" (
    "id" SERIAL NOT NULL,
    "nilai_huruf" VARCHAR(2) NOT NULL,
    "bobot_indeks" DECIMAL(3,2) NOT NULL,
    "nilai_minimal" DECIMAL(5,2) NOT NULL,
    "nilai_maksimal" DECIMAL(5,2) NOT NULL,
    "keterangan" VARCHAR(50),

    CONSTRAINT "skala_nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "khs" (
    "id" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "jadwal_id" INTEGER NOT NULL,
    "nilai_tugas" DECIMAL(5,2),
    "nilai_uts" DECIMAL(5,2),
    "nilai_uas" DECIMAL(5,2),
    "nilai_presensi" DECIMAL(5,2),
    "nilai_angka" DECIMAL(5,2),
    "nilai_huruf_id" TEXT,

    CONSTRAINT "khs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tagihan_pembayaran" (
    "id" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "jenis_tagihan" TEXT NOT NULL,
    "nominal" DECIMAL(12,2) NOT NULL,
    "tahun_akademik" TEXT NOT NULL,
    "semester_tipe" "SemesterTipe" NOT NULL,
    "status_bayar" "StatusBayar" NOT NULL DEFAULT 'BELUM_DIBAYAR',
    "va_number" TEXT NOT NULL,
    "waktu_bayar" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tagihan_pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesi_pertemuan" (
    "id" SERIAL NOT NULL,
    "jadwal_id" INTEGER NOT NULL,
    "pertemuan_ke" INTEGER NOT NULL,
    "tanggal" DATE NOT NULL,
    "qr_code_token" TEXT,
    "status_sesi" "StatusSesi" NOT NULL DEFAULT 'BELUM_MULAI',
    "token_expires_at" TIMESTAMP(3),

    CONSTRAINT "sesi_pertemuan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "absensi_mahasiswa" (
    "id" SERIAL NOT NULL,
    "sesi_id" INTEGER NOT NULL,
    "nim" TEXT NOT NULL,
    "waktu_presensi" TIMESTAMP(3),
    "status_kehadiran" "StatusKehadiran" NOT NULL DEFAULT 'ALFA',

    CONSTRAINT "absensi_mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "file_lampiran" TEXT,
    "target_audien" "TargetAudien" NOT NULL DEFAULT 'SEMUA',
    "target_angkatan" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_user_id_key" ON "mahasiswa"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "dosen_user_id_key" ON "dosen"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "krs_nim_jadwal_id_key" ON "krs"("nim", "jadwal_id");

-- CreateIndex
CREATE UNIQUE INDEX "skala_nilai_nilai_huruf_key" ON "skala_nilai"("nilai_huruf");

-- CreateIndex
CREATE UNIQUE INDEX "khs_nim_jadwal_id_key" ON "khs"("nim", "jadwal_id");

-- CreateIndex
CREATE UNIQUE INDEX "sesi_pertemuan_jadwal_id_pertemuan_ke_key" ON "sesi_pertemuan"("jadwal_id", "pertemuan_ke");

-- CreateIndex
CREATE UNIQUE INDEX "absensi_mahasiswa_sesi_id_nim_key" ON "absensi_mahasiswa"("sesi_id", "nim");

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_dosen_wali_id_fkey" FOREIGN KEY ("dosen_wali_id") REFERENCES "dosen"("nidn") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dosen" ADD CONSTRAINT "dosen_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_kuliah" ADD CONSTRAINT "jadwal_kuliah_kode_mk_fkey" FOREIGN KEY ("kode_mk") REFERENCES "mata_kuliah"("kode_mk") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_kuliah" ADD CONSTRAINT "jadwal_kuliah_nidn_dosen_fkey" FOREIGN KEY ("nidn_dosen") REFERENCES "dosen"("nidn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "krs" ADD CONSTRAINT "krs_nim_fkey" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "krs" ADD CONSTRAINT "krs_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "jadwal_kuliah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khs" ADD CONSTRAINT "khs_nim_fkey" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khs" ADD CONSTRAINT "khs_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "jadwal_kuliah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khs" ADD CONSTRAINT "khs_nilai_huruf_id_fkey" FOREIGN KEY ("nilai_huruf_id") REFERENCES "skala_nilai"("nilai_huruf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagihan_pembayaran" ADD CONSTRAINT "tagihan_pembayaran_nim_fkey" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesi_pertemuan" ADD CONSTRAINT "sesi_pertemuan_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "jadwal_kuliah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi_mahasiswa" ADD CONSTRAINT "absensi_mahasiswa_sesi_id_fkey" FOREIGN KEY ("sesi_id") REFERENCES "sesi_pertemuan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi_mahasiswa" ADD CONSTRAINT "absensi_mahasiswa_nim_fkey" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
