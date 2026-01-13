
export enum AppState {
  INITIAL = 'INITIAL',
  COVENANT = 'COVENANT',
  SANCTUARY = 'SANCTUARY',
  ECHO_WALL = 'ECHO_WALL'
}

export enum Emotion {
  TIRED = 'TIRED',
  MISSING = 'MISSING',
  CALM = 'CALM',
  OBLIVION = 'OBLIVION',
  NONE = 'NONE'
}

export type AnchorType = '家' | '冈仁波齐' | '荒野' | '古刹' | '深海' | '虚空';

export interface Totem {
  id: string;
  type: 'DIGITAL' | 'LIFE';
  name: string;
  description: string;
  dustLevel: number; // 0 to 100
  maintenanceLevel: number; // 0 to 100 (Brightness/Life)
  lastInteraction: number;
  image?: string;
  audioSnippet?: string; // Conceptually
}

export interface GlobalAnchor {
  name: string;
  location: string;
  isSynced: boolean;
  timeOffset: number; // hours relative to UTC
}
