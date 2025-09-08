import { Injectable, Signal, signal } from '@angular/core';
import {
  ParseError,
  ResolvedExpression,
  roll,
  RuntimeError,
  SyntaxError
} from '@character-sheets/dice-lang';
import { RollerContextService } from './roller-context.service';

@Injectable({
  providedIn: 'root'
})
export class RollerService {

  private _result = signal<ResolvedExpression | ParseError | undefined>(undefined);
  private _input = signal<string>('');

  get result(): Signal<ResolvedExpression | SyntaxError | ParseError | RuntimeError | undefined> {
    return this._result.asReadonly();
  }

  get input(): Signal<string> {
    return this._input.asReadonly();
  }

  constructor(
    private readonly context: RollerContextService
  ) {
  }

  roll(input: string): void {
    let result: ResolvedExpression | ParseError;
    try {
      result = roll(input, { context: this.context.value() });
    } catch (e) {
      result = e as SyntaxError | ParseError | RuntimeError;
    }
    console.debug("Result from roll:", result);
    this._result.set(result);
    this._input.set(input);
  }

}
