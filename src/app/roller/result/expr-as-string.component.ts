import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import {
  ComparisonExpression,
  CountExpression,
  DiceExpression,
  DieExpression,
  DropExpression,
  FilterOperator,
  KeepExpression,
  MathExpression,
  NumberLiteral,
  ReferenceLiteral,
  ResolvedNode
} from "@character-sheets/dice-lang";

@Component({
  selector: 'app-expr-as-string',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <code [class]="{ 'text-xs': size() === 'xs', 'text-sm': size() === 'sm' }"
          class="block text-gray-700 dark:text-gray-400">
      {{ exprString() }}
    </code>
  `
})
export class ExprAsStringComponent {

  expr = input.required<ResolvedNode>();
  size = input<'xs' | 'sm' | 'normal'>('normal');
  exprString = computed(() => this.exprToString(this.expr()));

  exprToString(expr: ResolvedNode): string {
    const str = this.exprToStringInternal(expr);
    return expr.wasBraced ? `(${str})` : str;
  }

  private exprToStringInternal(expr: ResolvedNode): string {
    switch (expr.type) {
      case "number":
        return (expr as NumberLiteral).result.toString();
      case "reference":
        return `@${(expr as ReferenceLiteral).name}`;
      case "math": {
        const mathExpr = expr as MathExpression;
        return `${this.exprToString(mathExpr.left)} ${mathExpr.operator} ${this.exprToString(mathExpr.right)}`;
      }
      case "comparison": {
        const comparisonExpr = expr as ComparisonExpression;
        return `${this.exprToString(comparisonExpr.left)} ${comparisonExpr.operator} ${this.exprToString(comparisonExpr.right)}`;
      }
      case "die":
        return `d${(expr as DieExpression).die.length}`;
      case "dice": {
        const diceExpr = expr as DiceExpression;
        return `${diceExpr.rolls.length}d${diceExpr.rolls[0].die.length}`;
      }
      case "filter": {
        const filterExpr = expr as FilterOperator;
        return `${filterExpr.operator}${this.exprToString(filterExpr.operand)}`
      }
      case "count": {
        const countExpr = expr as CountExpression;
        return `${this.exprToString(countExpr.operand)} count ${countExpr.filter ? this.exprToString(countExpr.filter) : ''}`;
      }
      case "keep": {
        const keepExpr = expr as KeepExpression;
        let result = `${this.exprToString(keepExpr.operand)} keep`;
        if (keepExpr.amount)
          result += ` ${this.exprToString(keepExpr.amount)}`;
        if (keepExpr.selector)
          result += ` ${keepExpr.selector}`;
        if (keepExpr.filter)
          result += ` ${this.exprToString(keepExpr.filter)}`;
        return result;
      }
      case "drop": {
        const dropExpr = expr as DropExpression;
        let result = `${this.exprToString(dropExpr.operand)} drop`;
        if (dropExpr.amount)
          result += ` ${this.exprToString(dropExpr.amount)}`;
        if (dropExpr.selector)
          result += ` ${dropExpr.selector}`;
        if (dropExpr.filter)
          result += ` ${this.exprToString(dropExpr.filter)}`;
        return result;
      }
    }
  }

}
