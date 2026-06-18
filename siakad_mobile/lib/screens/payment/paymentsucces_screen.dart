import 'package:flutter/material.dart';

class SiakadPaymentSuccessPage extends StatelessWidget {
  const SiakadPaymentSuccessPage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(56.0),
        child: _SuccessAppBar(colorScheme: colorScheme),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(
            horizontal: 16.0,
            vertical: 32.0, // Konversi py-xl ke vertical padding
          ),
          child: Center(
            child: Container(
              constraints: const BoxConstraints(maxWidth: 448), // max-w-md setara 448dp
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _SuccessCard(colorScheme: colorScheme),
                  const SizedBox(height: 32.0), // Jarak mt-xl menuju info sekunder
                  const _SecondaryInfo(),
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
class _SuccessAppBar extends StatelessWidget {
  final ColorScheme colorScheme;

  const _SuccessAppBar({required this.colorScheme});

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
        mainAxisAlignment: MainAxisAlignment.spaceBetween, // Diwajibkan untuk layout row ujung ke ujung
        children: [
          Row(
            children: [
              Icon(Icons.school, color: colorScheme.primary),
              const SizedBox(width: 12.0),
              Text(
                'SIAKAD Academic',
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
            color: colorScheme.onSurfaceVariant,
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Main Success Card (Bento Style Card)
// ==========================================
class _SuccessCard extends StatelessWidget {
  final ColorScheme colorScheme;

  const _SuccessCard({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24.0), // Setara p-lg
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
        boxShadow: [
          BoxShadow(
            color: colorScheme.primary.withValues(alpha: 0.05),
            blurRadius: 40,
            offset: const Offset(0, 0), // Membentuk success-checkmark-glow
          )
        ],
      ),
      child: Column(
        children: [
          // Ilustrasi Ceklis & Efek Sparkle Dekoratif
          const _SuccessIllustration(),
          const SizedBox(height: 24.0), // Jarak mb-lg setelah ilustrasi
          
          // Header Teks Utama
          Text(
            'Pembayaran Berhasil!',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: colorScheme.primary,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 8.0), // Diwajibkan eksplit top 8 untuk elemen sub-header terikat
            child: RichText(
              textAlign: TextAlign.center,
              text: TextSpan(
                text: 'Status akademik Anda telah otomatis diperbarui menjadi ',
                style: TextStyle(fontSize: 16, color: colorScheme.onSurfaceVariant),
                children: [
                  TextSpan(
                    text: 'Aktif.',
                    style: TextStyle(fontWeight: FontWeight.bold, color: colorScheme.primary),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32.0), // Setara mb-xl sebelum ringkasan transaksi
          
          // Ringkasan Detail Transaksi Komponen
          _TransactionSummaryCard(colorScheme: colorScheme),
          const SizedBox(height: 32.0), // Setara mb-xl sebelum deretan tombol aksi
          
          // Tombol Aksi Bawah
          const _ActionButtons(),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Success Illustration
// ==========================================
class _SuccessIllustration extends StatelessWidget {
  const _SuccessIllustration();

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        Container(
          width: 96, // Setara w-24
          height: 96, // Setara h-24
          decoration: BoxDecoration(
            color: colorScheme.primaryContainer,
            shape: BoxShape.circle,
          ),
          child: Icon(
            Icons.check_circle,
            size: 48,
            color: colorScheme.onPrimaryContainer,
          ),
        ),
        // Ikon Sparkle / Variasi Bintang Otomatis di Pojok Kanan Atas
        Positioned(
          top: -8,
          right: -8,
          child: Icon(
            Icons.auto_awesome,
            color: colorScheme.primaryFixedDim,
            size: 24,
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
      padding: const EdgeInsets.all(16.0), // Setara p-md
      decoration: BoxDecoration(
        color: colorScheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(8.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        children: [
          // Judul Header Ringkasan Card
          Container(
            padding: const EdgeInsets.only(bottom: 12.0), // Setara pb-sm
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: colorScheme.outlineVariant)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween, // Diwajibkan memisahkan teks & badge status
              children: [
                Text(
                  'RINGKASAN TRANSAKSI',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: colorScheme.onSurfaceVariant,
                    letterSpacing: 0.5,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 2.0),
                  decoration: BoxDecoration(
                    color: colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(4.0),
                  ),
                  child: Text(
                    'Sukses',
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
          const SizedBox(height: 16.0), // Setara space-y-4 pada item anak
          
          // Rincian Item Finansial
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Total Pembayaran', style: TextStyle(fontSize: 14, color: colorScheme.onSurfaceVariant)),
              Text(
                'Rp 5.000.500',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: colorScheme.primary),
              ),
            ],
          ),
          const SizedBox(height: 16.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Tanggal', style: TextStyle(fontSize: 14, color: colorScheme.onSurfaceVariant)),
              const Text('24 Mei 2024, 14:30 WIB', style: TextStyle(fontSize: 14, fontWeight: FontWeight.normal)),
            ],
          ),
          const SizedBox(height: 16.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('ID Transaksi', style: TextStyle(fontSize: 14, color: colorScheme.onSurfaceVariant)),
              Row(
                children: [
                  const Text('SKD-88291029', style: TextStyle(fontSize: 14, fontWeight: FontWeight.normal)),
                  const SizedBox(width: 4.0),
                  InkWell(
                    onTap: () {},
                    child: Icon(Icons.content_copy, size: 14, color: colorScheme.onSurfaceVariant),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
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
          height: 48.0, // Mengunci ketegasan tinggi button h-12 sesuai mockup
          child: ElevatedButton(
            onPressed: () => Navigator.pushNamedAndRemoveUntil(
              context,
              '/shell',
              (route) => false,
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: colorScheme.primary,
              foregroundColor: colorScheme.onPrimary,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
              elevation: 0,
            ),
            child: const Text('Kembali ke Beranda', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
          ),
        ),
        const SizedBox(height: 12.0), // Jarak space-y-3 antar tombol
        SizedBox(
          width: double.infinity,
          height: 48.0,
          child: OutlinedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.receipt_long, size: 18),
            label: const Text('Lihat Kuitansi'),
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: colorScheme.primary),
              foregroundColor: colorScheme.primary,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
            ),
          ),
        ),
      ],
    );
  }
}

// ==========================================
// SUB-WIDGET: Secondary Info Footer Teks
// ==========================================
class _SecondaryInfo extends StatelessWidget {
  const _SecondaryInfo();

  @override
  Widget build(BuildContext context) {
    return Opacity(
      opacity: 0.6,
      child: Column(
        children: [
          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.security, size: 16),
              SizedBox(width: 8.0),
              Text('Pembayaran Aman & Terverifikasi', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500)),
            ],
          ),
          const Padding(
            padding: EdgeInsets.only(top: 8.0), // Diwajibkan eksplisit top 8
            child: Text('Bantuan: support@siakad-academic.ac.id', style: TextStyle(fontSize: 11)),
          ),
        ],
      ),
    );
  }
}