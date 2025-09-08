import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  CountExpression,
  DiceExpression,
  DieExpression,
  DropExpression,
  FilterOperator,
  KeepExpression,
  MathExpression,
  ReferenceLiteral,
  ResolvedNode
} from "@character-sheets/dice-lang";
import { ExprAsStringComponent } from './expr-as-string.component';
import { ExprDieComponent } from "./expr-die.component";

@Component({
  selector: 'app-expr',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExprDieComponent,
    ExprAsStringComponent
  ],
  template: `
    @if (expr().wasBraced) {
      <div class="text-gray-700 dark:text-gray-400">
        (
      </div>
    }
    @switch (expr().type) {
      @case ("die") {
        <app-expr-die [expr]="asDieExpression()"/>
      }
      @case ("dice") {
        @for (expr of asDiceExpression().rolls; track expr) {
          <app-expr-die [expr]="expr"></app-expr-die>
        }
      }
      @case ("math") {
        @let expr = asMathExpression();
        <app-expr [expr]="expr.left"/>
        <div class="text-gray-700 dark:text-gray-400">
          {{ expr.operator }}
        </div>
        <app-expr [expr]="expr.right"/>
      }
      @case ("count") {
        @let expr = asCountExpression();
        <app-expr [expr]="expr.operand"/>
        <div class="text-gray-700 dark:text-gray-400">
          count
        </div>
        @if (expr.filter) {
          <app-expr [expr]="expr.filter"/>
        }
      }
      @case ("keep") {
        @let expr = asKeepExpression();
        <app-expr [expr]="expr.operand"/>
        <div class="text-gray-700 dark:text-gray-400">
          keep
        </div>
        @if (expr.amount) {
          <app-expr [expr]="expr.amount"/>
        }
        @if (expr.selector) {
          <div class="text-gray-700 dark:text-gray-400">
            {{ expr.selector }}
          </div>
        }
        @if (expr.filter) {
          <app-expr [expr]="expr.filter"/>
        }
      }
      @case ("drop") {
        @let expr = asDropExpression();
        <app-expr [expr]="expr.operand"/>
        <div class="text-gray-700 dark:text-gray-400">
          drop
        </div>
        @if (expr.amount) {
          <app-expr [expr]="expr.amount"/>
        }
        @if (expr.selector) {
          <div class="text-gray-700 dark:text-gray-400">
            {{ expr.selector }}
          </div>
        }
        @if (expr.filter) {
          <app-expr [expr]="expr.filter"/>
        }
      }
      @case ("reference") {
        @let refExpr = asReferenceLiteral();
        <div class="text-gray-700 dark:text-gray-400">
          {{ refExpr.result }}
        </div>
      }
      @case ("filter") {
        @let filterExpr = asFilterOperator();
        <div class="text-gray-700 dark:text-gray-400">
          {{ filterExpr.operator }}
        </div>
        <app-expr [expr]="filterExpr.operand"/>
      }
      @default {
        <app-expr-as-string [expr]="expr()"/>
      }
    }
    @if (expr().wasBraced) {
      <div class="text-gray-700 dark:text-gray-400">
        )
      </div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class ExprComponent {

  expr = input.required<ResolvedNode>();

  asDieExpression(): DieExpression {
    return this.expr() as DieExpression;
  }

  asDiceExpression(): DiceExpression {
    return this.expr() as DiceExpression;
  }

  asMathExpression(): MathExpression {
    return this.expr() as MathExpression;
  }

  asCountExpression(): CountExpression {
    return this.expr() as CountExpression;
  }

  asKeepExpression(): KeepExpression {
    return this.expr() as KeepExpression;
  }

  asDropExpression(): DropExpression {
    return this.expr() as DropExpression;
  }

  asReferenceLiteral(): ReferenceLiteral {
    return this.expr() as ReferenceLiteral;
  }

  asFilterOperator(): FilterOperator {
    return this.expr() as FilterOperator;
  }

}
