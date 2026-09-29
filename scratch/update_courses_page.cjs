const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'CoursesPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add state for SWAYAM Plus modal
const oldState = `  // Student Buy & Watch Modal State
  const [selectedCourseForBuy, setSelectedCourseForBuy] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);`;

const newState = `  // Student Buy & Watch Modal State
  const [selectedCourseForBuy, setSelectedCourseForBuy] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);

  // SWAYAM Plus & Industry Enrollment Modal State
  const [selectedSwayamPlusCourse, setSelectedSwayamPlusCourse] = useState(null);
  const [swayamPlusEnrolledSuccess, setSwayamPlusEnrolledSuccess] = useState(false);
  const [studentAbcId, setStudentAbcId] = useState('ABC-2026-9042-881');`;

content = content.replace(oldState, newState);

// 2. Add SWAYAM Plus and Industry Programs to coursesList
const targetCourseListEnd = `      competencies: ['Clinical Biostatistics', 'Epidemiology', 'Evidence Synthesis', 'SWAYAM Certified'],
      swayamUrl: 'https://swayam.gov.in/explorer?searchText=biostatistics',
      isSwayam: true
    }
  ]);`;

const newCoursesToAppend = `      competencies: ['Clinical Biostatistics', 'Epidemiology', 'Evidence Synthesis', 'SWAYAM Certified'],
      swayamUrl: 'https://swayam.gov.in/explorer?searchText=biostatistics',
      isSwayam: true
    },
    // Government SWAYAM Plus Industry-Academia Courses (Ministry of Education & Industry Partners)
    {
      id: 'mc-swayam-plus-1',
      title: 'SWAYAM Plus: Cleanroom Engineering & Schedule T Industrial QA',
      category: 'Manufacturing & GMP',
      providerType: 'SWAYAM Plus',
      isSwayamPlus: true,
      industryPartner: 'L&T EduTech & IIT Madras',
      academicCredits: '3 Credits (Transferable via ABC Bank)',
      duration: '10 Weeks (Self-Paced + Industry Labs)',
      enrolled: 2840,
      rating: '4.95',
      price: 'Govt. Sponsored (Free)',
      posterImage: courseGmpPoster,
      author: 'Er. Rajesh K. Nair',
      authorRole: 'Chief Industrial Preceptor, L&T EduTech & IIT Madras',
      targetCohort: 'BAMS Final Year & Ayush Production Engineers',
      skillGap: 'Industrial cleanroom architecture, HVAC pressure differentials, ISO 14644 classification, and statutory Schedule T GMP compliance.',
      competencies: ['Schedule T Cleanroom', 'HVAC Air Handling', 'ISO 14644 Particulates', 'L&T Industry Certified'],
      swayamUrl: 'https://swayam-plus.iitm.ac.in/courses/cleanroom-engineering',
      description: 'Government of India SWAYAM Plus program by L&T EduTech and IIT Madras delivering hands-on pharmaceutical cleanroom protocols with transferable Academic Bank of Credits (ABC).'
    },
    {
      id: 'mc-swayam-plus-2',
      title: 'SWAYAM Plus: High-Throughput HPTLC & Botanical Fingerprinting',
      category: 'Quality Assurance / QA',
      providerType: 'SWAYAM Plus',
      isSwayamPlus: true,
      industryPartner: 'Dabur AyurTech & IIT Madras',
      academicCredits: '3 Credits (Transferable via ABC Bank)',
      duration: '8 Weeks (CAMAG Virtual Simulator)',
      enrolled: 3120,
      rating: '4.92',
      price: 'Govt. Sponsored (Free)',
      posterImage: ayushHeroBanner,
      author: 'Dr. Vikram Sethi',
      authorRole: 'R&D Director, Dabur & SWAYAM Plus Academic Council',
      targetCohort: 'Ayush QC Analysts & Postgraduate Researchers',
      skillGap: 'Automated TLC sample application, multi-wavelength densitometry scanning, marker quantification, and pharmacopoeial monograph compliance.',
      competencies: ['HPTLC Fingerprinting', 'Rf Value Calculation', 'Marker Profiling', 'Dabur Certified'],
      swayamUrl: 'https://swayam-plus.iitm.ac.in/courses/hptlc-botanical-fingerprinting',
      description: 'Developed under Ministry of Education SWAYAM Plus in collaboration with Dabur Research Foundation for rapid phytochemical standardization.'
    },
    {
      id: 'mc-swayam-plus-3',
      title: 'SWAYAM Plus: Clinical Trials Data Management & GCP (ICH E6-R3)',
      category: 'Clinical Research',
      providerType: 'SWAYAM Plus',
      isSwayamPlus: true,
      industryPartner: 'TCS iON & AIIMS New Delhi',
      academicCredits: '4 Credits (Transferable via ABC Bank)',
      duration: '12 Weeks (Clinical Data Project)',
      enrolled: 2490,
      rating: '4.88',
      price: 'Govt. Sponsored (Free)',
      posterImage: courseGcpPoster,
      author: 'Dr. Priya Narang',
      authorRole: 'Clinical Data Scientist, TCS Life Sciences & AIIMS',
      targetCohort: 'MD/MS Scholars & Clinical Trial Investigators',
      skillGap: 'Electronic Data Capture (EDC), CTRI trial registration, adverse drug reaction coding, and ICH E6(R3) compliance for traditional botanical interventions.',
      competencies: ['ICH GCP E6(R3)', 'Electronic Data Capture', 'CTRI Compliance', 'TCS iON Certified'],
      swayamUrl: 'https://swayam-plus.iitm.ac.in/courses/clinical-trials-data',
      description: 'National skilling certification by TCS iON and AIIMS New Delhi under SWAYAM Plus, integrating clinical trial lifecycle management with verifiable ABC credits.'
    },
    {
      id: 'mc-swayam-plus-4',
      title: 'SWAYAM Plus: Industrial Phytochemical Extraction & Scale-Up',
      category: 'Manufacturing & GMP',
      providerType: 'SWAYAM Plus',
      isSwayamPlus: true,
      industryPartner: 'Cipla Pharma Academy & NCISM',
      academicCredits: '3 Credits (Transferable via ABC Bank)',
      duration: '8 Weeks (Pilot Plant Modules)',
      enrolled: 1980,
      rating: '4.89',
      price: 'Govt. Sponsored (Free)',
      posterImage: courseGmpPoster,
      author: 'Dr. Arvind Mehra',
      authorRole: 'Pharma Technology Lead, Cipla Industrial Academy',
      targetCohort: 'BAMS Final Year & Industrial Trainees',
      skillGap: 'Scaling classical botanical decoctions to industrial multi-stage counter-current extractors, solvent recovery, and vacuum tray drying.',
      competencies: ['Pharma Extraction', 'Solvent Recovery', 'Pilot Plant Scaling', 'Cipla Certified'],
      swayamUrl: 'https://swayam-plus.iitm.ac.in/courses/industrial-extraction',
      description: 'Learn modern industrial extraction methods from Cipla and NCISM preceptors, with credit eligibility across all Ayush degree institutions.'
    },
    {
      id: 'mc-swayam-plus-5',
      title: 'SWAYAM Plus: Digital Hospital EMR & Pharmacovigilance Monitoring',
      category: 'Pharmacovigilance',
      providerType: 'SWAYAM Plus',
      isSwayamPlus: true,
      industryPartner: 'Apollo AyurHealth & AIIA',
      academicCredits: '2 Credits (Transferable via ABC Bank)',
      duration: '6 Weeks (Clinical Internship Bridge)',
      enrolled: 2150,
      rating: '4.91',
      price: 'Govt. Sponsored (Free)',
      posterImage: courseGcpPoster,
      author: 'Dr. Radhika Kulkarni',
      authorRole: 'Head of Clinical Systems, Apollo Hospitals & AIIA',
      targetCohort: 'All Ayush Clinicians & Residents',
      skillGap: 'WHO-UMC adverse drug reaction causality assessment, electronic health record integration, and NAMASTE / ICD-11 coding.',
      competencies: ['WHO-UMC Causality', 'ADR Signal Detection', 'Hospital EMR', 'Apollo Certified'],
      swayamUrl: 'https://swayam-plus.iitm.ac.in/courses/hospital-emr-pharmacovigilance',
      description: 'Apollo Hospitals and AIIA collaborative skilling course accredited on SWAYAM Plus for digital healthcare and adverse drug reaction reporting.'
    },
    // Industry-Published Learning Programs
    {
      id: 'mc-ind-1',
      title: 'Dabur Certified: Phytochemical QC & CAMAG HPTLC Masterclass',
      category: 'Quality Assurance / QA',
      providerType: 'Industry Program',
      isIndustryProgram: true,
      industryPartner: 'Dabur Research & Development Center',
      duration: '2-Day Intensive Hands-on Workshop',
      enrolled: 420,
      rating: '4.96',
      price: 'Sponsored / Free',
      posterImage: ayushHeroBanner,
      author: 'Dr. Vikram Sethi',
      authorRole: 'Talent Acquisition & R&D Lead, Dabur India Ltd.',
      targetCohort: 'Candidates applying for Dabur QC & R&D Roles',
      skillGap: 'CAMAG VisionCATS software calibration, silica plate activation, mobile phase optimization, and densitometric assay.',
      competencies: ['CAMAG VisionCATS', 'Rf Calculation', 'Marker Quantification', 'Dabur Pre-Hiring'],
      description: 'Direct industry training program published by Dabur to prepare Ayush students with the exact laboratory competencies required for Dabur R&D internships.'
    },
    {
      id: 'mc-ind-2',
      title: 'Patanjali Workshop: Schedule T Cleanroom Operations & Sanitation',
      category: 'Manufacturing & GMP',
      providerType: 'Industry Program',
      isIndustryProgram: true,
      industryPartner: 'Patanjali Research Foundation',
      duration: '3-Day Practical Bootcamp',
      enrolled: 380,
      rating: '4.87',
      price: 'Sponsored / Free',
      posterImage: courseGmpPoster,
      author: 'Dr. S. K. Pathak',
      authorRole: 'Head of Quality Compliance, Patanjali Food & Herbal Park',
      targetCohort: 'Industrial Manufacturing Apprentices',
      skillGap: 'Personnel gowning airlock procedures, HVAC pressure differential logs, and surface swab microbial bioburden validation.',
      competencies: ['Cleanroom Gowning', 'HVAC Airflow Logs', 'Schedule T Audit', 'Patanjali Certified'],
      description: 'Official industrial training program published by Patanjali Research Foundation for Ayush scholars seeking manufacturing apprenticeships.'
    },
    {
      id: 'mc-ind-3',
      title: 'Himalaya Preceptorship: Botanical Drug Safety & Pharmacovigilance',
      category: 'Pharmacovigilance',
      providerType: 'Industry Program',
      isIndustryProgram: true,
      industryPartner: 'Himalaya Wellness Company',
      duration: '4-Week Mentorship Cohort',
      enrolled: 290,
      rating: '4.94',
      price: 'Sponsored / Free',
      posterImage: courseGcpPoster,
      author: 'Dr. Gayatri Joshi',
      authorRole: 'Medical Affairs & Pharmacovigilance Lead, Himalaya Wellness',
      targetCohort: 'Ayush Interns & Clinical Aspirants',
      skillGap: 'Herbal drug-drug interaction screening, causality categorization, and safety dossier submissions.',
      competencies: ['Herb-Drug Interaction', 'ADR Dossier Review', 'Clinical Safety', 'Himalaya Preceptorship'],
      description: '1-on-1 industry mentorship and practical workshop organized by Himalaya Wellness scientists to equip scholars with in-demand clinical safety skills before recruitment.'
    }
  ]);`;

content = content.replace(targetCourseListEnd, newCoursesToAppend);

// 3. Update filteredCourses to support 'SWAYAM Plus' and 'Industry Programs'
const oldFilter = `  const filteredCourses = coursesList.filter(course => {
    const matchesPortal = portalFilter === 'All' || 
                          (portalFilter === 'Ministry Certified' && course.providerType === 'Ministry Certified') ||
                          (portalFilter === 'NPTEL / SWAYAM' && (course.providerType === 'NPTEL / SWAYAM' || course.isSwayam));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.skillGap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.competencies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesPortal && matchesCategory && matchesSearch;
  });`;

const newFilter = `  const filteredCourses = coursesList.filter(course => {
    const matchesPortal = portalFilter === 'All' || 
                          (portalFilter === 'SWAYAM Plus' && (course.isSwayamPlus || course.providerType === 'SWAYAM Plus')) ||
                          (portalFilter === 'Ministry Certified' && course.providerType === 'Ministry Certified') ||
                          (portalFilter === 'Industry Programs' && (course.isIndustryProgram || course.providerType === 'Industry Program')) ||
                          (portalFilter === 'NPTEL / SWAYAM' && (course.providerType === 'NPTEL / SWAYAM' || course.isSwayam));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.skillGap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (course.industryPartner && course.industryPartner.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          course.competencies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesPortal && matchesCategory && matchesSearch;
  });`;

content = content.replace(oldFilter, newFilter);

// 4. Update Portal Tabs UI
const oldTabsUi = `{['All', 'Ministry Certified', 'NPTEL / SWAYAM'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPortalFilter(tab)}
                className={\`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 \${
                  portalFilter === tab
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }\`}
              >
                <span>{tab}</span>
                {tab === 'NPTEL / SWAYAM' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-300 text-amber-950 font-black">
                    Free MOOC
                  </span>
                )}
              </button>
            ))}`;

const newTabsUi = `{['All', 'SWAYAM Plus', 'Ministry Certified', 'Industry Programs', 'NPTEL / SWAYAM'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPortalFilter(tab)}
                className={\`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 \${
                  portalFilter === tab
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }\`}
              >
                <span>{tab}</span>
                {tab === 'SWAYAM Plus' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-200 text-purple-950 font-black">
                    ABC Credits
                  </span>
                )}
                {tab === 'Industry Programs' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-950 font-black">
                    Corporate
                  </span>
                )}
                {tab === 'NPTEL / SWAYAM' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-teal-200 text-teal-950 font-black">
                    Free MOOC
                  </span>
                )}
              </button>
            ))}`;

content = content.replace(oldTabsUi, newTabsUi);

// 5. Update Card Badges and Card Actions
const oldCardBadges = `                    {course.isSwayam && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-950 bg-teal-200 border border-teal-300 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 shrink-0">
                        <Sparkles className="w-3 h-3 text-teal-800" />
                        NPTEL / SWAYAM
                      </span>
                    )}`;

const newCardBadges = `                    {course.isSwayamPlus && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-950 bg-purple-200 border border-purple-300 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 shrink-0">
                        <GraduationCap className="w-3 h-3 text-purple-800" />
                        SWAYAM Plus
                      </span>
                    )}
                    {course.isIndustryProgram && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200 border border-amber-300 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 shrink-0">
                        <Building2 className="w-3 h-3 text-amber-800" />
                        Industry Program
                      </span>
                    )}
                    {course.isSwayam && !course.isSwayamPlus && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-950 bg-teal-200 border border-teal-300 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 shrink-0">
                        <Sparkles className="w-3 h-3 text-teal-800" />
                        NPTEL / SWAYAM
                      </span>
                    )}`;

content = content.replace(oldCardBadges, newCardBadges);

// 6. Update Card Subtitle Badges (ABC Credit badges)
const oldCardSub = `                  {course.isSwayam && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-teal-900 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-teal-700" />
                        Free MOOC • Credit Transferable
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        NPTEL / SWAYAM Certified
                      </span>
                    </div>
                  )}`;

const newCardSub = `                  {course.isSwayamPlus && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-900 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md">
                        <ShieldCheck className="w-3 h-3 text-purple-700" />
                        {course.industryPartner}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        {course.academicCredits}
                      </span>
                    </div>
                  )}
                  {course.isIndustryProgram && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        <Building2 className="w-3 h-3 text-amber-700" />
                        {course.industryPartner}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        Pre-Hiring Fast-Track
                      </span>
                    </div>
                  )}
                  {course.isSwayam && !course.isSwayamPlus && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-teal-900 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-teal-700" />
                        Free MOOC • Credit Transferable
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        NPTEL / SWAYAM Certified
                      </span>
                    </div>
                  )}`;

content = content.replace(oldCardSub, newCardSub);

// 7. Update Card Action Buttons
const oldCardActions = `                  {course.isSwayam ? (
                    <a
                      href={course.swayamUrl || 'https://swayam.gov.in'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <span>Enroll on swayam.gov.in</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                    </a>
                  ) : isFacultyPortal ? (`;

const newCardActions = `                  {course.isSwayamPlus ? (
                    <button
                      onClick={() => {
                        setSelectedSwayamPlusCourse(course);
                        setSwayamPlusEnrolledSuccess(false);
                      }}
                      className="px-4 py-2 bg-purple-900 hover:bg-purple-950 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <span>Enroll (SWAYAM Plus)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
                    </button>
                  ) : course.isIndustryProgram ? (
                    <button
                      onClick={() => {
                        setSelectedSwayamPlusCourse(course);
                        setSwayamPlusEnrolledSuccess(false);
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <span>Register (Industry Workshop)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                    </button>
                  ) : course.isSwayam ? (
                    <a
                      href={course.swayamUrl || 'https://swayam.gov.in'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <span>Enroll on swayam.gov.in</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                    </a>
                  ) : isFacultyPortal ? (`;

content = content.replace(oldCardActions, newCardActions);

// 8. Add SWAYAM Plus Enrollment Modal right before the end of CoursesPage JSX
const targetModalInsert = `{/* FACULTY POST COURSE MODAL */}`;
const swayamPlusModal = `{/* SWAYAM PLUS & INDUSTRY PROGRAM ENROLLMENT MODAL */}
      {selectedSwayamPlusCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-400 text-purple-950 inline-flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  {selectedSwayamPlusCourse.isSwayamPlus ? 'SWAYAM Plus Industry-Academia Program' : 'Industry Learning Program'}
                </span>
                <h3 className="text-lg font-black tracking-tight mt-1">
                  {selectedSwayamPlusCourse.title}
                </h3>
                <p className="text-xs text-purple-200 font-medium">
                  Collaborative Initiative: <strong className="text-white">{selectedSwayamPlusCourse.industryPartner}</strong>
                </p>
              </div>

              <button
                onClick={() => setSelectedSwayamPlusCourse(null)}
                className="text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {swayamPlusEnrolledSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
                    <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">
                    Enrollment Confirmed &amp; ABC Credits Linked!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    You have been enrolled in <strong>{selectedSwayamPlusCourse.title}</strong>. Your Academic Bank of Credits ID (<span className="font-mono font-bold text-slate-800">{studentAbcId}</span>) has been tagged for direct credit transfer upon module assessment completion.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => setSelectedSwayamPlusCourse(null)}
                      className="px-6 py-2.5 bg-emerald-800 text-white rounded-xl font-bold text-xs hover:bg-emerald-900 transition-all cursor-pointer shadow-md"
                    >
                      Return to Courses Catalog
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-purple-950">Statutory Credit Transfer:</span>
                      <span className="font-bold text-purple-800 bg-white px-2.5 py-0.5 rounded-md border border-purple-300">
                        {selectedSwayamPlusCourse.academicCredits || '3 Credits (Transferable via ABC Bank)'}
                      </span>
                    </div>
                    <p className="text-slate-600">
                      Approved under the National Credit Framework (NCrF) and Ministry of Education guidelines. Successful completion generates a cryptographically verifiable certificate recognized across all accredited Ayush degree institutions.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Academic Bank of Credits (ABC) ID:
                      </label>
                      <input
                        type="text"
                        value={studentAbcId}
                        onChange={(e) => setStudentAbcId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
                        placeholder="e.g. ABC-2026-9042-881"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Verified against DigiLocker ABC Registry • Auto-fills your degree portfolio
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>Duration &amp; Format:</span>
                        <span>{selectedSwayamPlusCourse.duration}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>Corporate Preceptor:</span>
                        <span>{selectedSwayamPlusCourse.author}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>Tuition Fee:</span>
                        <span className="text-emerald-700 font-extrabold">100% Govt. / Corporate Sponsored</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedSwayamPlusCourse(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setSwayamPlusEnrolledSuccess(true)}
                      className="px-5 py-2.5 rounded-xl text-xs font-black bg-purple-900 hover:bg-purple-950 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-300" />
                      <span>Confirm SWAYAM Plus Enrollment</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      ` + targetModalInsert;

content = content.replace(targetModalInsert, swayamPlusModal);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated CoursesPage.jsx with SWAYAM Plus courses, filters, badges, and enrollment modal!");
