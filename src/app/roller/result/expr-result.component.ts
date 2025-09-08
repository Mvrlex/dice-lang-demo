import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  viewChild
} from "@angular/core";

@Component({
  selector: 'app-expr-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <code [class.text-4xl]="size() === 'normal'"
          class="font-bold text-transparent">{{ result() }}</code>
    <code #value [class.text-4xl]="size() === 'normal'"
          class="animation-count absolute font-bold tracking-tight text-gray-900 dark:text-white"></code>
  `,
  styles: `
    :host {
      display: contents;
    }

    @property --value {
      syntax: "<integer>";
      initial-value: 0;
      inherits: false;
    }

    .animation-count {
      counter-reset: value var(--value);
    }

    .animation-count::after {
      content: counter(value);
      pointer-events: none;
    }
  `
})
export class ExprResultComponent {

  result = input.required<number>();
  size = input<'small' | 'normal'>('normal');
  valueElement = viewChild.required<ElementRef>('value');

  constructor() {
    effect(() => {
      (this.valueElement().nativeElement as HTMLElement).animate([
        { '--value': 0 },
        { '--value': this.result() }
      ], {
        duration: 2000,
        fill: 'forwards',
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
      });
    });
  }

}
