interface SampleRate {
  samplerate: number;
}

interface SampleRateMobile extends SampleRate {
  channels: number;
}

interface Variants {
  desktop: SampleRate;
  mobile: SampleRateMobile;
}

interface CommonSoundSettings {
  type: string;
  group: string;
  variants: Variants;
  formats: string[];
}

export interface SeparateSounds extends CommonSoundSettings {
  path: string;
}

export interface Sounds extends CommonSoundSettings {
  path: {
    [soundName: string]: string
  };
  silencePadding: number;
}

export interface ManifestData {
  Sounds: Sounds;
  separateSounds?: {
    [soundName: string]: SeparateSounds
  }
}

export const defaultSoundSettings: CommonSoundSettings = {
  type: 'sound',
  group: 'sounds',
  variants: {
    desktop: {
      samplerate: 44100
    },
    mobile: {
      samplerate: 44100,
      channels: 1
    }
  },
  formats: [
    'mp3',
    'm4a'
  ]
};