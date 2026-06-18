import 'package:flutter/material.dart';

class SiakadPresensiPage extends StatelessWidget {
  const SiakadPresensiPage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(64.0),
        child: _PresensiAppBar(colorScheme: colorScheme),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(
            horizontal: 16.0,
            vertical: 24.0, // Translasi py-lg ke vertical padding
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _ScannerViewPlaceholder(colorScheme: colorScheme),
              const SizedBox(height: 24.0), // Jarak gap-lg
              _ActiveClassCard(colorScheme: colorScheme),
              const SizedBox(height: 24.0), // Jarak gap-lg
              _AttendanceHistorySummary(colorScheme: colorScheme),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: AppBar Komponen
// ==========================================
class _PresensiAppBar extends StatelessWidget {
  final ColorScheme colorScheme;

  const _PresensiAppBar({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: colorScheme.surface,
        border: Border(
          bottom: BorderSide(
            color: colorScheme.outlineVariant,
            width: 1.0,
          ),
        ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween, // Diwajibkan membagi sisi kiri dan kanan appBar
        children: [
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back),
                color: colorScheme.primary,
                onPressed: () {},
              ),
              const SizedBox(width: 8.0), // Setara gap-sm
              Text(
                'Presensi Kehadiran',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: colorScheme.primary,
                ),
              ),
            ],
          ),
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            color: colorScheme.primary,
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Scanner View Placeholder
// ==========================================
class _ScannerViewPlaceholder extends StatelessWidget {
  final ColorScheme colorScheme;

  const _ScannerViewPlaceholder({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 288, // Setara h-72 murni
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24.0), // Setara rounded-3xl
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24.0),
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Simulasi Latar Belakang Kamera Feed (Grid Pattern)
            Positioned.fill(
              child: Container(
                color: colorScheme.surfaceContainerHigh.withOpacity(0.3),
                child: Opacity(
                  opacity: 0.4,
                  child: GridPaper(
                    color: colorScheme.outlineVariant,
                    interval: 20,
                    subdivisions: 1,
                  ),
                ),
              ),
            ),
            // Lapisan Gradasi Warna Pemindai (.scanner-overlay)
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      colorScheme.primary.withOpacity(0.0),
                      colorScheme.primary.withOpacity(0.05),
                    ],
                  ),
                ),
              ),
            ),
            // Bingkai Viewfinder & Animasi Garis Scan Statis
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 192, // Setara w-48
                  height: 192, // Setara h-48
                  decoration: BoxDecoration(
                    border: Border.all(color: colorScheme.primary.withOpacity(0.2), width: 2),
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  child: Stack(
                    children: [
                      // Siku Sudut Kiri Atas
                      Positioned(
                        top: 0, left: 0,
                        child: Container(width: 32, height: 32, decoration: BoxDecoration(border: Border(top: BorderSide(color: colorScheme.primary, width: 4), left: BorderSide(color: colorScheme.primary, width: 4)), borderRadius: const BorderRadius.only(topLeft: Radius.circular(12))))),
                      // Siku Sudut Kanan Atas
                      Positioned(
                        top: 0, right: 0,
                        child: Container(width: 32, height: 32, decoration: BoxDecoration(border: Border(top: BorderSide(color: colorScheme.primary, width: 4), right: BorderSide(color: colorScheme.primary, width: 4)), borderRadius: const BorderRadius.only(topRight: Radius.circular(12))))),
                      // Siku Sudut Kiri Bawah
                      Positioned(
                        bottom: 0, left: 0,
                        child: Container(width: 32, height: 32, decoration: BoxDecoration(border: Border(bottom: BorderSide(color: colorScheme.primary, width: 4), left: BorderSide(color: colorScheme.primary, width: 4)), borderRadius: const BorderRadius.only(bottomLeft: Radius.circular(12))))),
                      // Siku Sudut Kanan Bawah
                      Positioned(
                        bottom: 0, right: 0,
                        child: Container(width: 32, height: 32, decoration: BoxDecoration(border: Border(bottom: BorderSide(color: colorScheme.primary, width: 4), right: BorderSide(color: colorScheme.primary, width: 4)), borderRadius: const BorderRadius.only(bottomRight: Radius.circular(12))))),
                      // Ikon QR Pemindai Tengah
                      Center(
                        child: Icon(Icons.qr_code_scanner, size: 48, color: colorScheme.primary.withOpacity(0.4)),
                      ),
                      // Garis Simulasi Efek Laser Scan (.animate-scan)
                      Center(
                        child: Container(
                          width: double.infinity,
                          height: 2,
                          decoration: BoxDecoration(
                            color: colorScheme.primary,
                            boxShadow: [
                              BoxShadow(color: colorScheme.primary.withOpacity(0.8), blurRadius: 8, spreadRadius: 1),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 16.0, left: 16.0, right: 16.0), // Setara mt-md
                  child: Text(
                    'Arahkan kamera ke QR Code di layar proyektor kelas',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 14,
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Active Class Card (Sedang Berlangsung)
// ==========================================
class _ActiveClassCard extends StatelessWidget {
  final ColorScheme colorScheme;

  const _ActiveClassCard({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0), // Setara p-md
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.0), // Setara rounded-2xl
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween, // Diwajibkan membagi judul & ikon komputer luar
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  cross CrossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                      decoration: BoxDecoration(
                        color: colorScheme.primaryFixed,
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                      child: Text(
                        'Sedang Berlangsung',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w500,
                          color: colorScheme.onPrimaryFixed,
                        ),
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.only(top: 8.0), // Jarak atas elemen teks judul terikat secara eksplisit
                      child: Text(
                        'Pemrograman Web',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 8.0), // Jarak atas elemen info terikat secara eksplisit
                      child: Row(
                        children: [
                          Icon(Icons.location_on, size: 16, color: colorScheme.onSurfaceVariant),
                          const SizedBox(width: 4.0), // Setara gap-xs
                          Text(
                            'Ruang 3.2',
                            style: TextStyle(fontSize: 14, color: colorScheme.onSurfaceVariant),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: colorScheme.surfaceContainer,
                  borderRadius: BorderRadius.circular(12.0), // Setara rounded-xl
                  border: Border.all(color: colorScheme.outlineVariant.withOpacity(0.5)),
                ),
                child: Icon(Icons.computer, color: colorScheme.primary),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0), // Pemisah hr vertikal padding
            child: Divider(color: colorScheme.outlineVariant.withOpacity(0.5)),
          ),
          Row(
            children: [
              Icon(Icons.person_outline, size: 20, color: colorScheme.onSurfaceVariant),
              const SizedBox(width: 8.0), // Setara gap-sm
              RichText(
                text: const TextSpan(
                  text: 'Dosen: ',
                  style: TextStyle(fontSize: 14, color: Colors.black),
                  children: [
                    TextSpan(text: 'Dr. Budi', style: TextStyle(fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8.0), // Setara gap-sm
          Row(
            children: [
              Icon(Icons.schedule, size: 20, color: colorScheme.onSurfaceVariant),
              const SizedBox(width: 8.0), // Setara gap-sm
              RichText(
                text: const TextSpan(
                  text: 'Waktu: ',
                  style: TextStyle(fontSize: 14, color: Colors.black),
                  children: [
                    TextSpan(text: '08:00 - 10:30', style: TextStyle(fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Attendance History Summary
// ==========================================
class _AttendanceHistorySummary extends StatelessWidget {
  final ColorScheme colorScheme;

  const _AttendanceHistorySummary({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    // Memanfaatkan keandalan Record Types (Dart 3+) untuk manajemen kumpulan data mockup internal
    final attendanceSummary = <({String code, String title, String encounters, String status, String type})>[
      (code: 'PW', title: 'Pemrograman Web', encounters: '14/16 Pertemuan', status: '90%', type: 'success'),
      (code: 'DB', title: 'Database Systems', encounters: '12/16 Pertemuan', status: '85%', type: 'info'),
      (code: 'AL', title: 'Algoritma', encounters: '9/16 Pertemuan', status: '56%', type: 'warning'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'RINGKASAN KEHADIRAN',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurfaceVariant,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 8.0),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: attendanceSummary.length,
          separatorBuilder: (context, index) => const SizedBox(height: 8.0),
          itemBuilder: (context, index) {
            final course = attendanceSummary[index];

            return Container(
              padding: const EdgeInsets.all(8.0), // Setara p-sm murni
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12.0), // Setara rounded-xl
                border: Border.all(color: colorScheme.outlineVariant),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween, // Memaksa info judul & status ke ujung luar kiri-kanan
                children: [
                  Row(
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: course.type == 'warning'
                              ? colorScheme.errorContainer.withOpacity(0.3)
                              : colorScheme.surfaceContainer,
                          borderRadius: BorderRadius.circular(8.0), // Setara rounded-lg
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          course.code,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: course.type == 'warning' ? colorScheme.error : colorScheme.primary,
                          ),
                        ),
                      ),
                      const SizedBox(width: 16.0), // Setara gap-md
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            course.title,
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 2.0),
                            child: Text(
                              course.encounters,
                              style: TextStyle(fontSize: 12, color: colorScheme.onSurfaceVariant),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  // Pencocokan Pola Modern (Switch Expression Dart 3) untuk visualisasi status item kustom
                  Row(
                    children: [
                      Text(
                        course.status,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: switch (course.type) {
                            'success' => const Color(0xFF146c2e), // Setara text-success
                            'warning' => colorScheme.error,      // Setara text-error
                            _ => colorScheme.onSurface,
                          },
                        ),
                      ),
                      const SizedBox(width: 4.0),
                      Icon(
                        switch (course.type) {
                          'success' => Icons.check_circle,
                          'warning' => Icons.warning,
                          _ => Icons.info,
                        },
                        size: 16,
                        color: switch (course.type) {
                          'success' => const Color(0xFF146c2e),
                          'warning' => colorScheme.error,
                          _ => colorScheme.onSurfaceVariant,
                        },
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}