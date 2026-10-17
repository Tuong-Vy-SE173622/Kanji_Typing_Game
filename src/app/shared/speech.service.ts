import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  private readonly supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  constructor() {
    // Some browsers load voices asynchronously
    if (this.supported) speechSynthesis.getVoices();
  }

  speak(text: string): void {
    if (!this.supported) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/[〜~（）()]/g, ' '));
    utter.lang = 'ja-JP';
    utter.rate = 0.9;
    const jaVoice = speechSynthesis.getVoices().find((v) => v.lang.startsWith('ja'));
    if (jaVoice) utter.voice = jaVoice;
    speechSynthesis.speak(utter);
  }

  cancel(): void {
    if (this.supported) speechSynthesis.cancel();
  }
}
