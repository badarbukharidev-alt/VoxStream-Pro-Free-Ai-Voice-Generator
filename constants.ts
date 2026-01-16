import { Voice } from './types';

export const API_BASE_URL = 'https://tts-api.fakcloud.tech';

export const DEFAULT_VOICES: Voice[] = [
  {
    "Gender": "Female",
    "Language": "en-US",
    "Name": "en-US-AvaNeural",
    "ReadableName": "Microsoft Ava Online (Natural) - English (United States)"
  },
  {
    "Gender": "Male",
    "Language": "en-US",
    "Name": "en-US-AndrewNeural",
    "ReadableName": "Microsoft Andrew Online (Natural) - English (United States)"
  },
  {
    "Gender": "Female",
    "Language": "en-US",
    "Name": "en-US-EmmaNeural",
    "ReadableName": "Microsoft Emma Online (Natural) - English (United States)"
  },
  {
    "Gender": "Male",
    "Language": "en-GB",
    "Name": "en-GB-RyanNeural",
    "ReadableName": "Microsoft Ryan Online (Natural) - English (United Kingdom)"
  },
   {
    "Gender": "Female",
    "Language": "fr-FR",
    "Name": "fr-FR-DeniseNeural",
    "ReadableName": "Microsoft Denise Online (Natural) - French (France)"
  },
  {
    "Gender": "Male",
    "Language": "es-ES",
    "Name": "es-ES-AlvaroNeural",
    "ReadableName": "Microsoft Alvaro Online (Natural) - Spanish (Spain)"
  },
  {
    "Gender": "Female",
    "Language": "de-DE",
    "Name": "de-DE-KatjaNeural",
    "ReadableName": "Microsoft Katja Online (Natural) - German (Germany)"
  },
  {
      "Gender": "Male",
      "Language": "ja-JP",
      "Name": "ja-JP-KeitaNeural",
      "ReadableName": "Microsoft Keita Online (Natural) - Japanese (Japan)"
  }
];

// Helper to extract country/language from ReadableName or Language code
export const getLanguageLabel = (voice: Voice): string => {
  const match = voice.ReadableName.match(/- ([^(]+)/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return voice.Language;
};
