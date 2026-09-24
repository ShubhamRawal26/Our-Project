import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Globe2, 
  Cpu, 
  Volume2, 
  Key, 
  Layers, 
  Copy, 
  Check, 
  X,
  FileCode2,
  Sparkles,
  Building
} from 'lucide-react';
import { useBhashini } from '../context/BhashiniContext';

export function BhashiniIntegratorModal({ isOpen, onClose }) {
  const { currentLanguage, activeLangObj, languages } = useBhashini();
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'api' | 'glossary'

  if (!isOpen) return null;

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const scriptSnippet = `<meta name="bhashini-system-integrator" content="SkillSetu-Ayush-NLTM" />
<script 
  id="bhashini-web-plugin" 
  src="https://bhashini.gov.in/bhashini-translator.js" 
  data-pos-x="95" 
  data-pos-y="90" 
  data-source-lang="en"
  async defer>
</script>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Indian Tricolor Accent */}
        <div className="relative bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 overflow-hidden shrink-0">
          {/* Subtle Indian Tricolor Decorative Strip */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="w-1/3 bg-[#FF9933]"></div>
            <div className="w-1/3 bg-[#FFFFFF]"></div>
            <div className="w-1/3 bg-[#138808]"></div>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0">
                <span className="text-xl font-black tracking-tight text-amber-300">भा</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                    Official Govt Integration
                  </span>
                  <span className="text-[10px] text-slate-300">MeitY • Digital India</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5 tracking-tight flex items-center gap-2">
                  <span>BHASHINI System Integrator Console</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  National Language Translation Mission (NLTM) Portal Partner
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              System Integrator Overview
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'api'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Web Plugin Embed Script
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'glossary'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Ayush Domain Glossary ({languages.length} Langs)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-emerald-950 text-xs sm:text-sm">
                    Platform Active & Empaneled
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    SkillSetu is equipped with the Bhashini Translation Plugin architecture. This enables students, physicians, academic institutions, and Ayush companies to navigate in 14+ Indian languages with neural machine translation and speech synthesis.
                  </p>
                </div>
              </div>

              {/* Grid of Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs mb-1">
                    <Globe2 className="w-4 h-4 text-emerald-700" />
                    <span>NMT (Neural Machine Translation)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    ULCA-benchmarked Indian models for English-to-Indic and Indic-to-Indic real-time translations.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    <span>22 Scheduled Languages Active</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs mb-1">
                    <Volume2 className="w-4 h-4 text-teal-700" />
                    <span>TTS & ASR (Bhashini Vani)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Voice-enabled audio readouts in native Indian accents, supporting low-literacy clinical practitioners.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
                    <span>Speech Synthesis Ready</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs mb-1">
                    <ShieldCheck className="w-4 h-4 text-indigo-700" />
                    <span>Selective Translation Protection</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Cryptographic hashes, verification QR IDs, and candidate roll numbers are protected using <code className="bg-slate-200 px-1 rounded text-[10px]">.bhashini-skip-translation</code>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs mb-1">
                    <Building className="w-4 h-4 text-amber-700" />
                    <span>Samudaye Partner Portal</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Registered under the Government of India Bhashini System Integrator program for National Missions.
                  </p>
                </div>
              </div>

              {/* Direct Link to System Integrator portal */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-2xl">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Explore System Integrator Portal</span>
                  <span className="text-[11px] text-slate-400">bhashini.gov.in/samudaye/system-integrator</span>
                </div>
                <a
                  href="https://bhashini.gov.in/samudaye/system-integrator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  <span>Open Bhashini Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Official embedding snippet configured in <code className="bg-slate-100 font-bold px-1.5 py-0.5 rounded text-emerald-800">index.html</code> as per Bhashini System Integrator guidelines:
              </p>

              <div className="relative bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto">
                <button
                  onClick={() => handleCopyCode(scriptSnippet)}
                  className="absolute top-3 right-3 px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied' : 'Copy Snippet'}</span>
                </button>
                <pre>{scriptSnippet}</pre>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                <strong>System Integrator Configuration:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                  <li>Position: <code className="font-bold">data-pos-x="95"</code> (Bottom Right), <code className="font-bold">data-pos-y="90"</code></li>
                  <li>Target Audience: Pan-India students, Ayush colleges, AYUSH Ministry & pharma enterprises</li>
                  <li>Skip Class: Elements marked with <code className="font-bold">.bhashini-skip-translation</code> are skipped to preserve codes & hashes</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'glossary' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Current active language: <strong className="text-slate-900">{activeLangObj.name} ({activeLangObj.nativeName})</strong>. Standardized Ayush terms mapped across Indian languages:
              </p>

              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                    <tr>
                      <th className="p-2.5">Domain / English Term</th>
                      <th className="p-2.5">Hindi (हिन्दी)</th>
                      <th className="p-2.5">Sanskrit (संस्कृतम्)</th>
                      <th className="p-2.5">Tamil (தமிழ்)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-900">Ayurveda</td>
                      <td className="p-2.5 text-slate-700">आयुर्वेद</td>
                      <td className="p-2.5 text-emerald-800 font-semibold">आयुर्वेदः</td>
                      <td className="p-2.5 text-slate-700">ஆயுர்வேதம்</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-900">Yoga & Naturopathy</td>
                      <td className="p-2.5 text-slate-700">योग एवं प्राकृतिक चिकित्सा</td>
                      <td className="p-2.5 text-emerald-800 font-semibold">योगः प्राकृतिकचिकित्सा च</td>
                      <td className="p-2.5 text-slate-700">யோகா & இயற்கை மருத்துவம்</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-900">Siddha</td>
                      <td className="p-2.5 text-slate-700">सिद्ध</td>
                      <td className="p-2.5 text-emerald-800 font-semibold">सिद्ध-चिकित्सा</td>
                      <td className="p-2.5 text-slate-700">சித்த மருத்துவம்</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-900">Unani</td>
                      <td className="p-2.5 text-slate-700">यूनानी</td>
                      <td className="p-2.5 text-emerald-800 font-semibold">यूनानी-चिकित्सा</td>
                      <td className="p-2.5 text-slate-700">யுனானி</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-900">Ministry of Ayush</td>
                      <td className="p-2.5 text-slate-700">आयुष मंत्रालय</td>
                      <td className="p-2.5 text-emerald-800 font-semibold">आयुष-मन्त्रालयः</td>
                      <td className="p-2.5 text-slate-700">ஆயுஷ் அமைச்சகம்</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-900">Credential Verification</td>
                      <td className="p-2.5 text-slate-700">प्रमाणपत्र सत्यापन</td>
                      <td className="p-2.5 text-emerald-800 font-semibold">प्रमाणपत्रसत्यतासत्यापनम्</td>
                      <td className="p-2.5 text-slate-700">சான்றிதழ் சரிபார்ப்பு</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Digital India • MeitY • Govt of India</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BhashiniIntegratorModal;
