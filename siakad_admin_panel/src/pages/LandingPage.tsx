import { useEffect, useRef } from "react";
import {
  GraduationCap,
  UserCircle,
  Menu,
  Verified,
  ArrowRight,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  FileEdit,
  GraduationCap as GradeIcon,
  CreditCard,
  UserCheck,
  Calendar,
  Headphones,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/auth/login");
  };

  // Simple Scroll Fade-in Interaction menggunakan Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    }, observerOptions);

    const currentCards = cardsRef.current;
    currentCards.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentCards.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed-dim selection:text-primary min-h-screen flex flex-col font-sans">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-surface dark:bg-surface-container-low border-b border-outline-variant">
        <nav className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary dark:text-primary-fixed w-8 h-8" />
            <span className="text-2xl font-bold text-primary dark:text-primary-fixed">
              SIAKAD University
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary transition-colors duration-200 py-1 text-sm tracking-wide"
              href="#home"
            >
              Home
            </a>
            <a
              className="text-secondary dark:text-secondary-fixed hover:bg-tertiary-container dark:hover:bg-tertiary hover:text-on-tertiary-container transition-colors duration-200 py-1 px-2 rounded text-sm tracking-wide font-medium"
              href="#academic"
            >
              Academic
            </a>
            <a
              className="text-secondary dark:text-secondary-fixed hover:bg-tertiary-container dark:hover:bg-tertiary hover:text-on-tertiary-container transition-colors duration-200 py-1 px-2 rounded text-sm tracking-wide font-medium"
              href="#financial"
            >
              Financial
            </a>
            <button className="text-primary dark:text-primary-fixed p-2 hover:bg-primary-container/10 rounded-full transition-colors">
              <UserCircle className="w-6 h-6" />
            </button>
          </div>

          <button className="md:hidden text-primary p-2">
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      <main className="grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-24 md:pt-32 md:pb-40 px-4 md:px-10 bg-surface-bright">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-semibold tracking-wider">
                <Verified className="w-4 h-4" />
                Sistem Informasi Akademik Terpadu
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-primary">
                Selamat Datang di <br className="hidden md:block" /> SIAKAD
                University
              </h1>
              <p className="text-lg w-fit text-on-surface-variant lg:mx-0 leading-relaxed">
                Akses layanan akademik, keuangan, dan administrasi dalam satu
                platform modern yang efisien dan transparan untuk civitas
                akademika.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button
                  onClick={goToLogin}
                  className="bg-primary text-on-primary px-8 py-4 rounded-lg text-sm font-semibold tracking-wide hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Masuk ke Portal
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-sm font-semibold tracking-wide hover:bg-primary-container/5 transition-all flex items-center justify-center gap-2">
                  Panduan Pengguna
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="aspect-square w-full bg-primary-container rounded-[40px] rotate-3 absolute -inset-4 opacity-10"></div>
              <div className="aspect-square w-full rounded-[40px] overflow-hidden border border-outline-variant relative shadow-xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Modern university campus building with clean geometric lines"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuABblpntFgknnVbVlBiDbzv_xFgKZmp5pXnGSGUUbibVmseL4XFbupgI65VN1E_ukxUFDodvihnlDcIzAyg18WUq4Zp2PObSU386PpimdivDhRScNCQsKYZ_euTfLTVOj_32XLsPwtiwABBVDf_V2RACDWL6p-GLAT8MH3B2AhBAQrKx8RlRFskzyysKY72RVuB0moZQ-bYkXPHSqGzhQJwSMtRPvt4CKjCZcC5Cd8kI5dN5fPtvBO1SET1zRNpaFcRB9KgU2uvX2Y"
                />
              </div>
            </div>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-surface-tint rounded-full blur-[120px] opacity-10"></div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 px-4 md:px-10 max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-primary">Akses Cepat</h2>
              <p className="text-base text-on-surface-variant">
                Layanan akademik utama untuk mahasiswa dan dosen.
              </p>
            </div>
            <button className="text-primary text-sm font-semibold tracking-wide flex items-center gap-1 hover:underline">
              Lihat Semua Layanan <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-10 transition-all duration-700 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:bg-tertiary-fixed hover:border-surface-tint group cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                <FileEdit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  Pengisian KRS
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Registrasi mata kuliah semester ganjil/genap secara online.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-10 transition-all duration-700 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:bg-tertiary-fixed hover:border-surface-tint cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                <GradeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  Cek Nilai (KHS)
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Pantau hasil studi dan transkrip nilai akademik Anda.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-10 transition-all duration-700 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:bg-tertiary-fixed hover:border-surface-tint cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  Tagihan Keuangan
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Informasi UKT, cicilan, dan riwayat pembayaran kuliah.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-10 transition-all duration-700 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col gap-4 hover:bg-tertiary-fixed hover:border-surface-tint cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  Presensi Kuliah
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Monitor kehadiran kuliah harian dan statistik presensi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* News & Announcements */}
        <section className="bg-surface-container-low py-24 px-4 md:px-10">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-on-surface">
                Pengumuman Terbaru
              </h2>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-bright transition-colors bg-surface-container-lowest text-on-surface">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-bright transition-colors bg-surface-container-lowest text-on-surface">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* News Card 1 */}
              <article
                ref={addToRefs}
                className="opacity-0 translate-y-10 transition-all duration-700 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group flex flex-col h-full shadow-sm"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Academic registration materials layout"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhYlPRFfVhFk5mF-GwfJaPuZV1V2vwdxdczG6NvXamJfoL5S2ljDo7KwlpHJTNS4V6HUgraHOIxFnlrUYawPsLIqqKrMM6Ha9LR_IFUuWEqL7IjUY-LR5FrGqF85ZtM-hwz-fE8tV5jcaJRlnCsZh8KncwoOf0tgo3IMPNiRqIAA5hzwhh-Mp8UjWW_KMLjF0Mw3MBiKhmj-EzbtOBIOL1WdUsc3jsokDItYnRYbMUYSOvO51eih-3zaDhADPI66lJXtQYjtTbDB8"
                  />
                </div>
                <div className="p-6 grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[11px] text-primary-container uppercase font-bold tracking-wider bg-primary-fixed px-2 py-1 rounded inline-block">
                      Akademik
                    </span>
                    <h3 className="text-xl font-bold text-on-surface leading-snug">
                      Registrasi Semester Ganjil 2024/2025 Dibuka
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      Informasi jadwal pengisian KRS, pembayaran UKT, dan batas
                      akhir perubahan rencana studi bagi seluruh mahasiswa.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                    <span className="text-[11px] font-medium text-on-surface-variant flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      20 Okt 2024
                    </span>
                    <a
                      className="text-primary text-xs font-bold tracking-wide hover:underline"
                      href="#read-more"
                    >
                      Baca Selengkapnya
                    </a>
                  </div>
                </div>
              </article>

              {/* News Card 2 */}
              <article
                ref={addToRefs}
                className="opacity-0 translate-y-10 transition-all duration-700 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group flex flex-col h-full shadow-sm"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Modern university lecture hall"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwCevx94mBHNWK4PaRy-lkroW1bJ8pZGmDc5Af5SRo21d8FvJPfni9YAx9nQmFQgUvUowgWAfupI-ZS4es0pPatvNQhuUbV2Q7uaqOJCaT_DBrlk5Jc4eT7lbYQBEOM8KG5EaxHeljeYHND7fhJvhlwlqWif4mPG0b9j_fQFHu0_EgJiQ1RLvsdZ9NyBiMxLY6Y_29x3FJQqwkriQ1VD5WJtlL-2Y3r6SNbpf1vlXWzNY9nBvXUetRi5I_g02fQO6P-C9UOsaFx4Q"
                  />
                </div>
                <div className="p-6 grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[11px] text-primary-container uppercase font-bold tracking-wider bg-primary-fixed px-2 py-1 rounded inline-block">
                      Event
                    </span>
                    <h3 className="text-xl font-bold text-on-surface leading-snug">
                      Seminar Internasional Digital Transformation
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      Menghadirkan pembicara dari industri teknologi global
                      untuk membahas masa depan pendidikan di era AI.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                    <span className="text-[11px] font-medium text-on-surface-variant flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      15 Okt 2024
                    </span>
                    <a
                      className="text-primary text-xs font-bold tracking-wide hover:underline"
                      href="#read-more"
                    >
                      Baca Selengkapnya
                    </a>
                  </div>
                </div>
              </article>

              {/* News Card 3 */}
              <article
                ref={addToRefs}
                className="opacity-0 translate-y-10 transition-all duration-700 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group flex flex-col h-full shadow-sm"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Scholarship certificate details"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhCW2eCJKXaMhyOhOqqnd68bz8uHxU7_BxPBI3zISDvzbVC56_Q1M2bmsUdDrsTlUeehhxOZUAWjuCNWOrsALQ77DCF_xHaWlSYwZAp8dUC-7rugXBdXVOLROYFK7ICnk6fHMfO1fVyJjWmNGWwW-h8ec1cmrcNFVkEniACVGe9WDro3wb0Wz-RdRnc5oUPbAtEhgwfmzG4nGcMspEfJ4ftSolAEXaLwqPLWd81uP4Qap0J50lL_V9b1fCQtnziaBNQ6u9XPDiD-s"
                  />
                </div>
                <div className="p-6 grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[11px] text-primary-container uppercase font-bold tracking-wider bg-primary-fixed px-2 py-1 rounded inline-block">
                      Beasiswa
                    </span>
                    <h3 className="text-xl font-bold text-on-surface leading-snug">
                      Penerimaan Beasiswa Prestasi Unggulan
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      Program bantuan biaya pendidikan bagi mahasiswa
                      berprestasi di tingkat nasional maupun internasional.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                    <span className="text-[11px] font-medium text-on-surface-variant flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      12 Okt 2024
                    </span>
                    <a
                      className="text-primary text-xs font-bold tracking-wide hover:underline"
                      href="#read-more"
                    >
                      Baca Selengkapnya
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-24 px-4 md:px-10 bg-surface">
          <div className="max-w-[1280px] mx-auto bg-primary-container text-on-primary-fixed rounded-2xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-md">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,137,255,0.2),transparent)] pointer-events-none"></div>

            <div className="md:w-2/3 space-y-4 relative z-10 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white">
                Butuh Bantuan Akademik?
              </h2>
              <p className="text-sm text-primary-fixed max-w-lg mx-auto md:mx-0 leading-relaxed">
                Tim IT Helpdesk dan Administrasi Akademik kami siap membantu
                Anda menyelesaikan kendala teknis maupun administratif sistem
                SIAKAD.
              </p>
            </div>

            <div className="md:w-1/3 w-full relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-lg text-white">
                    <span className="w-5 h-5 block">
                      <Headphones />
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-primary-fixed font-bold uppercase tracking-wider">
                      IT Helpdesk
                    </p>
                    <p className="text-base text-white font-semibold">
                      021-555-0123
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-lg text-white">
                    <span className="w-5 h-5 block">
                      <Mail />
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-primary-fixed font-bold uppercase tracking-wider">
                      Email Support
                    </p>
                    <p className="text-base text-white font-semibold">
                      helpdesk@siakad.uni.ac.id
                    </p>
                  </div>
                </div>

                <button className="w-full bg-white text-primary text-sm font-bold tracking-wide py-3 rounded-lg hover:bg-primary-fixed transition-colors">
                  Buka Tiket Support
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-dim dark:bg-surface-container-highest mt-auto border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="text-primary w-6 h-6" />
              <span className="text-sm font-bold text-on-surface tracking-wide">
                SIAKAD Academic System
              </span>
            </div>
            <p className="text-xs text-on-surface-variant text-center md:text-left">
              © 2024 SIAKAD University. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              className="text-on-surface-variant hover:text-primary text-xs transition-colors duration-200"
              href="#privacy"
            >
              Privacy Policy
            </a>
            <a
              className="text-on-surface-variant hover:text-primary text-xs transition-colors duration-200"
              href="#terms"
            >
              Terms of Service
            </a>
            <a
              className="text-on-surface-variant hover:text-primary text-xs transition-colors duration-200"
              href="#help"
            >
              Help Center
            </a>
            <a
              className="text-on-surface-variant hover:text-primary text-xs transition-colors duration-200"
              href="#contact"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
