import React from 'react';
import { AudioHistoryItem } from '../types';
import { Play, Download, Trash2, Clock, Music } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface HistoryListProps {
  history: AudioHistoryItem[];
  currentPlayingId: string | null;
  onPlay: (item: AudioHistoryItem) => void;
  onDelete: (id: string) => void;
}

// Generate fake waveform data for visual flair
const generateWaveformData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 0.5 + 0.2 + (Math.sin(i) * 0.2)
  }));
};

export const HistoryList: React.FC<HistoryListProps> = ({ history, currentPlayingId, onPlay, onDelete }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
            <Music className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-slate-500 font-medium">No voices generated yet</p>
        <p className="text-slate-400 text-sm mt-1">Start typing above to create magic</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {history.map((item) => {
        const isPlaying = currentPlayingId === item.id;
        const waveformData = generateWaveformData();

        return (
          <div 
            key={item.id} 
            className={`group relative bg-white border rounded-xl p-4 transition-all duration-300 shadow-sm hover:shadow-md ${
              isPlaying ? 'border-indigo-500 ring-1 ring-indigo-500/20 shadow-indigo-100' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 mr-4 overflow-hidden">
                <p className="text-slate-800 text-sm font-semibold line-clamp-1 truncate" title={item.text}>{item.text}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                        {item.voiceName}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <a 
                  href={item.url} 
                  download={`voxstream-${item.id}.mp3`}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Download MP3"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50/50 p-2 rounded-lg border border-slate-100/50">
              <button 
                onClick={() => onPlay(item)}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 ${
                  isPlaying 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                }`}
              >
                {isPlaying ? (
                  <div className="w-3 h-3 bg-current rounded-[1px]" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                )}
              </button>

              <div className="h-8 flex-1 opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waveformData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={isPlaying ? "#4f46e5" : "#cbd5e1"} 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-200 px-1.5 py-0.5 rounded">
                MP3
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};