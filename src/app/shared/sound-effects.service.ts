import { Injectable, signal } from '@angular/core';

/** A short synthesized tone: frequency points [seconds, Hz] the pitch glides through. */
interface Tone {
  wave: OscillatorType;
  volume: number;
  duration: number;
  ramp: 'linear' | 'exponential';
  pitch: [number, number][];
}

const TONES = {
  correct: {
    wave: 'sine',
    volume: 0.2,
    duration: 0.35,
    ramp: 'exponential',
    pitch: [
      [0, 523.25], // C5
      [0.1, 659.25], // E5
      [0.2, 783.99], // G5
    ],
  },
  wrong: {
    wave: 'sawtooth',
    volume: 0.2,
    duration: 0.3,
    ramp: 'linear',
    pitch: [
      [0, 180],
      [0.25, 130],
    ],
  },
  timeUp: {
    wave: 'triangle',
    volume: 0.3,
    duration: 0.4,
    ramp: 'linear',
    pitch: [
      [0, 400],
      [0.4, 200],
    ],
  },
} satisfies Record<string, Tone>;

export type ToneName = keyof typeof TONES;

/** Game sound effects synthesized with the Web Audio API (no audio files). */
@Injectable({ providedIn: 'root' })
export class SoundEffectsService {
  readonly enabled = signal(true);
  private ctx: AudioContext | undefined;

  toggle(): void {
    this.enabled.update((on) => !on);
  }

  play(name: ToneName): void {
    if (!this.enabled() || typeof AudioContext === 'undefined') return;
    // Created lazily: browsers only allow audio after a user gesture
    this.ctx ??= new AudioContext();
    const tone: Tone = TONES[name];
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = tone.wave;
    tone.pitch.forEach(([at, hz], i) => {
      if (i === 0) osc.frequency.setValueAtTime(hz, now);
      else if (tone.ramp === 'linear') osc.frequency.linearRampToValueAtTime(hz, now + at);
      else osc.frequency.exponentialRampToValueAtTime(hz, now + at);
    });
    gain.gain.setValueAtTime(tone.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + tone.duration);

    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + tone.duration);
  }
}
