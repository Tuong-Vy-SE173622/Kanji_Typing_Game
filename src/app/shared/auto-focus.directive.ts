import { AfterViewInit, Directive, ElementRef, inject, input } from '@angular/core';

/** Focuses the host element when it is rendered (so Enter triggers it). */
@Directive({ selector: '[appAutoFocus]' })
export class AutoFocusDirective implements AfterViewInit {
  readonly appAutoFocus = input<boolean | ''>(true);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  ngAfterViewInit(): void {
    if (this.appAutoFocus() !== false) this.el.nativeElement.focus({ preventScroll: true });
  }
}
