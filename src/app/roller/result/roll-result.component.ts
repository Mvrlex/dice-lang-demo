import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ComparisonExpression, ResolvedExpression } from "@character-sheets/dice-lang";
import { ExprComparisonComponent } from "./expr-comparison.component";
import { RollComponent } from "./roll.component";

@Component({
  selector: 'app-roll-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let rollExpr = result();
    @if (rollExpr) {
      <div role="log" aria-live="polite" data-testid="section-roll-result">
        @switch (rollExpr.type) {
          @case ("comparison") {
            <app-comparison [expr]="asComparisonExpr(rollExpr)"/>
          }
          @default {
            <app-roll [expr]="rollExpr"/>
          }
        }
      </div>
    }
  `,
  imports: [
    RollComponent,
    ExprComparisonComponent
  ],
  styles: `
    :host {
      display: block;
    }
  `
})
export class RollResultComponent {

  result = input.required<ResolvedExpression>();

  asComparisonExpr(expr: ResolvedExpression): ComparisonExpression {
    return expr as ComparisonExpression;
  }

}
