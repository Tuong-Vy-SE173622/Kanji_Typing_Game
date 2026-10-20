import { Routes } from '@angular/router';
import { Home } from './home/home';

// Each game is lazy-loaded, so opening the menu only downloads the menu
export const routes: Routes = [
  { path: '', title: 'Kanji Typing', component: Home },
  {
    path: 'vocabulary',
    title: 'Game Từ Vựng · Kanji Typing',
    loadComponent: () => import('./vocabulary-game/vocabulary-game').then((m) => m.VocabularyGame),
  },
  {
    path: 'verb',
    title: 'Game Chia động từ · Kanji Typing',
    loadComponent: () => import('./verb-game/verb-game').then((m) => m.VerbGame),
  },
  { path: '**', redirectTo: '' },
];
