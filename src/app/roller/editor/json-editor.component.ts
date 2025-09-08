import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  forwardRef,
  input,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { jsonLanguage } from '@codemirror/lang-json';
import { Compartment, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark';
import { vsCodeLight } from '@fsegurai/codemirror-theme-vscode-light';
import { noop } from 'rxjs';
import { ThemeService } from '../../theme.service';

type ChangeFn = (value: string) => void;
type TouchedFn = () => void;

@Component({
  selector: 'app-json-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '', // no template needed, the editor is rendered in the host element
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonEditorComponent),
      multi: true
    }
  ],
  host: {
    class: 'border border-gray-300 dark:border-gray-600 bg-gray-50 text-gray-900 text-sm block w-full p-2.5 dark:bg-gray-900 dark:text-white focus-within:ring-2 focus-within:z-10 dark:focus-within:ring-blue-500'
  }
})
export class JsonEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  disabled = input(false, { transform: booleanAttribute });
  value = input<string | null>(null);

  editor: EditorView | undefined;
  editableCompartment = new Compartment();
  themeCompartment = new Compartment();

  onChangeFn: ChangeFn = noop;
  onTouchedFn: TouchedFn = noop;

  constructor(
    private readonly elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    private readonly zone: NgZone,
    private readonly themeService: ThemeService,
    private readonly destroyRef: DestroyRef
  ) {
    changeDetectorRef.detach(); // we don't need change detection for this component
    effect(() => this.setDisabledState(this.disabled()));
    effect(() => this.writeValue(this.value()));
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.editor = new EditorView({
        parent: this.elementRef.nativeElement,
        extensions: [
          this.themeCompartment.of(this.desiredTheme()),
          this.disablingExtension(),
          jsonLanguage
        ]
      });
      this.themeService.themeChange$.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.resetDesiredTheme();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
      this.editor = undefined;
    }
  }

  registerOnChange(fn: ChangeFn): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.editor) {
      this.editor.dispatch({
        effects: this.editableCompartment.reconfigure(EditorView.editable.of(!isDisabled))
      });
    }
  }

  writeValue(obj: any): void {
    if (!this.editor) return;
    if (obj !== null && obj !== undefined && typeof obj !== 'string') {
      console.warn('Editor expects a string, but received', typeof obj, obj);
      return;
    }
    this.editor.dispatch({
      changes: { from: 0, to: this.editor.state.doc.length, insert: obj || '' }
    });
  }

  disablingExtension(): Extension {
    return this.editableCompartment.of(EditorView.editable.of(true));
  }

  resetDesiredTheme(): void {
    if (!this.editor) return;
    this.editor.dispatch({
      effects: this.themeCompartment.reconfigure(this.desiredTheme())
    });
  }

  desiredTheme(): Extension {
    return this.themeService.determineThemePreference() === 'dark' ? vsCodeDark : vsCodeLight;
  }

}
