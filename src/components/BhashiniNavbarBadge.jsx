import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X, ExternalLink } from 'lucide-react';
import { useBhashini } from '../context/BhashiniContext';

export function BhashiniNavbarBadge({ compact = false }) {
  const { 
    languages, 
    currentLanguage, 
    activeLangObj, 
    changeLanguage, 
    isTranslating 
  } = useBhashini();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownOpen]);

  const filteredLanguages = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative bhashini-skip-translation notranslate" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setDropdownOpen(prev => !prev);
          setSearch('');
        }}
        className={`flex items-center gap-1.5 py-1 px-2 sm:py-1.5 sm:px-3 rounded-xl border transition-all duration-200 shadow-2xs cursor-pointer group active:scale-95 ${
          dropdownOpen 
            ? 'bg-emerald-50 text-emerald-950 border-emerald-600 ring-2 ring-emerald-500/20' 
            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 hover:border-emerald-600'
        }`}
        title="भाषिणी (Bhashini) - Govt. of India Language Translation"
        aria-expanded={dropdownOpen}
      >
        {/* Official Bhashini Logo Emblem with Indian Tricolor border */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-[1.2px] shadow-2xs flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-black text-amber-300 leading-none">भा</span>
          </div>
        </div>

        {!compact ? (
          <>
            <div className="hidden sm:flex items-center gap-1.5 text-left leading-none">
              <span className="text-xs font-black text-slate-900 group-hover:text-emerald-950 tracking-tight">
                भाषिणी
              </span>
              <span className="text-slate-300 font-light text-[11px]">|</span>
              <span className="text-xs font-semibold text-emerald-800 truncate max-w-[80px]">
                {activeLangObj.nativeName}
              </span>
            </div>
            <span className="sm:hidden text-[11px] font-bold text-slate-800 uppercase">
              {activeLangObj.code}
            </span>
          </>
        ) : (
          <span className="text-[11px] font-bold text-slate-800 uppercase">
            {activeLangObj.code}
          </span>
        )}

        {isTranslating ? (
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
        ) : (
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Branded Bhashini Language Dropdown */}
      {dropdownOpen && (
        <div 
          className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 animate-in fade-in zoom-in-95 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Indian Tricolor Strip */}
          <div className="h-1 w-full flex">
            <div className="w-1/3 bg-[#FF9933]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#138808]" />
          </div>

          {/* Bhashini Brand Header */}
          <div className="p-3 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-black text-amber-300 text-xs">
                भा
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs text-white">भाषिणी (BHASHINI)</span>
                  <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded">
                    MeitY
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 block">
                  National Language Translation Mission
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDropdownOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Search */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/80">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 22+ Indian languages..."
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-60 overflow-y-auto px-1 py-1 divide-y divide-slate-50">
            {filteredLanguages.map((l) => {
              const isSelected = currentLanguage === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    changeLanguage(l.code);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-950 font-black'
                      : 'hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-slate-900 text-xs">{l.nativeName}</span>
                    <span className="text-[11px] text-slate-400 font-normal">({l.name})</span>
                  </div>

                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Official Govt Bhashini Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Govt. of India • Digital India</span>
            </span>

            <a
              href="https://bhashini.gov.in/samudaye/system-integrator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>System Integrator</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default BhashiniNavbarBadge;
