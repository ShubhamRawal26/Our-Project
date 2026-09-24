import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X, ExternalLink } from 'lucide-react';
import { useBhashini } from '../context/BhashiniContext';

export function BhashiniWidget() {
  const {
    languages,
    currentLanguage,
    activeLangObj,
    changeLanguage,
    isTranslating
  } = useBhashini();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const widgetRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const filteredLanguages = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      ref={widgetRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 font-sans select-none bhashini-skip-translation notranslate"
      id="bhashini-floating-plugin"
      data-pos-x="95"
      data-pos-y="90"
    >
      {/* Floating Official Bhashini Pill */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setSearch('');
        }}
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-200 cursor-pointer active:scale-95 border ${
          isOpen 
            ? 'bg-emerald-950 text-white border-emerald-600 ring-4 ring-emerald-500/20' 
            : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/90 hover:border-emerald-600'
        }`}
        title="Govt. of India BHASHINI Language Translation"
        aria-expanded={isOpen}
      >
        {/* Tricolor Ring Emblem */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-[1.5px] shadow-xs flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <span className="text-[11px] font-black text-amber-300 leading-none">भा</span>
          </div>
        </div>

        <div className="flex flex-col text-left justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-xs text-slate-900 tracking-tight">
              भाषिणी
            </span>
            <span className="text-[9px] uppercase font-bold bg-emerald-100 text-emerald-800 px-1 rounded">
              {activeLangObj.code}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5 truncate max-w-[90px]">
            {activeLangObj.nativeName}
          </span>
        </div>

        {isTranslating ? (
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
        ) : (
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Branded Language Selector Drawer */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
          
          {/* Top Indian Tricolor Strip */}
          <div className="h-1 w-full flex">
            <div className="w-1/3 bg-[#FF9933]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#138808]" />
          </div>

          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white flex items-center justify-between">
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
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Box */}
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
          <div className="p-1 max-h-60 overflow-y-auto divide-y divide-slate-50">
            {filteredLanguages.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-950 font-black'
                      : 'hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{lang.nativeName}</span>
                    <span className="text-[11px] text-slate-400">({lang.name})</span>
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

          {/* Footer with official System Integrator link */}
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

export default BhashiniWidget;
