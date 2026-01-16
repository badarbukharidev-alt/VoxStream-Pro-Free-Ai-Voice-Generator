import React, { useState, useMemo } from 'react';
import { Voice } from '../types';
import { getLanguageLabel } from '../constants';
import { Search, ChevronDown, Check, Globe } from 'lucide-react';

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: Voice | null;
  onSelect: (voice: Voice) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ voices, selectedVoice, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Group voices by language
  const groupedVoices = useMemo(() => {
    const groups: Record<string, Voice[]> = {};
    const filtered = voices.filter(v => 
      v.ReadableName.toLowerCase().includes(search.toLowerCase()) || 
      v.Name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.forEach(voice => {
      const lang = getLanguageLabel(voice);
      if (!groups[lang]) groups[lang] = [];
      groups[lang].push(voice);
    });

    // Sort languages alphabetically
    return Object.keys(groups).sort().reduce((acc, key) => {
      acc[key] = groups[key];
      return acc;
    }, {} as Record<string, Voice[]>);
  }, [voices, search]);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative z-50">
      <div 
        onClick={toggleOpen}
        className="w-full bg-white border border-slate-200 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-50 rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all shadow-sm"
      >
        <div className="flex flex-col items-start overflow-hidden">
          <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1 flex items-center gap-1">
             <Globe className="w-3 h-3" /> Voice Selection
          </span>
          <span className="text-sm font-semibold text-slate-800 truncate w-full">
            {selectedVoice ? selectedVoice.ReadableName : 'Select a voice...'}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 w-full max-h-[400px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col animate-in fade-in zoom-in-95 duration-100">
            <div className="p-3 border-b border-slate-100 bg-slate-50 sticky top-0">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search languages or names..."
                  className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 p-2 scrollbar-thin">
              {Object.entries(groupedVoices).map(([language, groupVoices]: [string, Voice[]]) => (
                <div key={language} className="mb-4">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 rounded-md mb-1">
                    {language}
                  </div>
                  <div className="space-y-1">
                    {groupVoices.map((voice) => (
                      <button
                        key={voice.Name}
                        onClick={() => {
                          onSelect(voice);
                          setIsOpen(false);
                          setSearch('');
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between group transition-colors ${
                          selectedVoice?.Name === voice.Name 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full shadow-sm ${voice.Gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'}`} />
                          <span className="truncate max-w-[200px] sm:max-w-xs font-medium">{voice.ReadableName.split('-')[0].trim()}</span>
                        </div>
                        {selectedVoice?.Name === voice.Name && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {Object.keys(groupedVoices).length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No voices found matching "{search}"
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};