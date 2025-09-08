import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ResolvedExpression } from "@character-sheets/dice-lang";
import { ExprAsStringComponent } from "./expr-as-string.component";
import { ExprResultComponent } from "./expr-result.component";
import { ExprComponent } from "./expr.component";

@Component({
  selector: 'app-roll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExprResultComponent,
    ExprComponent,
    ExprAsStringComponent
  ],
  template: `
    <app-expr-as-string [expr]="expr()" [size]="size() === 'small' ? 'xs' : 'sm'"/>
    <code class="flex items-center gap-3">
      <app-expr-result [result]="expr().result" [size]="size()"/>
      <div class="text-gray-700 dark:text-gray-400">
        =
      </div>
      <div class="flex items-center gap-1 cursor-default flex-wrap">
        <app-expr [expr]="expr()"/>
      </div>
    </code>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class RollComponent {

  expr = input.required<ResolvedExpression>();
  size = input<'small' | 'normal'>('normal');

}
