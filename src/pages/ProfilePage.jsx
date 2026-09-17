import React, { useEffect, useState } from 'react';
import { ArrowLeft, Building, MapPin, Award, GraduationCap, ShieldCheck } from 'lucide-react';
import { CompanyProfileView } from '../components/portals/CompanyProfileView';
import { FacultyProfileView } from '../components/portals/FacultyProfileView';
import { CollegeProfileView } from '../components/portals/CollegeProfileView';
import { MinistryProfileView } from '../components/portals/MinistryProfileView';
import { AyushSixAxisRadarChart } from '../components/AyushSixAxisRadarChart';
import { getAuthorProfile } from '../data/feedPostsData';
import { PORTALS_DATA } from '../data/portalData';
import aaravAvatar from '../assets/images/aarav_avatar.jpg';

const skillMatrix = [
  { name: 'Nadi Pariksha (Pulse Diagnostics)', score: 92, status: 'Mastered', percentile: '98th' },
  { name: 'Dravyaguna Phytochemistry & HPLC', score: 88, status: 'Verified', percentile: '94th' },
  { name: 'Schedule T GMP Cleanroom Protocol', score: 94, status: 'Mastered', percentile: '99th' },
  { name: 'GCP Clinical Trial Protocols', score: 85, status: 'Verified', percentile: '91st' },
  { name: 'Panchakarma Clinical Management', score: 82, status: 'Proficient', percentile: '89th' },
  { name: 'Rasa Shastra Quality Testing', score: 86, status: 'Verified', percentile: '93rd' },
];

export function StudentProfileView({ user, onNavigate, onBack, isPublicView }) {
  const [profile, setProfile] = useState(() => ({
    name: user?.name || 'Aarav Sharma',
    role: user?.role || 'BAMS Scholar & Ayush Research Fellow',
    institution: user?.institution || 'National Institute of Ayurveda (NIA), Jaipur',
    location: user?.location || 'Jaipur, Rajasthan, India',
    degree: user?.degree || 'BAMS (Final Year 2026)',
    bio: user?.bio || 'Pioneering evidence-based Ayurvedic medicine, digital Nadi Pariksha diagnostics, and botanical extraction HPLC standardization.',
    readiness: user?.readiness ? parseInt(user.readiness, 10) : 88,
    avatarImage: user?.avatarImage || aaravAvatar,
    apaarId: user?.apaarId || '9841-2041-8891',
    abcCredits: user?.abcCredits || '164 Credits',
    abhaId: user?.abhaId || '91-4402-8819-2041',
    ncismReg: user?.ncismReg || 'NCISM/AYU/RJ/2022/9912',
  }));

  useEffect(() => {
    if (user) setProfile((previous) => ({ ...previous, ...user, readiness: user.readiness ? parseInt(user.readiness, 10) : previous.readiness }));
  }, [user]);

  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-900 pb-16 font-sans">
      {onBack && (
        <button type="button" onClick={onBack} className="m-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img src={profile.avatarImage} alt={profile.name} className="h-24 w-24 rounded-3xl object-cover" />
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-sm font-semibold text-slate-600">{profile.role}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><Building className="h-3.5 w-3.5" /> {profile.institution}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5" /> {profile.location}</p>
              </div>
            </div>
            {!isPublicView && <span className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800">Verified profile</span>}
          </div>
          <div className="mt-5 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-600">{profile.bio}</div>
        </div>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><Award className="h-4 w-4" /></div>
            <div><h2 className="text-lg font-bold">Ayush 6-Axis Competency Radar & Qualifications</h2><p className="text-xs text-slate-500">Core competency benchmarks and verified academic identity</p></div>
          </div>
          <div className="mt-6"><AyushSixAxisRadarChart skillMatrix={skillMatrix} plain /></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4"><div className="flex items-center gap-2 text-sm font-bold"><GraduationCap className="h-4 w-4 text-emerald-700" /> Academic Qualification</div><p className="mt-3 font-semibold">{profile.degree}</p><p className="text-xs text-slate-500">National Institute of Ayurveda · 2021–2026 · 8.94 CGPA</p></div>
            <div className="rounded-2xl border border-slate-200 p-4"><div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck className="h-4 w-4 text-emerald-700" /> Verified Credentials</div><p className="mt-3 text-xs text-slate-600">APAAR: {profile.apaarId}</p><p className="text-xs text-slate-600">ABC: {profile.abcCredits} · ABHA: {profile.abhaId}</p><p className="text-xs text-slate-600">NCISM: {profile.ncismReg}</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ProfilePage({ onNavigate, currentUser, activePortalId, viewingUser, onBack }) {
  const target = viewingUser ? (getAuthorProfile(viewingUser) || viewingUser) : (currentUser || PORTALS_DATA[0].profileUser);
  const role = target?.roleType || (!viewingUser ? activePortalId : null) || (() => {
    const value = `${target?.role || ''} ${target?.name || ''}`.toLowerCase();
    if (value.includes('company') || value.includes('recruiter') || value.includes('industry') || value.includes('dabur')) return 'company';
    if (value.includes('faculty') || value.includes('professor') || value.includes('preceptor')) return 'faculty';
    if (value.includes('ministry') || value.includes('admin') || value.includes('council')) return 'admin';
    if (value.includes('college') || value.includes('institute') || value.includes('dean')) return 'college';
    return 'student';
  })();
  const props = { user: target, onNavigate, onBack, isPublicView: Boolean(viewingUser) };
  if (role === 'company') return <CompanyProfileView {...props} />;
  if (role === 'faculty') return <FacultyProfileView {...props} />;
  if (role === 'college') return <CollegeProfileView {...props} />;
  if (role === 'admin') return <MinistryProfileView {...props} />;
  return <StudentProfileView {...props} />;
}

export default ProfilePage;
