import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TablerIconComponent } from "angular-tabler-icons";
import { ComparisonExpression } from "@character-sheets/dice-lang";
import { ExprAsStringComponent } from "./expr-as-string.component";
import { RollComponent } from "./roll.component";

@Component({
  selector: 'app-comparison',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let comparisonExpr = expr();
    <code [class]="comparisonExpr.result ? 'text-green-400' : 'text-red-400'"
          class="flex gap-2 text-xl font-bold mb-2">
      <i-tabler [name]="comparisonExpr.result ? 'circle-check' : 'circle-x'"/>
      {{ comparisonExpr.result ? 'SUCCESS' : 'FAILURE' }}
    </code>
    @if (comparisonExpr.left.type !== 'number') {
      <app-roll [expr]="comparisonExpr.left" size="small" class="mb-2"/>
    }
    @if (comparisonExpr.right.type !== 'number') {
      <app-roll [expr]="comparisonExpr.right" size="small" class="mb-2"/>
    }
    <div class="inline-grid gap-x-3 gap-y-0"
         style="grid-template-columns: repeat(3, auto)">
      <app-expr-as-string [expr]="comparisonExpr.left" size="sm"/>
      <app-expr-as-string [expr]="comparisonExpr.right" size="sm" style="grid-column: 3"/>
      <code class="text-4xl font-bold text-gray-900 dark:text-white">
        {{ comparisonExpr.left.result }}
      </code>
      <code class="text-4xl text-gray-700 dark:text-gray-400">
        {{ comparisonExpr.operator }}
      </code>
      <code class="text-4xl font-bold text-gray-900 dark:text-white">
        {{ comparisonExpr.right.result }}
      </code>
    </div>
  `,
  imports: [
    TablerIconComponent,
    RollComponent,
    ExprAsStringComponent
  ],
  styles: `
    :host {
      display: block;
    }
  `
})
export class ExprComparisonComponent {
  expr = input.required<ComparisonExpression>();
}
