import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DiceLangEditorComponent } from './roller/editor/dice-lang-editor.component';
import { RollerService } from './roller/roller.service';

@Component({
  selector: 'app-try-it-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DiceLangEditorComponent
  ],
  template: `
    <app-dice-lang-editor disabled [value]="value()" class="rounded-lg col-span-full row-span-full"/>
    <div class="col-span-full row-span-full z-0 mr-2">
      <button
        (click)="roll(value())"
        class="btn btn-sm btn-rounded btn-secondary"
      >
        Try it!
      </button>
    </div>
  `,
  host: {
    class: 'grid items-center justify-items-end'
  }
})
export class TryItEditorComponent {

  value = input.required<string>();

  constructor(
    private roller: RollerService
  ) {
  }

  roll(input: string): void {
    this.roller.roll(input);
  }

}
