const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'CoursesPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF
content = content.replace(/\r\n/g, '\n');

// 1. Ensure ALL_COURSES is imported
if (!content.includes("import { ALL_COURSES } from '../data/coursesData';")) {
  content = content.replace(
    "import ayushHeroBanner from '../assets/images/ayush_hero_banner.jpg';",
    "import ayushHeroBanner from '../assets/images/ayush_hero_banner.jpg';\nimport { ALL_COURSES } from '../data/coursesData';"
  );
}

// 2. Update initial coursesList to include ALL_COURSES
const oldCoursesList = `  // Published Course Posters List
  const [coursesList, setCoursesList] = useState([`;

const newCoursesList = `  // Published Course Posters List (Initialized with ALL_COURSES dataset)
  const [coursesList, setCoursesList] = useState(ALL_COURSES || [`;

if (content.includes(oldCoursesList)) {
  content = content.replace(oldCoursesList, newCoursesList);
}

// 3. Update helper isMyCourse
const facultyHelperInsert = `  // Helper to determine if a course was authored by the current faculty preceptor
  const isMyCourse = (course) => {
    if (!course || !course.author) return false;
    const authorLower = course.author.toLowerCase();
    const currentNameLower = (currentUser?.name || 'Prof. Meenakshi Joshi').toLowerCase();
    return authorLower.includes('meenakshi') || 
           authorLower.includes(currentNameLower.split(' ')[0] || 'meenakshi') ||
           (currentUser?.name && authorLower.includes(currentUser.name.toLowerCase()));
  };

  const myCreatedCourses = coursesList.filter(c => isMyCourse(c));
  const otherFacultyCourses = coursesList.filter(c => !isMyCourse(c) && !c.isSwayamPlus && !c.isSwayam);
  const swayamPlusCourses = coursesList.filter(c => c.isSwayamPlus);
`;

const stateAnchor = `  // Faculty specific filter: 'all' | 'my_courses' | 'other_faculty' | 'swayam_plus'
  const [facultyCourseFilter, setFacultyCourseFilter] = useState('all');`;

if (content.includes(stateAnchor) && !content.includes("const isMyCourse =")) {
  content = content.replace(stateAnchor, stateAnchor + '\n\n' + facultyHelperInsert);
}

// 4. Update filteredCourses to account for facultyCourseFilter, SWAYAM Plus, and Portal Filter
const oldFilteredCourses = `  const filteredCourses = coursesList.filter(course => {
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

const newFilteredCourses = `  const filteredCourses = coursesList.filter(course => {
    // Faculty specific tab filtering
    if (isFaculty) {
      if (facultyCourseFilter === 'my_courses' && !isMyCourse(course)) return false;
      if (facultyCourseFilter === 'other_faculty' && (isMyCourse(course) || course.isSwayamPlus || course.isSwayam)) return false;
      if (facultyCourseFilter === 'swayam_plus' && !course.isSwayamPlus) return false;
    }

    const matchesPortal = portalFilter === 'All' || 
                          (portalFilter === 'SWAYAM Plus' && course.isSwayamPlus) ||
                          (portalFilter === 'Ministry Certified' && (course.providerType === 'Ministry Certified' || !course.isSwayamPlus)) ||
                          (portalFilter === 'Industry Programs' && course.isIndustryProgram) ||
                          (portalFilter === 'NPTEL / SWAYAM' && (course.providerType === 'NPTEL / SWAYAM' || course.isSwayam));

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const searchTarget = (course.title + ' ' + (course.skillGap || '') + ' ' + (course.author || '') + ' ' + (course.competencies || []).join(' ')).toLowerCase();
    const matchesSearch = !searchTerm || searchTarget.includes(searchTerm.toLowerCase().trim());
    
    return matchesPortal && matchesCategory && matchesSearch;
  });`;

if (content.includes(oldFilteredCourses)) {
  content = content.replace(oldFilteredCourses, newFilteredCourses);
}

// 5. Update the Top Banner and Filter Bar in JSX
const oldTopBarTarget = `        {/* Clean Top Header Bar: Search on Left, + Post Course on Right */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row justify-between items-center gap-4">`;

const newTopBarBlock = `        {/* ── STAKEHOLDER SPECIFIC TOP BANNER ───────────────────────────── */}
        {isAdmin ? (
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white border border-sky-800/40 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5 animate-fadeIn">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-400 text-sky-950 flex items-center gap-1">
                  <Landmark className="w-3 h-3" />
                  Ministry of Ayush National Accreditation Council
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-sky-200 border border-white/15">
                  Audit Mode: Direct Student Enrollment Restricted
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                National Ayush Curriculum &amp; Credit Oversight
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Administrative oversight of accredited ASU curriculum, Academic Bank of Credits (ABC) compliance, and institutional preceptors nationwide.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/15">
              <button
                onClick={() => setAdminViewMode('catalog')}
                className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer \${
                  adminViewMode === 'catalog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:text-white'
                }\`}
              >
                Available Courses ({coursesList.length})
              </button>
              <button
                onClick={() => setAdminViewMode('standards')}
                className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer \${
                  adminViewMode === 'standards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:text-white'
                }\`}
              >
                Domain Standards ({MINISTRY_COURSE_TYPES.length})
              </button>
            </div>
          </div>
        ) : isCollege ? (
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-7 text-white border border-blue-800/40 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5 animate-fadeIn">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-400 text-blue-950 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  College Academic Directorate
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-blue-200 border border-white/15">
                  Institutional Oversight Mode: Cannot Apply / Enroll
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Institutional Curriculum &amp; Student Prerequisite Directory
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Review university syllabi, clinical laboratory modules, and student prerequisite certifications across affiliated Ayush colleges.
              </p>
            </div>

            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 text-center shrink-0 min-w-[140px]">
              <span className="text-2xl font-black text-blue-300 block">{coursesList.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Accredited Modules</span>
            </div>
          </div>
        ) : isFaculty ? (
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-7 text-white border border-emerald-800/40 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5 animate-fadeIn">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-emerald-950 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Faculty Preceptor Academic Console
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-200 border border-white/15">
                  Preceptor Review Mode: Enrollment Restricted to Scholars
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Course Catalog &amp; Pedagogical Peer Review
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Review your authored clinical and laboratory modules, inspect syllabi authored by peer faculty preceptors, and deploy new courses for your department cohort.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsPostingOpen(true)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <PlusCircle className="w-4 h-4 text-emerald-950" />
                <span>+ Post New Course</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-7 text-white border border-emerald-800/40 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5 animate-fadeIn">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-emerald-950 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  National Ayush Scholar Learning Portal
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-200 border border-white/15">
                  Scholar Enrollment Enabled · ABC Credits Transferable
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Accredited Clinical &amp; Industrial Microcourses
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Enroll in verified preceptor modules, SWAYAM Plus industry courses, and practical laboratory certifications to boost your clinical and manufacturing readiness.
              </p>
            </div>

            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 text-center shrink-0 min-w-[130px]">
              <span className="text-2xl font-black text-emerald-300 block">{coursesList.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Available Courses</span>
            </div>
          </div>
        )}

        {/* Clean Top Header Bar: Search on Left, + Post Course on Right */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row justify-between items-center gap-4">`;

if (content.includes(oldTopBarTarget)) {
  content = content.replace(oldTopBarTarget, newTopBarBlock);
}

// 6. Update the Filter Tabs bar to include Faculty Tabs if isFaculty
const oldFiltersBar = `        {/* National Learning Portal Filter Tabs (Prompt #2: All | Ministry Certified | NPTEL / SWAYAM) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Source:
            </span>
            {['All', 'Ministry Certified', 'NPTEL / SWAYAM'].map((tab) => (
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
            ))}
          </div>`;

const newFiltersBar = `        {/* Learning Portal Filter Tabs & Role Specific Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/80 shadow-soft">
          {isFaculty ? (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Faculty Views:
              </span>
              {[
                { id: 'all', label: 'All Faculty Courses', count: coursesList.length },
                { id: 'my_courses', label: 'My Created Courses', count: myCreatedCourses.length },
                { id: 'other_faculty', label: 'Other Faculty Courses', count: otherFacultyCourses.length },
                { id: 'swayam_plus', label: 'SWAYAM Plus', count: swayamPlusCourses.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFacultyCourseFilter(tab.id)}
                  className={\`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 \${
                    facultyCourseFilter === tab.id
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                  }\`}
                >
                  <span>{tab.label}</span>
                  <span className={\`text-[10px] px-1.5 py-0.2 rounded-full font-black \${
                    facultyCourseFilter === tab.id ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-700'
                  }\`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Source:
              </span>
              {['All', 'SWAYAM Plus', 'Ministry Certified', 'Industry Programs', 'NPTEL / SWAYAM'].map((tab) => (
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
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-300 text-purple-950 font-black">
                      ABC Credit
                    </span>
                  )}
                  {tab === 'NPTEL / SWAYAM' && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-300 text-amber-950 font-black">
                      Free MOOC
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}`;

if (content.includes(oldFiltersBar)) {
  content = content.replace(oldFiltersBar, newFiltersBar);
}

// 7. Update course card footer button to enforce:
// - ONLY Students can buy & enroll
// - Faculty manages own or reviews other faculty
// - College has institutional review
// - Admin has ministry accreditation review
const oldCardActionFooter = `                {/* Role-Specific Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold text-slate-900">
                    {course.price === 'Free Access' ? 'Free for Scholars' : course.price}
                  </span>

                  {course.isSwayam ? (
                    <a
                      href={course.swayamUrl || 'https://swayam.gov.in'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <span>Enroll on swayam.gov.in</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                    </a>
                  ) : isFacultyPortal ? (
                    /* FACULTY VIEW: Manage & SOP (Faculty do NOT enroll) */
                    <button
                      onClick={() => alert(\`Opening preceptor SOP canvas for: \${course.title}\`)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 border border-slate-200"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>Manage Course</span>
                    </button>
                  ) : (
                    /* STUDENT VIEW: Buy & Watch Course */
                    <button
                      onClick={() => {
                        setSelectedCourseForBuy(course);
                        setIsPurchased(false);
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Buy & Watch</span>
                    </button>
                  )}
                </div>`;

const newCardActionFooter = `                {/* Role-Specific Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold text-slate-900">
                    {course.price === 'Free Access' || course.price === 'Govt. Sponsored (Free)' ? 'Free for Scholars' : course.price}
                  </span>

                  {course.isSwayamPlus ? (
                    isStudent ? (
                      <button
                        onClick={() => {
                          setSwayamPlusModalCourse(course);
                          setAbcCreditSuccess(false);
                        }}
                        className="px-4 py-2 bg-purple-900 hover:bg-purple-950 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <span>Enroll via DigiLocker ABC</span>
                        <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setInspectionModalCourse(course)}
                        className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-950 rounded-xl font-bold text-xs border border-purple-200 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5 text-purple-700" />
                        <span>Inspect SWAYAM Plus Syllabus</span>
                      </button>
                    )
                  ) : course.isSwayam ? (
                    isStudent ? (
                      <a
                        href={course.swayamUrl || 'https://swayam.gov.in'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <span>Enroll on swayam.gov.in</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setInspectionModalCourse(course)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 border border-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span>Review MOOC Monograph</span>
                      </button>
                    )
                  ) : isFaculty ? (
                    /* FACULTY VIEW: Manage (own) or Inspect (other faculty) - CANNOT ENROLL */
                    <button
                      onClick={() => setInspectionModalCourse(course)}
                      className={\`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 border \${
                        isMyCourse(course) 
                          ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200' 
                          : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200'
                      }\`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isMyCourse(course) ? 'Manage Syllabus & SOPs' : 'Inspect Preceptor Syllabus'}</span>
                    </button>
                  ) : isCollege ? (
                    /* COLLEGE VIEW: Institutional Curriculum Review - CANNOT APPLY/ENROLL */
                    <button
                      onClick={() => setInspectionModalCourse(course)}
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl font-bold text-xs border border-blue-200 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                      <span>Institutional Curriculum Review</span>
                    </button>
                  ) : isAdmin ? (
                    /* ADMIN VIEW: Ministry Accreditation Review - CANNOT APPLY/ENROLL */
                    <button
                      onClick={() => setInspectionModalCourse(course)}
                      className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl font-bold text-xs border border-sky-200 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Landmark className="w-3.5 h-3.5 text-sky-700" />
                      <span>Inspect Syllabus &amp; ABC Credits</span>
                    </button>
                  ) : (
                    /* STUDENT VIEW: ONLY STUDENT CAN ENROLL */
                    <button
                      onClick={() => {
                        setSelectedCourseForBuy(course);
                        setIsPurchased(false);
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Buy &amp; Watch ({course.price})</span>
                    </button>
                  )}
                </div>`;

if (content.includes(oldCardActionFooter)) {
  content = content.replace(oldCardActionFooter, newCardActionFooter);
}

// 8. Add Admin Standards Switcher view handler
const adminStandardsTarget = `        {/* Course Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;

const newAdminStandardsBlock = `        {/* Admin Standards Overview Toggle */}
        {isAdmin && adminViewMode === 'standards' ? (
          <div className="animate-fadeIn">
            <MinistryCoursesOverview />
          </div>
        ) : (
          /* Course Posters Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;

if (content.includes(adminStandardsTarget)) {
  content = content.replace(adminStandardsTarget, newAdminStandardsBlock);
  content = content.replace(`        </div>\n\n      </div>\n\n      {/* FACULTY ONLY`, `        </div>\n        )}\n\n      </div>\n\n      {/* FACULTY ONLY`);
}

// 9. Add Inspection Modal and SWAYAM Plus Enrollment Modal right before export default CoursesPage
const targetEndInsert = `export default CoursesPage;`;

const newModalsBlock = `{/* NON-STUDENT CURRICULUM & ACCREDITATION INSPECTION MODAL (FACULTY, COLLEGE, ADMIN) */}
      {inspectionModalCourse && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 relative my-auto overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
                    {inspectionModalCourse.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
                    {isFaculty ? 'Preceptor Syllabus Oversight' : isCollege ? 'College Curriculum Review' : 'Ministry Accreditation Audit'}
                  </span>
                </div>
                <h2 className="text-xl font-black tracking-tight leading-snug">
                  {inspectionModalCourse.title}
                </h2>
                <p className="text-xs text-slate-300 font-medium">
                  Preceptor: {inspectionModalCourse.author} · {inspectionModalCourse.authorRole || 'Ayush Academic Council'}
                </p>
              </div>

              <button
                onClick={() => setInspectionModalCourse(null)}
                className="text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              {/* Strict Stakeholder Enrollment Notice */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-950">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-extrabold text-[11px] uppercase tracking-wider block">
                    Direct Student Enrollment Restricted
                  </span>
                  <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                    {isFaculty 
                      ? 'Faculty Preceptor Mode: You are reviewing the instructional design and practical competency checklist. Direct enrollment and credit acquisition is reserved for registered scholars.'
                      : isCollege
                      ? 'College Institutional Oversight: You are inspecting course curriculum for accreditation compliance. Colleges cannot apply or enroll in courses.'
                      : 'Ministry Regulatory Audit: You are reviewing course syllabus and ABC credit allocation. Administrative accounts cannot apply or enroll in courses.'
                    }
                  </p>
                </div>
              </div>

              {/* Course Overview & Skill Gap */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                  Curriculum Summary &amp; Pedagogical Objective:
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {inspectionModalCourse.skillGap || inspectionModalCourse.description}
                </p>
              </div>

              {/* Modules Breakdown */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                  Syllabus Modules &amp; Laboratory Practicum:
                </h4>
                <div className="space-y-2">
                  {[
                    { num: '01', title: 'Regulatory Framework, Statutory Rules & Plant Layout', duration: '30 mins' },
                    { num: '02', title: 'Laboratory Methodology, Standard Operating Procedures & Assay Testing', duration: '35 mins' },
                    { num: '03', title: 'Quality Assurance, Batch Documentation & Final Competency Case', duration: '25 mins' }
                  ].map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 font-bold flex items-center justify-center font-mono text-[11px]">
                          {m.num}
                        </span>
                        <span className="font-semibold text-slate-800">{m.title}</span>
                      </div>
                      <span className="text-slate-500 font-medium">{m.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competencies */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                  Assessed Student Competencies:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(inspectionModalCourse.competencies || []).map((c, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold px-2.5 py-1 rounded-lg">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Academic Bank of Credits Info */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Academic Bank of Credits (ABC) Transfer</span>
                  <span className="text-slate-500">2.0 National Skill Credits transferable via DigiLocker ID for scholars</span>
                </div>
                <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  NCISM Aligned
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Author: <strong>{inspectionModalCourse.author}</strong> ({inspectionModalCourse.duration})
              </span>
              <button
                onClick={() => setInspectionModalCourse(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SWAYAM PLUS DIGILOCKER ABC ENROLLMENT MODAL (FOR STUDENTS ONLY) */}
      {swayamPlusModalCourse && isStudent && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-purple-200 relative my-auto overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-400 text-purple-950">
                    SWAYAM Plus Course Enrollment
                  </span>
                </div>
                <h2 className="text-lg font-black tracking-tight mt-1">
                  {swayamPlusModalCourse.title}
                </h2>
                <p className="text-xs text-purple-200 font-medium">
                  Industry Partner: {swayamPlusModalCourse.industryPartner || swayamPlusModalCourse.author}
                </p>
              </div>
              <button
                onClick={() => setSwayamPlusModalCourse(null)}
                className="text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                <span className="font-extrabold text-purple-950 block">DigiLocker Academic Bank of Credits (ABC):</span>
                <p className="text-purple-900 font-medium">
                  Linked ABC Account: <strong>ABC-2026-9042-881</strong> ({currentUser?.name || 'Aarav Sharma'} · National Institute of Ayurveda)
                </p>
                <p className="text-[11px] text-purple-800">
                  {swayamPlusModalCourse.academicCredits || '3 Credits (Transferable via ABC Bank)'}
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Syllabus Overview:</h4>
                <p className="text-slate-600 leading-relaxed">
                  {swayamPlusModalCourse.skillGap || swayamPlusModalCourse.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800">Verified Competencies:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(swayamPlusModalCourse.competencies || []).map((c, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-lg">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {abcCreditSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold flex items-center justify-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Enrolled successfully! DigiLocker ABC Credit linkage confirmed.</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/60">
              <button
                onClick={() => setSwayamPlusModalCourse(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAbcCreditSuccess(true);
                  setTimeout(() => {
                    setAbcCreditSuccess(false);
                    setSwayamPlusModalCourse(null);
                  }, 1800);
                }}
                disabled={abcCreditSuccess}
                className="px-5 py-2.5 bg-purple-900 hover:bg-purple-950 disabled:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                {abcCreditSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Enrolled &amp; Linked</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-purple-300" />
                    <span>Confirm Student Enrollment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

export default CoursesPage;`;

if (content.includes(targetEndInsert)) {
  content = content.replace(targetEndInsert, newModalsBlock);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated CoursesPage.jsx with complete role-based viewing and enrollment rules!");
