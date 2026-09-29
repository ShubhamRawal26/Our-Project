const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'portals', 'CompanyPortalView.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update OPPORTUNITY CATEGORIES constant and PUBLISHED PROGRAMS state
const targetStateInsert = `  // Initial Posted Opportunities with Academic Tier & Regional Targeting
  const [postedJobs, setPostedJobs] = useState([`;

const newProgramsState = `  // Available Opportunity Categories for Corporate Talent Acquisition
  const OPPORTUNITY_CATEGORIES = [
    { id: 'Internship', label: 'Industrial Internship', badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { id: 'Live Project', label: 'Live Industry Project', badgeColor: 'bg-blue-50 text-blue-800 border-blue-200' },
    { id: 'Apprenticeship', label: 'Industrial Apprenticeship (NATS)', badgeColor: 'bg-purple-50 text-purple-800 border-purple-200' },
    { id: 'Entry-Level Job', label: 'Entry-Level Job Opening', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' }
  ];

  // Company Published Learning Programs (Workshops, Certifications, Mentorships)
  const [publishedPrograms, setPublishedPrograms] = useState([
    {
      id: 'prog-1',
      title: 'Dabur Certified: Phytochemical QC & CAMAG HPTLC Masterclass',
      category: 'Technical Workshop',
      duration: '2-Day Intensive Hands-on Workshop',
      enrolledCount: 420,
      completedCount: 388,
      skillsImparted: ['CAMAG VisionCATS', 'Rf Calculation', 'Marker Quantification'],
      preceptor: 'Dr. Vikram Sethi (R&D Director)',
      hiringPipeline: 'Top 15% receive direct interview shortlist for Dabur QC Trainee openings',
      status: 'Active Enrolling',
      seatsMax: 500,
      tuition: 'Corporate Sponsored (Free)'
    },
    {
      id: 'prog-2',
      title: 'Schedule T Cleanroom Operations & Sanitation Bootcamp',
      category: 'Corporate Training Module',
      duration: '3-Day Practical Bootcamp',
      enrolledCount: 380,
      completedCount: 345,
      skillsImparted: ['Cleanroom Gowning', 'HVAC Airflow Logs', 'Schedule T Audit'],
      preceptor: 'Dr. S. K. Pathak (Head of Quality Compliance)',
      hiringPipeline: 'Direct apprentice pipeline for Baddi manufacturing facility',
      status: 'Active Enrolling',
      seatsMax: 400,
      tuition: 'Corporate Sponsored (Free)'
    },
    {
      id: 'prog-3',
      title: 'Botanical Drug Safety & Pharmacovigilance Preceptorship',
      category: 'Mentorship Initiative',
      duration: '4-Week Mentorship Cohort',
      enrolledCount: 290,
      completedCount: 260,
      skillsImparted: ['Herb-Drug Interaction', 'ADR Dossier Review', 'Clinical Safety'],
      preceptor: 'Dr. Gayatri Joshi (Medical Affairs Lead)',
      hiringPipeline: 'Mentorship fast-track for clinical safety officer positions',
      status: 'Active Enrolling',
      seatsMax: 300,
      tuition: 'Corporate Sponsored (Free)'
    }
  ]);

  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [programForm, setProgramForm] = useState({
    title: '',
    category: 'Technical Workshop',
    duration: '2-Day Hands-on Workshop',
    preceptor: 'Dr. Vikram Sethi (R&D Lead)',
    seatsMax: 100,
    skillsImparted: 'HPTLC Fingerprinting, CAMAG VisionCATS, Phytochemical QC',
    hiringPipeline: 'Direct fast-track interview shortlist for top 20% scholars',
    description: 'Corporate practical training program to impart essential industry laboratory skills before formal placement interviews.'
  });

  // Initial Posted Opportunities with Academic Tier & Regional Targeting
  const [postedJobs, setPostedJobs] = useState([`;

content = content.replace(targetStateInsert, newProgramsState);

// 2. Add opportunityCategory to initial postedJobs
const oldJob1 = `    {
      id: 'post-1',
      title: 'Ayurvedic Formulation Research Fellow',
      department: 'Phytopharmacy & Drug Discovery',
      location: 'Delhi NCR (Hybrid)',
      type: 'Micro-Sprint Fellowship',`;

const newJob1 = `    {
      id: 'post-1',
      title: 'Ayurvedic Formulation Research Fellow',
      department: 'Phytopharmacy & Drug Discovery',
      location: 'Delhi NCR (Hybrid)',
      category: 'Live Project',
      type: 'Live Research Project',`;

const oldJob2 = `    {
      id: 'post-2',
      title: 'Phytopharmacy Quality Control Analyst',
      department: 'Analytical Instrumentation Lab',
      location: 'Haridwar (On-Site)',
      type: 'Industrial Internship',`;

const newJob2 = `    {
      id: 'post-2',
      title: 'Phytopharmacy Quality Control Analyst',
      department: 'Analytical Instrumentation Lab',
      location: 'Haridwar (On-Site)',
      category: 'Internship',
      type: 'Industrial Internship',`;

const oldJob3 = `    {
      id: 'post-3',
      title: 'Clinical Pharmacovigilance & Safety Associate',
      department: 'Clinical Trial Management Cell',
      location: 'Pune / Mumbai (Hybrid)',
      type: 'Preceptorship',`;

const newJob3 = `    {
      id: 'post-3',
      title: 'Clinical Pharmacovigilance & Safety Associate',
      department: 'Clinical Trial Management Cell',
      location: 'Pune / Mumbai (Hybrid)',
      category: 'Apprenticeship',
      type: 'Industrial Apprenticeship',`;

const oldJob4 = `    {
      id: 'post-4',
      title: 'Schedule T Cleanroom Operations Lead',
      department: 'Industrial Manufacturing Unit',
      location: 'Baddi, Himachal Pradesh',
      type: 'Full-Time Junior Scientist',`;

const newJob4 = `    {
      id: 'post-4',
      title: 'Schedule T Cleanroom Operations Lead',
      department: 'Industrial Manufacturing Unit',
      location: 'Baddi, Himachal Pradesh',
      category: 'Entry-Level Job',
      type: 'Entry-Level Full-Time Job',`;

content = content.replace(oldJob1, newJob1)
                 .replace(oldJob2, newJob2)
                 .replace(oldJob3, newJob3)
                 .replace(oldJob4, newJob4);

// 3. Add handleDeployProgram function
const targetHandlerInsert = `  // Submit and Deploy New Opportunity
  const handleDeployOpportunity = (e) => {`;

const newProgramHandler = `  // Submit and Deploy New Industry Learning Program
  const handleDeployProgram = (e) => {
    if (e) e.preventDefault();
    if (!programForm.title.trim()) {
      alert('Please enter a program title.');
      return;
    }

    const newProg = {
      id: \`prog-\${Date.now()}\`,
      title: programForm.title,
      category: programForm.category,
      duration: programForm.duration,
      enrolledCount: 0,
      completedCount: 0,
      skillsImparted: programForm.skillsImparted.split(',').map(s => s.trim()).filter(Boolean),
      preceptor: programForm.preceptor || user?.name || 'Corporate R&D Preceptor',
      hiringPipeline: programForm.hiringPipeline || 'Direct interview shortlist for program graduates',
      status: 'Active Enrolling',
      seatsMax: parseInt(programForm.seatsMax, 10) || 100,
      tuition: 'Corporate Sponsored (Free)'
    };

    setPublishedPrograms(prev => [newProg, ...prev]);
    showToast(\`Industry Learning Program "\${newProg.title}" successfully published & dispatched to students!\`);
    dispatchNotification({
      targetRole: 'student',
      senderId: user?.id || 'EMP-DABUR-QC-89',
      senderName: user?.institution || user?.name || 'Dabur India R&D Division',
      senderRole: 'company',
      title: \`New Industry Program: \${newProg.title}\`,
      message: \`\${user?.institution || user?.name} published a \${newProg.category} (\${newProg.duration}) to help scholars acquire in-demand skills before placement.\`,
      link: '#courses'
    });
    setIsProgramModalOpen(false);
  };

  // Submit and Deploy New Opportunity
  const handleDeployOpportunity = (e) => {`;

content = content.replace(targetHandlerInsert, newProgramHandler);

// 4. Update View Switcher in CompanyPortalView
const oldViewSwitcher = `          <button
            onClick={() => setActiveViewTab('listings')}
            className={\`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 \${
              activeViewTab === 'listings'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
            }\`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Recruiter Listings Table &amp; Cards</span>
            <span className={\`px-2 py-0.5 rounded-full text-[10px] font-bold \${
              activeViewTab === 'listings' ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-100 text-slate-700'
            }\`}>
              {postedJobs.length}
            </span>
          </button>
        </div>

        {activeViewTab === 'listings' && (
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Add Targeted Role</span>
          </button>
        )}
      </div>`;

const newViewSwitcher = `          <button
            onClick={() => setActiveViewTab('listings')}
            className={\`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 \${
              activeViewTab === 'listings'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
            }\`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Internships &amp; Job Openings</span>
            <span className={\`px-2 py-0.5 rounded-full text-[10px] font-bold \${
              activeViewTab === 'listings' ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-100 text-slate-700'
            }\`}>
              {postedJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveViewTab('learning_programs')}
            className={\`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 \${
              activeViewTab === 'learning_programs'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
            }\`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Industry Learning Programs</span>
            <span className={\`px-2 py-0.5 rounded-full text-[10px] font-bold \${
              activeViewTab === 'learning_programs' ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-100 text-slate-700'
            }\`}>
              {publishedPrograms.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeViewTab === 'listings' && (
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Post Opportunity (Internship / Job)</span>
            </button>
          )}
          {activeViewTab === 'learning_programs' && (
            <button
              onClick={() => setIsProgramModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-purple-300" />
              <span>+ Publish Learning Program</span>
            </button>
          )}
        </div>
      </div>`;

content = content.replace(oldViewSwitcher, newViewSwitcher);

// 5. Add TAB 3: Industry Learning Programs View before Candidates ATS Pipeline Table
const targetTab3Insert = `{/* TAB 2: RECEIVED APPLICATIONS TABLE WITH LIVE PIPELINE PROGRESSION STEPS */}`;

const learningProgramsTab = `{/* TAB 3: INDUSTRY LEARNING PROGRAMS & PRECEPTOR WORKSHOPS */}
      {activeViewTab === 'learning_programs' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Overview Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block mb-1">
                Corporate Preceptor Skilling Suite
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Industry Training Programs &amp; Pre-Hiring Workshops
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                Publish corporate training modules, certification courses, workshops, and mentorship initiatives to help students acquire in-demand industry skills before applying to your vacancies.
              </p>
            </div>

            <button
              onClick={() => setIsProgramModalOpen(true)}
              className="px-4 py-2.5 bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-purple-300" />
              <span>+ Publish New Program</span>
            </button>
          </div>

          {/* Published Programs Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <span className="text-2xl font-extrabold text-purple-900">{publishedPrograms.length}</span>
              <span className="text-xs text-slate-500 block mt-0.5">Active Corporate Programs</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <span className="text-2xl font-extrabold text-emerald-800">
                {publishedPrograms.reduce((acc, p) => acc + p.enrolledCount, 0)}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">Enrolled Scholars</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <span className="text-2xl font-extrabold text-blue-900">
                {publishedPrograms.reduce((acc, p) => acc + p.completedCount, 0)}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">Certified Graduates</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center">
              <span className="text-2xl font-extrabold text-amber-700">92%</span>
              <span className="text-xs text-slate-500 block mt-0.5">Interview Conversion Rate</span>
            </div>
          </div>

          {/* Published Programs Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedPrograms.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
                      {prog.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {prog.duration}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {prog.title}
                  </h4>

                  <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1 text-xs">
                    <span className="font-extrabold text-purple-950 block">Pre-Hiring Pipeline Guarantee:</span>
                    <p className="text-purple-900/90 leading-relaxed font-medium">
                      {prog.hiringPipeline}
                    </p>
                  </div>

                  {/* Skills Imparted Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      In-Demand Skills Imparted:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.skillsImparted.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 font-medium">
                    <span>Preceptor: <strong className="text-slate-800">{prog.preceptor}</strong></span>
                    <span className="text-emerald-800 font-extrabold">{prog.enrolledCount} / {prog.seatsMax} Enrolled</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {prog.tuition}
                  </span>
                  <button
                    onClick={() => alert(\`Opening scholar roster for \${prog.title}\`)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    View Roster ({prog.enrolledCount})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      ` + targetTab3Insert;

content = content.replace(targetTab3Insert, learningProgramsTab);

// 6. Add Modal for Publishing an Industry Learning Program right before Opportunity Modal
const targetModalInsert2 = `{/* CREATE TARGETED OPPORTUNITY MODAL (ACADEMIC TIERS & GEOGRAPHIC SCOPE) */}`;

const programModalCode = `{/* PUBLISH INDUSTRY LEARNING PROGRAM MODAL */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 text-white flex items-start justify-between gap-4 shrink-0">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-400 text-purple-950 inline-flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Corporate Preceptor Publishing Desk
                </span>
                <h3 className="text-xl font-black tracking-tight mt-1">
                  Publish Industry Learning Program
                </h3>
                <p className="text-xs text-purple-200 font-medium mt-0.5">
                  Publish hands-on workshops, training courses, and mentorship cohorts to prepare candidates before recruitment.
                </p>
              </div>

              <button
                onClick={() => setIsProgramModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleDeployProgram} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Program Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phytochemical QC & CAMAG HPTLC Masterclass"
                  value={programForm.title}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Program Format</label>
                  <select
                    value={programForm.category}
                    onChange={(e) => setProgramForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium"
                  >
                    <option value="Technical Workshop">Hands-on Technical Workshop</option>
                    <option value="Industry Certification Course">Industry Certification Course</option>
                    <option value="Corporate Training Module">Corporate Training Module</option>
                    <option value="Mentorship Initiative">Preceptor Mentorship Initiative</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Duration &amp; Schedule</label>
                  <input
                    type="text"
                    placeholder="e.g. 2-Day Practical Workshop"
                    value={programForm.duration}
                    onChange={(e) => setProgramForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Corporate Preceptor Lead</label>
                  <input
                    type="text"
                    value={programForm.preceptor}
                    onChange={(e) => setProgramForm(prev => ({ ...prev, preceptor: e.target.value }))}
                    className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Maximum Scholar Seats</label>
                  <input
                    type="number"
                    value={programForm.seatsMax}
                    onChange={(e) => setProgramForm(prev => ({ ...prev, seatsMax: e.target.value }))}
                    className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  In-Demand Skills Imparted (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CAMAG VisionCATS, HPTLC Fingerprinting, Rf Calculation"
                  value={programForm.skillsImparted}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, skillsImparted: e.target.value }))}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Pre-Hiring Pipeline Guarantee
                </label>
                <input
                  type="text"
                  placeholder="e.g. Top 15% guaranteed interview shortlist for Dabur QC Trainee openings"
                  value={programForm.hiringPipeline}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, hiringPipeline: e.target.value }))}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Program Description &amp; Syllabus Overview
                </label>
                <textarea
                  rows="3"
                  value={programForm.description}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-purple-900 hover:bg-purple-950 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4 text-purple-300" />
                  <span>Publish &amp; Open Enrollment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      ` + targetModalInsert2;

content = content.replace(targetModalInsert2, programModalCode);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated CompanyPortalView.jsx with Opportunities and Learning Programs suite!");
