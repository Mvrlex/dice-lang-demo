import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { JsonEditorComponent } from './roller/editor/json-editor.component';
import { RollerContextService } from './roller/roller-context.service';
import { TryItEditorComponent } from './try-it-editor.component';

@Component({
  selector: 'app-documentation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      dice-lang is a small language for rolling dice in a tabletop role-playing game. It
      is designed to be intuitive and easy to use, so anyone can pick it up and start
      playing immediately.
    </p>
    <p>
      Give it a try by entering a roll expression in the input field at the bottom of your
      screen. You can find a quick reference of the language below.
    </p>
    <hr/>

    <h2 class="heading-primary">
      <a id="rolling-dice" href="#rolling-dice">
        Rolling dice
      </a>
    </h2>
    <p>
      A die is rolled using the <code class="code-inline">d</code>
      operator.
    </p>
    <app-try-it-editor value="d20"/>
    <p>
      By default a single die is rolled. You can roll multiple dice by specifying an
      amount in front of the <code class="code-inline">d</code>
      operator.
    </p>
    <app-try-it-editor value="4d6"/>
    <p>
      Both the amount and the number of sides can be any integer.
    </p>
    <hr/>

    <h2 class="heading-primary">
      <a id="math" href="#math">
        Math
      </a>
    </h2>
    <p>
      You can use standard math notation together with dice rolls. The language supports
      the following operators:
    </p>
    <ul class="space-y-1 list-disc list-inside">
      <li>
        <code class="code-inline">+</code>: Addition.
      </li>
      <li>
        <code class="code-inline">-</code>: Subtraction.
      </li>
      <li>
        <code class="code-inline">*</code>: Multiplication.
      </li>
      <li>
        <code class="code-inline">/</code>: Integer division.
      </li>
      <li>
        <code class="code-inline">%</code>: Remainder division.
      </li>
    </ul>
    <p>
      Decimal numbers are not supported, division will always round down to the nearest
      whole number.
    </p>
    <app-try-it-editor value="(2d6 + 4) / 3"/>
    <p>
      Rolls will always be summed up before applying any math operations.
    </p>
    <hr/>

    <h2 class="heading-primary">
      <a id="comparison" href="#comparison">
        Comparison
      </a>
    </h2>
    <p>
      Sometimes to determine the success of your roll you need to compare it to another
      value. You can do this using a comparison operator.
    </p>
    <app-try-it-editor value="d20 > 10"/>
    <p>
      The following comparison operators are supported:
    </p>
    <ul class="space-y-1 list-disc list-inside">
      <li>
        <code class="code-inline">></code>: Greater than.
      </li>
      <li>
        <code class="code-inline"><</code>: Less than.
      </li>
      <li>
        <code class="code-inline">>=</code>: Greater than or equal.
      </li>
      <li>
        <code class="code-inline"><=</code>: Less than or equal.
      </li>
      <li>
        <code class="code-inline">==</code>: Equal.
      </li>
      <li>
        <code class="code-inline">!=</code>: Not equal.
      </li>
    </ul>
    <hr/>

    <h2 class="heading-primary">
      <a id="filtering" href="#filtering">
        Filtering
      </a>
    </h2>
    <p>
      The most powerful feature of dice-lang is filtering. You can filter the results of a
      dice roll using <code class="code-inline">keep</code> or
      <code class="code-inline">drop</code>, to hold onto, or
      remove dice from the result respectively.
    </p>
    <p>One of the most common filters would be:</p>
    <app-try-it-editor value="4d6 keep highest" class="mb-3"/>
    <p>
      Which exactly states what it does: roll four six-sided dice and keep the highest
      result.
    </p>
    <p>
      Filtering can be further customized using three options:
    </p>
    <ul class="space-y-1 mb-4 list-disc list-inside">
      <li>
        <span class="text-gray-900 dark:text-white">amount</span>: How many dice to keep
        or drop.
      </li>
      <li>
        <span class="text-gray-900 dark:text-white">selector</span>: Whether to keep or
        drop the highest or lowest die.
      </li>
      <li>
        <span class="text-gray-900 dark:text-white">comparator</span>: A condition that a
        die must match to be kept or dropped.
      </li>
    </ul>
    <p>
      A full filter expression could look like this:
    </p>
    <app-try-it-editor value="4d6 keep 2 highest >3"/>
    <p>
      Be aware that the order of these options matters.<br>
      This would not work:
    </p>
    <app-try-it-editor value="3d10 drop lowest 2"/>
    <p>
      If you meant to drop the two lowest dice, you have to write:
    </p>
    <app-try-it-editor value="3d10 drop 2 lowest"/>

    <h3 class="heading-secondary">
      <a id="amount" href="#amount">
        Amount
      </a>
    </h3>
    <p>
      You can specify how many dice to keep or drop by providing a number after
      <code class="code-inline">keep</code> or
      <code class="code-inline">drop</code>. Without a
      <a class="font-bold" href="#selector">selector</a> this will randomly
      pick the dice to keep or drop.
    </p>
    <app-try-it-editor value="10d4 keep 4"/>

    <h3 class="heading-secondary">
      <a id="selector" href="#selector">
        Selector
      </a>
    </h3>
    <p>
      The selector is a keyword that identifies a specific die to keep or drop. Currently
      you can use <code class="code-inline">highest</code> or
      <code class="code-inline">lowest</code>.
    </p>
    <app-try-it-editor value="2d20 keep highest"/>
    <p>
      You can also combine the selector with an amount:
    </p>
    <app-try-it-editor value="4d6 keep 3 highest"/>

    <h3 class="heading-secondary">
      <a id="comparator" href="#comparator">
        Comparator
      </a>
    </h3>
    <p>
      You can also filter using a comparison that the die must match in order to be kept
      or dropped. Comparators use the same operators as
      <a href="#comparison" class="font-bold">comparisons</a>, but are written without
      the left-hand side.
    </p>
    <app-try-it-editor value="8d12 keep >6"/>
    <p>
      You can also combine a comparator with an amount and/or selector:
    </p>
    <app-try-it-editor value="4d20 drop 2 lowest <=10"/>

    <h3 class="heading-secondary">
      <a id="combining-filters" href="#combining-filters">
        Combining filters
      </a>
    </h3>
    <p>
      You can also use multiple filters in a single expression:
    </p>
    <app-try-it-editor value="4d6 keep lowest keep highest"/>
    <p>
      This would, as you might expect, keep the lowest and highest die of the roll.
    </p>
    <p>
      Filters will always be applied in the order they are written, and on the same
      set of dice, not on the result of the previous filter.
    </p>

    <h3 class="heading-secondary">
      <a id="combining-keep-and-drop" href="#combining-keep-and-drop">
        Combining keep and drop ⚠️
      </a>
    </h3>
    <p>
      Be careful when combining <code class="code-inline">keep</code>
      and <code class="code-inline">drop</code>, as this can lead to
      an ambiguous expression.
    </p>
    <app-try-it-editor value="4d6 drop lowest keep highest"/>
    <p>
      This expression is ambiguous, as it makes no statement about what to do with the
      dice that are neither the lowest nor the highest. For the language, using
      <code class="code-inline">drop</code> implies that the
      rest of the dice are kept, so
      <code class="code-inline">keep highest</code>
      does nothing, as all remaining dice are kept anyway.
    </p>
    <p>
      Unfortunately this kind of ambiguity cannot be detected automatically. You have to
      make sure that your filter does not allow for this kind of ambiguity yourself.
    </p>
    <p>
      This would be an example of a non-ambiguous combination:
    </p>
    <app-try-it-editor value="4d6 keep >3 drop highest"/>
    <p>
      But you could have also just written
      <code class="code-inline">4d6 drop highest >3</code>.
    </p>
    <hr/>

    <h2 class="heading-primary">
      <a id="counting" href="#counting">
        Counting
      </a>
    </h2>
    <p>
      You can count the number of results that match a certain condition using
      <code class="code-inline">count</code>. Counting accepts a
      <a href="#comparator" class="font-bold">comparator</a> to only count dice that match
      the condition.
    </p>
    <app-try-it-editor value="4d6 count >3"/>
    <p>
      This will count the number of dice that rolled greater than 3.
    </p>
    <p>
      You can also count the number of remaining dice from a previous roll by not
      providing a filter condition.
    </p>
    <app-try-it-editor value="4d6 keep >3 count"/>
    <p>
      Would provide the same result as the previous example.
    </p>
    <hr/>

    <h2 class="heading-primary">
      <a id="references" href="#references">
        References
      </a>
    </h2>
    <p>
      You can reference values outside of the dice roller like your characters ability
      scores using <code class="code-inline">&#64;</code>.
      These have to be defined in the context of the roller you are using. For this demo
      the following references are used:
    </p>
    <app-json-editor disabled [value]="context()" class="rounded-lg"/>
    <p>
      You can reference them like this:
    </p>
    <app-try-it-editor value="d20 + @strength"/>

    <div hidden>
      <h2 class="heading-primary">
        Modifying a roll
        <code class="text-sm">(not implemented)</code>
      </h2>
      <p>
        Often when playing you will want to modify a roll after seeing the result. A lot
        of different systems have rules for this. Defining all possible conditions where
        this can happen beforehand will become messy quickly. Instead, dice-lang allows
        you
        to modify a roll using its user interface.
      </p>
      <p>
        After a roll is made, right-click on the die you want to change. You can then
        choose what action to take on that die. You can also select multiple dice by
        holding down <code class="code-inline">ctrl</code> while
        clicking.
      </p>
      <p>
        This way dice-lang can support any kind of modification, without having to
        implement
        a complex syntax for it. It is also the most intuitive way to modify a roll, as it
        mimics how you would do it at a real table.
      </p>

      <h2 class="heading-primary">
        Lists
        <code class="text-sm">(not implemented)</code>
      </h2>
      <p>
        You can create your own lists of numbers using square brackets
        <code class="code-inline">[ ]</code>. Lists can contain
        numbers and ranges of numbers. Ranges are created using
        <code class="code-inline">..</code>.
      </p>
      <p>
        Lists can be used in place of a filter, or to create custom dice.
      </p>

      <h2 class="heading-primary">
        Variables
        <code class="text-sm">(not implemented)</code>
      </h2>
      <p>
        By using the assignment operator <code
        class="rounded-md bg-gray-800 p-1 py-0.5 px-2">=</code>
        you can store the result of a roll in a variable. Variables can be used in
        subsequent rolls using <code class="code-inline">&#64;</code>.
      </p>
      <p>
        Variable names are also displayed in the roll result, so you can use them as
        labels.
      </p>

      <h2 class="heading-primary">
        Conditional rolls
        <code class="text-sm">(not implemented)</code>
      </h2>

      <h2 class="heading-primary">
        Loops
        <code class="text-sm">(not implemented)</code>
      </h2>
    </div>
  `,
  imports: [
    TryItEditorComponent,
    JsonEditorComponent
  ],
  host: { class: 'block' }
})
export class DocumentationComponent {

  context: Signal<string>;

  constructor(
    context: RollerContextService
  ) {
    this.context = computed(() => JSON.stringify(context.value(), null, 2));
  }

}
