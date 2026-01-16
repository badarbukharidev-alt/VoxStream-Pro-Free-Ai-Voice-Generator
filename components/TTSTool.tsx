import React, { useState, useEffect, useRef } from 'react';
import { AudioHistoryItem, Voice } from '../types';
import { DEFAULT_VOICES } from '../constants';
import { fetchVoices, generateAudioUrl, fetchAudioBlob } from '../services/ttsService';
import { VoiceSelector } from './VoiceSelector';
import { Slider } from './Slider';
import { Button } from './Button';
import { HistoryList } from './HistoryList';
import { 
  Mic2, 
  Settings2, 
  PlayCircle, 
  Layers, 
  MessageCircle, 
  Code,
  ArrowLeft
} from 'lucide-react';

interface TTSToolProps {
  onBack: () => void;
}

export const TTSTool: React.FC<TTSToolProps> = ({ onBack }) => {
  // State
  const [voices, setVoices] = useState<Voice[]>(DEFAULT_VOICES);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [text, setText] = useState<string>('Welcome to VoxStream Pro. I can read any text you type here with realistic human intonation. Try changing my voice settings!');
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [history, setHistory] = useState<AudioHistoryItem[]>([]);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize
  useEffect(() => {
    const initVoices = async () => {
      const fetched = await fetchVoices();
      if (fetched.length > 0) {
        setVoices(fetched);
        if (!selectedVoice) {
          const defaultVoice = fetched.find(v => v.Name === 'en-US-AndrewNeural') || fetched[0];
          setSelectedVoice(defaultVoice);
        }
      } else {
        if (!selectedVoice && DEFAULT_VOICES.length > 0) {
            setSelectedVoice(DEFAULT_VOICES[1]);
        }
      }
    };
    initVoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Audio Playback
  useEffect(() => {
    if (audioRef.current) {
      if (currentAudioUrl) {
        audioRef.current.src = currentAudioUrl;
        audioRef.current.play().catch(e => {
            console.error("Playback error:", e);
            setIsPlaying(false);
        });
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [currentAudioUrl]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleGenerate = async () => {
    if (!selectedVoice || !text.trim()) return;

    setIsGenerating(true);
    setCurrentAudioUrl(null);

    try {
      const url = generateAudioUrl(text, selectedVoice.Name, rate, pitch);
      let finalUrl = url;

      try {
        const blob = await fetchAudioBlob(url);
        finalUrl = URL.createObjectURL(blob);
      } catch (blobError: any) {
        if (blobError.message && blobError.message.includes('API Error')) {
            throw blobError;
        }
        console.warn("Blob fetch failed (likely CORS), falling back to streaming URL.", blobError);
        finalUrl = url;
      }

      const newItem: AudioHistoryItem = {
        id: crypto.randomUUID(),
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        voiceName: selectedVoice.ReadableName,
        timestamp: Date.now(),
        url: finalUrl
      };

      setHistory(prev => [newItem, ...prev]);
      setCurrentAudioUrl(finalUrl);
      
    } catch (error: any) {
      console.error("Generation failed", error);
      alert(`Failed to generate audio: ${error.message || 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHistoryPlay = (item: AudioHistoryItem) => {
    if (currentAudioUrl === item.url) {
      togglePlayback();
    } else {
      setCurrentAudioUrl(item.url);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(i => i.id !== id));
    const item = history.find(i => i.id === id);
    if (item && item.url === currentAudioUrl) {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
        }
        setIsPlaying(false);
        setCurrentAudioUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200 pb-20">
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Mic2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">VoxStream<span className="text-indigo-600">Pro</span></span>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Home
             </button>
             <a 
               href="https://whatsapp.com/channel/0029Vb7FVyy6BIEdCN9BXh1C" 
               target="_blank" 
               rel="noreferrer"
               className="hidden sm:inline-flex items-center text-sm font-medium text-slate-600 hover:text-green-600 transition-colors gap-2"
             >
               <MessageCircle className="w-4 h-4" />
               Join Community
             </a>
          </div>
        </div>
      </nav>

      {/* Main App Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Editor */}
            <div className="lg:col-span-8">
                <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Mic2 className="w-6 h-6 text-indigo-600" /> Studio Editor
                </h2>
                <p className="text-slate-500">Configure your voice and generate audio.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="col-span-1 md:col-span-2">
                        <VoiceSelector 
                            voices={voices} 
                            selectedVoice={selectedVoice} 
                            onSelect={setSelectedVoice} 
                        />
                    </div>
                    <Slider 
                        label="Speed" 
                        value={rate} 
                        min={0.5} 
                        max={2.0} 
                        step={0.1} 
                        onChange={setRate}
                        formatValue={(v) => `${v}x`} 
                    />
                    <Slider 
                        label="Pitch" 
                        value={pitch} 
                        min={0.5} 
                        max={2.0} 
                        step={0.1} 
                        onChange={setPitch} 
                    />
                    </div>

                    <div className="relative group">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-64 bg-white border border-slate-200 rounded-xl p-5 text-lg leading-relaxed text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none shadow-sm transition-all"
                        placeholder="Type your script here..."
                        spellCheck={false}
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-3">
                        {currentAudioUrl && (
                            <Button 
                                variant="secondary" 
                                onClick={togglePlayback}
                                className="shadow-md"
                            >
                                {isPlaying ? (
                                <>Stop Playback</>
                                ) : (
                                <><PlayCircle className="w-4 h-4 mr-2" /> Replay</>
                                )}
                            </Button>
                        )}
                        <Button 
                            size="lg" 
                            isLoading={isGenerating} 
                            onClick={handleGenerate}
                            disabled={!text.trim()}
                            className="shadow-lg shadow-indigo-500/30"
                        >
                            Generate Audio
                        </Button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Right Column: History & Tips */}
            <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-500" /> History
                    </h3>
                    {history.length > 0 && (
                        <button onClick={() => setHistory([])} className="text-xs text-red-500 hover:text-red-600 font-medium">Clear All</button>
                    )}
                    </div>
                    <HistoryList 
                    history={history} 
                    currentPlayingId={isPlaying && currentAudioUrl ? history.find(h => h.url === currentAudioUrl)?.id || null : null}
                    onPlay={handleHistoryPlay}
                    onDelete={handleDeleteHistory}
                    />
                </div>

                <div className="bg-indigo-900 text-white rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Code className="w-24 h-24" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 relative z-10">Pro Tip</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed relative z-10 mb-4">
                    Join our WhatsApp channel to get updates on new voices, features, and other amazing tools developed by Badar Bukhari.
                    </p>
                    <a href="https://whatsapp.com/channel/0029Vb7FVyy6BIEdCN9BXh1C" target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="sm" className="w-full relative z-10 border-none bg-white/10 text-white hover:bg-white/20">
                        <MessageCircle className="w-4 h-4 mr-2" /> Join Channel
                    </Button>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};