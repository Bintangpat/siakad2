import 'package:flutter/material.dart';
import 'dashboard_screen.dart';
import 'krs_screen.dart';
import 'khs_screen.dart';
import 'payment_screen.dart';
import 'profile_screen.dart';

class MainShellScreen extends StatefulWidget {
  const MainShellScreen({super.key});

  static void switchTab(BuildContext context, int index) {
    final state = context.findAncestorStateOfType<_MainShellScreenState>();
    state?.switchTab(index);
  }

  @override
  State<MainShellScreen> createState() => _MainShellScreenState();
}

class _MainShellScreenState extends State<MainShellScreen> {
  int _currentIndex = 0;

  void switchTab(int index) {
    setState(() => _currentIndex = index);
  }

  static const List<({String label, IconData icon, IconData activeIcon})> _tabs = [
    (label: 'Dashboard', icon: Icons.dashboard_outlined, activeIcon: Icons.dashboard),
    (label: 'KRS', icon: Icons.assignment_outlined, activeIcon: Icons.assignment),
    (label: 'KHS', icon: Icons.school_outlined, activeIcon: Icons.school),
    (label: 'Financial', icon: Icons.payments_outlined, activeIcon: Icons.payments),
    (label: 'Profile', icon: Icons.person_outline, activeIcon: Icons.person),
  ];

  final List<Widget> _pages = const [
    SiakadDashboardPage(),
    SiakadKrsPage(),
    KhsAcademicResultsScreen(),
    SiakadFinancialPage(),
    SiakadProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(color: colorScheme.outlineVariant, width: 1),
          ),
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          onDestinationSelected: (index) => setState(() => _currentIndex = index),
          backgroundColor: colorScheme.surface,
          indicatorColor: colorScheme.primaryContainer.withValues(alpha: 0.3),
          labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
          animationDuration: const Duration(milliseconds: 300),
          destinations: _tabs
              .map(
                (tab) => NavigationDestination(
                  icon: Icon(tab.icon),
                  selectedIcon: Icon(tab.activeIcon, color: colorScheme.primary),
                  label: tab.label,
                ),
              )
              .toList(),
        ),
      ),
    );
  }
}
