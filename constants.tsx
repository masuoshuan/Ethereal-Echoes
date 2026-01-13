
import React from 'react';

// 用户反馈预置内容较鸡肋，现将其清空，由用户自行创建
export const INITIAL_TOTEMS = [];

export const EMOTION_CONFIG = {
  TIRED: {
    color: 'from-blue-900/40 to-indigo-900/40',
    effect: 'RAIN',
    whisper: '天空替你落泪。在此处安歇。'
  },
  MISSING: {
    color: 'from-amber-900/40 to-red-900/40',
    effect: 'SNOW',
    whisper: '每一片雪花，都是一段冻结的时间。'
  },
  CALM: {
    color: 'from-teal-900/40 to-emerald-900/40',
    effect: 'LIGHT',
    whisper: '水面的涟漪，是内心平静的回响。'
  },
  OBLIVION: {
    color: 'from-zinc-950 to-neutral-900',
    effect: 'VOID',
    whisper: '彻底的告别，是给彼此最后的温柔。'
  },
  NONE: {
    color: 'from-zinc-900 to-black',
    effect: 'NONE',
    whisper: '寂静是万物回响的根源。'
  }
};
