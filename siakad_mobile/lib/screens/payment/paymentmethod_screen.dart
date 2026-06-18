import 'package:flutter/material.dart';

class SiakadPaymentMethodPage extends StatefulWidget {
  const SiakadPaymentMethodPage({super.key});

  @override
  State<SiakadPaymentMethodPage> createState() =>
      _SiakadPaymentMethodPageState();
}

class _SiakadPaymentMethodPageState extends State<SiakadPaymentMethodPage> {
  // State untuk menyimpan metode pembayaran yang dipilih
  String? _selectedMethod;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(56.0),
        child: _PaymentAppBar(colorScheme: colorScheme),
      ),
      body: SafeArea(
        child: Stack(
          children: [
            SingleChildScrollView(
              padding: const EdgeInsets.only(
                left: 16.0,
                right: 16.0,
                top: 16.0,
                bottom:
                    140.0, // Memberikan ruang agar tidak tertutup sticky footer
              ),
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1280),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _BillingSummaryCard(colorScheme: colorScheme),
                      const SizedBox(height: 24.0),

                      // Grup Virtual Account
                      _buildGroupTitle('Virtual Account (VA)', colorScheme),
                      const SizedBox(height: 16.0),
                      _buildPaymentCard(
                        id: 'bca_va',
                        logoUrl:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuA8ug5202KKINXXn7qriiwvuDBFAWodVso-FWYdf8WVGk-EDOD2V8_p-wp1uvGWcbwywrgqHfN9c1204cnX1KWsMRBgqfKUr2sby84L36Hk4FNWQ4bMz8oU3RI8iqHxPMlPXyIeBHWtPjyQ4PHiCFtObztp6bEMcdSThYInlgKKxw7HXM9dhZIVqIGMCXarip-DgF-axFksPaK35uuNfaimSKWx42KCChcdTPEQ0nanXGFy0fc9nyU_iP8zPfA5gvSbRRFo7EvG7rA',
                        title: 'BCA Virtual Account',
                        colorScheme: colorScheme,
                      ),
                      const SizedBox(height: 8.0),
                      _buildPaymentCard(
                        id: 'bni_va',
                        logoUrl:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuABd962CLQjJmR_GWNYY2dklhxvGcPhTb36FDqAR2r_dcunkhWhPOywi42TT6V8EmuJbZl6MvYmWp2NqTaReLcUbnz7ud-VUi6912sSgKFjTmFn-PovkMJewmt-XfehlyLrNXPH3pCz2rHHIP0kjFZAaVrjUrul5n6RyIsrWPq7HTs1okmYyJiEmf2v-ah-kE0eAmU32rOba_tSKGV9T5Yvss_Tn4TK9XOIuctS_uBr1cXiD6qzc2ghkcYRb5yr88wCj7ASykn2Csg',
                        title: 'BNI Virtual Account',
                        colorScheme: colorScheme,
                      ),
                      const SizedBox(height: 8.0),
                      _buildPaymentCard(
                        id: 'mandiri_va',
                        logoUrl:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuBXPaRRHSj_tbWvfAQ1vV2COq37QNx3Zb0tSEzS_YLcvIV9R5ejBKVOfgKnPIVH-OQ7PvrdxBqZaOfT6ZPlOKpXbjsPrXhSp3klFp_SzoAlWMQTduRJBN2h7x2meOjHQxNqI0NPyCbd3diBUqCGOcCDQIzZK703jFQReY1fWz4aJYfVEpGLkN66C4E7AVvvc-0AN62Hsag7vZhfTFBZt176CRt9avKL-opaI8TsvyEgfoSGi8CD9EpA5QrBWhdp5oA2vl7KUkObLac',
                        title: 'Mandiri Virtual Account',
                        colorScheme: colorScheme,
                      ),
                      const SizedBox(height: 24.0),

                      // Grup E-Wallet
                      _buildGroupTitle('E-Wallet', colorScheme),
                      const SizedBox(height: 16.0),
                      _buildPaymentCard(
                        id: 'shopeepay',
                        logoUrl:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuCjcUab6qfyyEPXSrpNaYrSTlEsI599xPj82k7ycS4bZfIDENqrOzM0w8QZZjdN6FWwnF-fQ7SMGAoypmFMVjDx9M6k4gEmMPDWXc5VHm2DGET3XTYYyPqrw2XAxJ9Nbot1kjfAtZgyxoeMEkt4B6lJCx7Z0v4Kz7xA-08sLLoxHzoj767FEPLCIEVerc_wEb335ACNIX5C0gRdDNYg6HPBpB0XUwTVcRt-ScAMZJ0xs41TNMwIlm2xKyYI4U3Noj64pXMLf-lK9pM',
                        title: 'ShopeePay',
                        colorScheme: colorScheme,
                      ),
                      const SizedBox(height: 8.0),
                      _buildPaymentCard(
                        id: 'gopay',
                        logoUrl:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuAAWs6lMyvv3Z-7an1jDPXRwS3wL8Ougtg14edn33TW0tMFcWG_UIWHpmsLh3JiR36uR1AUNEe8Vhb_OHZCOv510yBAdDpYsdkW8AFgLKBVyQoAs45DL6_6H6a0jnzh4oTtpT50s16jYrgkAUVzLsOS0KNuphNYZW4m5_ySWANxUIdZ_QdoRjvxrfvwbdGW5pEA3OWbpCQntYKQP1nWvdYbV7uNMGRqlhZmFERkHrEQBxPnfzcSGgyPucA90-vjw6UWONyoX1vjw4Y',
                        title: 'GoPay',
                        colorScheme: colorScheme,
                      ),
                      const SizedBox(height: 8.0),
                      _buildPaymentCard(
                        id: 'ovo',
                        logoUrl:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuDw8qNG0Hhhro1KD-WhGp_K9SXWGeX5BFxK5iukhae67z00apWyXh_3Wf2UNpQMHAolFUTdoZFPRjj9ycgBILmIaaHM1ABa5bsuQUIgQ4uVukoCvGg3vdvg35yXm1RyIfoWT9vleAnGTQQwB0ZS1_I0XbE5DRO0z6E5nvxJ-9G6He0AxgJg1JL5EUikHI6Ky0ocnE-FXu3QbTMMy59yM2MB6l_tZ1DrbBIokuB8qFT-LAXY3greRNUqBHiYH32RGlF1bD2GxOn937g',
                        title: 'OVO',
                        colorScheme: colorScheme,
                      ),
                      const SizedBox(height: 24.0),

                      // Grup Lainnya (QRIS)
                      _buildGroupTitle('Lainnya', colorScheme),
                      const SizedBox(height: 16.0),
                      _buildPaymentCard(
                        id: 'qris',
                        logoUrl:
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuDjywRTvrYzaNE_6IaBjNC-YGmFYvmcc6M9_E5oyokI_1AsE2QRsYwcwfn-1NQsaSk1JRom71rVy0v10kMKtcAXnKr5nP9C4MeVyFvBjhrmJKcQvCiHNqCUv03wDDDHVxwYrzb1JPW7-q_EIRVhIBXAHZxldrXmYmyvh1MD1-iveb20whh12tuHtOpyqJgkfK1Hr8fB_OQ6G5YSTEJQyqiuYAriiIRUSQrbFCNOLEo0c3slXQmHH6c1TlN5wTPgRaiDLleZo3oFRnM',
                        title: 'QRIS',
                        subtitle:
                            'Bayar via aplikasi bank atau e-wallet apa saja',
                        colorScheme: colorScheme,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // Sticky Footer di bagian bawah layar
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: _StickyFooter(
                colorScheme: colorScheme,
                onPressed: _selectedMethod != null
                    ? () {
                        Navigator.pushNamed(context, '/payment-detail');
                      }
                    : null,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Helper Widget untuk Judul Kelompok Metode Pembayaran
  Widget _buildGroupTitle(String title, ColorScheme colorScheme) {
    return Text(
      title.toUpperCase(),
      style: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: colorScheme.onSurfaceVariant,
        letterSpacing: 0.5,
      ),
    );
  }

  // Helper Widget untuk Card Pilihan Pembayaran (Radio Button Kustom)
  Widget _buildPaymentCard({
    required String id,
    required String logoUrl,
    required String title,
    String? subtitle,
    required ColorScheme colorScheme,
  }) {
    final isSelected = _selectedMethod == id;

    return InkWell(
      onTap: () {
        setState(() {
          _selectedMethod = id;
        });
      },
      borderRadius: BorderRadius.circular(12.0),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(16.0), // Setara p-md
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFFF5F3F3) : colorScheme.surface,
          borderRadius: BorderRadius.circular(12.0),
          border: Border.all(
            color: isSelected
                ? colorScheme.primary
                : colorScheme.outlineVariant,
            width: isSelected ? 2.0 : 1.0,
          ),
        ),
        child: Row(
          mainAxisAlignment:
              MainAxisAlignment.spaceBetween, // Diwajibkan untuk layout Row
          children: [
            Row(
              children: [
                Container(
                  width: 48,
                  height: 32,
                  padding: const EdgeInsets.all(4.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(4.0),
                    border: Border.all(color: colorScheme.outlineVariant),
                  ),
                  child: Image.network(
                    logoUrl,
                    fit: BoxFit
                        .contain, // BoxFit contain untuk menjaga rasio logo bank tetap presisi
                    errorBuilder: (context, error, stackTrace) =>
                        const Icon(Icons.credit_card, size: 16),
                  ),
                ),
                const SizedBox(width: 16.0), // Setara gap-md
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    if (subtitle != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 4.0),
                        child: Text(
                          subtitle,
                          style: TextStyle(
                            fontSize: 11,
                            color: colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
            // Indikator Radio Button Kustom
            Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected ? colorScheme.primary : colorScheme.outline,
                  width: 2.0,
                ),
              ),
              child: isSelected
                  ? Center(
                      child: Container(
                        width: 10,
                        height: 10,
                        decoration: BoxDecoration(
                          color: colorScheme.primary,
                          shape: BoxShape.circle,
                        ),
                      ),
                    )
                  : null,
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
class _PaymentAppBar extends StatelessWidget {
  final ColorScheme colorScheme;

  const _PaymentAppBar({required this.colorScheme});

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
            .spaceBetween, // Memisahkan judul dan ikon universitas
        children: [
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back),
                color: colorScheme.onSurface,
                onPressed: () => Navigator.pop(context),
              ),
              const SizedBox(width: 8.0),
              Text(
                'Pilih Metode Pembayaran',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: colorScheme.primary,
                ),
              ),
            ],
          ),
          Icon(Icons.school, color: colorScheme.primary),
        ],
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: Billing Summary Card
// ==========================================
class _BillingSummaryCard extends StatelessWidget {
  final ColorScheme colorScheme;

  const _BillingSummaryCard({required this.colorScheme});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0), // Setara p-md
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
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
            mainAxisAlignment: MainAxisAlignment
                .spaceBetween, // Diwajibkan membagi info kiri & badge kanan
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Kategori Tagihan',
                      style: TextStyle(
                        fontSize: 12,
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.only(
                        top: 4.0,
                      ), // Jarak terikat elemen sub-header
                      child: Text(
                        'UKT Semester Ganjil 2023/2024',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 8.0,
                  vertical: 4.0,
                ),
                decoration: BoxDecoration(
                  color: colorScheme.secondaryContainer,
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Text(
                  'Akademik',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w500,
                    color: colorScheme.onSecondaryFixedVariant,
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.only(top: 16.0),
            child: Container(
              padding: const EdgeInsets.only(top: 16.0),
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(color: colorScheme.outlineVariant),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment
                    .spaceBetween, // Memisahkan teks label & nominal di ujung kanan
                children: [
                  Text(
                    'Total Pembayaran',
                    style: TextStyle(
                      fontSize: 16,
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                  Text(
                    'Rp 5.000.000',
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
    );
  }
}

// ==========================================
// SUB-WIDGET: Sticky Footer Area
// ==========================================
class _StickyFooter extends StatelessWidget {
  final ColorScheme colorScheme;
  final VoidCallback? onPressed;

  const _StickyFooter({required this.colorScheme, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: colorScheme.surface,
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
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: onPressed,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: colorScheme.primary,
                    foregroundColor: colorScheme.onPrimary,
                    disabledBackgroundColor: colorScheme.primary.withValues(
                      alpha: 0.5,
                    ),
                    disabledForegroundColor: colorScheme.onPrimary.withValues(
                      alpha: 0.5,
                    ),
                    padding: const EdgeInsets.symmetric(
                      vertical: 16.0,
                    ), // py-4 konversi ke vertical padding
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                    elevation: 0,
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Lanjutkan Pembayaran',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(width: 8.0),
                      Icon(Icons.arrow_forward, size: 16),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  top: 8.0,
                ), // Jarak aman teks keamanan sistem
                child: Text(
                  'Transaksi aman & terenkripsi oleh SIAKAD Security Hub',
                  style: TextStyle(
                    fontSize: 11,
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
