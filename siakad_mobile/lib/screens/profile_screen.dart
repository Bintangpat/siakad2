import 'package:flutter/material.dart';

class SiakadProfilePage extends StatelessWidget {
  const SiakadProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final isDesktop = MediaQuery.of(context).size.width >= 768;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(64.0),
        child: _ProfileAppBar(colorScheme: colorScheme),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(
            horizontal: isDesktop ? 40.0 : 16.0,
            vertical: 24.0, // py-lg konversi ke vertical padding
          ),
          child: Center(
            child: Container(
              constraints: const BoxConstraints(maxWidth: 1280),
              child: Column(
                children: [
                  _ProfileHeaderSection(
                    colorScheme: colorScheme,
                    isDesktop: isDesktop,
                  ),
                  const SizedBox(height: 24.0),
                  _BentoGridSections(
                    colorScheme: colorScheme,
                    isDesktop: isDesktop,
                  ),
                  const SizedBox(height: 32.0),
                  const _SystemFooter(),
                  if (!isDesktop)
                    const SizedBox(
                      height: 80.0,
                    ), // Spacer aman untuk bottom nav mobile
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
class _ProfileAppBar extends StatelessWidget {
  final ColorScheme colorScheme;

  const _ProfileAppBar({required this.colorScheme});

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
        mainAxisAlignment:
            MainAxisAlignment.spaceBetween, // Diwajibkan untuk layout row
        children: [
          Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: colorScheme.outlineVariant),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(100),
                  child: Image.network(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4Z2eTsSHEVrZX--25flnbazeX9ydmcPNmdC05bkwLAuqPRLzwKH4JoBVzBH4nSEFANGfYSh0dvvnHtXcl_yIhtIic38av7NV2WF5dTRrtJpGa9ROrVPxiy0mZeKCT8sTrULhHvLD8ozWKboD3lcWtNqkT46WC2WtHjcGP6JR2TnHP53TQKHOsT6o_9Cmtr-44mJRXS5LZnwsmhlguWsf65_DGN5RagwGLfocq7rqHZwvvDeOTt0IIdlVQ7CDBmwf8dAvOzEDsRpA',
                    fit: BoxFit.cover, // Diwajibkan untuk image fitting
                    errorBuilder: (context, error, stackTrace) =>
                        const Icon(Icons.person, size: 18),
                  ),
                ),
              ),
              const SizedBox(width: 12.0),
              Text(
                'SIAKAD Mobile',
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
// SUB-WIDGET: Profile Header Card
// ==========================================
class _ProfileHeaderSection extends StatelessWidget {
  final ColorScheme colorScheme;
  final bool isDesktop;

  const _ProfileHeaderSection({
    required this.colorScheme,
    required this.isDesktop,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24.0), // p-lg
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
      child: Flex(
        direction: isDesktop ? Axis.horizontal : Axis.vertical,
        crossAxisAlignment: isDesktop
            ? CrossAxisAlignment.start
            : CrossAxisAlignment.center,
        children: [
          // Avatar dengan Tombol Kamera (Absolute Positioned via Stack)
          Stack(
            children: [
              Container(
                width: isDesktop ? 160 : 128,
                height: isDesktop ? 160 : 128,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: colorScheme.primaryContainer.withValues(alpha: 0.2),
                    width: 4,
                  ),
                ),
                padding: const EdgeInsets.all(4.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(100),
                  child: Image.network(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCpv1ElPherdHmoXg3PXnyFwhgNX34EemkJ9HCi8d2tjCwwlYLvlpHH9fCmfM6ZsdGoHtFZ1bT8vWL9AaumjHWshq9w-5Y85TnpC2Y_sFRN2cA598K8WsPHQbMDxUnSBOS6TzyBSgx--yApgCnpLu9yocz-cNa3H0UFgDTxI3rc9ybEm-hkr92jTBVnO6T1J0SDfjuxccilTe0G1A8AeOZioBYkq753ox4Ew1GqtbXo2K4YG0hmN3DpL1LcCAOxW8SA4B2Z7Y5eicM',
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) =>
                        const Icon(Icons.account_circle, size: 80),
                  ),
                ),
              ),
              Positioned(
                bottom: 8,
                right: 8,
                child: Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: colorScheme.primary,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.2),
                        blurRadius: 4,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: IconButton(
                    icon: const Icon(Icons.photo_camera, size: 16),
                    color: colorScheme.onPrimary,
                    onPressed: () {},
                  ),
                ),
              ),
            ],
          ),
          SizedBox(width: isDesktop ? 32.0 : 0, height: isDesktop ? 0 : 24.0),
          // Informasi Teks Profil
          Expanded(
            flex: isDesktop ? 1 : 0,
            child: Column(
              crossAxisAlignment: isDesktop
                  ? CrossAxisAlignment.start
                  : CrossAxisAlignment.center,
              children: [
                Text(
                  'Ahmad Fauzi',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: colorScheme.onSurface,
                  ),
                ),
                Text(
                  'NIM: 20210801001',
                  style: TextStyle(fontSize: 16, color: colorScheme.secondary),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                    top: 8.0,
                  ), // Diwajibkan inset top 8 untuk sub-header
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12.0,
                      vertical: 4.0,
                    ),
                    decoration: BoxDecoration(
                      color: colorScheme.primaryContainer.withValues(
                        alpha: 0.1,
                      ),
                      borderRadius: BorderRadius.circular(100),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.school,
                          size: 14,
                          color: colorScheme.primary,
                        ),
                        const SizedBox(width: 8.0),
                        Text(
                          'Teknik Informatika',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24.0),
                // Buttons Row
                Row(
                  mainAxisAlignment: isDesktop
                      ? MainAxisAlignment.start
                      : MainAxisAlignment.center,
                  children: [
                    ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.edit, size: 14),
                      label: const Text('Edit Profil'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: colorScheme.primary,
                        foregroundColor: colorScheme.onPrimary,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 24.0,
                          vertical: 12.0,
                        ), // py-sm
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12.0),
                    OutlinedButton(
                      onPressed: () {},
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(color: colorScheme.primary),
                        foregroundColor: colorScheme.primary,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 24.0,
                          vertical: 12.0,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                      ),
                      child: const Text('Bagikan QR'),
                    ),
                  ],
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
// SUB-WIDGET: Bento Grid Layout Engine
// ==========================================
class _BentoGridSections extends StatelessWidget {
  final ColorScheme colorScheme;
  final bool isDesktop;

  const _BentoGridSections({
    required this.colorScheme,
    required this.isDesktop,
  });

  @override
  Widget build(BuildContext context) {
    if (isDesktop) {
      return Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(flex: 4, child: _buildAcademicStatusCard()),
              const SizedBox(width: 16.0),
              Expanded(flex: 8, child: _buildPersonalDataCard()),
            ],
          ),
          const SizedBox(height: 16.0),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(flex: 6, child: _buildContactInfoCard()),
              const SizedBox(width: 16.0),
              Expanded(flex: 6, child: _buildAccountSettingsCard()),
            ],
          ),
        ],
      );
    } else {
      return Column(
        children: [
          _buildAcademicStatusCard(),
          const SizedBox(height: 16.0),
          _buildPersonalDataCard(),
          const SizedBox(height: 16.0),
          _buildContactInfoCard(),
          const SizedBox(height: 16.0),
          _buildAccountSettingsCard(),
        ],
      );
    }
  }

  // 1. Kartu Status Akademik
  Widget _buildAcademicStatusCard() {
    return Container(
      height: isDesktop ? 220 : null,
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment
            .spaceBetween, // Mengunci keselarasan atas-bawah bento
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(8.0),
                decoration: BoxDecoration(
                  color: colorScheme.primaryContainer.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Icon(Icons.analytics, color: colorScheme.primary),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12.0,
                  vertical: 4.0,
                ),
                decoration: BoxDecoration(
                  color: const Color(0xFFD1FAE5), // green-100
                  borderRadius: BorderRadius.circular(100),
                ),
                child: const Text(
                  'AKTIF',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF047857),
                  ), // green-700
                ),
              ),
            ],
          ),
          if (!isDesktop) const SizedBox(height: 24.0),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'ACADEMIC STATUS',
                style: TextStyle(
                  fontSize: 12,
                  color: colorScheme.secondary,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 4.0),
              Text(
                'Semester 5',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: colorScheme.onSurface,
                ),
              ),
              const Padding(
                padding: EdgeInsets.only(top: 4.0),
                child: Text(
                  'Angkatan 2021',
                  style: TextStyle(fontSize: 14, color: Colors.grey),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // 2. Kartu Data Pribadi
  Widget _buildPersonalDataCard() {
    return Container(
      height: isDesktop ? 220 : null,
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCardHeader(Icons.person_outline, 'Data Pribadi'),
          const SizedBox(height: 16.0),
          GridView.count(
            crossAxisCount: isDesktop ? 2 : 1,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            childAspectRatio: isDesktop ? 3.5 : 4.5,
            mainAxisSpacing: 12,
            crossAxisSpacing: 24,
            children: [
              _buildInfoItem('Nama Lengkap', 'Ahmad Fauzi'),
              _buildInfoItem('Tempat/Tanggal Lahir', 'Jakarta, 12 April 2002'),
              _buildInfoItem('Jenis Kelamin', 'Laki-laki'),
              _buildInfoItem('Agama', 'Islam'),
            ],
          ),
        ],
      ),
    );
  }

  // 3. Kartu Informasi Kontak
  Widget _buildContactInfoCard() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCardHeader(Icons.contact_mail_outlined, 'Informasi Kontak'),
          const SizedBox(height: 16.0),
          _buildContactRow(
            Icons.alternate_email,
            'Campus Email',
            'ahmad.fauzi@student.univ.ac.id',
          ),
          const SizedBox(height: 16.0),
          _buildContactRow(
            Icons.phone_iphone,
            'Phone Number',
            '+62 812-3456-7890',
          ),
        ],
      ),
    );
  }

  // 4. Kartu Pengaturan Akun (List Menu Interaktif)
  Widget _buildAccountSettingsCard() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: colorScheme.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCardHeader(Icons.settings_outlined, 'Pengaturan Akun'),
          const SizedBox(height: 8.0),
          _buildSettingTile(
            Icons.lock_outline,
            'Ganti Password',
            actionWidget: const Icon(Icons.chevron_right, color: Colors.grey),
          ),
          _buildSettingTile(
            Icons.translate,
            'Bahasa / Language',
            actionWidget: Row(
              children: [
                Text(
                  'ID (Bahasa)',
                  style: TextStyle(fontSize: 12, color: colorScheme.secondary),
                ),
                const Icon(Icons.chevron_right, color: Colors.grey),
              ],
            ),
          ),
          _buildSettingTile(
            Icons.logout,
            'Logout',
            isError: true,
            actionWidget: Icon(Icons.chevron_right, color: colorScheme.error),
          ),
        ],
      ),
    );
  }

  // Helper Komponen Kecil Pembentuk Bento
  Widget _buildCardHeader(IconData icon, String title) {
    return Container(
      padding: const EdgeInsets.only(bottom: 8.0),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: colorScheme.outlineVariant)),
      ),
      child: Row(
        children: [
          Icon(icon, color: colorScheme.primary, size: 20),
          const SizedBox(width: 8.0),
          Text(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: colorScheme.onSurface,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoItem(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          label,
          style: TextStyle(fontSize: 11, color: colorScheme.secondary),
        ),
        const SizedBox(height: 2.0),
        Text(
          value,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w200,
            color: colorScheme.onSurface,
          ),
        ),
      ],
    );
  }

  Widget _buildContactRow(IconData icon, String label, String value) {
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: colorScheme.secondaryContainer,
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: colorScheme.onSecondaryContainer, size: 20),
        ),
        const SizedBox(width: 16.0),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(fontSize: 11, color: colorScheme.secondary),
              ),
              Text(
                value,
                style: TextStyle(fontSize: 16, color: colorScheme.onSurface),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSettingTile(
    IconData icon,
    String label, {
    required Widget actionWidget,
    bool isError = false,
  }) {
    return InkWell(
      onTap: () {},
      child: Container(
        padding: const EdgeInsets.symmetric(
          vertical: 12.0,
        ), // py-md konversi ke vertical padding
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: colorScheme.outlineVariant.withValues(alpha: 0.5),
            ),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment
              .spaceBetween, // Memaksa tombol aksi berada di ujung kanan card
          children: [
            Row(
              children: [
                Icon(
                  icon,
                  color: isError ? colorScheme.error : colorScheme.secondary,
                  size: 20,
                ),
                const SizedBox(width: 16.0),
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: isError ? FontWeight.w200 : FontWeight.normal,
                    color: isError ? colorScheme.error : colorScheme.onSurface,
                  ),
                ),
              ],
            ),
            actionWidget,
          ],
        ),
      ),
    );
  }
}

// ==========================================
// SUB-WIDGET: System Footer Info
// ==========================================
class _SystemFooter extends StatelessWidget {
  const _SystemFooter();

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Text(
          'SIAKAD MOBILE V2.4.0',
          style: TextStyle(
            fontSize: 11,
            letterSpacing: 1.5,
            color: Colors.grey,
            fontWeight: FontWeight.w500,
          ),
        ),
        Padding(
          padding: EdgeInsets.only(top: 4.0),
          child: Text(
            '© 2023 University Digital Excellence',
            style: TextStyle(fontSize: 11, color: Colors.grey),
          ),
        ),
      ],
    );
  }
}

