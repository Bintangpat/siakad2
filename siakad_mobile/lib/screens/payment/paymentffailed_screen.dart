import 'package:flutter/material.dart';

class SiakadPaymentFailedPage extends StatelessWidget {
  const SiakadPaymentFailedPage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(64.0),
        child: _FailedAppBar(colorScheme: colorScheme),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(
            horizontal: 16.0,
            vertical: 24.0, // Konversi py-lg ke vertical padding
          ),
          child: Center(
            child: Container(
              constraints: const BoxConstraints(
                maxWidth: 448,
              ), // max-w-md setara 448dp
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _ErrorVisualIndicator(colorScheme: colorScheme),
                  const SizedBox(
                    height: 32.0,
                  ), // Jarak mb-xl menuju card ringkasan
                  _TransactionSummaryCard(colorScheme: colorScheme),
                  const SizedBox(
                    height: 32.0,
                  ), // Jarak mb-xl menuju deretan tombol aksi
                  const _ActionButtons(),
                  const SizedBox(height: 32.0),
                  const _SupportLink(),
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
// SUB-WIDGET: AppBar Komponen
// ==========================================
class _FailedAppBar extends StatelessWidget {
  final ColorScheme colorScheme;

  const _FailedAppBar({required this.colorScheme});

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
            .spaceBetween, // Diwajibkan untuk layout row ujung ke ujung
        children: [
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back),
                color: colorScheme.primary,
                onPressed: () => Navigator.pop(context),
              ),
              const SizedBox(width: 8.0),
              Text(
                'Pembayaran',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: colorScheme.primary,
                ),
              ),
            ],
          ),
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: colorScheme.outlineVariant),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(100),
              child: Image.network(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAengFle4uBK5WKiOJRrWN70M0RS-q0Q3sU2MTDwGH2SdMNOCXz1XYkQaYgHbTfMv5hGzI4vI6v7axXj13-voZThnuoSp0vCaCHKPxnSOgLp-RM3VYrxAGvKG6lwjpz3nuiTye3Ijf6arLLiDQ5kKW09lWvwbCoiA4XXAmaa3IwzSnodsf8sH3rcqsw7O62WzZAvzpotrbxddEf7-ZjkxLR7pwfiBPY3YlczhIOTvzYl9d61ZfuZGmqG3t3nqGrIR11rUbqAdfPO8o',
                fit: BoxFit.cover, // Diwajibkan untuk image fitting
                errorBuilder: (context, error, stackTrace) =>
                    const Icon(Icons.person),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Error Visual Indicator
// ==========================================
class _ErrorVisualIndicator extends StatelessWidget {
  final ColorScheme colorScheme;

  const _ErrorVisualIndicator({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 96, // Setara w-24
          height: 96, // Setara h-24
          decoration: BoxDecoration(
            color: colorScheme.errorContainer,
            shape: BoxShape.circle,
          ),
          child: Icon(Icons.error, size: 48, color: colorScheme.error),
        ),
        const Padding(
          padding: EdgeInsets.only(top: 16.0), // Jarak mb-md ke title
          child: Text(
            'Pembayaran Gagal',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Color(0xFFBA1A1A), // setara text-error
            ),
          ),
        ),
        const Padding(
          padding: EdgeInsets.only(
            top: 8.0,
          ), // Diwajibkan eksplit top 8 untuk elemen sub-header terikat
          child: Text(
            'Mohon maaf, transaksi Anda tidak dapat diproses saat ini. Silakan coba lagi atau gunakan metode pembayaran lain.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: Color(0xFF4A4452), // setara text-on-surface-variant
            ),
          ),
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET: Transaction Summary Card
// ==========================================
class _TransactionSummaryCard extends StatelessWidget {
  final ColorScheme colorScheme;

  const _TransactionSummaryCard({required this.colorScheme});

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
        child: Column(
          children: [
            // Header Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16.0), // Setara p-md
              color: colorScheme.surfaceContainerLow,
              child: const Text(
                'RINGKASAN TRANSAKSI',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF5D5F5F), // setara text-secondary
                  letterSpacing: 0.5,
                ),
              ),
            ),
            Divider(height: 1, color: colorScheme.outlineVariant),
            // Isi Detail Card
            Padding(
              padding: const EdgeInsets.all(16.0), // Setara p-md
              child: Column(
                children: [
                  _buildItemRow(
                    'Total Pembayaran',
                    'Rp 4.500.000',
                    isBoldValue: true,
                  ),
                  const SizedBox(height: 16.0), // Setara space-y-md
                  _buildItemRow('Tanggal', '24 Oct 2023, 14:20'),
                  const SizedBox(height: 16.0),
                  _buildItemRow('Metode Pembayaran', 'Virtual Account Mandiri'),
                  const SizedBox(height: 16.0),
                  _buildItemRow('ID Transaksi', 'SKD-88291029', isMono: true),
                ],
              ),
            ),
            // Footer Error Info Card
            Container(
              padding: const EdgeInsets.symmetric(
                horizontal: 16.0,
                vertical: 8.0,
              ), // Setara px-md py-sm
              color: colorScheme.error.withValues(alpha: 0.05), // Setara bg-error/5
              child: Row(
                children: [
                  Icon(Icons.info_outline, size: 14, color: colorScheme.error),
                  const SizedBox(width: 8.0),
                  Expanded(
                    child: Text(
                      'Saldo tidak mencukupi atau gangguan bank.',
                      style: TextStyle(
                        fontSize: 11,
                        color: colorScheme.onErrorContainer,
                      ),
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

  Widget _buildItemRow(
    String label,
    String value, {
    bool isBoldValue = false,
    bool isMono = false,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment
          .spaceBetween, // Diwajibkan memisahkan teks & data ke ujung luar
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            color: Color(0xFF4A4452),
          ), // setara text-on-surface-variant
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: 14,
            fontFamily: isMono ? 'monospace' : null,
            fontWeight: isBoldValue
                ? FontWeight.bold
                : (isMono ? FontWeight.w500 : FontWeight.normal),
            color: isMono
                ? colorScheme.primary
                : const Color(0xFF1B1C1C), // setara text-on-surface
          ),
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET: Action Buttons Container
// ==========================================
class _ActionButtons extends StatelessWidget {
  const _ActionButtons();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          height: 52.0, // Mengunci ketegasan tinggi button sesuai mockup (py-4)
          child: ElevatedButton(
            onPressed: () => Navigator.pop(context),
            style: ElevatedButton.styleFrom(
              backgroundColor: colorScheme.primary,
              foregroundColor: colorScheme.onPrimary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.0),
              ),
              elevation: 0,
            ),
            child: const Text(
              'Coba Lagi',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        const SizedBox(height: 12.0), // Jarak gap-sm antar tombol
        SizedBox(
          width: double.infinity,
          height: 52.0,
          child: OutlinedButton(
            onPressed: () => Navigator.popUntil(
              context,
              ModalRoute.withName('/payment-method'),
            ),
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: colorScheme.primary),
              foregroundColor: colorScheme.primary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.0),
              ),
            ),
            child: const Text(
              'Pilih Metode Lain',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET: Support Link Footer Teks
// ==========================================
class _SupportLink extends StatelessWidget {
  const _SupportLink();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return InkWell(
      onTap: () {},
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Butuh bantuan? Hubungi Layanan Akademik',
            style: TextStyle(
              fontSize: 12,
              color: colorScheme.primary,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(width: 4.0),
          Icon(Icons.open_in_new, size: 14, color: colorScheme.primary),
        ],
      ),
    );
  }
}
