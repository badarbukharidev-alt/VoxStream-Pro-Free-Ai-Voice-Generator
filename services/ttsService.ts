import { API_BASE_URL } from '../constants';
import { Voice } from '../types';

export const fetchVoices = async (): Promise<Voice[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/voices`);
    if (!response.ok) {
      throw new Error('Failed to fetch voices');
    }
    const data = await response.json();
    
    // Normalize data to ensure PascalCase property names
    return data.map((v: any) => ({
      Gender: v.Gender || v.gender,
      Language: v.Language || v.language,
      Name: v.Name || v.name,
      ReadableName: v.ReadableName || v.readableName || v.name // Fallback
    }));
  } catch (error) {
    console.warn("Could not fetch latest voices, using defaults.", error);
    return [];
  }
};

export const generateAudioUrl = (
  text: string, 
  voiceName: string, 
  rate: number, 
  pitch: number
): string => {
  // The API requires 'rate' to be a signed percentage string (e.g., "+0%", "+10%", "-50%")
  // Input 'rate' is a multiplier (0.5 to 2.0), where 1.0 is neutral (+0%)
  const ratePct = Math.round((rate - 1.0) * 100);
  const rateStr = ratePct >= 0 ? `+${ratePct}%` : `${ratePct}%`;

  // The API requires 'pitch' to be a signed Hz string (e.g., "+0Hz", "+20Hz")
  // Input 'pitch' is a multiplier (0.5 to 2.0). We map this to a range of approx -50Hz to +50Hz
  const pitchHz = Math.round((pitch - 1.0) * 50);
  const pitchStr = pitchHz >= 0 ? `+${pitchHz}Hz` : `${pitchHz}Hz`;

  const params = new URLSearchParams({
    text: text,
    voice: voiceName,
    rate: rateStr,
    pitch: pitchStr
  });
  
  return `${API_BASE_URL}/speak?${params.toString()}`;
};

export const fetchAudioBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url, {
    headers: {
      'Accept': 'audio/mpeg'
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }
  
  return await response.blob();
};