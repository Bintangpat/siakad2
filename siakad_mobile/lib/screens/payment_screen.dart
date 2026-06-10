import 'package:flutter/material.dart';

class SiakadFinancialPage extends StatelessWidget {
  const SiakadFinancialPage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final isDesktop = MediaQuery.of(context).size.width >= 768;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(64.0),
        child: _FinancialAppBar(colorScheme: colorScheme, isDesktop: isDesktop),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(
            horizontal: isDesktop ? 40.0 : 16.0,
            vertical: 24.0,
          ),
          child: Center(
            child: Container(
              constraints: const BoxConstraints(maxWidth: 1280),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const _PageHeader(),
                  const SizedBox(height: 24.0),
                  if (isDesktop)
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          flex: 8,
                          child: Column(
                            children: [
                              _BillCard(colorScheme: colorScheme),
                              const SizedBox(height: 24.0),
                              const _PaymentMethodsGrid(),
                            ],
                          ),
                        ),
                        const SizedBox(width: 24.0),
                        Expanded(
                          flex: 4,
                          child: _TransactionHistory(colorScheme: colorScheme),
                        ),
                      ],
                    )
                  else
                    Column(
                      children: [
                        _BillCard(colorScheme: colorScheme),
                        const SizedBox(height: 24.0),
                        const _PaymentMethodsGrid(),
                        const SizedBox(height: 24.0),
                        _TransactionHistory(colorScheme: colorScheme),
                        const SizedBox(height: 80.0),
                      ],
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: AppBar
// ==========================================
class _FinancialAppBar extends StatelessWidget {
  final ColorScheme colorScheme;
  final bool isDesktop;

  const _FinancialAppBar({required this.colorScheme, required this.isDesktop});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: colorScheme.surface,
        border: Border(
          bottom: BorderSide(
            color: isDesktop ? Colors.transparent : colorScheme.outlineVariant,
            width: 1.0,
          ),
        ),
      ),
      padding: EdgeInsets.symmetric(horizontal: isDesktop ? 40.0 : 16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: colorScheme.surfaceContainer,
                  border: Border.all(color: colorScheme.outlineVariant),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(100),
                  child: Image.network(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDldtbAMUpYYTT82sAtH1dsasfeU59qB3BHm72hJTGTTPywljRiPkuZbHlTld_B-OcsMvYmuMS82OuinzS8HkwR6SWth5eN8IytmB1s1n54fRxF4r567PuOdV5WKlNOq8sNU8N5l_3omV1VPgrnqtfZOh-YHNZ_fZdHXekvW_ho6U-EPSDU1W7EgpcUfvRTMaJHpk7soNS27wGi9vBNdt3HISpLa8OCVaAOD-C_IeJJlwV6bBXBuBMUn77Ozq-EpOPVFyfcUWyIyk0',
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) =>
                        const Icon(Icons.person),
                  ),
                ),
              ),
              const SizedBox(width: 16.0),
              Text(
                'SIAKAD',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: colorScheme.primary,
                ),
              ),
            ],
          ),
          if (isDesktop)
            Row(
              children: [
                _buildDesktopNavItem('Dashboard', isActive: false),
                _buildDesktopNavItem('KRS', isActive: false),
                _buildDesktopNavItem('Financial', isActive: true),
                _buildDesktopNavItem('Profile', isActive: false),
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

  Widget _buildDesktopNavItem(String label, {required bool isActive}) {
    return Padding(
      padding: const EdgeInsets.only(right: 24.0),
      child: Container(
        decoration: BoxDecoration(
          color: isActive
              ? colorScheme.primaryContainer.withValues(alpha: 0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(8.0),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 4.0),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: isActive ? colorScheme.primary : colorScheme.secondary,
          ),
        ),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Page Header
// ==========================================
class _PageHeader extends StatelessWidget {
  const _PageHeader();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Informasi Keuangan',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: colorScheme.onSurface,
          ),
        ),
        const Padding(
          padding: EdgeInsets.only(top: 4.0), // Mengikuti konfigurasi mt-unit
          child: Text(
            'Kelola tagihan dan riwayat pembayaran Anda.',
            style: TextStyle(
              fontSize: 16,
              color: Color(0xFF4A4452), // on-surface-variant
            ),
          ),
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET: Bill Card
// ==========================================
class _BillCard extends StatelessWidget {
  final ColorScheme colorScheme;

  const _BillCard({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12.0),
        child: Stack(
          children: [
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      colorScheme.primaryFixed.withValues(alpha: 0.2),
                      Colors.transparent,
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(
                        Icons.account_balance_wallet,
                        color: colorScheme.primary,
                      ),
                      const SizedBox(width: 8.0),
                      Text(
                        'Total Tagihan',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w400,
                          color: colorScheme.onSurface,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24.0),
                  Text(
                    'Rp 5.000.000',
                    style: TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w600,
                      color: colorScheme.primary,
                      letterSpacing: -0.02,
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(top: 4.0), // mt-xs
                    child: Text(
                      'Semester Ganjil 2023/2024',
                      style: TextStyle(fontSize: 12, color: Color(0xFF4A4452)),
                    ),
                  ),
                  const SizedBox(height: 24.0),
                  // Breakdown Section
                  Container(
                    padding: const EdgeInsets.all(16.0),
                    decoration: BoxDecoration(
                      color: colorScheme.surface,
                      borderRadius: BorderRadius.circular(8.0),
                      border: Border.all(color: colorScheme.outlineVariant),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'RINCIAN',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF4A4452),
                          ),
                        ),
                        const SizedBox(height: 8.0),
                        _buildBreakdownRow(
                          'Uang Kuliah Tunggal (UKT)',
                          'Rp 4.500.000',
                          hasBorder: true,
                        ),
                        _buildBreakdownRow(
                          'Biaya Praktikum Lab',
                          'Rp 500.000',
                          hasBorder: false,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24.0),
                  // Actions Button Bar
                  LayoutBuilder(
                    builder: (context, constraints) {
                      bool useRow = constraints.maxWidth > 500;
                      return Flex(
                        direction: useRow ? Axis.horizontal : Axis.vertical,
                        children: [
                          Expanded(
                            flex: useRow ? 1 : 0,
                            child: SizedBox(
                              width: useRow ? null : double.infinity,
                              child: ElevatedButton.icon(
                                onPressed: () {},
                                icon: const Icon(Icons.payment, size: 18),
                                label: const Text('Pilih Metode Pembayaran'),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: colorScheme.primary,
                                  foregroundColor: colorScheme.onPrimary,
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 16.0,
                                    horizontal: 24.0,
                                  ),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(100),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          SizedBox(
                            width: useRow ? 16.0 : 0,
                            height: useRow ? 0 : 16.0,
                          ),
                          Expanded(
                            flex: useRow ? 1 : 0,
                            child: SizedBox(
                              width: useRow ? null : double.infinity,
                              child: OutlinedButton.icon(
                                onPressed: () {},
                                icon: const Icon(Icons.download, size: 18),
                                label: const Text('Unduh Invoice'),
                                style: OutlinedButton.styleFrom(
                                  side: BorderSide(color: colorScheme.primary),
                                  foregroundColor: colorScheme.primary,
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 16.0,
                                    horizontal: 24.0,
                                  ),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(100),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBreakdownRow(
    String title,
    String amount, {
    required bool hasBorder,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      decoration: BoxDecoration(
        border: hasBorder
            ? Border(
                bottom: BorderSide(
                  color: colorScheme.outlineVariant.withValues(alpha: 0.5),
                ),
              )
            : null,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 14, color: Color(0xFF1B1C1C)),
          ),
          Text(
            amount,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Color(0xFF1B1C1C),
            ),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Payment Methods Info Grid
// ==========================================
class _PaymentMethodsGrid extends StatelessWidget {
  const _PaymentMethodsGrid();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        bool useRow = constraints.maxWidth > 600;
        return Flex(
          direction: useRow ? Axis.horizontal : Axis.vertical,
          children: [
            Expanded(
              flex: useRow ? 1 : 0,
              child: const _PaymentMethodCard(
                icon: Icons.account_balance,
                title: 'Virtual Account (VA)',
                subtitle: 'BCA, BNI, Mandiri, BRI. Konfirmasi otomatis.',
              ),
            ),
            SizedBox(width: useRow ? 16.0 : 0, height: useRow ? 0 : 16.0),
            Expanded(
              flex: useRow ? 1 : 0,
              child: const _PaymentMethodCard(
                icon: Icons.qr_code_scanner,
                title: 'QRIS',
                subtitle: 'Scan dengan aplikasi e-wallet atau m-banking.',
              ),
            ),
          ],
        );
      },
    );
  }
}

class _PaymentMethodCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _PaymentMethodCard({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8.0),
            decoration: BoxDecoration(
              color: colorScheme.surfaceContainer,
              borderRadius: BorderRadius.circular(8.0),
            ),
            child: Icon(icon, color: colorScheme.primary),
          ),
          const SizedBox(width: 16.0),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: colorScheme.onSurface,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 4.0), // mt-xs
                  child: Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 14,
                      color: Color(0xFF4A4452),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Transaction History
// ==========================================
class _TransactionHistory extends StatelessWidget {
  final ColorScheme colorScheme;

  const _TransactionHistory({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    // Menggunakan Record Types (Dart 3+) untuk representasi mockup data
    final historyItems =
        <({String title, String date, String amount, String status})>[
          (
            title: 'UKT Semester Genap',
            date: '12 Feb 2023',
            amount: 'Rp 4.500.000',
            status: 'Lunas',
          ),
          (
            title: 'Biaya Jas Almamater',
            date: '10 Agu 2022',
            amount: 'Rp 250.000',
            status: 'Lunas',
          ),
          (
            title: 'UKT Semester Ganjil',
            date: '05 Agu 2022',
            amount: 'Rp 4.500.000',
            status: 'Lunas',
          ),
        ];

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Riwayat Transaksi',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: colorScheme.onSurface,
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: Text(
                    'Lihat Semua',
                    style: TextStyle(
                      color: colorScheme.primary,
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Divider(height: 1, color: colorScheme.outlineVariant),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: historyItems.length,
              separatorBuilder: (context, index) => const SizedBox(height: 8.0),
              itemBuilder: (context, index) {
                final item = historyItems[index];
                return Container(
                  padding: const EdgeInsets.all(8.0),
                  decoration: BoxDecoration(
                    color: Colors.transparent,
                    borderRadius: BorderRadius.circular(8.0),
                    border: Border.all(color: Colors.transparent),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8.0),
                            decoration: BoxDecoration(
                              color: const Color(
                                0xFF82f78d,
                              ).withValues(alpha: 0.2),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.check_circle,
                              color: Color(0xFF146c2e),
                              size: 14,
                            ),
                          ),
                          const SizedBox(width: 16.0),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                item.title,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: colorScheme.onSurface,
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(top: 2.0),
                                child: Text(
                                  item.date,
                                  style: const TextStyle(
                                    fontSize: 10,
                                    color: Color(0xFF4A4452),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            item.amount,
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: colorScheme.onSurface,
                            ),
                          ),
                          const Padding(
                            padding: EdgeInsets.only(top: 4.0), // mt-xs
                            child: _StatusBadge(label: 'Lunas'),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _StatusBadge extends StatelessWidget {
  final String label;
  const _StatusBadge({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 2.0),
      decoration: BoxDecoration(
        color: const Color(0xFF82f78d), // success-container
        borderRadius: BorderRadius.circular(4.0),
      ),
      child: const Text(
        'Lunas',
        style: TextStyle(
          color: Color(0xFF002106), // on-success-container
          fontSize: 10,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

