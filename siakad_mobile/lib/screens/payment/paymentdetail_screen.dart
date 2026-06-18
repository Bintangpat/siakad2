import 'package:flutter/material.dart';

class SiakadPaymentDetailPage extends StatelessWidget {
  const SiakadPaymentDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(56.0),
        child: _PaymentDetailAppBar(colorScheme: colorScheme),
      ),
      body: SafeArea(
        child: Stack(
          children: [
            SingleChildScrollView(
              // Padding bottom 140.0 memastikan konten terbawah tidak terpotong oleh sticky button
              padding: const EdgeInsets.only(
                left: 16.0,
                right: 16.0,
                top: 24.0,
                bottom: 140.0,
              ),
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1280),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _UrgencyBanner(colorScheme: colorScheme),
                      const SizedBox(height: 24.0),
                      _VirtualAccountCard(colorScheme: colorScheme),
                      const SizedBox(height: 24.0),
                      _PaymentBreakdownCard(colorScheme: colorScheme),
                      const SizedBox(height: 24.0),
                      _InstructionsAccordionGroup(colorScheme: colorScheme),
                    ],
                  ),
                ),
              ),
            ),
            // Sticky Bottom Action Area
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: _StickyActionFooter(colorScheme: colorScheme),
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: AppBar Komponen
// ==========================================
class _PaymentDetailAppBar extends StatelessWidget {
  final ColorScheme colorScheme;

  const _PaymentDetailAppBar({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: colorScheme.surface,
        border: Border(
          bottom: BorderSide(color: colorScheme.outlineVariant, width: 1.0),
        ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment
            .spaceBetween, // Mengunci keselarasan ujung ke ujung
        children: [
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back),
                color: colorScheme.onSurface,
                onPressed: () => Navigator.pop(context),
              ),
              const SizedBox(width: 16.0),
              Text(
                'Detail Pembayaran',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: colorScheme.primary,
                ),
              ),
            ],
          ),
          IconButton(
            icon: const Icon(Icons.help_outline),
            color: colorScheme.primary,
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Urgency Countdown Banner
// ==========================================
class _UrgencyBanner extends StatelessWidget {
  final ColorScheme colorScheme;

  const _UrgencyBanner({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: colorScheme.errorContainer,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.error.withValues(alpha: 0.2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment
            .spaceBetween, // Jajaran pembagi teks label dan timer countdown
        children: [
          Row(
            children: [
              Icon(Icons.timer_outlined, color: colorScheme.error),
              const SizedBox(width: 12.0),
              Text(
                'Bayar dalam',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: colorScheme.onErrorContainer,
                ),
              ),
            ],
          ),
          Text(
            '23:59:59',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: colorScheme.error,
              letterSpacing: -0.5,
            ),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Virtual Account Number Card
// ==========================================
class _VirtualAccountCard extends StatelessWidget {
  final ColorScheme colorScheme;

  const _VirtualAccountCard({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment
                .spaceBetween, // Memisahkan judul info dan logo bank
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'METODE PEMBAYARAN',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: colorScheme.onSurfaceVariant,
                      letterSpacing: 0.5,
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(
                      top: 8.0,
                    ), // Diwajibkan eksplisit top 8 untuk penataan teks terikat
                    child: Text(
                      'BCA Virtual Account',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              Container(
                width: 80,
                height: 40,
                padding: const EdgeInsets.all(4.0),
                decoration: BoxDecoration(
                  color: colorScheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(4.0),
                  border: Border.all(color: colorScheme.outlineVariant),
                ),
                child: Image.network(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLcgWETkwgQNsxss5gAruolyVhBDAseLXrVpSsA83fVbdy1BjK5b5YFXvlymbIwIuyGnC-I18drYlix9caCkFjpvYzeUO-U7CB9s7g2lrIqnt4WT3y_1bBRlJTUWc71pFH9hZfK4w6PWiK76NMWXUQiKiuM3OZwZ5-yI44mhnVGZ1xJlqJI2bDfX_rFp4r0eKib9zo_YxR7EcLEQdXPlaJGl8h6Ve56ZwnJRpXMkWycYX7FfCl_YW0CHeohz39jR1Sv23GIoIcXyk',
                  fit: BoxFit
                      .contain, // Penggunaan aman BoxFit contain untuk logo finansial perbankan
                  errorBuilder: (context, error, stackTrace) =>
                      const Icon(Icons.credit_card),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24.0),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24.0),
            decoration: BoxDecoration(
              color: colorScheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(8.0),
              border: Border.all(
                color: colorScheme.outlineVariant.withValues(alpha: 0.3),
              ),
            ),
            child: Column(
              children: [
                Text(
                  'Nomor Virtual Account',
                  style: TextStyle(
                    fontSize: 14,
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.only(
                    top: 8.0,
                  ), // Diwajibkan top 8 untuk memisahkan title & data utama
                  child: Text(
                    '8801 0821 0801 001',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      letterSpacing:
                          2.0, // Memberikan jarak keterbacaan digit angka VA
                    ),
                  ),
                ),
                const SizedBox(height: 12.0),
                TextButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.content_copy, size: 18),
                  label: const Text('Salin'),
                  style: TextButton.styleFrom(
                    foregroundColor: colorScheme.primary,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24.0,
                      vertical: 12.0,
                    ), // py ke vertical padding
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
// SUB-WIDGET: Rincian Runtunan Pembayaran
// ==========================================
class _PaymentBreakdownCard extends StatelessWidget {
  final ColorScheme colorScheme;

  const _PaymentBreakdownCard({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16.0),
            color: colorScheme.surfaceContainerHigh.withValues(alpha: 0.2),
            child: const Text(
              'Rincian Pembayaran',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
            ),
          ),
          Divider(height: 1, color: colorScheme.outlineVariant),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                _buildItemRow('UKT Semester Ganjil 2024', 'Rp 7.500.000'),
                const SizedBox(height: 12.0),
                _buildItemRow('Biaya Administrasi', 'Rp 2.500'),
                Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: Container(
                    padding: const EdgeInsets.only(top: 16.0),
                    decoration: BoxDecoration(
                      border: Border(
                        top: BorderSide(
                          color: colorScheme.outlineVariant,
                        ),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment
                          .spaceBetween, // Jajaran pemisah label total & nominal akhir
                      children: [
                        const Text(
                          'Total Pembayaran',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                        Text(
                          'Rp 7.502.500',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: colorScheme.primary,
                          ),
                        ),
                      ],
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

  Widget _buildItemRow(String title, String price) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 16, color: Color(0xFF4A4452)),
        ),
        Text(
          price,
          style: const TextStyle(fontSize: 16, color: Color(0xFF4A4452)),
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET: Instructions Accordion Group
// ==========================================
class _InstructionsAccordionGroup extends StatelessWidget {
  final ColorScheme colorScheme;

  const _InstructionsAccordionGroup({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    // Representasi Data Cara Pembayaran terstruktur menggunakan Record Types (Dart 3+)
    final stepsData = <({String channel, List<String> steps})>[
      (
        channel: 'ATM BCA',
        steps: [
          'Masukkan Kartu ATM BCA & PIN.',
          'Pilih menu Transaksi Lainnya.',
          'Pilih menu Transfer.',
          'Pilih menu Ke Rekening BCA Virtual Account.',
          'Masukkan Nomor Virtual Account Anda.',
          'Ikuti instruksi selanjutnya untuk menyelesaikan transaksi.',
        ],
      ),
      (
        channel: 'm-BCA (BCA Mobile)',
        steps: [
          'Login ke m-BCA.',
          'Pilih menu m-Transfer.',
          'Pilih BCA Virtual Account.',
          'Masukkan Nomor Virtual Account.',
          'Masukkan jumlah yang akan dibayarkan (jika belum muncul).',
          'Masukkan PIN m-BCA Anda.',
        ],
      ),
      (
        channel: 'KlikBCA / Internet Banking',
        steps: [
          'Login ke KlikBCA Individual.',
          'Pilih menu Transfer Dana.',
          'Pilih Transfer ke BCA Virtual Account.',
          'Masukkan Nomor Virtual Account.',
          'Ikuti instruksi KeyBCA untuk memproses transaksi.',
        ],
      ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4.0),
          child: Text(
            'CARA PEMBAYARAN',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: colorScheme.onSurfaceVariant,
              letterSpacing: 0.5,
            ),
          ),
        ),
        const SizedBox(height: 8.0),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: stepsData.length,
          separatorBuilder: (context, index) => const SizedBox(height: 8.0),
          itemBuilder: (context, index) {
            final item = stepsData[index];

            return Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12.0),
                border: Border.all(color: colorScheme.outlineVariant),
              ),
              child: Theme(
                data: Theme.of(
                  context,
                ).copyWith(dividerColor: Colors.transparent),
                child: ExpansionTile(
                  title: Text(
                    item.channel,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  iconColor: colorScheme.onSurface,
                  collapsedIconColor: colorScheme.onSurface,
                  childrenPadding: const EdgeInsets.all(16.0),
                  expandedCrossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.only(top: 8.0),
                      decoration: BoxDecoration(
                        border: Border(
                          top: BorderSide(
                            color: colorScheme.outlineVariant.withValues(
                              alpha: 0.3,
                            ),
                          ),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: List.generate(item.steps.length, (i) {
                          return Padding(
                            padding: const EdgeInsets.symmetric(
                              vertical: 4.0,
                            ), // Konversi margin list ke padding vertikal
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  '${i + 1}. ',
                                  style: const TextStyle(
                                    fontSize: 14,
                                    color: Color(0xFF4A4452),
                                  ),
                                ),
                                Expanded(
                                  child: Text(
                                    item.steps[i],
                                    style: const TextStyle(
                                      fontSize: 14,
                                      color: Color(0xFF4A4452),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        }),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET: Sticky Bottom Action Area
// ==========================================
class _StickyActionFooter extends StatelessWidget {
  final ColorScheme colorScheme;

  const _StickyActionFooter({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: colorScheme.outlineVariant)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 12,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 1280),
          child: SizedBox(
            width: double.infinity,
            height: 48.0, // Mengunci ketegasan tinggi button h-12 sesuai mockup
            child: ElevatedButton(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Simulasi Pembayaran'),
                    content: const Text(
                      'Pilih status pembayaran yang ingin disimulasikan:',
                    ),
                    actions: [
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context); // Close dialog
                          Navigator.pushNamed(context, '/payment-failed');
                        },
                        child: const Text(
                          'Gagal',
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pop(context); // Close dialog
                          Navigator.pushNamed(context, '/payment-success');
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: colorScheme.primary,
                          foregroundColor: colorScheme.onPrimary,
                        ),
                        child: const Text('Sukses'),
                      ),
                    ],
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: colorScheme.primary,
                foregroundColor: colorScheme.onPrimary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(100), // Rounded full
                ),
                elevation: 0,
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Cek Status Pembayaran',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(width: 8.0),
                  Icon(Icons.sync, size: 18),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
