import {
  ChangeDetectionStrategy,
  Component,
  linkedSignal,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { completionStatus } from '@codemirror/autocomplete';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { TablerIconComponent } from 'angular-tabler-icons';
import { ParseError, ResolvedExpression, RuntimeError, SyntaxError } from '@character-sheets/dice-lang';
import { DiceLangEditorComponent } from './editor/dice-lang-editor.component';
import { RollErrorResultComponent } from './result/roll-error-result.component';
import { RollResultComponent } from './result/roll-result.component';
import { RollHistory } from './roll-history';
import { RollerContextService } from './roller-context.service';
import { RollerService } from './roller.service';

@Component({
  selector: 'app-roller',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TablerIconComponent,
    FormsModule,
    DiceLangEditorComponent,
    RollResultComponent,
    RollErrorResultComponent
  ],
  template: `
    @let rollExpr = rollResult();
    @if (rollExpr) {
      <button
        (click)="discardResult()"
        aria-label="Discard result"
        class="absolute right-6 top-6 inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-700 focus:z-10 hover:underline focus:underline focus:text-blue-700 dark:focus:text-blue-500 dark:focus:ring-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
      >
        Discard
        <i-tabler name="x" class="w-4! h-4!"/>
      </button>
      <!-- TODO limit to screen max height -->
      <div class="mb-6">
        @if (!isError(rollExpr)) {
          <app-roll-result [result]="rollExpr"/>
        } @else {
          <app-roll-error-result [inputText]="rollInput()" [error]="rollExpr"/>
        }
      </div>
    }
    <form (ngSubmit)="roll(ngForm)" #ngForm="ngForm"
          class="inline-flex rounded-md shadow-xs w-full">
      <app-dice-lang-editor
        [extensions]="editorExtensions"
        [references]="references"
        [(ngModel)]="input"
        type="text"
        name="input"
        required
        class="rounded-s-lg border-e-0"
        data-testid="input-roll-editor"
      />
      <button
        type="submit"
        class="btn btn-primary btn-lg rounded-s-none! px-4!"
        data-testid="button-roll"
      >
        <i-tabler name="dice" class="icon"/>
        Roll
      </button>
    </form>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }
  `
})
export class RollerComponent {

  input = signal<string>('');

  rollResult: WritableSignal<ResolvedExpression | SyntaxError | ParseError | RuntimeError | undefined>;
  rollInput: Signal<string>;

  constructor(
    private readonly roller: RollerService,
    private readonly context: RollerContextService
  ) {
    this.rollResult = linkedSignal(()  => roller.result());
    this.rollInput = roller.input;
  }

  references = () => this.context.keys();

  editorExtensions: Extension[] = [ this.rollHistoryExtension() ];
  rollHistory = new RollHistory(20);

  roll(form: NgForm): void {
    if (form.invalid)
      return;
    this.rollHistory.submit(this.input());
    this.roller.roll(this.input());
    this.input.set('');
  }

  rollHistoryExtension(): Extension {
    return EditorView.domEventHandlers({
      keydown: (event: KeyboardEvent, view: EditorView) => {
        if (completionStatus(view.state) === 'active')
          return;
        this.handleRollHistoryUp(event, view);
        this.handleRollHistoryDown(event, view);
      }
    });
  }

  handleRollHistoryUp(event: KeyboardEvent, view: EditorView): void {
    if (event.key !== 'ArrowUp')
      return;
    if (!this.rollHistory.hasHistory())
      return;
    const lineNumber = view.state.doc.lineAt(view.state.selection.main.head).number;
    if (lineNumber !== 1)
      return;
    event.preventDefault();
    this.input.set(this.rollHistory.goBackward());
  }

  handleRollHistoryDown(event: KeyboardEvent, view: EditorView): void {
    if (event.key !== 'ArrowDown')
      return;
    if (!this.rollHistory.hasHistory())
      return;
    const lineNumber = view.state.doc.lineAt(view.state.selection.main.head).number;
    if (lineNumber !== view.state.doc.lines)
      return;
    event.preventDefault();
    this.input.set(this.rollHistory.goForward());
  }

  isError(value: unknown): value is Error {
    return value instanceof Error;
  }

  discardResult(): void {
    this.rollResult.set(undefined);
  }

}
