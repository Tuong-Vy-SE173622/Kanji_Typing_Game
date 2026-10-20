import { Component, input } from '@angular/core';
import { RubySegment } from '../conjugation';

/** Renders text with furigana above its kanji. */
@Component({
  selector: 'app-ruby-text',
  templateUrl: './ruby-text.html',
})
export class RubyText {
  readonly segments = input.required<RubySegment[]>();
}
