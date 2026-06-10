import 'package:flutter/material.dart';

class SiakadKrsPage extends StatelessWidget {
  const SiakadKrsPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Membaca skema warna bertema dari context (Mendukung Dark Mode)
    final theme = Theme.of(context);
    final colors = theme.colorScheme;

    return Scaffold(
      backgroundColor: colors.surface,
      appBar: AppBar(
        backgroundColor: colors.surface,
        elevation: 0,
        scrolledUnderElevation: 0,
        shape: Border(
          bottom: BorderSide(color: colors.outlineVariant, width: 1),
        ),
        leading: const Padding(
          padding: EdgeInsets.all(12.0),
          child: CircleAvatar(
            backgroundImage: NetworkImage(
              'https://lh3.googleusercontent.com/aida-public/AB6AXuB16S88D73K-FrV8MnblRBtnhog0UpfZCJEuunhZf1n780H0OroQr8-XV9YxaLMVllmbx5a9jUNyWxrJire9pelg6yb3Fw5m-PInw56Ouh7n2ffd6AZFNhfilrZHHLfYwAvXOZpX9DGq1WFMW9qPo-hxNkC547wGExfhE_F_AGvDmPVbSpNT9djE-q4nGBeRwRR7DFg1QIPN_wZmywuhZj58BA3U6uP-6Jbl1HcrEay_pUdX0Z5CY80HtVYjc7xTBd3A2fb_gLVrQA',
            ),
          ),
        ),
        title: Text(
          'SIAKAD Mobile',
          style: theme.textTheme.titleMedium?.copyWith(
            color: colors.primary,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            color: colors.primary,
            onPressed: () {},
          ),
        ],
      ),
      body: Stack(
        children: [
          // Konten Utama yang dapat di-scroll
          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.only(
                left: 16.0,
                right: 16.0,
                top: 24.0,
                bottom:
                    160.0, // Space aman ekstra untuk Floating Action Area & Bottom Nav
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  _KrsHeaderProgress(),
                  SizedBox(height: 16),
                  _CourseFilters(),
                  SizedBox(height: 16),
                  _CourseListSection(),
                ],
              ),
            ),
          ),

          // Fixed Action Area (Review & Ajukan KRS)
          Positioned(
            bottom: 24,
            left: 16,
            right: 16,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: colors.primary,
                foregroundColor: colors.onPrimary,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                elevation: 4,
              ),
              onPressed: () => Navigator.pushNamed(context, '/detail-krs'),
              icon: const Text(
                'Review & Ajukan KRS',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
              ),
              label: const Icon(Icons.arrow_forward, size: 20),
            ),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET 1: HEADER & PROGRESS SKS
// ==========================================
class _KrsHeaderProgress extends StatelessWidget {
  const _KrsHeaderProgress();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = theme.colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Pengisian KRS',
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
            color: colors.onSurface,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Semester Ganjil 2023/2024',
          style: theme.textTheme.bodySmall?.copyWith(
            color: colors.onSurfaceVariant,
          ),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: colors.surfaceContainerLowest,
            border: Border.all(color: colors.outlineVariant),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween, //
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'SISA KUOTA SKS',
                        style: theme.textTheme.labelSmall?.copyWith(
                          color: colors.onSurfaceVariant,
                          letterSpacing: 1.2,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.baseline,
                        textBaseline: TextBaseline.alphabetic,
                        children: [
                          Text(
                            '2',
                            style: theme.textTheme.headlineMedium?.copyWith(
                              color: colors.primary,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            ' / 24',
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: colors.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Text(
                    '22 Diambil',
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: colors.primary,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const Padding(
                padding: EdgeInsets.only(top: 8), //
                child: LinearProgressIndicator(
                  value: 22 / 24,
                  minHeight: 8,
                  borderRadius: BorderRadius.all(Radius.circular(4)),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET 2: FILTER MATA KULIAH
// ==========================================
class _CourseFilters extends StatelessWidget {
  const _CourseFilters();

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    // Data filter menggunakan Dart 3 Record Types
    final filters = [
      (label: 'Semua Mata Kuliah', isSelected: true),
      (label: 'Wajib', isSelected: false),
      (label: 'Pilihan', isSelected: false),
    ];

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      physics: const BouncingScrollPhysics(),
      child: Row(
        children: filters.map((filter) {
          return Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: ChoiceChip(
              label: Text(filter.label),
              selected: filter.isSelected,
              onSelected: (bool selected) {},
              selectedColor: colors.primary,
              backgroundColor: colors.surfaceContainer,
              labelStyle: TextStyle(
                color: filter.isSelected ? colors.onPrimary : colors.onSurface,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              side: filter.isSelected
                  ? BorderSide.none
                  : BorderSide(color: colors.outlineVariant),
              showCheckmark: false,
            ),
          );
        }).toList(),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET 3: SECTION DAFTAR MATA KULIAH
// ==========================================
class _CourseListSection extends StatelessWidget {
  const _CourseListSection();

  @override
  Widget build(BuildContext context) {
    // Mock data terstruktur menggunakan Record Types (Dart 3+) untuk menyederhanakan kode
    final List<
      ({
        String code,
        String title,
        int sks,
        String type,
        String schedule,
        String room,
        String status, // 'available', 'conflict', 'taken'
        String? warningMessage,
      })
    >
    courses = [
      (
        code: 'TIF301',
        title: 'Pemrograman Web',
        sks: 3,
        type: 'Wajib',
        schedule: 'Senin, 08:00 - 10:30',
        room: 'R. Multimedia',
        status: 'available',
        warningMessage: null,
      ),
      (
        code: 'TIF305',
        title: 'Basis Data Lanjut',
        sks: 3,
        type: 'Jadwal Bentrok',
        schedule: 'Senin, 09:00 - 11:30',
        room: 'Lab. Komputer 2',
        status: 'conflict',
        warningMessage: 'Bentrok dengan Pemrograman Web',
      ),
      (
        code: 'TIF307',
        title: 'Kecerdasan Buatan',
        sks: 3,
        type: 'Wajib',
        schedule: 'Selasa, 13:00 - 15:30',
        room: 'R. A201',
        status: 'available',
        warningMessage: null,
      ),
      (
        code: 'TIF410',
        title: 'Mobile Programming',
        sks: 3,
        type: 'Pilihan',
        schedule: 'Rabu, 08:00 - 10:30',
        room: 'Lab. Mac',
        status: 'taken',
        warningMessage: null,
      ),
    ];

    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: courses.length,
      separatorBuilder: (context, index) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final course = courses[index];
        final colors = Theme.of(context).colorScheme;
        final theme = Theme.of(context);

        // Menentukan warna & dekorasi kartu berdasarkan status state menggunakan Switch Expression (Dart 3)
        final cardDecoration = switch (course.status) {
          'conflict' => BoxDecoration(
            color: colors.errorContainer,
            border: Border.all(color: colors.error.withValues(alpha: 0.2)),
            borderRadius: BorderRadius.circular(8),
          ),
          'taken' => BoxDecoration(
            color: colors.surfaceContainerLow,
            border: Border.all(color: colors.primary.withValues(alpha: 0.2)),
            borderRadius: BorderRadius.circular(8),
          ),
          _ => BoxDecoration(
            color: colors.surfaceContainerLowest,
            border: Border.all(color: colors.outlineVariant),
            borderRadius: BorderRadius.circular(8),
          ),
        };

        return Stack(
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: cardDecoration,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween, //
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Tag Jenis/Status Matakuliah
                            _buildTypeBadge(
                              context,
                              course.type,
                              course.status,
                            ),
                            const SizedBox(height: 6),
                            Text(
                              course.title,
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: course.status == 'conflict'
                                    ? colors.onErrorContainer
                                    : colors.onSurface,
                              ),
                            ),
                            Text(
                              '${course.code} • ${course.sks} SKS',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: course.status == 'conflict'
                                    ? colors.onErrorContainer.withValues(alpha: 0.8)
                                    : colors.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Status Icon Utama di Kanan Atas
                      if (course.status == 'conflict')
                        Icon(Icons.warning_amber_rounded, color: colors.error)
                      else if (course.status == 'taken')
                        Icon(Icons.check_circle, color: colors.primary),
                    ],
                  ),
                  const SizedBox(height: 12),
                  // Waktu & Tempat Kuliah
                  Row(
                    children: [
                      Icon(
                        Icons.calendar_today,
                        size: 16,
                        color: course.status == 'conflict'
                            ? colors.onErrorContainer.withValues(alpha: 0.8)
                            : colors.onSurfaceVariant,
                      ),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          '${course.schedule} • ${course.room}',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: course.status == 'conflict'
                                ? colors.onErrorContainer.withValues(alpha: 0.8)
                                : colors.onSurfaceVariant,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.only(top: 8), //
                    child: Divider(height: 1, thickness: 0.5),
                  ),
                  const SizedBox(height: 12),
                  // Bagian Tombol Aksi di Bawah Kartu
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween, //
                    children: [
                      Expanded(
                        child: course.status == 'conflict'
                            ? Text(
                                course.warningMessage ?? '',
                                style: theme.textTheme.labelSmall?.copyWith(
                                  color: colors.onErrorContainer,
                                ),
                              )
                            : const SizedBox.shrink(),
                      ),
                      _buildActionButton(context, course.status),
                    ],
                  ),
                ],
              ),
            ),
            // Indikator Garis Kiri Biru khusus untuk status 'taken' (Diambil)
            if (course.status == 'taken')
              Positioned(
                top: 0,
                bottom: 0,
                right: 0,
                child: Container(
                  width: 6,
                  decoration: BoxDecoration(
                    color: colors.primary,
                    borderRadius: const BorderRadius.only(
                      topRight: Radius.circular(8),
                      bottomRight: Radius.circular(8),
                    ),
                  ),
                ),
              ),
          ],
        );
      },
    );
  }

  Widget _buildTypeBadge(BuildContext context, String type, String status) {
    final colors = Theme.of(context).colorScheme;

    final (bgColor, textColor) = switch (status) {
      'conflict' => (colors.error, colors.onError),
      'taken' => (colors.surfaceContainerHigh, colors.onSurfaceVariant),
      _ => (colors.primaryContainer.withValues(alpha: 0.3), colors.primary),
    };

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        type,
        style: TextStyle(
          color: textColor,
          fontSize: 10,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _buildActionButton(BuildContext context, String status) {
    final colors = Theme.of(context).colorScheme;

    return switch (status) {
      'conflict' => TextButton(
        style: TextButton.styleFrom(
          backgroundColor: colors.surfaceContainerLowest,
          disabledForegroundColor: colors.outline,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
        ),
        onPressed: null, // Disabled
        child: const Text(
          'Ambil',
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
        ),
      ),
      'taken' => OutlinedButton(
        style: OutlinedButton.styleFrom(
          side: BorderSide(color: colors.outline),
          foregroundColor: colors.onSurface,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
        ),
        onPressed: () {},
        child: const Text(
          'Batal',
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
        ),
      ),
      _ => ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: colors.primary,
          foregroundColor: colors.onPrimary,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          elevation: 0,
        ),
        onPressed: () {},
        child: const Text(
          'Ambil',
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
        ),
      ),
    };
  }
}

