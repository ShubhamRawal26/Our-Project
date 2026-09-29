const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'StakeholderDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF
content = content.replace(/\r\n/g, '\n');

// 1. Update navItems arrays
const oldNavItems = `  const studentNavItems = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'console', label: 'Student Portal', icon: Layers },
    { id: 'skills', label: 'Skills', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'jobs', label: 'Jobs', icon: Briefcase }
  ];

  const companyNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'console', label: 'Company Console', icon: Layers },
    { id: 'jobs', label: 'Talent ATS', icon: Briefcase }
  ];

  const facultyNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'console', label: 'Faculty Console', icon: Layers },
    { id: 'skills', label: 'Department Radar', icon: BarChart3 }
  ];

  const ministryNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'console', label: 'Ministry Command', icon: Layers },
    { id: 'network', label: 'State Ecosystem', icon: Building2 }
  ];

  const collegeNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'console', label: 'Verification', icon: ShieldCheck },
    { id: 'students', label: 'Student', icon: Users },
    { id: 'accreditation', label: 'Accreditation', icon: Award }
  ];`;

const newNavItems = `  const studentNavItems = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'console', label: 'Student Portal', icon: Layers },
    { id: 'skills', label: 'Skills', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'jobs', label: 'Jobs', icon: Briefcase }
  ];

  // Company stakeholders do not view academic student courses (they manage Talent ATS & Industry Learning Programs)
  const companyNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'console', label: 'Company Console', icon: Layers },
    { id: 'jobs', label: 'Talent ATS', icon: Briefcase }
  ];

  // Faculty can view their created courses and other faculty created courses
  const facultyNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'console', label: 'Faculty Console', icon: Layers },
    { id: 'skills', label: 'Department Radar', icon: BarChart3 }
  ];

  // Ministry Admin can view available courses for national curriculum oversight
  const ministryNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'console', label: 'Ministry Command', icon: Layers },
    { id: 'network', label: 'State Ecosystem', icon: Building2 }
  ];

  // College can view courses for institutional oversight but cannot apply
  const collegeNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'courses', label: 'Curriculum & Courses', icon: BookOpen },
    { id: 'console', label: 'Verification', icon: ShieldCheck },
    { id: 'students', label: 'Student', icon: Users },
    { id: 'accreditation', label: 'Accreditation', icon: Award }
  ];`;

if (!content.includes(oldNavItems)) {
  throw new Error("Could not find oldNavItems in StakeholderDashboard.jsx");
}
content = content.replace(oldNavItems, newNavItems);

// 2. Update Company Mobile Nav to remove Courses button
const oldCompanyMobileNav = `              {/* 2. Courses */}
              <button
                onClick={() => { setActiveTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={\`flex flex-col items-center justify-center py-1 w-full text-xs transition-all cursor-pointer \${activeTab === 'courses' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-medium'
                  }\`}
              >
                <BookOpen className={\`w-5 h-5 shrink-0 \${activeTab === 'courses' ? 'text-emerald-700' : 'text-slate-500'}\`} />
                <span className="text-[10px] mt-0.5 font-bold">Courses</span>
              </button>`;

const newCompanyMobileNav = `              {/* 2. Talent ATS */}
              <button
                onClick={() => { setActiveTab('jobs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={\`flex flex-col items-center justify-center py-1 w-full text-xs transition-all cursor-pointer \${activeTab === 'jobs' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-medium'
                  }\`}
              >
                <Briefcase className={\`w-5 h-5 shrink-0 \${activeTab === 'jobs' ? 'text-emerald-700' : 'text-slate-500'}\`} />
                <span className="text-[10px] mt-0.5 font-bold">Talent ATS</span>
              </button>`;

if (!content.includes(oldCompanyMobileNav)) {
  throw new Error("Could not find oldCompanyMobileNav in StakeholderDashboard.jsx");
}
content = content.replace(oldCompanyMobileNav, newCompanyMobileNav);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated StakeholderDashboard.jsx!");
