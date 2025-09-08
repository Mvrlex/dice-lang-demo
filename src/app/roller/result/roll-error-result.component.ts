import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ParseError, RuntimeError, SyntaxError } from '@character-sheets/dice-lang';

@Component({
  selector: 'app-roll-error-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-gray-700 dark:text-gray-400">
      {{ error().message }}
    </div>
    <code class="text-gray-700 dark:text-gray-400">
      {{ errorText()[0] }}<span class="underline decoration-wavy decoration-red-400">{{ errorText()[1] }}</span>{{ errorText()[2] }}
    </code>
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class RollErrorResultComponent {

  inputText = input.required<string>();
  error = input.required<SyntaxError | ParseError | RuntimeError>();

  errorText = computed<[ string, string, string ]>(() => [
    this.inputText().slice(0, this.error().from),
    this.inputText().slice(this.error().from, this.error().to),
    this.inputText().slice(this.error().to)
  ]);

}
