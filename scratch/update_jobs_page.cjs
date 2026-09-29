const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'JobsPage.jsx');

const newJobsPageCode = `import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Calendar,
  X,
  AlertTriangle,
  BookOpen,
  Star,
  Clock,
  ChevronRight,
  Sparkles,
  PlayCircle,
  Award,
  Building2,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  TrendingUp,
  Layers,
  Zap,
  CheckCircle
} from 'lucide-react';
import { INITIAL_FEED_POSTS } from '../data/feedPostsData';
import { ALL_COURSES } from '../data/coursesData';
import { useNotifications } from '../context/NotificationContext';

export function JobsPage({ currentUser, onNavigate }) {
  const { dispatchNotification } = useNotifications();
  
  // Navigation tabs: 'explore' (Opportunities) | 'programs' (Industry Learning Programs) | 'applied' (Applications & Enrollments)
  const [activeTab, setActiveTab] = useState('explore');
  
  // Filters for Opportunities
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'Internship' | 'Live Project' | 'Apprenticeship' | 'Entry-Level Job'
  const [matchTierFilter, setMatchTierFilter] = useState('all'); // 'all' | 'high' | 'gap'
  const [locationFilter, setLocationFilter] = useState('all'); // 'all' | 'delhi' | 'haridwar' | 'kerala' | 'bengaluru' | 'hybrid'
  
  // Filters for Industry Learning Programs
  const [programFormatFilter, setProgramFormatFilter] = useState('all');
  const [programCompanyFilter, setProgramCompanyFilter] = useState('all');

  // Modals state
  const [appliedModalJob, setAppliedModalJob] = useState(null);
  const [gapAnalysisJob, setGapAnalysisJob] = useState(null);
  const [prerequisiteModalJob, setPrerequisiteModalJob] = useState(null);
  const [selectedProgramModal, setSelectedProgramModal] = useState(null);
  const [enrolledProgramSuccess, setEnrolledProgramSuccess] = useState(false);
  const [enrolledBridgeSuccess, setEnrolledBridgeSuccess] = useState(false);

  // Student's verified credentials for profile matching
  const studentVerifiedSkills = [
    'Phytochemistry',
    'HPTLC Fingerprinting',
    'Radial Pulse Diagnostics',
    'Herbal Formulation',
    'Analytical QC',
    'Classical Formulations'
  ];

  // Industry Learning Programs dataset (from coursesData + dedicated corporate workshops)
  const [learningPrograms, setLearningPrograms] = useState([
    {
      id: 'prog-ind-1',
      courseId: 'mc-ind-1',
      title: 'Dabur Certified: Phytochemical QC & CAMAG HPTLC Masterclass',
      company: 'Dabur Research & Development Center',
      category: 'Technical Workshop',
      duration: '2-Day Intensive Hands-on Workshop',
      deliveryMode: 'On-Site R&D Lab (Ghaziabad)',
      enrolledCount: 420,
      seatsMax: 500,
      rating: '4.96',
      preceptor: 'Dr. Vikram Sethi',
      preceptorRole: 'Talent Acquisition & R&D Lead, Dabur India Ltd.',
      skillsImparted: ['CAMAG VisionCATS', 'Rf Calculation', 'Marker Quantification', 'Schedule T QC'],
      hiringPipeline: 'Top 15% guaranteed interview shortlist for Dabur QC Trainee & Specialist roles',
      linkedOpportunityTitle: 'Phytochemical Standardization & HPTLC QC Specialist',
      tuition: 'Corporate Sponsored (Free)',
      abcCredits: '1 Skill Credit Eligible',
      description: 'Hands-on practical training program to impart essential industry chromatography and CAMAG instrumentation skills directly at the Dabur central analytical laboratory.'
    },
    {
      id: 'prog-ind-2',
      courseId: 'mc-ind-2',
      title: 'Patanjali Workshop: Schedule T Cleanroom Operations & Sanitation',
      company: 'Patanjali Research Foundation',
      category: 'Corporate Training Module',
      duration: '3-Day Practical Bootcamp',
      deliveryMode: 'Industrial Cleanroom Facility (Haridwar)',
      enrolledCount: 380,
      seatsMax: 400,
      rating: '4.87',
      preceptor: 'Dr. S. K. Pathak',
      preceptorRole: 'Head of Quality Compliance, Patanjali Food & Herbal Park',
      skillsImparted: ['Cleanroom Gowning', 'HVAC Airflow Logs', 'Schedule T Audit', 'Airlock Protocols'],
      hiringPipeline: 'Direct apprentice pipeline for Divya Pharmacy high-capacity manufacturing facility',
      linkedOpportunityTitle: 'Industrial Apprentice: Large-Scale GMP Extraction & Botanicals QC',
      tuition: 'Corporate Sponsored (Free)',
      abcCredits: '1 Skill Credit Eligible',
      description: 'Master personnel gowning, airlock management, and Schedule T Grade A-D cleanroom differential pressure monitoring at Asia’s largest botanical extraction complex.'
    },
    {
      id: 'prog-ind-3',
      courseId: 'mc-ind-3',
      title: 'Himalaya Preceptorship: Botanical Drug Safety & Pharmacovigilance',
      company: 'The Himalaya Wellness Company',
      category: 'Mentorship Initiative',
      duration: '4-Week Mentorship Cohort',
      deliveryMode: 'Hybrid (Bengaluru Campus + Virtual)',
      enrolledCount: 290,
      seatsMax: 300,
      rating: '4.94',
      preceptor: 'Dr. Gayatri Joshi',
      preceptorRole: 'Medical Affairs & Pharmacovigilance Lead, Himalaya Wellness',
      skillsImparted: ['Herb-Drug Interaction', 'ADR Dossier Review', 'Clinical Safety', 'WHO-UMC Causality'],
      hiringPipeline: 'Mentorship fast-track for clinical safety officer and pre-clinical research associate positions',
      linkedOpportunityTitle: 'Preclinical Research Associate: Phyto-Formulation & Pharmacology',
      tuition: 'Corporate Sponsored (Free)',
      abcCredits: '2 Skill Credits Eligible',
      description: 'Weekly 1-on-1 industry mentorship and real-world adverse drug reaction case reviews directly supervised by senior Himalaya clinical safety scientists.'
    },
    {
      id: 'prog-ind-4',
      courseId: 'mc-ind-4',
      title: 'Charak Pharma: Classical Formulation Modernization & Scale-Up',
      company: 'Charak Pharma R&D Division',
      category: 'Industry Certification Course',
      duration: '1-Week Technical Sprint',
      deliveryMode: 'Pilot Plant Practicum (Mumbai)',
      enrolledCount: 310,
      seatsMax: 350,
      rating: '4.90',
      preceptor: 'Dr. Manoj Trivedi',
      preceptorRole: 'Head of Formulations, Charak Pharma',
      skillsImparted: ['Tablet Compression', 'Fluid Bed Granulation', 'Stability Testing', 'Batch Records'],
      hiringPipeline: 'Direct hiring consideration for Junior Ayurvedic Medical Officers & Production Chemists',
      linkedOpportunityTitle: 'Junior Ayurvedic Medical Officer (Entry-Level Practicum)',
      tuition: 'Corporate Sponsored (Free)',
      abcCredits: '1.5 Skill Credits Eligible',
      description: 'Bridge ancient Ayurvedic decoctions to modern pharmaceutical solid dosage delivery systems with hands-on fluid bed granulators and rotary compression tooling.'
    }
  ]);

  // Student's enrolled Industry Learning Programs
  const [enrolledPrograms, setEnrolledPrograms] = useState([
    {
      id: 'prog-ind-1',
      title: 'Dabur Certified: Phytochemical QC & CAMAG HPTLC Masterclass',
      company: 'Dabur Research & Development Center',
      category: 'Technical Workshop',
      enrolledDate: '3 days ago',
      progress: 65,
      status: 'In Progress (Session 2 of 3 Completed)',
      nextSession: 'Live CAMAG Lab Session: Tomorrow, 10:00 AM',
      preceptor: 'Dr. Vikram Sethi'
    }
  ]);

  // Available job opportunities enriched across the 4 verified categories
  const jobs = INITIAL_FEED_POSTS.filter(p => p.isInternship).map(p => {
    // Calibrated match scores for realistic testing
    const defaultScores = {
      'job-1': 94, // >= 85% (Direct Apply)
      'job-2': 78, // < 85% (Prerequisite Advisory)
      'job-3': 74, // < 85% (Prerequisite Advisory)
      'job-4': 88, // >= 85% (Direct Apply)
      'job-5': 81, // < 85% (Prerequisite Advisory)
      'job-6': 91, // >= 85% (Direct Apply)
      'job-7': 76, // < 85% (Prerequisite Advisory)
      'job-8': 89, // >= 85% (Direct Apply)
      'job-9': 93  // >= 85% (Direct Apply)
    };
    
    // Explicit opportunity categories mapping
    const categoriesMap = {
      'job-1': 'Internship',
      'job-2': 'Internship',
      'job-3': 'Apprenticeship',
      'job-4': 'Entry-Level Job',
      'job-5': 'Live Project',
      'job-6': 'Live Project',
      'job-7': 'Apprenticeship',
      'job-8': 'Entry-Level Job',
      'job-9': 'Entry-Level Job'
    };

    // Linked corporate learning programs for upskilling
    const recommendedProgramMap = {
      'job-1': {
        id: 'prog-ind-1',
        title: 'Dabur Certified: Phytochemical QC & CAMAG HPTLC Masterclass',
        company: 'Dabur R&D Center',
        duration: '2-Day Workshop',
        bridgeSkill: 'CAMAG VisionCATS & Schedule T QC',
        boostDelta: '+12% Match Boost'
      },
      'job-2': {
        id: 'prog-ind-3',
        title: 'Himalaya Preceptorship: Botanical Drug Safety & Pharmacovigilance',
        company: 'Himalaya Wellness',
        duration: '4-Week Mentorship',
        bridgeSkill: 'WHO-UMC Causality & ADR Reporting',
        boostDelta: '+15% Match Boost'
      },
      'job-3': {
        id: 'prog-ind-2',
        title: 'Patanjali Workshop: Schedule T Cleanroom Operations & Sanitation',
        company: 'Patanjali Research',
        duration: '3-Day Bootcamp',
        bridgeSkill: 'Schedule T Cleanroom & Airflow Validation',
        boostDelta: '+18% Match Boost'
      },
      'job-4': {
        id: 'prog-ind-4',
        title: 'Charak Pharma: Classical Formulation Modernization & Scale-Up',
        company: 'Charak Pharma',
        duration: '1-Week Sprint',
        bridgeSkill: 'Pilot Plant Granulation & Stability Testing',
        boostDelta: '+14% Match Boost'
      },
      'job-5': {
        id: 'prog-ind-3',
        title: 'Himalaya Preceptorship: Botanical Drug Safety & Pharmacovigilance',
        company: 'Himalaya Wellness',
        duration: '4-Week Mentorship',
        bridgeSkill: 'Cellular Bioassay Screening',
        boostDelta: '+16% Match Boost'
      },
      'job-7': {
        id: 'prog-ind-2',
        title: 'Patanjali Workshop: Schedule T Cleanroom Operations & Sanitation',
        company: 'Patanjali Research',
        duration: '3-Day Bootcamp',
        bridgeSkill: 'Botanical Extraction & Batch QC',
        boostDelta: '+17% Match Boost'
      }
    };

    const idKey = \`job-\${p.id}\`;
    const calculatedMatch = defaultScores[idKey] ?? (p.id % 2 === 0 ? 77 + (p.id % 6) : 89 + (p.id % 6));
    const roleCategory = categoriesMap[idKey] || (p.title.toLowerCase().includes('apprentice') ? 'Apprenticeship' : p.title.toLowerCase().includes('project') || p.title.toLowerCase().includes('fellow') ? 'Live Project' : p.title.toLowerCase().includes('officer') || p.title.toLowerCase().includes('physician') ? 'Entry-Level Job' : 'Internship');

    return {
      id: idKey,
      title: p.title,
      company: p.author?.brandName || p.author?.name || 'Ayush Enterprise Partner',
      category: roleCategory,
      location: p.location,
      stipend: p.stipend,
      duration: p.duration,
      openings: p.openings || '1-2 Positions',
      skills: (p.skillsRequired || []).slice(0, 4),
      match: calculatedMatch,
      logoBg: p.author?.avatarBg || 'bg-emerald-900',
      logoText: p.author?.avatar || 'AY',
      logoImage: p.author?.avatarImage,
      recruiter: p.author?.recruiter,
      recommendedProgram: recommendedProgramMap[idKey] || null
    };
  });

  // Student's applied jobs with timeline progress
  const [appliedList, setAppliedList] = useState([
    {
      id: 'app-1',
      jobId: 'job-1',
      title: 'Phytochemical Standardization & HPTLC QC Specialist',
      company: 'Dabur Research Center',
      category: 'Internship',
      location: 'Ghaziabad',
      stipend: '₹25,000 / mo',
      appliedDate: 'Yesterday',
      status: 'Interview Scheduled',
      statusType: 'success',
      activeStep: 3,
      steps: ['Applied', 'Reviewed', 'Matched', 'Interview Scheduled'],
      interviewNote: 'Technical Round with Dr. Vikram Sethi on Sept 28 at 11:00 AM'
    },
    {
      id: 'app-2',
      jobId: 'job-3',
      title: 'Industrial Apprentice: Large-Scale GMP Extraction & Botanicals QC',
      company: 'Patanjali Research Foundation',
      category: 'Apprenticeship',
      location: 'Haridwar',
      stipend: '₹22,000 / mo',
      appliedDate: '3 days ago',
      status: 'In Review (Under Preceptor Evaluation)',
      statusType: 'pending',
      activeStep: 1,
      steps: ['Applied', 'Reviewed', 'Matched', 'Interview Scheduled'],
      interviewNote: null
    }
  ]);

  // Determine student's verified skills vs required job competencies
  const getSkillBreakdown = (job) => {
    if (!job) return { matched: [], gaps: [], matchScore: 78 };

    const matched = [];
    const gaps = [];

    (job.skills || []).forEach(skill => {
      const isMatched = studentVerifiedSkills.some(s => 
        skill.toLowerCase().includes(s.toLowerCase().split(' ')[0]) || 
        s.toLowerCase().includes(skill.toLowerCase().split(' ')[0])
      );
      if (isMatched) {
        matched.push(skill);
      } else {
        gaps.push(skill);
      }
    });

    // Ensure realistic gaps exist for roles below 85%
    if (gaps.length === 0 && job.skills && job.skills.length > 1) {
      gaps.push(matched.pop());
    }
    if (job.match < 85 && gaps.length === 0) {
      gaps.push('Schedule T Cleanroom Airflow Validation');
      gaps.push('ICH-GCP Guidelines (Clinical Trial Monitoring)');
    }

    return { 
      matched, 
      gaps, 
      matchScore: job.match || 78
    };
  };

  // Find targeted bridge courses from catalog that resolve missing skills
  const getSuggestedCoursesForJob = (job, gaps) => {
    if (!job) return [];
    const matched = ALL_COURSES.filter(course => 
      (gaps || []).some(gap => {
        const keyword = gap.toLowerCase().split(' ')[0];
        return course.title.toLowerCase().includes(keyword) ||
          (course.competencies && course.competencies.some(c => c.toLowerCase().includes(keyword))) ||
          (course.relatedSkills && course.relatedSkills.some(r => r.toLowerCase().includes(keyword)));
      })
    );
    const fallbacks = ALL_COURSES.filter(c => !matched.some(m => m.id === c.id));
    return [...matched, ...fallbacks].slice(0, 2);
  };

  // Trigger application workflow: Direct Apply (>=85%) or Advisory Modal (<85%)
  const handleInitiateApply = (job) => {
    if (appliedList.some(a => a.jobId === job.id)) {
      setActiveTab('applied');
      return;
    }
    if (job.match < 85) {
      setPrerequisiteModalJob(job);
      setEnrolledBridgeSuccess(false);
    } else {
      handleConfirmApply(job);
    }
  };

  // Final confirmation to submit application
  const handleConfirmApply = (job) => {
    setPrerequisiteModalJob(null);
    setGapAnalysisJob(null);
    const newApplication = {
      id: \`app-\${Date.now()}\`,
      jobId: job.id,
      title: job.title,
      company: job.company,
      category: job.category || 'Opportunity',
      location: job.location,
      stipend: job.stipend,
      appliedDate: 'Today',
      status: job.match < 85 ? 'Application Submitted (Lower Match Rank)' : 'Application Submitted (High Match Dossier)',
      statusType: 'active',
      activeStep: 0,
      steps: ['Applied', 'Reviewed', 'Matched', 'Interview Scheduled'],
      interviewNote: job.match < 85 ? \`Applied with \${job.match}% match rank (Below 85% recommended benchmark)\` : 'Verified 85%+ Match: Expedited Recruiter Screening'
    };

    setAppliedList(prev => [newApplication, ...prev]);
    setAppliedModalJob(job);

    // Cross-Stakeholder Notification: Student -> Company
    dispatchNotification({
      targetRole: 'company',
      targetRecipientId: job.companyId || (job.company && job.company.toLowerCase().includes('dabur') ? 'EMP-DABUR-QC-89' : null),
      targetRecipientName: job.company,
      senderId: currentUser?.id || 'NIA/AY/2026/0491',
      senderName: currentUser?.name || 'Aarav Sharma',
      senderRole: 'student',
      title: \`New applicant for \${job.title} (\${job.category})\`,
      message: \`\${currentUser?.name || 'Aarav Sharma'} applied for \${job.title} at \${job.company}. Match Rank: \${job.match}%.\`,
      link: '#dashboard-company'
    });
  };

  // Enroll in an Industry Learning Program
  const handleEnrollInProgram = (program) => {
    if (enrolledPrograms.some(p => p.id === program.id)) {
      alert(\`You are already enrolled in \${program.title}!\`);
      setSelectedProgramModal(null);
      setActiveTab('applied');
      return;
    }

    const newEnrollment = {
      id: program.id,
      title: program.title,
      company: program.company,
      category: program.category,
      enrolledDate: 'Just Now',
      progress: 0,
      status: 'Enrolled (Orientation Materials Ready)',
      nextSession: 'Batch Kick-off & Preceptor Orientation: Within 48 Hours',
      preceptor: program.preceptor
    };

    setEnrolledPrograms(prev => [newEnrollment, ...prev]);
    setEnrolledProgramSuccess(true);

    // Cross-Stakeholder Notification: Student -> Company
    dispatchNotification({
      targetRole: 'company',
      targetRecipientName: program.company,
      senderId: currentUser?.id || 'NIA/AY/2026/0491',
      senderName: currentUser?.name || 'Aarav Sharma',
      senderRole: 'student',
      title: \`New Scholar Enrollment: \${program.title}\`,
      message: \`\${currentUser?.name || 'Aarav Sharma'} enrolled in corporate learning program "\${program.title}".\`,
      link: '#dashboard-company'
    });

    setTimeout(() => {
      setEnrolledProgramSuccess(false);
      setSelectedProgramModal(null);
    }, 1800);
  };

  // Open course in Skills view
  const handleOpenCourseInSkills = (course) => {
    setPrerequisiteModalJob(null);
    setGapAnalysisJob(null);
    if (onNavigate) {
      onNavigate('skills', { course });
    }
  };

  // Category badge styling helper
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Internship':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Live Project':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Apprenticeship':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Entry-Level Job':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  // Filtered jobs for Explore tab
  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.category.toLowerCase().includes(query) ||
      job.skills.some(s => s.toLowerCase().includes(query));

    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;

    const matchesMatchTier = matchTierFilter === 'all' || 
      (matchTierFilter === 'high' && job.match >= 85) ||
      (matchTierFilter === 'gap' && job.match < 85);

    const matchesLocation = locationFilter === 'all' || 
      (locationFilter === 'delhi' && job.location.toLowerCase().includes('delhi')) ||
      (locationFilter === 'haridwar' && job.location.toLowerCase().includes('haridwar')) ||
      (locationFilter === 'kerala' && job.location.toLowerCase().includes('kerala')) ||
      (locationFilter === 'bengaluru' && job.location.toLowerCase().includes('bengaluru')) ||
      (locationFilter === 'hybrid' && job.location.toLowerCase().includes('hybrid'));

    return matchesSearch && matchesCategory && matchesMatchTier && matchesLocation;
  });

  // Filtered programs for Learning Programs tab
  const filteredPrograms = learningPrograms.filter(prog => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      prog.title.toLowerCase().includes(query) ||
      prog.company.toLowerCase().includes(query) ||
      prog.skillsImparted.some(s => s.toLowerCase().includes(query));

    const matchesFormat = programFormatFilter === 'all' || prog.category === programFormatFilter;
    const matchesCompany = programCompanyFilter === 'all' || prog.company.toLowerCase().includes(programCompanyFilter.toLowerCase());

    return matchesSearch && matchesFormat && matchesCompany;
  });

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Main Header with Intentional Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pt-2 border-b border-slate-200/70 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200 inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              Verified Industry Opportunities Suite
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Industry Opportunities &amp; Learning Programs
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Corporate internships, live projects, apprenticeships, entry-level openings, and sponsored industry training programs.
          </p>
        </div>

        {/* 3-Way Top Segmented Switcher */}
        <div className="inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80 self-start sm:self-auto shrink-0 shadow-2xs">
          <button
            onClick={() => setActiveTab('explore')}
            className={\`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 \${
              activeTab === 'explore'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
            <span>Opportunities ({jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            className={\`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 \${
              activeTab === 'programs'
                ? 'bg-purple-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            <BookOpen className={\`w-3.5 h-3.5 \${activeTab === 'programs' ? 'text-purple-200' : 'text-purple-700'}\`} />
            <span>Learning Programs ({learningPrograms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('applied')}
            className={\`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 \${
              activeTab === 'applied'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>My Applications &amp; Enrollments</span>
            <span className={\`px-1.5 py-0.2 rounded-full text-[10px] font-bold \${
              activeTab === 'applied' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
            }\`}>
              {appliedList.length + enrolledPrograms.length}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EXPLORE OPPORTUNITIES (INTERNSHIPS, PROJECTS, APPRENTICESHIPS, JOBS) */}
      {/* ========================================================================= */}
      {activeTab === 'explore' && (
        <div className="space-y-6">

          {/* Student Verified Profile Recommendation Callout */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 text-white border border-emerald-900/50 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-emerald-950">
                  Verified Skill Profile Matching
                </span>
                <span className="text-xs text-emerald-200 font-medium">
                  {currentUser?.name || 'Aarav Sharma'} · National Institute of Ayurveda (NIA Jaipur)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                Your portfolio matches 6 high-priority enterprise vacancies!
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                SkillSetu dynamically matches your verified academic proofs of work against real-time industry job specifications. Roles with 85%+ verified competency allow immediate fast-track direct application.
              </p>
              
              {/* Verified Competency Badges */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mr-1">Verified:</span>
                {studentVerifiedSkills.map((skill, idx) => (
                  <span key={idx} className="text-[11px] font-semibold bg-white/10 hover:bg-white/15 px-2.5 py-0.5 rounded-lg border border-white/15 text-emerald-100 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 text-center min-w-[140px]">
              <span className="text-3xl font-black text-emerald-300 block">94%</span>
              <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Top Match Score</span>
              <span className="text-[11px] text-emerald-200 font-semibold block mt-1">Dabur R&amp;D Center</span>
            </div>
          </div>

          {/* Search & Category Filter Suite */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by role title, corporate enterprise, or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition-all outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Match Tier Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Match Rank:</span>
                {[
                  { id: 'all', label: 'All Match Tiers' },
                  { id: 'high', label: '≥85% Direct Apply' },
                  { id: 'gap', label: 'Upskilling Advised' }
                ].map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => setMatchTierFilter(tier.id)}
                    className={\`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer \${
                      matchTierFilter === tier.id
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }\`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Opportunity Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Opportunities', count: jobs.length },
                { id: 'Internship', label: 'Internships', count: jobs.filter(j => j.category === 'Internship').length },
                { id: 'Live Project', label: 'Live Projects', count: jobs.filter(j => j.category === 'Live Project').length },
                { id: 'Apprenticeship', label: 'Apprenticeships', count: jobs.filter(j => j.category === 'Apprenticeship').length },
                { id: 'Entry-Level Job', label: 'Entry-Level Jobs', count: jobs.filter(j => j.category === 'Entry-Level Job').length }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={\`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 \${
                    categoryFilter === cat.id
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }\`}
                >
                  <span>{cat.label}</span>
                  <span className={\`text-[10px] px-1.5 py-0.2 rounded-full font-black \${
                    categoryFilter === cat.id ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
                  }\`}>
                    {cat.count}
                  </span>
                </button>
              ))}

              <div className="h-4 w-px bg-slate-300 mx-1 shrink-0" />

              {/* Quick Location Pills */}
              {[
                { id: 'all', label: 'All Locations' },
                { id: 'delhi', label: 'Delhi NCR' },
                { id: 'haridwar', label: 'Haridwar' },
                { id: 'kerala', label: 'Kerala' },
                { id: 'bengaluru', label: 'Bengaluru' },
                { id: 'hybrid', label: 'Hybrid' }
              ].map(loc => (
                <button
                  key={loc.id}
                  onClick={() => setLocationFilter(loc.id)}
                  className={\`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer \${
                    locationFilter === loc.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }\`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Postings Grid */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto stroke-[1.5]" />
              <p className="text-sm font-medium text-slate-700">No matching positions found for selected criteria</p>
              <button
                onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setMatchTierFilter('all'); setLocationFilter('all'); }}
                className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => {
                const isApplied = appliedList.some(a => a.jobId === job.id);
                const { matched, gaps } = getSkillBreakdown(job);

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all flex flex-col justify-between space-y-5"
                  >
                    {/* Header: Opportunity Category Badge, Logo, Title, Match Pill */}
                    <div className="space-y-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={\`w-12 h-12 rounded-2xl \${job.logoBg} text-white font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden shadow-2xs border border-slate-100\`}>
                            {job.logoImage ? (
                              <img src={job.logoImage} alt={job.company} className="w-full h-full object-cover" />
                            ) : (
                              job.logoText
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={\`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border \${getCategoryBadge(job.category)}\`}>
                                {job.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {job.openings}
                              </span>
                            </div>
                            <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                              {job.title}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                              {job.company}
                            </p>
                          </div>
                        </div>

                        {/* Match Indicator Badge */}
                        <div className="shrink-0 text-right">
                          <button
                            onClick={() => setGapAnalysisJob(job)}
                            className={\`text-[11px] font-black px-2.5 py-1 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs \${
                              job.match >= 85 
                                ? 'text-emerald-900 bg-emerald-50 border-emerald-300 hover:bg-emerald-100' 
                                : 'text-amber-950 bg-amber-50 border-amber-300 hover:bg-amber-100'
                            }\`}
                            title="Click for full competency match audit"
                          >
                            {job.match < 85 && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                            <span>{job.match}% Match</span>
                          </button>
                          <span className="text-[9px] text-slate-400 font-medium block mt-0.5">
                            {job.match >= 85 ? 'Direct Apply' : 'Bridge Advised'}
                          </span>
                        </div>
                      </div>

                      {/* Key Meta Details */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 pt-1">
                        <span className="font-bold text-slate-900">{job.stipend}</span>
                        <span className="text-slate-300">·</span>
                        <span>{job.duration}</span>
                        <span className="text-slate-300">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </span>
                      </div>

                      {/* Required Skills with Matched vs Gaps Indicators */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                            Required Skills Breakdown:
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            {matched.length} Verified · {gaps.length} Gaps
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {matched.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold text-emerald-900 bg-emerald-50/80 px-2.5 py-0.5 rounded-lg border border-emerald-200/80 flex items-center gap-1"
                              title="Verified competency on your portfolio"
                            >
                              <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />
                              <span>{skill}</span>
                            </span>
                          ))}
                          {gaps.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold text-amber-900 bg-amber-50/80 px-2.5 py-0.5 rounded-lg border border-amber-200/80 flex items-center gap-1"
                              title="Missing mandatory competency for this vacancy"
                            >
                              <span className="text-amber-700 font-black">!</span>
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Industry Learning Program Callout */}
                      {job.recommendedProgram && job.match < 85 && (
                        <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200/80 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-purple-950 text-[10px] uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-purple-700" />
                              <span>Recommended Industry Program:</span>
                            </span>
                            <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.2 rounded-md">
                              {job.recommendedProgram.boostDelta}
                            </span>
                          </div>
                          <p className="text-[11px] text-purple-900 font-medium leading-snug">
                            {job.recommendedProgram.title} ({job.recommendedProgram.duration}) bridges your skill gap in <strong>{job.recommendedProgram.bridgeSkill}</strong> before applying.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const prog = learningPrograms.find(p => p.id === job.recommendedProgram.id) || learningPrograms[0];
                              setSelectedProgramModal(prog);
                            }}
                            className="text-[11px] font-bold text-purple-900 hover:text-purple-950 underline cursor-pointer inline-flex items-center gap-1 pt-0.5"
                          >
                            <span>View Corporate Program &amp; Enroll</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setGapAnalysisJob(job)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        Match Analysis
                      </button>

                      {isApplied ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Applied</span>
                          </span>
                          <button
                            onClick={() => setActiveTab('applied')}
                            className="text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            Track →
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleInitiateApply(job)}
                          className={\`px-4 py-2 rounded-xl text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 \${
                            job.match >= 85 
                              ? 'bg-slate-900 hover:bg-slate-800' 
                              : 'bg-emerald-800 hover:bg-emerald-900'
                          }\`}
                        >
                          <span>{job.match >= 85 ? 'Direct Apply' : 'Apply (Advisory)'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INDUSTRY LEARNING PROGRAMS (TRAINING, WORKSHOPS, MENTORSHIPS) */}
      {/* ========================================================================= */}
      {activeTab === 'programs' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-black text-purple-800 uppercase tracking-wider block">
                Corporate Skilling &amp; Pre-Hiring Pipeline
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Industry-Published Training Programs &amp; Workshops
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                Enterprises publish hands-on laboratory workshops, industry certification courses, and preceptor mentorship cohorts to prepare candidates with statutory and technical competencies before final placement.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center min-w-[120px]">
                <span className="text-2xl font-black text-purple-950 block">{learningPrograms.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Active Programs</span>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center min-w-[120px]">
                <span className="text-2xl font-black text-emerald-950 block">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Sponsored (Free)</span>
              </div>
            </div>
          </div>

          {/* Program Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Format Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Formats' },
                { id: 'Technical Workshop', label: 'Hands-on Workshops' },
                { id: 'Corporate Training Module', label: 'Cleanroom Bootcamps' },
                { id: 'Mentorship Initiative', label: 'Preceptor Mentorships' },
                { id: 'Industry Certification Course', label: 'Certification Courses' }
              ].map(fmt => (
                <button
                  key={fmt.id}
                  onClick={() => setProgramFormatFilter(fmt.id)}
                  className={\`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer \${
                    programFormatFilter === fmt.id
                      ? 'bg-purple-900 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }\`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

            {/* Company Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Partner:</span>
              {['all', 'Dabur', 'Patanjali', 'Himalaya', 'Charak'].map(comp => (
                <button
                  key={comp}
                  onClick={() => setProgramCompanyFilter(comp)}
                  className={\`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer \${
                    programCompanyFilter === comp
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }\`}
                >
                  {comp === 'all' ? 'All' : comp}
                </button>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrograms.map((prog) => {
              const isEnrolled = enrolledPrograms.some(e => e.id === prog.id);

              return (
                <div 
                  key={prog.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft hover:shadow-lg hover:border-purple-300 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Top Row: Category, Duration, Delivery */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200 inline-block">
                          {prog.category}
                        </span>
                        <p className="text-xs text-slate-400 font-semibold">
                          {prog.company}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-700 flex items-center justify-end gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prog.duration}</span>
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 block mt-1">
                          {prog.abcCredits}
                        </span>
                      </div>
                    </div>

                    {/* Program Title & Description */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed mt-1.5">
                        {prog.description}
                      </p>
                    </div>

                    {/* Pre-Hiring Pipeline Guarantee Callout */}
                    <div className="p-3.5 bg-purple-50/80 rounded-2xl border border-purple-100 space-y-1">
                      <span className="text-[11px] font-black text-purple-950 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-purple-700" />
                        <span>Pre-Hiring Fast-Track Pipeline:</span>
                      </span>
                      <p className="text-xs text-purple-900 font-medium leading-relaxed">
                        {prog.hiringPipeline}
                      </p>
                    </div>

                    {/* In-Demand Skills Imparted */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Target Laboratory &amp; Clinical Competencies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prog.skillsImparted.map((s, idx) => (
                          <span key={idx} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Preceptor & Delivery Info */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                      <span>Preceptor: <strong className="text-slate-800">{prog.preceptor}</strong></span>
                      <span className="text-emerald-800 font-bold">{prog.enrolledCount} / {prog.seatsMax} Enrolled</span>
                    </div>
                  </div>

                  {/* Program Action Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                      {prog.tuition}
                    </span>

                    {isEnrolled ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-900 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Enrolled</span>
                        </span>
                        <button
                          onClick={() => setActiveTab('applied')}
                          className="text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          View Schedule →
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedProgramModal(prog)}
                        className="px-4 py-2 bg-purple-900 hover:bg-purple-950 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                      >
                        <PlayCircle className="w-3.5 h-3.5 text-purple-300" />
                        <span>Enroll &amp; Upskill</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: APPLICATIONS & ENROLLMENTS TRACKING */}
      {/* ========================================================================= */}
      {activeTab === 'applied' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* SECTION A: Submitted Job Applications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Submitted Opportunity Applications ({appliedList.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time 4-stage recruiter review pipeline and interview schedules.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                + Browse More Roles
              </button>
            </div>

            {appliedList.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
                <p className="text-sm font-medium text-slate-600">No applications submitted yet.</p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-bold text-slate-900 hover:underline cursor-pointer"
                >
                  Explore open opportunities
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appliedList.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-5 shadow-2xs"
                  >
                    {/* Position, Company, Status Pill, Recruiter Message CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={\`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border \${getCategoryBadge(app.category)}\`}>
                            {app.category}
                          </span>
                          <h4 className="font-bold text-base sm:text-lg text-slate-900">
                            {app.title}
                          </h4>
                          <span className={\`px-2.5 py-0.5 rounded-full text-xs font-bold border \${
                            app.statusType === 'success' 
                              ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                              : app.statusType === 'pending'
                              ? 'text-amber-800 bg-amber-50 border-amber-200'
                              : 'text-slate-700 bg-slate-100 border-slate-200'
                          }\`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                          {app.company} · {app.location} · {app.stipend} · Applied {app.appliedDate}
                        </p>
                      </div>

                      <button
                        onClick={() => onNavigate && onNavigate('messages')}
                        className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>Message Recruiter</span>
                      </button>
                    </div>

                    {/* Horizontal 4-Stage Segmented Progress Bar */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 gap-2">
                        {app.steps.map((stepName, stepIdx) => {
                          const isDone = stepIdx <= app.activeStep;
                          const isCurrent = stepIdx === app.activeStep;

                          return (
                            <div key={stepIdx} className="space-y-1.5">
                              <div className={\`h-2 rounded-full transition-colors \${
                                isDone ? 'bg-slate-900' : 'bg-slate-100'
                              }\`} />
                              <span className={\`text-[11px] block truncate transition-colors \${
                                isCurrent 
                                  ? 'font-bold text-slate-900' 
                                  : isDone 
                                  ? 'font-medium text-slate-700' 
                                  : 'font-normal text-slate-400'
                              }\`}>
                                {stepName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interview Note Callout */}
                    {app.interviewNote && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                        <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{app.interviewNote}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION B: Enrolled Industry Learning Programs */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Enrolled Corporate Learning Programs ({enrolledPrograms.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Track workshops, mentor sessions, and pre-hiring fast-track qualification status.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('programs')}
                className="text-xs font-bold text-purple-900 hover:underline cursor-pointer"
              >
                + Browse Corporate Programs
              </button>
            </div>

            {enrolledPrograms.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
                <p className="text-sm font-medium text-slate-600">No corporate programs enrolled yet.</p>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="text-xs font-bold text-purple-900 hover:underline cursor-pointer"
                >
                  Explore industry workshops &amp; courses
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/80 space-y-4 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
                          {prog.category}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-slate-900 mt-1">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {prog.company} · Preceptor: {prog.preceptor} · Enrolled {prog.enrolledDate}
                        </p>
                      </div>

                      <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200">
                        {prog.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Cohort Progress</span>
                        <span>{prog.progress}% Completed</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className="h-full bg-purple-900 rounded-full transition-all duration-500" 
                          style={{ width: \`\${prog.progress}%\` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between text-xs text-purple-950 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-700" />
                        <span>{prog.nextSession}</span>
                      </span>
                      <button
                        onClick={() => alert(\`Launching practical workbook for \${prog.title}\`)}
                        className="font-bold text-purple-900 hover:underline cursor-pointer"
                      >
                        Open Lab Portal →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. Clean Application Confirmation Modal */}
      {appliedModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className={\`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border \${getCategoryBadge(appliedModalJob.category)}\`}>
                {appliedModalJob.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Application Successfully Dispatched
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your verified dossier and proofs of work have been submitted to <strong>{appliedModalJob.company}</strong>.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setAppliedModalJob(null);
                  setActiveTab('applied');
                }}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Track Status
              </button>
              <button
                onClick={() => setAppliedModalJob(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Prerequisite Advisory Modal (For Match < 85%) */}
      {prerequisiteModalJob && (() => {
        const { matched, gaps } = getSkillBreakdown(prerequisiteModalJob);
        const suggestedCourses = getSuggestedCoursesForJob(prerequisiteModalJob, gaps);
        const topCourse = suggestedCourses[0] || {
          id: 'fast-track-bridge',
          title: 'Schedule T Cleanroom Airflow Validation & GMP Masterclass',
          duration: '15-20 Mins',
          author: 'National Ayush Preceptor Cell'
        };

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-amber-300/80 overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95">
              
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between shrink-0 bg-gradient-to-r from-amber-50/70 via-amber-50/30 to-white">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800 border border-amber-200 shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-amber-700 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                      Prerequisite Advisory: Recommended Upskilling
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-1">
                      {prerequisiteModalJob.title} · <span className="font-semibold text-slate-700">{prerequisiteModalJob.company}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setPrerequisiteModalJob(null)}
                  className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Match Benchmark Alert Callout */}
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-amber-950">{prerequisiteModalJob.match}% Match</span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-amber-200/80 text-amber-950 rounded-md">
                        Below 85% Benchmark
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
                      Recruiters prioritize candidates with <strong>85%+ verified readiness</strong>. Completing the recommended module first boosts your dossier to the top interview tier.
                    </p>
                  </div>
                  <div className="w-full sm:w-28 bg-amber-200/60 rounded-full h-2.5 overflow-hidden shrink-0">
                    <div 
                      className="bg-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: \`\${prerequisiteModalJob.match}%\` }}
                    />
                  </div>
                </div>

                {/* Missing Skills List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Missing Mandatory Skills:</span>
                    </h4>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200">
                      {gaps.length} Unverified {gaps.length === 1 ? 'Skill' : 'Skills'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {gaps.map((skill, idx) => (
                      <div 
                        key={idx}
                        className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/80 flex items-center justify-between text-xs text-amber-950"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-4 h-4 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center text-[10px] font-black shrink-0">
                            ✕
                          </span>
                          <span className="font-bold text-slate-900 truncate">{skill}</span>
                        </div>
                        <span className="text-[9px] font-bold text-amber-900 shrink-0 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                          Mandatory Requirement
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Bridge Module */}
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-teal-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                      <span>Suggested Fast-Track Module</span>
                    </h4>
                    <span className="text-[10px] font-extrabold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md border border-teal-200">
                      +14% Readiness Boost
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      {topCourse.title}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Targeted 15-minute diagnostic simulation to satisfy prerequisite skills before submission.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEnrolledBridgeSuccess(true);
                      setTimeout(() => {
                        handleOpenCourseInSkills(topCourse);
                      }, 700);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
                  >
                    <PlayCircle className="w-4 h-4 text-teal-300" />
                    <span>Enroll in 15-min Bridge Simulation</span>
                  </button>

                  {enrolledBridgeSuccess && (
                    <div className="p-2.5 bg-emerald-100 text-emerald-900 text-xs rounded-xl font-bold flex items-center justify-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Launching Bridge Sprint in Skills...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0 bg-slate-50/60">
                <button
                  type="button"
                  onClick={() => {
                    const jobToApply = prerequisiteModalJob;
                    setPrerequisiteModalJob(null);
                    handleConfirmApply(jobToApply);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
                >
                  Proceed Anyway (Lower Match Rank)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleOpenCourseInSkills(topCourse);
                    setPrerequisiteModalJob(null);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Upskill First (Recommended)</span>
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* 3. Skill Match & Role Analysis Modal */}
      {gapAnalysisJob && (() => {
        const { matched, gaps, matchScore } = getSkillBreakdown(gapAnalysisJob);
        const suggestedCourses = getSuggestedCoursesForJob(gapAnalysisJob, gaps);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200/80 overflow-hidden my-auto flex flex-col max-h-[92vh]">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                    Role Match Analysis
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {gapAnalysisJob.title} · <span className="text-slate-700 font-medium">{gapAnalysisJob.company}</span>
                  </p>
                </div>

                <button
                  onClick={() => setGapAnalysisJob(null)}
                  className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Score Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{matchScore}%</span>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        {matchScore >= 80 ? 'Strong Match' : 'Prerequisites Met'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-normal">
                      {matched.length} of {matched.length + gaps.length} criteria verified on your portfolio
                    </p>
                  </div>
                  <div className="w-20 sm:w-28 bg-slate-200 rounded-full h-2 overflow-hidden shrink-0">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: \`\${matchScore}%\` }}
                    />
                  </div>
                </div>

                {/* Matched vs Gaps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Verified Match ({matched.length})</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matched.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Missing Skills ({gaps.length})</span>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {gaps.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggested Bridge Course */}
                {suggestedCourses.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Suggested Bridge Module
                      </h4>
                      <span className="text-[11px] text-slate-400">Available in Skills</span>
                    </div>

                    {suggestedCourses.slice(0, 1).map(course => (
                      <div
                        key={course.id}
                        className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-slate-900 truncate">
                            {course.title}
                          </h5>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {course.author} · {course.duration} · Free Access
                          </p>
                        </div>

                        <button
                          onClick={() => handleOpenCourseInSkills(course)}
                          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-semibold shrink-0 cursor-pointer"
                        >
                          Open in Skills →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
                <button
                  onClick={() => setGapAnalysisJob(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmApply(gapAnalysisJob)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Apply with {matchScore}% Match</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 4. Industry Learning Program Details & Enrollment Modal */}
      {selectedProgramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-purple-200 overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in zoom-in-95">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-950 to-slate-900 text-white flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-400 text-purple-950 inline-flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Corporate Skilling Enrollment
                </span>
                <h3 className="text-lg font-black tracking-tight mt-1">
                  {selectedProgramModal.title}
                </h3>
                <p className="text-xs text-purple-200 font-medium">
                  {selectedProgramModal.company} · {selectedProgramModal.duration}
                </p>
              </div>

              <button
                onClick={() => setSelectedProgramModal(null)}
                className="text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                <span className="font-extrabold text-purple-950 block">Pre-Hiring Fast-Track Guarantee:</span>
                <p className="text-purple-900 font-medium leading-relaxed">
                  {selectedProgramModal.hiringPipeline}
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Program Overview &amp; Curriculum:</h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedProgramModal.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800">Skills Imparted:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProgramModal.skillsImparted.map((s, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">DigiLocker ABC Credit Transfer:</span>
                <p className="text-slate-600">
                  {selectedProgramModal.abcCredits} will be credited to student's Academic Bank of Credits upon completion.
                </p>
              </div>

              {enrolledProgramSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold flex items-center justify-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Enrolled successfully! Roster seat confirmed.</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/60">
              <button
                onClick={() => setSelectedProgramModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => handleEnrollInProgram(selectedProgramModal)}
                disabled={enrolledProgramSuccess}
                className="px-5 py-2.5 bg-purple-900 hover:bg-purple-950 disabled:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                {enrolledProgramSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Enrolled</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4 text-purple-300" />
                    <span>Confirm Free Enrollment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default JobsPage;
`;

fs.writeFileSync(filePath, newJobsPageCode, 'utf8');
console.log("Successfully updated JobsPage.jsx with complete Industry Opportunities and Learning Programs suite!");
