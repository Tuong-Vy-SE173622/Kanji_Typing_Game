import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutoFocusDirective } from '../shared/auto-focus.directive';

/** Game picker (route '/'): Vocabulary game or Verb conjugation game. */
@Component({
  selector: 'app-home',
  imports: [AutoFocusDirective, RouterLink],
  templateUrl: './home.html',
})
export class Home {}
