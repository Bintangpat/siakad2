import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter } as any);

  console.log('🌱 Starting seed...');

  // 1. Seed SkalaNilai (Grading Scale)
  const skalaNilai = [
    { nilaiHuruf: 'A',  bobotIndeks: 4.00, nilaiMinimal: 85.00, nilaiMaksimal: 100.00, keterangan: 'Sangat Baik' },
    { nilaiHuruf: 'A-', bobotIndeks: 3.75, nilaiMinimal: 80.00, nilaiMaksimal: 84.99, keterangan: 'Hampir Sangat Baik' },
    { nilaiHuruf: 'B+', bobotIndeks: 3.50, nilaiMinimal: 75.00, nilaiMaksimal: 79.99, keterangan: 'Lebih dari Baik' },
    { nilaiHuruf: 'B',  bobotIndeks: 3.00, nilaiMinimal: 70.00, nilaiMaksimal: 74.99, keterangan: 'Baik' },
    { nilaiHuruf: 'B-', bobotIndeks: 2.75, nilaiMinimal: 65.00, nilaiMaksimal: 69.99, keterangan: 'Cukup Baik' },
    { nilaiHuruf: 'C+', bobotIndeks: 2.50, nilaiMinimal: 60.00, nilaiMaksimal: 64.99, keterangan: 'Lebih dari Cukup' },
    { nilaiHuruf: 'C',  bobotIndeks: 2.00, nilaiMinimal: 55.00, nilaiMaksimal: 59.99, keterangan: 'Cukup' },
    { nilaiHuruf: 'D',  bobotIndeks: 1.00, nilaiMinimal: 40.00, nilaiMaksimal: 54.99, keterangan: 'Kurang' },
    { nilaiHuruf: 'E',  bobotIndeks: 0.00, nilaiMinimal: 0.00,  nilaiMaksimal: 39.99, keterangan: 'Tidak Lulus' },
  ];

  for (const skala of skalaNilai) {
    await prisma.skalaNilai.upsert({
      where: { nilaiHuruf: skala.nilaiHuruf },
      update: skala,
      create: skala,
    });
  }
  console.log(`✅ SkalaNilai seeded (${skalaNilai.length} records)`);

  // 2. Seed Admin User
  const adminPassword = await bcrypt.hash('Admin@12345', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      namaLengkap: 'Super Administrator',
      email: 'admin@siakad.ac.id',
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.username} (password: Admin@12345)`);

  // 3. Seed User Keuangan
  const keuanganPassword = await bcrypt.hash('Keuangan@12345', 10);
  await prisma.user.upsert({
    where: { username: 'keuangan' },
    update: {},
    create: {
      username: 'keuangan',
      password: keuanganPassword,
      namaLengkap: 'Staf Keuangan',
      email: 'keuangan@siakad.ac.id',
      role: 'KEUANGAN',
    },
  });
  console.log('✅ Keuangan user seeded');

  // 4. Seed contoh Dosen
  const dosenPassword = await bcrypt.hash('Dosen@12345', 10);
  const dosenUser = await prisma.user.upsert({
    where: { username: '0101010001' },
    update: {},
    create: {
      username: '0101010001',
      password: dosenPassword,
      namaLengkap: 'Dr. Budi Santoso, M.Kom',
      email: 'budi.santoso@siakad.ac.id',
      role: 'DOSEN',
    },
  });
  await prisma.dosen.upsert({
    where: { nidn: '0101010001' },
    update: {},
    create: {
      nidn: '0101010001',
      userId: dosenUser.id,
      spesialisasi: 'Rekayasa Perangkat Lunak',
    },
  });
  console.log('✅ Contoh Dosen seeded');

  // 5. Seed contoh Mahasiswa
  const mahasiswaPassword = await bcrypt.hash('Mahasiswa@12345', 10);
  const mahasiswaUser = await prisma.user.upsert({
    where: { username: '20260001' },
    update: {},
    create: {
      username: '20260001',
      password: mahasiswaPassword,
      namaLengkap: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@student.siakad.ac.id',
      role: 'MAHASISWA',
    },
  });
  await prisma.mahasiswa.upsert({
    where: { nim: '20260001' },
    update: {},
    create: {
      nim: '20260001',
      userId: mahasiswaUser.id,
      angkatan: 2026,
      statusAkademik: 'AKTIF',
      dosenWaliId: '0101010001',
    },
  });
  console.log('✅ Contoh Mahasiswa seeded');

  // 6. Seed contoh MataKuliah
  const mataKuliah = [
    { kodeMk: 'MK001', namaMk: 'Pemrograman Web', sks: 3, semesterPaket: 3 },
    { kodeMk: 'MK002', namaMk: 'Basis Data', sks: 3, semesterPaket: 3 },
    { kodeMk: 'MK003', namaMk: 'Rekayasa Perangkat Lunak', sks: 3, semesterPaket: 5 },
    { kodeMk: 'MK004', namaMk: 'Jaringan Komputer', sks: 2, semesterPaket: 4 },
  ];

  for (const mk of mataKuliah) {
    await prisma.mataKuliah.upsert({
      where: { kodeMk: mk.kodeMk },
      update: mk,
      create: mk,
    });
  }
  console.log(`✅ MataKuliah seeded (${mataKuliah.length} records)`);

  console.log('\n🎉 Seed selesai!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
