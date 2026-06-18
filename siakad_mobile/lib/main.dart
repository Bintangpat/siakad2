import 'package:flutter/material.dart';
import 'screens/splash_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/forgotpassword_screen.dart';
import 'screens/auth/otp_screen.dart';
import 'screens/auth/setnewpassword_screen.dart';
import 'screens/main_shell.dart';
import 'screens/detailkrs_screen.dart';
import 'screens/news_screen.dart';
import 'screens/presensi_screen.dart';
import 'screens/payment/paymentmethod_screen.dart';
import 'screens/payment/paymentdetail_screen.dart';
import 'screens/payment/paymentsucces_screen.dart';
import 'screens/payment/paymentffailed_screen.dart';

void main() {
  runApp(const SiakadApp());
}

class SiakadApp extends StatelessWidget {
  const SiakadApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SIAKAD Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Inter',
        scaffoldBackgroundColor: const Color(0xFFFCF8FF),
        colorScheme: const ColorScheme.light(
          primary: Color(0xFF310065),
          onPrimary: Colors.white,
          primaryContainer: Color(0xFF4A148C),
          onPrimaryContainer: Color(0xFFB889FF),
          secondary: Color(0xFF58579B),
          onSecondary: Colors.white,
          secondaryContainer: Color(0xFFB6B4FF),
          onSecondaryContainer: Color(0xFF454386),
          tertiary: Color(0xFF7E3000),
          surface: Color(0xFFFBF9F8),
          onSurface: Color(0xFF1B1C1C),
          onSurfaceVariant: Color(0xFF464555),
          outline: Color(0xFF7C7483),
          outlineVariant: Color(0xFFC7C4D8),
          error: Color(0xFFBA1A1A),
          onError: Colors.white,
        ),
      ),
      initialRoute: '/splash',
      routes: {
        '/splash': (_) => const SplashScreen(),
        '/login': (_) => const LoginPage(),
        '/forgot-password': (_) => const ForgotPasswordPage(),
        '/otp': (_) => const PinVerificationPage(),
        '/set-new-password': (_) => const SetNewPasswordPage(),
        '/shell': (_) => const MainShellScreen(),
        '/detail-krs': (_) => const DetailKrsScreen(),
        '/news': (_) => const NewsDetailScreen(),
        '/presensi': (_) => const SiakadPresensiPage(),
        '/payment-method': (_) => const SiakadPaymentMethodPage(),
        '/payment-detail': (_) => const SiakadPaymentDetailPage(),
        '/payment-success': (_) => const SiakadPaymentSuccessPage(),
        '/payment-failed': (_) => const SiakadPaymentFailedPage(),
      },
    );
  }
}
