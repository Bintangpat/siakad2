import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class NewsDetailScreen extends StatelessWidget {
  const NewsDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: cs.surface,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 240,
            pinned: true,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: CircleAvatar(
                backgroundColor: cs.surface.withValues(alpha: 0.85),
                child: IconButton(
                  icon: Icon(Icons.arrow_back, color: cs.onSurface),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Image.network(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAdQVryTrtxD1AXkmXvYT_FrtAzOWn2in9Zp2hj94yJC5MJMvvTqD4LbsaYr8xhggBwLKcApQYYPFjMXy-lQG4BMk39KKiDx8NZl_QHEI2_cmizXVAOtvDKuO5_8xTl8klT78mSnW6LdU_8yFVggWn44C-INZRaFZjmyHZ2iUC0HZAAWBMBBqgntySMx-rZTBPDyKMhExlQZTTzyj9wMH3gdX5IVqTWDlRsdfaZszDzv3MDe7BKpaybl-UPe-r2W8L2sSuVoH-bgRc',
                fit: BoxFit.cover,
                errorBuilder: (context, error, stack) => Container(
                  color: cs.primaryContainer,
                  child: Icon(Icons.article_outlined, size: 64, color: cs.primary),
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: cs.primaryContainer.withValues(alpha: 0.3),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      'Akademik',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: cs.primary,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Jadwal UAS Semester Ganjil TA 2024/2025',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: cs.onSurface,
                      height: 1.3,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Icon(Icons.access_time_rounded, size: 14, color: cs.onSurfaceVariant),
                      const SizedBox(width: 4),
                      Text(
                        'Hari ini • Biro Akademik',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 12,
                          color: cs.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  const Divider(height: 32),
                  Text(
                    'Berdasarkan kalender akademik Universitas, Ujian Akhir Semester (UAS) Ganjil Tahun Akademik 2024/2025 akan dilaksanakan mulai tanggal 20 Januari 2025 hingga 1 Februari 2025.\n\nMahasiswa diharapkan untuk memperhatikan jadwal dan ruang ujian masing-masing mata kuliah yang telah dipublikasikan melalui portal akademik.\n\nPeraturan Ujian:\n• Mahasiswa wajib hadir 15 menit sebelum ujian dimulai.\n• Membawa Kartu Ujian yang telah ditandatangani oleh Dosen Pembimbing Akademik.\n• Pakaian harus sesuai dengan aturan universitas (kemeja berkerah).\n• Dilarang keras membawa alat komunikasi ke dalam ruang ujian.',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      color: cs.onSurface,
                      height: 1.7,
                    ),
                  ),
                  const SizedBox(height: 32),
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.download_outlined),
                      label: const Text('Unduh Jadwal Lengkap'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: cs.primary,
                        side: BorderSide(color: cs.primary),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
