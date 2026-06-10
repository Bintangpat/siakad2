import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:percent_indicator/percent_indicator.dart';

class KhsAcademicResultsScreen extends StatefulWidget {
  const KhsAcademicResultsScreen({super.key});

  @override
  State<KhsAcademicResultsScreen> createState() =>
      _KhsAcademicResultsScreenState();
}

class _KhsAcademicResultsScreenState extends State<KhsAcademicResultsScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;
  int _selectedSemesterIndex = 0;

  final List<String> _semesters = [
    'Semester 5 - 2023/2024',
    'Semester 4 - 2022/2023',
    'Semester 3 - 2022/2023',
    'Semester 2 - 2021/2022',
    'Semester 1 - 2021/2022',
  ];

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _fadeController, curve: Curves.easeOut));
    _fadeController.forward();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bool isDesktop = MediaQuery.of(context).size.width >= 900;

    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(64),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.8),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.02),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Academic Bento',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 20,
                      fontWeight: FontWeight.w800,
                      color: Theme.of(context).colorScheme.primary,
                      letterSpacing: -0.5,
                    ),
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: Icon(
                          CupertinoIcons.bell,
                          color: Theme.of(context).colorScheme.primary,
                        ),
                        onPressed: () {},
                      ),
                      const SizedBox(width: 8),
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Theme.of(
                            context,
                          ).colorScheme.secondaryContainer,
                          image: const DecorationImage(
                            image: NetworkImage(
                              'https://lh3.googleusercontent.com/aida-public/AB6AXuCGJivWWK1NYHGkAyUbrRHR6DKB1ydFK8jQWm6hJ_TuEjEJRht4lDcShInvtfFDLWVWnh8u6hG55XEeefuVQdWBxOoZS-k2AIL_ZWO1j31A-tcxPzGXGX_0zOw9xmRkXBA9X7cypeaqDZkm0jV2GnJu_-Ee2S25HaemRmd1k2NCYbjnj7SbayJe8HRGQlLmOePq97uiZxcqQS6Rb8KtrOV1J3HYjx4Mye6qD6ZygJJFBjeHfqWi7z4NCKmgzFAbQdmztRTxbFiDxygF',
                            ),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(
            horizontal: isDesktop ? 32.0 : 16.0,
            vertical: 24.0,
          ),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1200),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHeaderActions(isDesktop),
                  const SizedBox(height: 24),
                  _buildSemesterSelector(),
                  const SizedBox(height: 24),
                  _buildMainBentoGrid(isDesktop),
                  const SizedBox(height: 24),
                  _buildFooterBentoCards(isDesktop),
                  const SizedBox(height: 80),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeaderActions(bool isDesktop) {
    final titleSection = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Academic Results (KHS)',
          style: GoogleFonts.plusJakartaSans(
            fontSize: isDesktop ? 28 : 24,
            fontWeight: FontWeight.bold,
            color: Theme.of(context).colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'View and manage your semester performance details.',
          style: GoogleFonts.plusJakartaSans(
            fontSize: 14,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );

    final actionButtons = Row(
      children: [
        Expanded(
          flex: isDesktop ? 0 : 1,
          child: OutlinedButton.icon(
            onPressed: () {},
            icon: const Icon(CupertinoIcons.printer, size: 18),
            label: const Text('Print KHS'),
            style: OutlinedButton.styleFrom(
              foregroundColor: Theme.of(context).colorScheme.primary,
              side: BorderSide(color: Theme.of(context).colorScheme.primary),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(100),
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          flex: isDesktop ? 0 : 1,
          child: ElevatedButton.icon(
            onPressed: () {},
            icon: const Icon(CupertinoIcons.cloud_download, size: 18),
            label: const Text('Download PDF'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.primary,
              foregroundColor: Colors.white,
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(100),
              ),
            ).copyWith(
              elevation: WidgetStateProperty.resolveWith<double>(
                (states) => states.contains(WidgetState.pressed) ? 2 : 0,
              ),
            ),
          ),
        ),
      ],
    );

    if (isDesktop) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [titleSection, actionButtons],
      );
    } else {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [titleSection, const SizedBox(height: 16), actionButtons],
      );
    }
  }

  Widget _buildSemesterSelector() {
    return SizedBox(
      height: 44,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _semesters.length,
        itemBuilder: (context, index) {
          final isSelected = _selectedSemesterIndex == index;
          return Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: InkWell(
              onTap: () => setState(() => _selectedSemesterIndex = index),
              borderRadius: BorderRadius.circular(100),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 250),
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
                decoration: BoxDecoration(
                  color: isSelected
                      ? Theme.of(context).colorScheme.primaryContainer
                      : const Color(0xFFF0ECF9),
                  borderRadius: BorderRadius.circular(100),
                ),
                child: Center(
                  child: Text(
                    _semesters[index],
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: isSelected
                          ? Colors.white
                          : Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildMainBentoGrid(bool isDesktop) {
    if (isDesktop) {
      return StaggeredGrid.count(
        crossAxisCount: 12,
        mainAxisSpacing: 24,
        crossAxisSpacing: 24,
        children: [
          StaggeredGridTile.fit(
            crossAxisCellCount: 4,
            child: _buildLeftSummaryColumn(),
          ),
          StaggeredGridTile.fit(
            crossAxisCellCount: 8,
            child: _buildDetailsTableCard(),
          ),
        ],
      );
    } else {
      return Column(
        children: [
          _buildLeftSummaryColumn(),
          const SizedBox(height: 16),
          _buildDetailsTableCard(),
        ],
      );
    }
  }

  Widget _buildLeftSummaryColumn() {
    return Column(
      children: [
        _BentoCard(
          backgroundColor: Theme.of(
            context,
          ).colorScheme.secondaryContainer.withValues(alpha: 0.3),
          borderColor: Theme.of(
            context,
          ).colorScheme.secondaryContainer.withValues(alpha: 0.5),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'SEMESTER GPA (IPS)',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: Theme.of(context).colorScheme.onSecondaryContainer,
                    ),
                  ),
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Theme.of(context).colorScheme.secondaryContainer,
                    ),
                    child: Icon(
                      CupertinoIcons.graph_square,
                      color: Theme.of(context).colorScheme.onSecondaryContainer,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    '3.85',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 48,
                      fontWeight: FontWeight.w800,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '/ 4.00',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              LinearPercentIndicator(
                lineHeight: 8.0,
                percent: 0.9625,
                padding: EdgeInsets.zero,
                backgroundColor: const Color(0xFFF0ECF9),
                progressColor: Theme.of(context).colorScheme.primary,
                barRadius: const Radius.circular(100),
                animation: true,
                animationDuration: 1000,
                trailing: Padding(
                  padding: const EdgeInsets.only(left: 8.0),
                  child: Text(
                    '+0.12 vs last sem',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        _BentoCard(
          backgroundColor: Theme.of(context).colorScheme.primaryContainer,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'CUMULATIVE GPA (IPK)',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: Colors.white.withValues(alpha: 0.8),
                    ),
                  ),
                  const Icon(CupertinoIcons.sparkles, color: Colors.white),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    '3.72',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 48,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Total 92 SKS',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      color: Colors.white.withValues(alpha: 0.8),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                "You're in the top 5% of your cohort. Keep it up, Alex!",
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 14,
                  color: Colors.white.withValues(alpha: 0.9),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        _BentoCard(
          backgroundColor: Theme.of(
            context,
          ).colorScheme.tertiary.withValues(alpha: 0.1),
          borderColor: Theme.of(
            context,
          ).colorScheme.tertiary.withValues(alpha: 0.2),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Credit Progress',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.tertiary,
                ),
              ),
              const SizedBox(height: 16),
              Center(
                child: CircularPercentIndicator(
                  radius: 64.0,
                  lineWidth: 8.0,
                  percent: 0.60,
                  center: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        '60%',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Theme.of(context).colorScheme.tertiary,
                        ),
                      ),
                      Text(
                        'OF 144 SKS',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  circularStrokeCap: CircularStrokeCap.round,
                  backgroundColor: const Color(0xFFF0ECF9),
                  progressColor: Theme.of(context).colorScheme.tertiary,
                  animation: true,
                  animationDuration: 1000,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildDetailsTableCard() {
    final courses = [
      _CourseData('Advanced Database Systems', 'CS301 • Dr. Sarah Jenkins', 3, 'A', 12.0),
      _CourseData('Artificial Intelligence', 'CS305 • Prof. Alan Turing', 4, 'A', 16.0),
      _CourseData('Mobile App Development', 'CS312 • Martha Stewart, M.Sc', 3, 'A-', 11.1),
      _CourseData('Human Computer Interaction', 'CS315 • Dr. Don Norman', 3, 'A', 12.0),
      _CourseData('Software Engineering', 'CS320 • Robert Martin', 4, 'B+', 13.2),
      _CourseData('Cloud Computing', 'CS330 • Jeff B.', 3, 'A', 12.0),
    ];

    return _BentoCard(
      backgroundColor: Colors.white,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Semester 5 Result Details',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFF0ECF9),
                  borderRadius: BorderRadius.circular(100),
                ),
                child: Text(
                  '20 SKS TAKEN',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: courses.length,
            separatorBuilder: (context, index) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final course = courses[index];
              return _CourseRowWidget(course: course);
            },
          ),
          const SizedBox(height: 24),
          const Divider(color: Color(0xFFE4E1EE)),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('TOTAL SKS', style: _labelCapsStyle()),
                      const SizedBox(height: 4),
                      Text('20', style: _summaryValueStyle()),
                    ],
                  ),
                  const SizedBox(width: 32),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('TOTAL POINTS', style: _labelCapsStyle()),
                      const SizedBox(height: 4),
                      Text('76.3', style: _summaryValueStyle()),
                    ],
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('IPS SEMESTER 5', style: _labelCapsStyle()),
                  const SizedBox(height: 4),
                  Text(
                    '3.82',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 30,
                      fontWeight: FontWeight.w800,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  TextStyle _labelCapsStyle() {
    return GoogleFonts.plusJakartaSans(
      fontSize: 10,
      fontWeight: FontWeight.w700,
      color: Theme.of(context).colorScheme.onSurfaceVariant,
    );
  }

  TextStyle _summaryValueStyle() {
    return GoogleFonts.plusJakartaSans(
      fontSize: 20,
      fontWeight: FontWeight.bold,
      color: Theme.of(context).colorScheme.onSurface,
    );
  }

  Widget _buildFooterBentoCards(bool isDesktop) {
    final items = [
      _FooterItemData(
        "Dean's List Candidate",
        'Maintaining IPK > 3.75 for 3 semesters.',
        CupertinoIcons.rosette,
        const Color(0xFFFFDBCC),
        const Color(0xFF7B2F00),
      ),
      _FooterItemData(
        'Academic Transcript',
        'Available for official verification.',
        CupertinoIcons.doc_plaintext,
        const Color(0xFFE2DFFF),
        const Color(0xFF413F82),
      ),
      _FooterItemData(
        'Grade Appeals',
        'Window ends in 4 days (Nov 24).',
        CupertinoIcons.question_circle,
        const Color(0xFFE2DFFF),
        const Color(0xFF3323CC),
      ),
    ];

    if (isDesktop) {
      return StaggeredGrid.count(
        crossAxisCount: 3,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        children: items
            .map(
              (item) => StaggeredGridTile.fit(
                crossAxisCellCount: 1,
                child: _buildFooterCard(item),
              ),
            )
            .toList(),
      );
    } else {
      return Column(
        children: items
            .map(
              (item) => Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: _buildFooterCard(item),
              ),
            )
            .toList(),
      );
    }
  }

  Widget _buildFooterCard(_FooterItemData item) {
    return _BentoCard(
      backgroundColor: Colors.white,
      borderColor: const Color(0xFFC7C4D8),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: item.iconBgColor,
            ),
            child: Icon(item.icon, color: item.iconColor),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.title,
                  style: GoogleFonts.plusJakartaSans(
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  item.subtitle,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 12,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
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

// ──────────────────────────────────────────────────────────────
// Reusable Bento Card Widget
// ──────────────────────────────────────────────────────────────
class _BentoCard extends StatefulWidget {
  final Widget child;
  final Color backgroundColor;
  final Color? borderColor;

  const _BentoCard({
    required this.child,
    required this.backgroundColor,
    this.borderColor,
  });

  @override
  State<_BentoCard> createState() => _BentoCardState();
}

class _BentoCardState extends State<_BentoCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeInOut,
        transform: _isHovered
            ? (Matrix4.identity()..scaleByDouble(1.01, 1.01, 1.0, 1.0))
            : Matrix4.identity(),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: widget.backgroundColor,
          borderRadius: BorderRadius.circular(16),
          border: widget.borderColor != null
              ? Border.all(color: widget.borderColor!)
              : null,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: _isHovered ? 0.08 : 0.04),
              blurRadius: _isHovered ? 30 : 20,
              offset: Offset(0, _isHovered ? 8 : 4),
            ),
          ],
        ),
        child: widget.child,
      ),
    );
  }
}

// ──────────────────────────────────────────────────────────────
// Course Row Widget
// ──────────────────────────────────────────────────────────────
class _CourseRowWidget extends StatefulWidget {
  final _CourseData course;
  const _CourseRowWidget({required this.course});

  @override
  State<_CourseRowWidget> createState() => _CourseRowWidgetState();
}

class _CourseRowWidgetState extends State<_CourseRowWidget> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final bool isSmallScreen = MediaQuery.of(context).size.width < 600;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: _isHovered ? const Color(0xFFF5F2FF) : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: isSmallScreen
            ? Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(child: _buildCourseMeta()),
                      _buildGradeBadge(),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Credits: ${widget.course.credits} SKS',
                        style: _subStyle(),
                      ),
                      Text(
                        'Points: ${widget.course.points}',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              )
            : Row(
                children: [
                  Expanded(flex: 4, child: _buildCourseMeta()),
                  Expanded(
                    flex: 2,
                    child: Center(
                      child: Text(
                        '${widget.course.credits}',
                        style: GoogleFonts.plusJakartaSans(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  Expanded(flex: 2, child: Center(child: _buildGradeBadge())),
                  Expanded(
                    flex: 2,
                    child: Text(
                      '${widget.course.points}',
                      textAlign: TextAlign.right,
                      style: GoogleFonts.plusJakartaSans(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
      ),
    );
  }

  Widget _buildCourseMeta() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.course.name,
          style: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.bold,
            fontSize: 15,
          ),
        ),
        const SizedBox(height: 2),
        Text(widget.course.codeAndLecturer, style: _subStyle()),
      ],
    );
  }

  TextStyle _subStyle() {
    return GoogleFonts.plusJakartaSans(
      fontSize: 11,
      fontWeight: FontWeight.w600,
      color: Theme.of(context).colorScheme.onSurfaceVariant,
    );
  }

  Widget _buildGradeBadge() {
    final isA = widget.course.grade.startsWith('A');
    return Container(
      width: 36,
      height: 36,
      decoration: BoxDecoration(
        color: isA
            ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.1)
            : Theme.of(context).colorScheme.secondaryContainer,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text(
          widget.course.grade,
          style: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.bold,
            color: isA
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).colorScheme.onSecondaryContainer,
          ),
        ),
      ),
    );
  }
}

// ──────────────────────────────────────────────────────────────
// Data Models
// ──────────────────────────────────────────────────────────────
class _CourseData {
  final String name;
  final String codeAndLecturer;
  final int credits;
  final String grade;
  final double points;

  _CourseData(this.name, this.codeAndLecturer, this.credits, this.grade, this.points);
}

class _FooterItemData {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color iconBgColor;
  final Color iconColor;

  _FooterItemData(this.title, this.subtitle, this.icon, this.iconBgColor, this.iconColor);
}
