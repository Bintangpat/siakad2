import 'package:flutter/material.dart';

class PresensiScreen extends StatefulWidget {
  const PresensiScreen({super.key});

  @override
  State<PresensiScreen> createState() => _PresensiScreenState();
}

class _PresensiScreenState extends State<PresensiScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  static const _courses = [
    (name: 'Pemrograman Web', code: 'TIF301', hadir: 10, total: 12),
    (name: 'Kecerdasan Buatan', code: 'TIF307', hadir: 11, total: 12),
    (name: 'Mobile Programming', code: 'TIF410', hadir: 9, total: 12),
    (name: 'Jaringan Komputer', code: 'TIF312', hadir: 12, total: 12),
    (name: 'Rekayasa Perangkat Lunak', code: 'TIF315', hadir: 8, total: 12),
    (name: 'Statistika & Probabilitas', code: 'TIF320', hadir: 10, total: 12),
  ];

  static const _recentAttendance = [
    (date: 'Senin, 9 Jun 2025', subject: 'Pemrograman Web', status: 'hadir'),
    (date: 'Selasa, 10 Jun 2025', subject: 'Kecerdasan Buatan', status: 'hadir'),
    (date: 'Rabu, 11 Jun 2025', subject: 'Mobile Programming', status: 'hadir'),
    (date: 'Kamis, 12 Jun 2025', subject: 'Jaringan Komputer', status: 'izin'),
    (date: 'Jumat, 13 Jun 2025', subject: 'Rekayasa PL', status: 'alfa'),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Color _statusColor(String status, ColorScheme cs) => switch (status) {
        'hadir' => Colors.green,
        'izin' => cs.tertiary,
        _ => cs.error,
      };

  IconData _statusIcon(String status) => switch (status) {
        'hadir' => Icons.check_circle_rounded,
        'izin' => Icons.info_rounded,
        _ => Icons.cancel_rounded,
      };

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: cs.surface,
      appBar: AppBar(
        title: const Text('Presensi'),
        backgroundColor: cs.surface,
        elevation: 0,
        scrolledUnderElevation: 1,
        shape: Border(bottom: BorderSide(color: cs.outlineVariant, width: 1)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: cs.primary,
          labelColor: cs.primary,
          unselectedLabelColor: cs.onSurfaceVariant,
          tabs: const [
            Tab(text: 'Rekap per MK'),
            Tab(text: 'Riwayat'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Tab 1 — Per mata kuliah
          ListView(
            padding: const EdgeInsets.all(16),
            children: [
              // Overall summary card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [cs.primary, cs.primaryContainer],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _SummaryChip(label: 'Hadir', value: '60', icon: Icons.check_circle_outline),
                    _SummaryChip(label: 'Izin', value: '4', icon: Icons.info_outline),
                    _SummaryChip(label: 'Alfa', value: '8', icon: Icons.cancel_outlined),
                    _SummaryChip(label: 'Rerata', value: '88%', icon: Icons.bar_chart_rounded),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              ..._courses.map((c) {
                final pct = c.hadir / c.total;
                final warn = pct < 0.75;
                return Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: warn
                        ? cs.errorContainer.withValues(alpha: 0.3)
                        : cs.surfaceContainerLowest,
                    border: Border.all(
                      color: warn ? cs.error.withValues(alpha: 0.3) : cs.outlineVariant,
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              c.name,
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: cs.onSurface,
                                fontSize: 13,
                              ),
                            ),
                          ),
                          if (warn)
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: cs.errorContainer,
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                'Peringatan',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: cs.onErrorContainer,
                                ),
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        c.code,
                        style: TextStyle(fontSize: 11, color: cs.onSurfaceVariant),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(4),
                              child: LinearProgressIndicator(
                                value: pct,
                                minHeight: 8,
                                backgroundColor: cs.outlineVariant.withValues(alpha: 0.3),
                                color: warn ? cs.error : Colors.green,
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Text(
                            '${c.hadir}/${c.total}',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: warn ? cs.error : Colors.green[700],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              }),
            ],
          ),

          // Tab 2 — Recent attendance
          ListView(
            padding: const EdgeInsets.all(16),
            children: _recentAttendance.map((a) {
              final color = _statusColor(a.status, cs);
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                decoration: BoxDecoration(
                  color: cs.surfaceContainerLowest,
                  border: Border.all(color: cs.outlineVariant),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  children: [
                    Icon(_statusIcon(a.status), color: color, size: 28),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            a.subject,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              color: cs.onSurface,
                              fontSize: 13,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            a.date,
                            style: TextStyle(fontSize: 11, color: cs.onSurfaceVariant),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: color.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        a.status.toUpperCase(),
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: color,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}

class _SummaryChip extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;

  const _SummaryChip({
    required this.label,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white.withValues(alpha: 0.8), size: 20),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withValues(alpha: 0.75),
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}
