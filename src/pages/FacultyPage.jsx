import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  PlusCircle, 
  BarChart3, 
  Award,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  FileCheck,
  GraduationCap,
  ChevronRight,
  Download,
  Share2,
  FileText,
  UploadCloud,
  Check,
  Layers,
  AlertCircle,
  Tag,
  Video,
  X,
  Users,
  Target,
  TrendingUp,
  Send,
  Building2,
  Sliders,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export function FacultyPage({ onNavigate, onOpenReadinessModal, currentUser, initialTab = 'radar' }) {
  const { dispatchNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState(initialTab); // 'radar' | 'review' | 'author' | 'publish' | 'grants'

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [selectedCohort, setSelectedCohort] = useState('BAMS-FinalYear');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredVector, setHoveredVector] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };
  
  const facultyUser = currentUser || {
    name: "Prof. Meenakshi Joshi",
    role: "Professor & HOD (Dravyaguna)",
    id: "FAC-AIIA-7712",
    email: "prof.mjoshi@aiia.gov.in",
    institution: "All India Institute of Ayurveda (AIIA), New Delhi",
    avatar: "MJ"
  };


  // Department Cohorts Diagnostic Radar Datasets
  const COHORTS_DATA = {
    'BAMS-FinalYear': {
      id: 'BAMS-FinalYear',
      name: 'BAMS (Final Year - 2026 Batch)',
      shortName: 'BAMS Final Year',
      totalScholars: 142,
      departmentReadiness: 81.4,
      readinessDelta: '+3.2%',
      deficitsCount: 2,
      q1Count: 58,
      vectors: [
        { name: 'Classical Botanical Identification', score: 91, benchmark: 82, delta: 9, status: 'Exceeding Benchmark (+9%)', desc: 'Herbarium voucher specimen authentication & morphology' },
        { name: 'Schedule T GMP Compliance', score: 74, benchmark: 80, delta: -6, status: 'Critical Deficit (-6%)', desc: 'Cleanroom HVAC airflow, particle counts & BMR validation' },
        { name: 'HPTLC Fingerprinting & Spectrophotometry', score: 71, benchmark: 78, delta: -7, status: 'Targeted for Bridge Course (-7%)', desc: 'CAMAG instrumentation, Rf calculation & marker densitometry' },
        { name: 'Clinical Research & GCP (ICH E6-R3)', score: 85, benchmark: 79, delta: 6, status: 'Strong Mastery (+6%)', desc: 'Informed consent protocols, ethics committee logs & CTRI' },
        { name: 'Nadi Pariksha & Pulse Diagnostics', score: 89, benchmark: 81, delta: 8, status: 'Exceeding Benchmark (+8%)', desc: 'Radial pulse palpation & sensor correlation' },
        { name: 'Pharmacovigilance & WHO-UMC ADR', score: 86, benchmark: 77, delta: 9, status: 'Strong Mastery (+9%)', desc: 'Adverse drug reaction causality & safety signal detection' }
      ]
    },
    'BAMS-3rdYear': {
      id: 'BAMS-3rdYear',
      name: 'BAMS (3rd Year Pre-Clinical)',
      shortName: 'BAMS 3rd Year',
      totalScholars: 138,
      departmentReadiness: 74.8,
      readinessDelta: '+4.1%',
      deficitsCount: 3,
      q1Count: 39,
      vectors: [
        { name: 'Classical Botanical Identification', score: 86, benchmark: 78, delta: 8, status: 'Exceeding Benchmark (+8%)', desc: 'Herbarium voucher specimen authentication & morphology' },
        { name: 'Schedule T GMP Compliance', score: 68, benchmark: 75, delta: -7, status: 'Critical Deficit (-7%)', desc: 'Cleanroom HVAC airflow, particle counts & BMR validation' },
        { name: 'HPTLC Fingerprinting & Spectrophotometry', score: 65, benchmark: 72, delta: -7, status: 'Targeted for Bridge Course (-7%)', desc: 'CAMAG instrumentation, Rf calculation & marker densitometry' },
        { name: 'Clinical Research & GCP (ICH E6-R3)', score: 72, benchmark: 74, delta: -2, status: 'Near Benchmark (-2%)', desc: 'Informed consent protocols, ethics committee logs & CTRI' },
        { name: 'Nadi Pariksha & Pulse Diagnostics', score: 82, benchmark: 76, delta: 6, status: 'Strong Mastery (+6%)', desc: 'Radial pulse palpation & sensor correlation' },
        { name: 'Pharmacovigilance & WHO-UMC ADR', score: 76, benchmark: 72, delta: 4, status: 'Above Benchmark (+4%)', desc: 'Adverse drug reaction causality & safety signal detection' }
      ]
    },
    'MD-Dravyaguna': {
      id: 'MD-Dravyaguna',
      name: 'MD Dravyaguna (Postgraduate Scholars)',
      shortName: 'MD Dravyaguna',
      totalScholars: 24,
      departmentReadiness: 91.2,
      readinessDelta: '+2.8%',
      deficitsCount: 0,
      q1Count: 21,
      vectors: [
        { name: 'Classical Botanical Identification', score: 96, benchmark: 88, delta: 8, status: 'Apex Specialization (+8%)', desc: 'Herbarium voucher specimen authentication & morphology' },
        { name: 'Schedule T GMP Compliance', score: 89, benchmark: 85, delta: 4, status: 'Exceeding Benchmark (+4%)', desc: 'Cleanroom HVAC airflow, particle counts & BMR validation' },
        { name: 'HPTLC Fingerprinting & Spectrophotometry', score: 92, benchmark: 86, delta: 6, status: 'Strong Mastery (+6%)', desc: 'CAMAG instrumentation, Rf calculation & marker densitometry' },
        { name: 'Clinical Research & GCP (ICH E6-R3)', score: 94, benchmark: 86, delta: 8, status: 'Apex Specialization (+8%)', desc: 'Informed consent protocols, ethics committee logs & CTRI' },
        { name: 'Nadi Pariksha & Pulse Diagnostics', score: 90, benchmark: 84, delta: 6, status: 'Strong Mastery (+6%)', desc: 'Radial pulse palpation & sensor correlation' },
        { name: 'Pharmacovigilance & WHO-UMC ADR', score: 93, benchmark: 85, delta: 8, status: 'Apex Specialization (+8%)', desc: 'Adverse drug reaction causality & safety signal detection' }
      ]
    },
    'BPharm-Ayur': {
      id: 'BPharm-Ayur',
      name: 'B.Pharm (Ayurveda - 4-Year Professional)',
      shortName: 'B.Pharm Ayur',
      totalScholars: 60,
      departmentReadiness: 79.5,
      readinessDelta: '+3.6%',
      deficitsCount: 1,
      q1Count: 26,
      vectors: [
        { name: 'Classical Botanical Identification', score: 78, benchmark: 80, delta: -2, status: 'Near Benchmark (-2%)', desc: 'Herbarium voucher specimen authentication & morphology' },
        { name: 'Schedule T GMP Compliance', score: 85, benchmark: 82, delta: 3, status: 'Exceeding Benchmark (+3%)', desc: 'Cleanroom HVAC airflow, particle counts & BMR validation' },
        { name: 'HPTLC Fingerprinting & Spectrophotometry', score: 82, benchmark: 80, delta: 2, status: 'Above Benchmark (+2%)', desc: 'CAMAG instrumentation, Rf calculation & marker densitometry' },
        { name: 'Clinical Research & GCP (ICH E6-R3)', score: 73, benchmark: 76, delta: -3, status: 'Identified Skill Deficit (-3%)', desc: 'Informed consent protocols, ethics committee logs & CTRI' },
        { name: 'Nadi Pariksha & Pulse Diagnostics', score: 68, benchmark: 72, delta: -4, status: 'Targeted Remediation (-4%)', desc: 'Radial pulse palpation & sensor correlation' },
        { name: 'Pharmacovigilance & WHO-UMC ADR', score: 81, benchmark: 77, delta: 4, status: 'Strong Mastery (+4%)', desc: 'Adverse drug reaction causality & safety signal detection' }
      ]
    }
  };

  const activeCohortData = COHORTS_DATA[selectedCohort] || COHORTS_DATA['BAMS-FinalYear'];

  // 1-Click Pedagogical Interventions Desk
  const [interventions, setInterventions] = useState([
    {
      id: 'int-1',
      title: 'HPTLC Mobile Phase Selection & Densitometric Assay Simulator',
      targetCohort: 'BAMS Final Year',
      deficitsAddressed: ['HPTLC Fingerprinting & Spectrophotometry (-7%)'],
      duration: '45 mins Practical Sprint',
      format: 'Virtual Simulator + SOP',
      status: 'Ready to Deploy',
      isDeployed: false,
      deployedCount: 0,
      impact: 'Closes the 7% HPTLC gap before Dabur & Patanjali campus recruitment interviews.'
    },
    {
      id: 'int-2',
      title: 'Schedule T HVAC Cleanroom Airflow & Pressure Cascade Lab',
      targetCohort: 'BAMS Final Year',
      deficitsAddressed: ['Schedule T GMP Compliance (-6%)'],
      duration: '60 mins Interactive Module',
      format: '3D Cleanroom Walkthrough',
      status: 'Ready to Deploy',
      isDeployed: false,
      deployedCount: 0,
      impact: 'Eliminates cleanroom airflow deficits and equips students with BMR compliance.'
    },
    {
      id: 'int-3',
      title: 'WHO-UMC Causality Algorithm & Ayush Yellow Card Reporting',
      targetCohort: 'All Cohorts',
      deficitsAddressed: ['Pharmacovigilance & ADR Monitoring'],
      duration: '30 mins Interactive Drill',
      format: 'Clinical Case Sim',
      status: 'Ready to Deploy',
      isDeployed: false,
      deployedCount: 0,
      impact: 'Enhances student pharmacovigilance logging for hospital clinical rotations.'
    }
  ]);

  // Direct Placement Fast-Track Nominees
  const [placementNominees, setPlacementNominees] = useState([
    {
      id: 'nom-1',
      studentName: 'Aarav Sharma',
      degree: 'BAMS (Final Year)',
      readiness: 94,
      topSkill: 'HPTLC Fingerprinting (96%)',
      targetCompany: 'Dabur India R&D Center',
      recommendedRole: 'QC & Phytochemistry Trainee',
      status: 'Eligible for Fast-Track',
      isNominated: false,
      hash: '0x9F4C82E1'
    },
    {
      id: 'nom-2',
      studentName: 'Sunita Patel',
      degree: 'BAMS (Final Year)',
      readiness: 91,
      topSkill: 'Schedule T GMP Auditing (94%)',
      targetCompany: 'Patanjali Research Foundation',
      recommendedRole: 'Cleanroom QA Officer',
      status: 'Eligible for Fast-Track',
      isNominated: false,
      hash: '0x4E7C33D1'
    },
    {
      id: 'nom-3',
      studentName: 'Rohan Verma',
      degree: 'MD Dravyaguna',
      readiness: 95,
      topSkill: 'Clinical Trials & GCP (98%)',
      targetCompany: 'Himalaya Wellness',
      recommendedRole: 'Clinical Research Coordinator',
      status: 'Eligible for Fast-Track',
      isNominated: false,
      hash: '0x7B8D19A4'
    },
    {
      id: 'nom-4',
      studentName: 'Divya Nair',
      degree: 'BAMS (Final Year)',
      readiness: 92,
      topSkill: 'Nadi Pariksha & Pulse Analysis (95%)',
      targetCompany: 'Charak Pharma Clinical Wing',
      recommendedRole: 'Ayush Clinical Specialist',
      status: 'Eligible for Fast-Track',
      isNominated: false,
      hash: '0x3A5C98E2'
    }
  ]);

  const handleDeployIntervention = (id) => {
    const target = interventions.find(i => i.id === id);
    if (!target) return;
    setInterventions(prev => prev.map(item => 
      item.id === id 
        ? { ...item, isDeployed: true, status: 'Deployed & Active', deployedCount: activeCohortData.totalScholars } 
        : item
    ));
    showToast(`Bridge Sprint "${target.title}" successfully dispatched to ${activeCohortData.totalScholars} scholars in ${activeCohortData.shortName}!`);
    dispatchNotification({
      targetRole: 'student',
      senderId: facultyUser?.id || 'FAC-AIIA-7712',
      senderName: facultyUser?.name || 'Prof. Meenakshi Joshi',
      senderRole: 'faculty',
      title: `Curriculum Intervention Deployed: ${target.title}`,
      message: `${facultyUser?.name} deployed a mandatory bridge module to close competency deficits in ${target.targetCohort}.`,
      link: '#courses'
    });
  };

  const handleNominateStudent = (nom) => {
    setPlacementNominees(prev => prev.map(item =>
      item.id === nom.id ? { ...item, isNominated: true, status: 'Officially Endorsed' } : item
    ));
    showToast(`Candidate ${nom.studentName} endorsed & nominated to ${nom.targetCompany} with preceptor signature!`);
    dispatchNotification({
      targetRole: 'company',
      targetRecipientName: nom.targetCompany,
      senderId: facultyUser?.id || 'FAC-AIIA-7712',
      senderName: facultyUser?.name || 'Prof. Meenakshi Joshi',
      senderRole: 'faculty',
      title: `Faculty Placement Endorsement: ${nom.studentName}`,
      message: `HOD Prof. Meenakshi Joshi has officially endorsed ${nom.studentName} (Readiness: ${nom.readiness}%) for ${nom.recommendedRole}.`,
      link: '#dashboard-company'
    });
    dispatchNotification({
      targetRole: 'student',
      targetRecipientName: nom.studentName,
      senderId: facultyUser?.id || 'FAC-AIIA-7712',
      senderName: facultyUser?.name || 'Prof. Meenakshi Joshi',
      senderRole: 'faculty',
      title: `Preceptor Nomination Dispatched!`,
      message: `Congratulations! Prof. Meenakshi Joshi endorsed your portfolio directly to ${nom.targetCompany} for fast-track recruitment.`,
      link: '#dashboard-student'
    });
  };

  const [pendingSubmissions, setPendingSubmissions] = useState([
    {
      id: 'sub-1',
      student: 'Aarav Sharma',
      degree: 'BAMS (Final Year)',
      task: 'Triphala Churna HPTLC Marker Fingerprinting Protocol',
      submittedAt: 'Today, 10:14 AM',
      accuracy: '94%',
      status: 'Pending Review',
      hash: '0x8F9A12B4'
    },
    {
      id: 'sub-2',
      student: 'Sunita Patel',
      degree: 'BAMS (3rd Year)',
      task: 'Schedule T Sterile Area Standard Operating Procedure',
      submittedAt: 'Yesterday, 4:30 PM',
      accuracy: '89%',
      status: 'Pending Review',
      hash: '0x4E7C33D1'
    },
    {
      id: 'sub-3',
      student: 'Karan Malhotra',
      degree: 'MD Ayurveda (Dravyaguna)',
      task: 'NABL Analytical Method Validation for Heavy Metals',
      submittedAt: '2 days ago',
      accuracy: '96%',
      status: 'Audited & Digitally Signed',
      hash: '0x9D2B55E8'
    }
  ]);

  const [microCourses, setMicroCourses] = useState([
    { 
      id: 'mc-1', 
      title: 'Schedule T Cleanroom Airflow & Manufacturing Basics', 
      category: 'Manufacturing & GMP',
      duration: '90 mins', 
      enrolled: 142, 
      rating: '4.9/5', 
      status: 'Published',
      targetCohort: 'BAMS Final Year',
      skillGap: 'Translating Drugs Rules 1945 Schedule T requirements into cleanroom premises & hygiene.',
      competencies: ['Schedule T Rules', 'GMP Protocol', 'Cleanroom Airflow']
    },
    { 
      id: 'mc-2', 
      title: 'Good Clinical Practice (GCP) – ICH E6(R3)', 
      category: 'Clinical Research',
      duration: '120 mins', 
      enrolled: 98, 
      rating: '4.8/5', 
      status: 'Published',
      targetCohort: 'MD Dravyaguna Scholars',
      skillGap: 'Risk-based quality thinking, informed consent & essential clinical trial records.',
      competencies: ['ICH E6(R3)', 'Trial Ethics', 'Data Integrity']
    },
    { 
      id: 'mc-3', 
      title: 'Pharmacovigilance Basics & ADR Reporting Protocol', 
      category: 'Pharmacovigilance',
      duration: '60 mins', 
      enrolled: 64, 
      rating: '4.7/5', 
      status: 'Published',
      targetCohort: 'All Ayush Scholars',
      skillGap: 'Real-world adverse drug reaction (ADR) monitoring and CDSCO safety submission.',
      competencies: ['ADR Detection', 'WHO-UMC Causality', 'Signal Safety']
    },
    { 
      id: 'mc-4', 
      title: 'HPTLC Mobile Phase Selection & Marker Fingerprinting', 
      category: 'Quality Control / QA',
      duration: '45 mins', 
      enrolled: 0, 
      rating: 'New', 
      status: 'Draft',
      targetCohort: 'BAMS 3rd Year',
      skillGap: 'Spectrophotometric botanical marker extraction and chromatographic assay.',
      competencies: ['HPTLC Assay', 'Botanical Markers', 'Lab SOPs']
    },
  ]);

  // Form State for Posting New Micro-Course
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'Manufacturing & GMP',
    duration: '90 mins',
    targetCohort: 'BAMS Final Year',
    skillGap: '',
    competencies: '',
    learningDesign: 'Standard 6-Module Blueprint (Pre-test, Lesson, Case Study, Activity, Assessment, Badge)',
    videoUrl: '',
    attachedFileName: ''
  });

  const [publishSuccess, setPublishSuccess] = useState(false);
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);

  // Task 5 PDF Recommended Presets for 1-Click Auto-Fill
  const coursePresets = [
    {
      label: 'Schedule T Basics',
      tag: 'Manufacturing',
      title: 'Schedule T Basics & Manufacturing Compliance',
      category: 'Manufacturing & GMP',
      duration: '90 mins',
      targetCohort: 'BAMS Final Year',
      skillGap: 'Understanding Indian pharmaceutical manufacturing requirements, premises, equipment, hygiene, and documentation under Drugs Rules 1945.',
      competencies: 'Schedule T Rules, Premises Hygiene, GMP Compliance, QA Documentation'
    },
    {
      label: 'GCP – ICH E6(R3)',
      tag: 'Clinical Research',
      title: 'Good Clinical Practice (GCP) – ICH E6(R3)',
      category: 'Clinical Research',
      duration: '120 mins',
      targetCohort: 'MD Dravyaguna Scholars',
      skillGap: 'International ethical, scientific, and quality standards for clinical trials. Emphasis on participant protection, data reliability, and risk-based quality thinking.',
      competencies: 'ICH E6(R3), Informed Consent, Trial Lifecycle, Data Integrity'
    },
    {
      label: 'GMP Basics',
      tag: 'Quality Assurance',
      title: 'Good Manufacturing Practice (GMP) Basics',
      category: 'Quality Assurance / QA',
      duration: '90 mins',
      targetCohort: 'All Ayush Scholars',
      skillGap: 'Quality-management framework for consistently producing and controlling medicines. Covers validation, documentation, and contamination control.',
      competencies: 'WHO-GMP Standards, Quality Systems, Contamination Control, Validation SOPs'
    },
    {
      label: 'Regulatory Affairs',
      tag: 'Regulatory',
      title: 'Regulatory Affairs Basics & CDSCO Framework',
      category: 'Regulatory Compliance',
      duration: '90 mins',
      targetCohort: 'BAMS 3rd Year',
      skillGap: 'CDSCO regulatory framework, Drugs and Cosmetics Act/Rules, and New Drugs and Clinical Trials Rules high-level drug approval pathways.',
      competencies: 'CDSCO Regulatory Pathway, Submission Checklist, CTRI Rules, Compliance'
    },
    {
      label: 'Pharmacovigilance',
      tag: 'Medicine Safety',
      title: 'Pharmacovigilance Basics & ADR Safety Monitoring',
      category: 'Pharmacovigilance',
      duration: '90 mins',
      targetCohort: 'All Ayush Scholars',
      skillGap: 'Detection, assessment, understanding and prevention of adverse drug effects. Real-world ADR reporting workflows and safety signal processing.',
      competencies: 'ADR Detection, WHO-UMC Causality, Safety Reporting, Signal Assessment'
    }
  ];

  const handleApplyPreset = (preset) => {
    setCourseForm({
      ...courseForm,
      title: preset.title,
      category: preset.category,
      duration: preset.duration,
      targetCohort: preset.targetCohort,
      skillGap: preset.skillGap,
      competencies: preset.competencies,
      attachedFileName: `${preset.label.replace(/[^a-zA-Z0-9]/g, '_')}_Standard_SOP.pdf`
    });
  };

  const handlePublishCourse = (isDraft = false) => {
    if (!courseForm.title.trim()) {
      alert('Please provide a Course Title before posting.');
      return;
    }

    const newCourse = {
      id: `mc-${Date.now()}`,
      title: courseForm.title,
      category: courseForm.category,
      duration: courseForm.duration,
      enrolled: 0,
      rating: 'New',
      status: isDraft ? 'Draft' : 'Published',
      targetCohort: courseForm.targetCohort,
      skillGap: courseForm.skillGap || 'Targeted student skill-gap development',
      competencies: courseForm.competencies ? courseForm.competencies.split(',').map(c => c.trim()) : ['Core Competency'],
      attachedFileName: courseForm.attachedFileName || 'Course_Module_Material.pdf'
    };

    setMicroCourses(prev => [newCourse, ...prev]);
    setPublishSuccess(true);

    if (!isDraft) {
      dispatchNotification({
        targetRole: 'student',
        senderId: facultyUser?.id || 'FAC-AIIA-7712',
        senderName: facultyUser?.name || 'Prof. Meenakshi Joshi',
        senderRole: 'faculty',
        title: `New Micro-Course: ${newCourse.title}`,
        message: `${facultyUser?.name || 'Faculty Preceptor'} published a targeted course for ${newCourse.targetCohort} in ${newCourse.category}.`,
        link: '#dashboard-student'
      });
    }

    setTimeout(() => {
      setPublishSuccess(false);
      setIsPostingModalOpen(false);
      setCourseForm({
        title: '',
        category: 'Manufacturing & GMP',
        duration: '90 mins',
        targetCohort: 'BAMS Final Year',
        skillGap: '',
        competencies: '',
        learningDesign: 'Standard 6-Module Blueprint',
        videoUrl: '',
        attachedFileName: ''
      });
      setActiveTab('author'); // Switch to Micro-Course Studio tab to see newly posted course
    }, 1200);
  };

  const handleApprove = (id) => {
    const targetSub = pendingSubmissions.find(s => s.id === id);
    setPendingSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'Audited & Digitally Signed' } : s
    ));
    if (targetSub) {
      dispatchNotification({
        targetRole: 'student',
        targetRecipientName: targetSub.student,
        senderId: facultyUser?.id || 'FAC-AIIA-7712',
        senderName: facultyUser?.name || 'Prof. Meenakshi Joshi',
        senderRole: 'faculty',
        title: `Practical Task Audited & Digitally Signed`,
        message: `${facultyUser?.name || 'Prof. Meenakshi Joshi'} audited and signed your "${targetSub.task}" submission (Accuracy: ${targetSub.accuracy}). Hash: ${targetSub.hash}.`,
        link: '#dashboard-student'
      });
    }
  };

  const filteredSubmissions = pendingSubmissions.filter(s => 
    s.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Calculate radar polygon points dynamically
  const radarAxes = activeCohortData.vectors;
  const numAxes = radarAxes.length;
  const radarCx = 190;
  const radarCy = 190;
  const radarRadius = 125;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (value / 100) * radarRadius;
    const x = radarCx + r * Math.cos(angle);
    const y = radarCy + r * Math.sin(angle);
    return { x, y };
  };

  const cohortPolygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.score);
      return `${x},${y}`;
    })
    .join(' ');

  const benchmarkPolygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.benchmark);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="min-h-screen bg-[#f3f7f5] py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xs flex-1">
            <p className="font-extrabold text-emerald-300">Faculty Preceptor Action Executed</p>
            <p className="text-slate-200 mt-0.5 leading-snug font-medium">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Executive Academic Preceptor Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-emerald-400/40 shrink-0">
              {facultyUser.avatar || 'MJ'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {facultyUser.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Senior Academic Preceptor (NCISM Verified)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {facultyUser.role} · {facultyUser.institution}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-mono">
                <span>Faculty ID: <strong className="text-slate-700 font-semibold">{facultyUser.id}</strong></span>
                <span>•</span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Preceptor Digital Signature Key Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Preceptor Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-emerald-50/80 border border-emerald-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Mentored Scholars</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-950">{activeCohortData.totalScholars} Enrolled</span>
            </div>
            <div className="bg-blue-50/80 border border-blue-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-blue-700 block">Dept. Readiness</span>
              <span className="text-lg sm:text-xl font-extrabold text-blue-950">{activeCohortData.departmentReadiness}%</span>
            </div>
            <div className="bg-purple-50/80 border border-purple-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-purple-700 block">Placement Fast-Track</span>
              <span className="text-lg sm:text-xl font-extrabold text-purple-950">{activeCohortData.q1Count} Nominees</span>
            </div>
            <div className="bg-amber-50/80 border border-amber-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Active Deficits</span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-950">{activeCohortData.deficitsCount} Critical</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
          {[
            { id: 'radar', label: 'Department Cohort Radar & Deficit Analysis', icon: BarChart3, badge: `${activeCohortData.totalScholars} Scholars` },
            { id: 'review', label: 'Evaluation & Digital Signature', icon: CheckCircle2, badge: `${pendingSubmissions.filter(s => s.status.includes('Pending')).length} Pending` },
            { id: 'author', label: 'Micro-Course Studio', icon: BookOpen, badge: `${microCourses.length} Modules` },
            { id: 'grants', label: 'CCRAS SPARK-4.0 & FDPs', icon: Award, badge: '300+ Grants' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Department Cohort Radar & Deficit Analysis */}
        {activeTab === 'radar' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Cohort Selector & Diagnostic Summary Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Department Cohort Diagnostic Suite
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  {activeCohortData.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aggregate diagnostic performance across 6 audited competency vectors vs National AYUSH Benchmark.
                </p>
              </div>

              {/* Cohort Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
                {Object.values(COHORTS_DATA).map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCohort(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCohort === c.id
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {c.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Radar Chart & Competency Vectors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Interactive 6-Axis Visual Radar Chart (5 Cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col items-center justify-between space-y-6">
                <div className="w-full text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-700" />
                      <span>Competency Radar Matrix</span>
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      6 Diagnostic Axes
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Normalized 100-point multi-vector diagnostic comparison.
                  </p>
                </div>

                {/* SVG Visual Radar Canvas */}
                <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                  <svg viewBox="0 0 380 380" className="w-full h-full overflow-visible">
                    {/* Concentric Grid Hexagons (20%, 40%, 60%, 80%, 100%) */}
                    {[20, 40, 60, 80, 100].map(level => {
                      const levelPoints = radarAxes.map((_, i) => {
                        const { x, y } = getCoordinates(i, level);
                        return `${x},${y}`;
                      }).join(' ');

                      return (
                        <polygon
                          key={level}
                          points={levelPoints}
                          fill={level === 100 ? '#f8fafc' : 'none'}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                          strokeDasharray={level === 100 ? 'none' : '3,3'}
                        />
                      );
                    })}

                    {/* Radial Axis Spokes & Endpoint Labels */}
                    {radarAxes.map((axis, i) => {
                      const { x, y } = getCoordinates(i, 100);
                      const labelCoords = getCoordinates(i, 120);
                      const isHovered = hoveredVector === axis.name;

                      return (
                        <g key={i}>
                          <line
                            x1={radarCx}
                            y1={radarCy}
                            x2={x}
                            y2={y}
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                          />
                          <text
                            x={labelCoords.x}
                            y={labelCoords.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={`text-[9.5px] font-extrabold transition-all cursor-pointer select-none ${
                              isHovered ? 'fill-emerald-800 font-black text-[10.5px]' : 'fill-slate-600'
                            }`}
                            onMouseEnter={() => setHoveredVector(axis.name)}
                            onMouseLeave={() => setHoveredVector(null)}
                          >
                            {axis.name.split(' ')[0]} ({axis.score}%)
                          </text>
                        </g>
                      );
                    })}

                    {/* National AYUSH Benchmark Polygon (Dashed Slate) */}
                    <polygon
                      points={benchmarkPolygonPoints}
                      fill="rgba(148, 163, 184, 0.12)"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="5,4"
                    />

                    {/* Benchmark Dots */}
                    {radarAxes.map((axis, i) => {
                      const { x, y } = getCoordinates(i, axis.benchmark);
                      return (
                        <circle
                          key={`bench-${i}`}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#64748b"
                        />
                      );
                    })}

                    {/* Cohort Diagnostic Polygon (Emerald Glowing Stroke & Translucent Fill) */}
                    <polygon
                      points={cohortPolygonPoints}
                      fill="rgba(16, 185, 129, 0.25)"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />

                    {/* Cohort Interactive Vertices */}
                    {radarAxes.map((axis, i) => {
                      const { x, y } = getCoordinates(i, axis.score);
                      const isHovered = hoveredVector === axis.name;

                      return (
                        <g 
                          key={`cohort-${i}`}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredVector(axis.name)}
                          onMouseLeave={() => setHoveredVector(null)}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={isHovered ? 7 : 5}
                            fill="#059669"
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="transition-all duration-200"
                          />
                          {isHovered && (
                            <circle
                              cx={x}
                              cy={y}
                              r="11"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="1.5"
                              className="animate-ping"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Tooltip Overlay on Vector Hover */}
                  {hoveredVector && (
                    <div className="absolute top-2 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl pointer-events-none z-20 border border-emerald-500">
                      {hoveredVector}: {radarAxes.find(a => a.name === hoveredVector)?.score}% (Natl: {radarAxes.find(a => a.name === hoveredVector)?.benchmark}%)
                    </div>
                  )}
                </div>

                {/* Radar Chart Legend */}
                <div className="w-full flex items-center justify-center gap-6 pt-2 border-t border-slate-100 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 border border-emerald-700" />
                    <span className="text-slate-800">Cohort Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-0.5 border-b-2 border-dashed border-slate-500" />
                    <span className="text-slate-500">National AYUSH Benchmark</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Audited Competency Vectors & Deficit Breakdown (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        Audited Competency Vector Breakdown ({radarAxes.length} Axes)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Real-time student diagnostic assessment data logged under HOD supervision.
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Cohort Avg: {activeCohortData.departmentReadiness}%
                    </span>
                  </div>

                  {/* Vector Cards List */}
                  <div className="space-y-3 pt-1">
                    {radarAxes.map((vec, idx) => {
                      const isDeficit = vec.delta < 0;
                      const isHovered = hoveredVector === vec.name;

                      return (
                        <div 
                          key={idx}
                          onMouseEnter={() => setHoveredVector(vec.name)}
                          onMouseLeave={() => setHoveredVector(null)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isHovered
                              ? 'border-emerald-500 bg-emerald-50/40 shadow-sm'
                              : isDeficit
                              ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                              : 'bg-slate-50 border-slate-200/80 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900 text-sm">{vec.name}</span>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                                isDeficit
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              }`}>
                                {vec.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-black text-slate-900 text-sm">{vec.score}%</span>
                              <span className="text-slate-500 text-[11px] font-medium ml-1.5">
                                (Natl: {vec.benchmark}%)
                              </span>
                            </div>
                          </div>

                          {/* Progress Dual Bar */}
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
                            {/* National Benchmark Marker */}
                            <div
                              className="absolute top-0 bottom-0 w-1 bg-slate-600 z-10"
                              style={{ left: `${vec.benchmark}%` }}
                              title={`National Benchmark: ${vec.benchmark}%`}
                            />
                            {/* Cohort Progress Fill */}
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isDeficit ? 'bg-amber-500' : 'bg-emerald-600'
                              }`}
                              style={{ width: `${vec.score}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                            <span>{vec.desc}</span>
                            <span className={`font-bold ${isDeficit ? 'text-amber-800' : 'text-emerald-700'}`}>
                              Delta: {vec.delta > 0 ? `+${vec.delta}%` : `${vec.delta}%`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Pedagogical Interventions Desk */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">
                      1-Click Pedagogical Interventions Desk
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
                      Curriculum Bridge Sprints
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Deploy targeted micro-sprints to close identified cohort deficits before upcoming campus placement drives.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 shrink-0">
                  Target Cohort: {activeCohortData.shortName}
                </span>
              </div>

              {/* Interventions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {interventions.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                          {item.format}
                        </span>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.duration}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.impact}
                      </p>

                      <div className="pt-1">
                        <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block">
                          Addresses: {item.deficitsAddressed.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80">
                      <button
                        onClick={() => handleDeployIntervention(item.id)}
                        disabled={item.isDeployed}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          item.isDeployed
                            ? 'bg-emerald-100 text-emerald-900 cursor-default border border-emerald-300'
                            : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-md active:scale-95'
                        }`}
                      >
                        {item.isDeployed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Deployed &amp; Active ({item.deployedCount} Enrolled)</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-emerald-300" />
                            <span>Deploy to Cohort (1-Click)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quartile Readiness Distribution & Placement Nomination Desk */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Student Readiness Quartiles (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                <h3 className="text-base font-black text-slate-900">
                  Readiness Quartile Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Scholars segmented by verified practical diagnostic scores.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-emerald-900 block font-bold">Q1: Day-1 Ready (85%+)</strong>
                      <span className="text-[11px] text-emerald-700">Immediate industry placement</span>
                    </div>
                    <span className="text-base font-black text-emerald-950">58 (41%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-blue-900 block font-bold">Q2: Near Benchmark (75–84%)</strong>
                      <span className="text-[11px] text-blue-700">Needs 1 bridge simulator</span>
                    </div>
                    <span className="text-base font-black text-blue-950">49 (35%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-amber-900 block font-bold">Q3: Targeted Mentorship (65–74%)</strong>
                      <span className="text-[11px] text-amber-700">Faculty lab hours required</span>
                    </div>
                    <span className="text-base font-black text-amber-950">26 (18%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-slate-800 block font-bold">Q4: Remedial Track (&lt;65%)</strong>
                      <span className="text-[11px] text-slate-600">Mandatory foundation sprint</span>
                    </div>
                    <span className="text-base font-black text-slate-900">9 (6%)</span>
                  </div>
                </div>
              </div>

              {/* Direct Industry Placement Nominee Desk (8 Cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Fast-Track Industry Placement Nominee Desk
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Endorse top scholars directly to corporate R&amp;D partners (Dabur, Patanjali, Himalaya, Charak).
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-purple-50 text-purple-900 font-bold text-xs rounded-full border border-purple-200">
                    Preceptor Endorsements
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {placementNominees.map((nom) => (
                    <div 
                      key={nom.id}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{nom.studentName}</h4>
                          <span className="text-xs text-slate-500">({nom.degree})</span>
                          <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {nom.hash}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          <span>Target: <strong className="text-slate-800">{nom.targetCompany}</strong></span>
                          <span>•</span>
                          <span>Role: <strong className="text-slate-800">{nom.recommendedRole}</strong></span>
                          <span>•</span>
                          <span className="text-emerald-800 font-bold">{nom.topSkill}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-black text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                          {nom.readiness}% Score
                        </span>

                        <button
                          onClick={() => handleNominateStudent(nom)}
                          disabled={nom.isNominated}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            nom.isNominated
                              ? 'bg-emerald-100 text-emerald-900 cursor-default border border-emerald-300'
                              : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                          }`}
                        >
                          {nom.isNominated ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Endorsed &amp; Sent</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-emerald-300" />
                              <span>Endorse Nominee</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Evaluation & Digital Signature */}
        {activeTab === 'review' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Student Micro-Sprint Proof of Work Submissions
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Audit practical clinical lab logs and issue SHA-256 cryptographic preceptor signatures.
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search student or task..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredSubmissions.map((sub) => (
                  <div key={sub.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 hover:border-emerald-300 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{sub.task}</h4>
                          <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {sub.hash}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Submitted by: <strong className="text-slate-800">{sub.student}</strong> ({sub.degree}) · {sub.submittedAt}
                        </p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        sub.status.includes('Digitally Signed') 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}>
                        {sub.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-slate-700">
                          Diagnostic Accuracy: <strong className="text-emerald-800 font-extrabold">{sub.accuracy}</strong>
                        </span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-600">Verification: <strong>Preceptor Review Required</strong></span>
                      </div>

                      <button
                        onClick={() => handleApprove(sub.id)}
                        disabled={sub.status.includes('Digitally Signed')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          sub.status.includes('Digitally Signed')
                            ? 'bg-emerald-100 text-emerald-900 cursor-default border border-emerald-300'
                            : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                        }`}
                      >
                        {sub.status.includes('Digitally Signed') ? (
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Signed & Verified</span>
                          </span>
                        ) : (
                          'Sign & Verify Portfolio (Cryptographic)'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Author Studio */}
        {activeTab === 'author' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Micro-Course Authoring Studio & Active Modules
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Design and monitor industry-oriented training modules mapped to NCISM, CDSCO, and WHO-GMP benchmarks.
                  </p>
                </div>
                <button
                  onClick={() => setIsPostingModalOpen(true)}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-300" />
                  <span>+ Post Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {microCourses.map((course) => (
                  <div key={course.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between hover:border-emerald-300 transition-all">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          course.status === 'Published' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {course.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {course.category || 'General'}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-sm text-slate-900 mt-3 leading-snug">{course.title}</h3>
                      
                      {course.skillGap && (
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {course.skillGap}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-100">
                          Target: {course.targetCohort || 'All Students'}
                        </span>
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {course.duration}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex justify-between items-center text-xs">
                      <span className="font-extrabold text-slate-700">
                        {course.enrolled} Enrolled · <strong className="text-emerald-800">{course.rating}</strong>
                      </span>
                      <button 
                        onClick={() => alert(`Opening analytics canvas for: ${course.title}`)}
                        className="text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Manage SOP</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Grants & FDPs */}
        {activeTab === 'grants' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    CCRAS SPARK-4.0 Research Grants & Industry FDPs
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct government research grants and pharma consultancy partnerships for Ayush academicians.
                  </p>
                </div>
                <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-full border border-emerald-200">
                  300+ Active Grants Available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl border border-emerald-200 bg-emerald-50/50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-900 text-base">CCRAS SPARK-4.0 Studentship</span>
                    <span className="font-bold text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-300 text-xs">₹50,000 Grant</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Faculty mentorship track for BAMS & PG scholars conducting classical formulation validation and clinical evidence research under CCRAS guidelines.
                  </p>
                  <button 
                    onClick={() => alert("Opening CCRAS SPARK-4.0 Application Portal...")}
                    className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition-all cursor-pointer"
                  >
                    Nominate Scholar & Apply →
                  </button>
                </div>

                <div className="p-6 rounded-3xl border border-blue-200 bg-blue-50/50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-900 text-base">Pharma FDP: Advanced HPTLC Chromatographic Assays</span>
                    <span className="font-bold text-blue-800 bg-white px-3 py-1 rounded-xl border border-blue-300 text-xs">2-Week FDP</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sponsored by Dabur R&D Centre & Patanjali Wellness for Ayush professors to master high-throughput botanical extraction and quality assurance.
                  </p>
                  <button 
                    onClick={() => alert("Registering for Dabur Industry FDP Program...")}
                    className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-all cursor-pointer"
                  >
                    Register for FDP →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FACULTY POST COURSE MODAL */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn pb-24 sm:pb-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 relative my-auto overflow-hidden">
            
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex justify-between items-center shrink-0 bg-white">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Faculty Micro-Course Desk
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                  + Post New Micro-Course
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish a new training module mapped to NCISM, CDSCO, and WHO-GMP benchmarks.
                </p>
              </div>

              <button
                onClick={() => setIsPostingModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
              {/* Success Toast */}
              {publishSuccess && (
                <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg flex items-center justify-between animate-bounce">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                    <div>
                      <h4 className="font-extrabold text-sm">Course Module Published Successfully!</h4>
                      <p className="text-xs text-emerald-100">Live for student enrollment and verified cohort tracking.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick 1-Click Topic Presets */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-2.5">
                <span className="text-[11px] font-extrabold text-emerald-950 uppercase tracking-wider block">
                  Quick 1-Click Curriculum Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {coursePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-3 py-1.5 bg-white hover:bg-emerald-800 hover:text-white text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule T Basics & Manufacturing Compliance"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Domain / Track
                    </label>
                    <select
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Manufacturing & GMP">Manufacturing & GMP</option>
                      <option value="Clinical Research">Clinical Research (GCP)</option>
                      <option value="Regulatory Compliance">Regulatory Compliance</option>
                      <option value="Pharmacovigilance">Pharmacovigilance</option>
                      <option value="Quality Assurance / QA">Quality Assurance / QA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Target Cohort
                    </label>
                    <select
                      value={courseForm.targetCohort}
                      onChange={(e) => setCourseForm({ ...courseForm, targetCohort: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="BAMS Final Year">BAMS Final Year</option>
                      <option value="MD Dravyaguna Scholars">MD Dravyaguna Scholars</option>
                      <option value="BAMS 3rd Year">BAMS 3rd Year</option>
                      <option value="All Ayush Scholars">All Ayush Scholars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Duration
                    </label>
                    <select
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="60 mins">60 mins</option>
                      <option value="90 mins">90 mins</option>
                      <option value="120 mins">120 mins</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Target Skill Gap Addressed
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Schedule M/T compliance, premises hygiene, QA record-keeping..."
                    value={courseForm.skillGap}
                    onChange={(e) => setCourseForm({ ...courseForm, skillGap: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Target Competencies (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule T Rules, Cleanroom SOP, GMP Audits"
                    value={courseForm.competencies}
                    onChange={(e) => setCourseForm({ ...courseForm, competencies: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                </div>

                {/* Syllabus / Module Material Attachment */}
                <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <UploadCloud className="w-5 h-5 text-emerald-800" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {courseForm.attachedFileName || 'Course SOP & Curriculum Attached'}
                      </p>
                      <p className="text-[10px] text-slate-500">PDF / Video Modules Ready for Student Portal</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Modal Actions */}
            <div className="p-4 sm:p-6 pt-3 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setIsPostingModalOpen(false)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handlePublishCourse(true)}
                className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handlePublishCourse(false)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
              >
                Publish Course Module
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyPage;
