import 'package:flutter/material.dart';
import 'main_shell.dart';

class SiakadDashboardPage extends StatelessWidget {
  const SiakadDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      // --- TopAppBar ---
      appBar: AppBar(
        backgroundColor: colorScheme.surface,
        elevation: 0,
        scrolledUnderElevation: 1,
        shape: Border(
          bottom: BorderSide(color: colorScheme.outlineVariant, width: 1),
        ),
        leading: Padding(
          padding: const EdgeInsets.all(12.0),
          child: GestureDetector(
            onTap: () => MainShellScreen.switchTab(context, 4), // Handle profile tap
            child: CircleAvatar(
              radius: 16,
              backgroundColor: colorScheme.outlineVariant,
              backgroundImage: const NetworkImage(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAjHCFqjA7p7WVbPynt2Cc7G3vLVMrXV-xjoyIOshZYxJTFCJVJWZWfNR3w6Vzr9fzblKTbX1mM8cqF9v3WtsophaE9zNxZ0qK5JEmNbeakfWH74hAjcx0H8c4MfvQZ9biHDaZ2MgKMm7btJqK-vmKZkpWUB3UAVMRTYdUhH0mqqqIPm25Ws-UjgUNb3lSSFyfBLHfGEFrlETz-2tZ6ZK0mlsOnNBpj9oCmys_BR0rMKilirLFLWupxEPnjP71MOfn_lk75rmNqlUU',
              ),
            ),
          ),
        ),
        title: Text(
          'SIAKAD Mobile',
          style: TextStyle(
            color: colorScheme.primary,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none),
            color: colorScheme.primary,
            onPressed: () {},
          ),
        ],
      ),

      // --- Main Content Canvas ---
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Welcome Section
              const _WelcomeSection(),
              const SizedBox(height: 24),

              // Quick Stats Row
              const _QuickStatsRow(),
              const SizedBox(height: 24),

              // Quick Actions
              const _QuickActionsSection(),
              const SizedBox(height: 24),

              // Financial Card
              const _FinancialCard(),
              const SizedBox(height: 24),

              // Announcements Section
              const _AnnouncementsSection(),
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGETS (Didekonstruksi agar rapi)
// ==========================================

class _WelcomeSection extends StatelessWidget {
  const _WelcomeSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Halo, Ahmad!',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Theme.of(context).colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Teknik Informatika • Semester 5',
          style: TextStyle(
            fontSize: 14,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }
}

class _QuickStatsRow extends StatelessWidget {
  const _QuickStatsRow();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: _StatCard(
            icon: Icons.school,
            title: 'IPK Kumulatif',
            value: '3.85',
            onTap: () => MainShellScreen.switchTab(context, 2),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: _StatCard(
            icon: Icons.local_library,
            title: 'SKS Aktif',
            value: '22',
            unit: ' SKS',
            onTap: () => MainShellScreen.switchTab(context, 1),
          ),
        ),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String value;
  final String? unit;
  final VoidCallback? onTap;

  const _StatCard({
    required this.icon,
    required this.title,
    required this.value,
    this.unit,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: colorScheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: colorScheme.outlineVariant),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 20, color: colorScheme.primary),
              const SizedBox(width: 4),
              Text(
                title,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          RichText(
            text: TextSpan(
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: colorScheme.onSurface,
              ),
              children: [
                TextSpan(text: value),
                if (unit != null)
                  TextSpan(
                    text: unit,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    ),
   );
  }
}

class _FinancialCard extends StatelessWidget {
  const _FinancialCard();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Stack(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: colorScheme.surfaceContainerLowest,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: colorScheme.outlineVariant),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(
                            Icons.info_outline,
                            size: 16,
                            color: colorScheme.error,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            'Tagihan UKT Aktif',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Rp 5.000.000',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: colorScheme.onSurface,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Jatuh tempo: 15 Okt 2024',
                        style: TextStyle(
                          fontSize: 14,
                          color: colorScheme.error,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: colorScheme.errorContainer,
                      borderRadius: BorderRadius.circular(2),
                    ),
                    child: Text(
                      'Belum Lunas',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w500,
                        color: colorScheme.onErrorContainer,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: colorScheme.primary,
                  foregroundColor: colorScheme.onPrimary,
                  minimumSize: const Size(double.infinity, 48),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  elevation: 0,
                ),
                onPressed: () => MainShellScreen.switchTab(context, 3),
                icon: const Icon(
                  Icons.account_balance_wallet_outlined,
                  size: 20,
                ),
                label: const Text(
                  'Bayar Sekarang',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
        // Efek Blur/Dekorasi Lingkaran dari Tailwind (Absolute Position)
        Positioned(
          top: -32,
          right: -32,
          child: Container(
            width: 128,
            height: 128,
            decoration: BoxDecoration(
              color: colorScheme.primaryContainer.withValues(alpha: 0.05),
              shape: BoxShape.circle,
            ),
          ),
        ),
      ],
    );
  }
}

class _AnnouncementsSection extends StatelessWidget {
  const _AnnouncementsSection();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    // Data mockup pengumuman menggunakan Record Types (Dart 3+)
    const announcements = <({String imageUrl, String tag, String title, String time})>[
      (
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAdQVryTrtxD1AXkmXvYT_FrtAzOWn2in9Zp2hj94yJC5MJMvvTqD4LbsaYr8xhggBwLKcApQYYPFjMXy-lQG4BMk39KKiDx8NZl_QHEI2_cmizXVAOtvDKuO5_8xTl8klT78mSnW6LdU_8yFVggWn44C-INZRaFZjmyHZ2iUC0HZAAWBMBBqgntySMx-rZTBPDyKMhExlQZTTzyj9wMH3gdX5IVqTWDlRsdfaZszDzv3MDe7BKpaybl-UPe-r2W8L2sSuVoH-bgRc',
        tag: 'Akademik',
        title: 'Jadwal UAS Semester Ganjil TA 2024/2025',
        time: 'Hari ini',
      ),
      (
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCUPbjpNyRjuvm4Ueen_fBx8YMa_vakVVGKwd1HYuW4xCPAwm885wdQEcWvrwvvyeJY0WGkvWlF8ijXAo3JCJKevFYQyLy29fNSccX5K4M4W9uxJnSwyn8HgcBg6toRM_V8U_M9cJcKeu8DJEgUy4MPzOUkvbg9tvxTsvs0CUSKvu9GlTQoli7b03uiBWXMbzFoqE2evfm11A0pDbBsSew6gzaoSDsVQLeqQAXpD-vq5lFvsMUiMvypmIPlB1uAMlQ1hOGfRc_TJwo',
        tag: 'Kemahasiswaan',
        title: 'Info Pendaftaran Beasiswa Prestasi Djarum 2024',
        time: 'Kemarin',
      ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Pengumuman Terbaru',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: colorScheme.onSurface,
              ),
            ),
            TextButton(
              onPressed: () {},
              child: Text(
                'Lihat Semua',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                  color: colorScheme.primary,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        // Horizontal Scrollable Cards (Flex overflow-x-auto)
        SizedBox(
          height: 210,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: announcements.length,
            separatorBuilder: (context, index) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final item = announcements[index];
              return Container(
                width: 260,
                decoration: BoxDecoration(
                  color: colorScheme.surfaceContainerLowest,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: colorScheme.outlineVariant),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.05),
                      blurRadius: 4,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Image Header
                    ClipRRect(
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(11),
                      ),
                      child: Image.network(
                        item.imageUrl,
                        height: 96,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Container(
                          height: 96,
                          color: colorScheme.surfaceContainerLow,
                        ),
                      ),
                    ),
                    // Content
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item.tag,
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w500,
                                color: item.tag == 'Akademik'
                                    ? colorScheme.primary
                                    : colorScheme.surfaceTint,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              item.title,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: colorScheme.onSurface,
                              ),
                            ),
                            const Spacer(),
                            Container(
                              padding: const EdgeInsets.only(top: 8),
                              decoration: BoxDecoration(
                                border: Border(
                                  top: BorderSide(
                                    color: colorScheme.outlineVariant
                                        .withValues(alpha: 0.5),
                                    width: 1,
                                  ),
                                ),
                              ),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    item.time,
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: colorScheme.onSurfaceVariant,
                                    ),
                                  ),
                                  GestureDetector(
                                    onTap: () => Navigator.pushNamed(context, '/news'),
                                    child: Text(
                                      'Baca',
                                      style: TextStyle(
                                        fontSize: 11,
                                        fontWeight: FontWeight.bold,
                                        color: colorScheme.primary,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _QuickActionsSection extends StatelessWidget {
  const _QuickActionsSection();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    final List<({IconData icon, String label, Color color, VoidCallback onTap})> actions = [
      (
        icon: Icons.qr_code_scanner,
        label: 'Presensi',
        color: const Color(0xFF6200EE),
        onTap: () => Navigator.pushNamed(context, '/presensi'),
      ),
      (
        icon: Icons.assignment_outlined,
        label: 'KRS',
        color: const Color(0xFF03DAC6),
        onTap: () => MainShellScreen.switchTab(context, 1),
      ),
      (
        icon: Icons.school_outlined,
        label: 'KHS',
        color: const Color(0xFFFF0266),
        onTap: () => MainShellScreen.switchTab(context, 2),
      ),
      (
        icon: Icons.payments_outlined,
        label: 'Tagihan',
        color: const Color(0xFFCF6679),
        onTap: () => MainShellScreen.switchTab(context, 3),
      ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Menu Pintar',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: actions.map((action) {
            return InkWell(
              onTap: action.onTap,
              borderRadius: BorderRadius.circular(16),
              child: Container(
                width: 72,
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Column(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: action.color.withValues(alpha: 0.1),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        action.icon,
                        color: action.color,
                        size: 24,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      action.label,
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: colorScheme.onSurface,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
