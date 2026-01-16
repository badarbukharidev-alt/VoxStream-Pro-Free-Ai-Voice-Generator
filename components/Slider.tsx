import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (val: number) => string;
}

export const Slider: React.FC<SliderProps> = ({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  onChange,
  formatValue = (v) => v.toFixed(1)
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
        <span className="text-xs font-mono font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{formatValue(value)}</span>
      </div>
      <div className="relative flex items-center select-none touch-none w-full h-6 group cursor-pointer">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-75 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div 
          className="absolute h-5 w-5 bg-white rounded-full shadow-md border border-slate-200 pointer-events-none transition-all duration-75 ease-out group-hover:scale-110 group-hover:shadow-lg group-active:scale-95"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    </div>
  );
};