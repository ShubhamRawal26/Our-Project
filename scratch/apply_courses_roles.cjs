const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'CoursesPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF
content = content.replace(/\r\n/g, '\n');

// 1. Add ALL_COURSES import if not present
if (!content.includes("import { ALL_COURSES } from '../data/coursesData';")) {
  content = content.replace(
    "import ayushHeroBanner from '../assets/images/ayush_hero_banner.jpg';",
    "import ayushHeroBanner from '../assets/images/ayush_hero_banner.jpg';\nimport { ALL_COURSES } from '../data/coursesData';"
  );
}

// 2. Locate the start of export function CoursesPage({ currentUser, activePortalId })
const targetFunctionStart = `export function CoursesPage({ currentUser, activePortalId }) {
  // Check if current view is Ministry of Ayush Portal
  const isMinistryPortal = activePortalId === 'admin' || 
                           activePortalId === 'ministry' || 
                           currentUser?.roleType === 'admin' ||
                           currentUser?.role?.toLowerCase().includes('ministry') ||
                           currentUser?.role?.toLowerCase().includes('director general') ||
                           currentUser?.institution?.toLowerCase().includes('ministry');

  // Ministry portal gets high-level curriculum oversight & course types directory (No retail course cards)
  if (isMinistryPortal) {
    return <MinistryCoursesOverview />;
  }

  // Only faculty members can post courses; students can only view and buy/watch posted courses
  const isFacultyPortal = activePortalId === 'faculty';`;

const newFunctionStart = `export function CoursesPage({ currentUser, activePortalId }) {
  // ─────────────────────────────────────────────────────────────────────────────
  // ROLE RESOLUTION & PERMISSIONS POLICY:
  // 1. Student (SH Student): ONLY students can enroll in courses & transfer ABC credits.
  // 2. Company: Companies do NOT see the academic courses catalog (reserved for scholars).
  // 3. Faculty: Can view their created courses AND different faculty created courses, but cannot enroll.
  // 4. College: Can view available courses for institutional curriculum oversight, but cannot apply/enroll.
  // 5. Admin (Ministry): Can view available courses and domain monographs for accreditation oversight, but cannot apply/enroll.
  // ─────────────────────────────────────────────────────────────────────────────

  const isCompany = activePortalId === 'company' || 
                    currentUser?.roleType === 'company' || 
                    currentUser?.role === 'company';

  const isFaculty = activePortalId === 'faculty' || 
                    currentUser?.roleType === 'faculty' || 
                    currentUser?.role === 'faculty';

  const isCollege = activePortalId === 'college' || 
                    currentUser?.roleType === 'college' || 
                    currentUser?.role === 'college';

  const isAdmin = activePortalId === 'admin' || 
                  activePortalId === 'ministry' || 
                  currentUser?.roleType === 'admin' ||
                  currentUser?.role?.toLowerCase().includes('ministry') ||
                  currentUser?.role?.toLowerCase().includes('director general') ||
                  currentUser?.institution?.toLowerCase().includes('ministry');

  const isStudent = !isCompany && !isFaculty && !isCollege && !isAdmin;

  // View state for Admin: 'catalog' (all available courses) | 'standards' (MINISTRY_COURSE_TYPES)
  const [adminViewMode, setAdminViewMode] = useState('catalog');

  // Inspection modal state for Non-Students (Faculty, College, Admin) who can review but CANNOT enroll
  const [inspectionModalCourse, setInspectionModalCourse] = useState(null);

  // SWAYAM Plus DigiLocker ABC Credit Transfer Modal State (For Students only)
  const [swayamPlusModalCourse, setSwayamPlusModalCourse] = useState(null);
  const [abcCreditSuccess, setAbcCreditSuccess] = useState(false);

  // Faculty specific filter: 'all' | 'my_courses' | 'other_faculty' | 'swayam_plus'
  const [facultyCourseFilter, setFacultyCourseFilter] = useState('all');

  // COMPANY RESTRICTION: Companies do not show academic courses
  if (isCompany) {
    return (
      <div className="min-h-screen bg-[#f3f7f5] py-16 px-4 font-sans text-slate-900 flex items-center justify-center animate-fadeIn">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto border border-amber-200">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 inline-block">
              Corporate Recruiter Portal
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Academic Courses Reserved for Scholars
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Academic coursework and statutory curricular modules are restricted to enrolled scholars and academic institutions. Enterprises publish and manage <strong>Industry Learning Programs</strong>, workshops, and hiring vacancies directly from the Company Console.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
            <button
              onClick={() => { window.location.hash = '#console'; }}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Go to Company Console
            </button>
            <button
              onClick={() => { window.location.hash = '#jobs'; }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer border border-slate-200"
            >
              Manage Talent ATS
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFacultyPortal = isFaculty;`;

if (!content.includes(targetFunctionStart)) {
  throw new Error("Could not find targetFunctionStart in CoursesPage.jsx");
}
content = content.replace(targetFunctionStart, newFunctionStart);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Step 1 complete: Updated role detection and company restriction in CoursesPage.jsx!");
