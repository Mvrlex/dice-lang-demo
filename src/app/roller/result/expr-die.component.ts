import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  OnInit,
  viewChild,
  ViewEncapsulation
} from "@angular/core";
import { DieExpression } from "@character-sheets/dice-lang";
import {
  animationFrames as rxAnimationFrames,
  endWith,
  filter,
  map,
  Observable,
  takeWhile
} from "rxjs";

const ANIMATION_MIN_DURATION_MS = 1000;
const ANIMATION_MAX_DURATION_MS = 2500;
const ANIMATION_FRAMERATE = 30;

@Component({
  selector: 'app-expr-die',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (expr().die.length) {
      @case (4) {
        <svg
          style="transform-origin: 18px 21px"
          class="animation-roll-svg"
          width="35.722443"
          height="31.969658"
          viewBox="0 0 35.722443 31.969658"
        >
          <path
            class="fill-white stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-700 group-hover:fill-gray-100 dark:group-hover:fill-gray-800"
            style="stroke-width:1.37526;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
            d="m 25.902596,23.437428 -19.8051924,0 A 1.7201613,1.7201613 60 0 1 4.6077002,20.857186 l 9.9025968,-17.1518 a 1.7201613,1.7201613 2.5219892e-7 0 1 2.979406,0 l 9.902597,17.1518 a 1.7201613,1.7201613 120 0 1 -1.489704,2.580242 z"
            transform="matrix(1.4518052,0,0,1.4567489,-5.3676626,-3.1744944)"
          />
        </svg>
      }
      @case (6) {
        <div
          class="animation-roll w-8 size-full bg-white border-2 border-gray-200 rounded group-hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:group-hover:bg-gray-800"
        ></div>
      }
      @case (8) {
        <svg
          class="animation-roll-svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            class="fill-white stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-700 group-hover:fill-gray-100 dark:group-hover:fill-gray-800"
            style="fill-rule:nonzero;stroke-width:1.83876;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
            transform="matrix(1.0879187,0,0,1.0874667,-1.4066997,-1.3918918)"
            d="m 28.786712,12.413249 0,7.173502 a 6.574277,6.574277 120 0 1 -3.287139,5.693491 l -6.212434,3.586751 a 6.574277,6.574277 180 0 1 -6.574277,0 L 6.5004268,25.280242 A 6.574277,6.574277 60 0 1 3.2132883,19.586751 l -10e-8,-7.173502 A 6.574277,6.574277 120 0 1 6.5004267,6.7197583 L 12.712861,3.1330074 a 6.574277,6.574277 180 0 1 6.574277,-10e-8 l 6.212435,3.5867509 a 6.574277,6.574277 60 0 1 3.287139,5.6934908 z"
          />
        </svg>
      }
      @case (10) {
        <svg
          class="animation-roll-svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            class="fill-white stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-700 group-hover:fill-gray-100 dark:group-hover:fill-gray-800"
            style="stroke-width:1.77525;stroke-linecap:round;stroke-linejoin:round"
            transform="matrix(1.1269034,0,0,1.1172484,-2.0304545,-1.9040939)"
            d="m 28.786712,14.451022 v 3.650758 a 3.8432309,3.8432309 114.79292 0 1 -1.351633,2.926151 l -8.731813,7.43508 a 4.1697233,4.1697233 180 0 1 -5.406532,0 L 4.5649212,21.027932 A 3.8432308,3.8432308 65.207082 0 1 3.2132883,18.101781 l -10e-8,-3.650759 A 3.9704526,3.9704526 114.09009 0 1 4.5362817,11.492061 L 13.354013,3.6026097 a 3.9682449,3.9682449 180 0 1 5.291974,0 l 8.817731,7.8894513 a 3.9704527,3.9704527 65.909908 0 1 1.322994,2.958961 z"
          />
        </svg>
      }
      @case (12) {
        <svg
          class="animation-roll-svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            class="fill-white stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-700 group-hover:fill-gray-100 dark:group-hover:fill-gray-800"
            style="stroke-width:1.75084;stroke-linecap:round;stroke-linejoin:round"
            d="m 27.533881,9.6404477 1.533708,4.7126063 a 5.3094261,5.3094261 89.972626 0 1 0.0016,3.281405 l -1.529205,4.71407 a 5.3094261,5.3094261 125.97263 0 1 -1.927493,2.655634 l -4.008013,2.914918 a 5.3094261,5.3094261 161.97263 0 1 -3.120318,1.015501 l -4.955896,0.0024 A 5.3094261,5.3094261 17.972626 0 1 10.406945,27.924431 L 6.3961492,25.013344 a 5.3094261,5.3094261 53.972626 0 1 -1.93003,-2.653792 L 2.9324111,17.646946 a 5.3094261,5.3094261 89.972626 0 1 -0.00157,-3.281405 L 4.4600478,9.6514714 A 5.3094261,5.3094261 125.97263 0 1 6.3875412,6.9958372 L 10.395554,4.0809188 a 5.3094261,5.3094261 161.97263 0 1 3.120318,-1.015501 l 4.955896,-0.00237 a 5.3094261,5.3094261 17.972626 0 1 3.121287,1.0125191 l 4.010796,2.9110874 a 5.3094261,5.3094261 53.972626 0 1 1.93003,2.6537912 z"
            transform="matrix(1.1264706,0,0,1.1583856,-2.0235586,-2.5341185)"
          />
        </svg>
      }
      @case (20) {
        <svg
          class="animation-roll-svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            class="fill-white stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-700 group-hover:fill-gray-100 dark:group-hover:fill-gray-800"
            style="fill-rule:nonzero;stroke-width:1.83876;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
            transform="matrix(1.0879187,0,0,1.0874667,-1.4066997,-1.3918918)"
            d="m 28.786712,12.413249 0,7.173502 a 6.574277,6.574277 120 0 1 -3.287139,5.693491 l -6.212434,3.586751 a 6.574277,6.574277 180 0 1 -6.574277,0 L 6.5004268,25.280242 A 6.574277,6.574277 60 0 1 3.2132883,19.586751 l -10e-8,-7.173502 A 6.574277,6.574277 120 0 1 6.5004267,6.7197583 L 12.712861,3.1330074 a 6.574277,6.574277 180 0 1 6.574277,-10e-8 l 6.212435,3.5867509 a 6.574277,6.574277 60 0 1 3.287139,5.6934908 z"
          />
        </svg>
      }
      @default {
        <div
          class="animation-roll-blink w-8 size-full bg-white border-2 border-gray-200 group-hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:group-hover:bg-gray-800"
          style="border-radius: 100%"
        ></div>
      }
    }
    <span
      #dieValue
      [style]="expr().die.length === 4 ? 'top: 11px;' : null"
      class="absolute"
    ></span>
  `,
  host: {
    class: 'h-8 relative flex justify-center items-center group text-sm',
    '[style.--animation-time]': 'this.ANIMATION_DURATION + "ms"',
    '[class.animation-roll-dropped]': 'expr().dropped'
  },
  encapsulation: ViewEncapsulation.None,
  styles: `
    $anim-roll: roll var(--animation-time) ease-out;
    $anim-roll-blink: roll-blink 300ms ease-out var(--animation-time);
    $anim-roll-blink-dark: roll-blink-dark 300ms ease-out var(--animation-time);
    $anim-roll-blink-svg: roll-blink-svg 300ms ease-out var(--animation-time);
    $anim-roll-blink-svg-dark: roll-blink-svg-dark 300ms ease-out var(--animation-time);
    $anim-roll-dropped: roll-dropped 300ms ease-out var(--animation-time) forwards;

    .animation-roll {
      animation: $anim-roll, $anim-roll-blink;
    }
    .animation-roll-blink {
      animation: $anim-roll-blink;
    }
    // FIXME @variant dark does not work here for some reason
    // FIXME there is a minor bug where the animation will play again after switching themes
    .animation-roll:where(.dark, .dark *) {
      animation: $anim-roll, $anim-roll-blink-dark;
    }
    .animation-roll-blink:where(.dark, .dark *) {
      animation: $anim-roll-blink-dark;
    }
    .animation-roll-dropped {
      animation: $anim-roll-dropped;
      & .animation-roll-blink {
        animation: none;
      }
      & .animation-roll {
        animation: $anim-roll;
      }
      .animation-roll-svg path {
        animation: none;
      }
    }

    .animation-roll-svg {
      animation: $anim-roll;
    }
    .animation-roll-svg path {
      animation: $anim-roll-blink-svg;
    }
    .animation-roll-svg:where(.dark, .dark *) path {
      animation: $anim-roll-blink-svg-dark;
    }

    @keyframes roll {
      from { transform: rotate(0deg) }
      to { transform: rotate(1080deg) }
    }

    @keyframes roll-blink {
      from { background-color: var(--color-gray-100) }
      to { background-color: var(--color-white) }
    }
    @keyframes roll-blink-dark {
      from { background-color: var(--color-gray-700) }
      to { background-color: var(--color-gray-900) }
    }
    @keyframes roll-blink-svg {
      from { fill: var(--color-gray-100) }
      to { fill: var(--color-white) }
    }
    @keyframes roll-blink-svg-dark {
      from { fill: var(--color-gray-700) }
      to { fill: var(--color-gray-900) }
    }

    @keyframes roll-dropped {
      from { opacity: 100% }
      to { opacity: 50% }
    }
  `
})
export class ExprDieComponent implements AfterViewInit, OnInit {

  expr = input.required<DieExpression>();
  // we get the element directly so we can update the DOM directly without the need for a change detection cycle
  dieValueElement = viewChild.required<ElementRef>('dieValue');

  readonly ANIMATION_DURATION = Math.floor(Math.random() * (ANIMATION_MAX_DURATION_MS - ANIMATION_MIN_DURATION_MS)) + ANIMATION_MIN_DURATION_MS;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (this.expr().die.length < 2) { // if the die has less than 2 sides, we just show the result directly
      this.showDiceValue(this.expr().result);
      return;
    } else { // otherwise we animate the die roll
      this.animateDieRoll(this.expr().die, this.expr().result, {
        animationDurationMs: this.ANIMATION_DURATION,
        animationFramerate: ANIMATION_FRAMERATE
      }).subscribe({
        next: value => {
          this.showDiceValue(value);
        },
        complete: () => {
          this.showDiceValue(this.expr().result);
        }
      });
    }
  }

  animateDieRoll(
    die: number[],
    result: number,
    options: {
      animationDurationMs: number,
      animationFramerate: number
    }
  ): Observable<number> {
    const animationFrames = this.calculateAnimationFrames(die, result, options);
    let previousValue = animationFrames[0].value;
    return rxAnimationFrames().pipe(
      endWith({ elapsed: options.animationDurationMs }),
      takeWhile(({ elapsed }) => elapsed < options.animationDurationMs),
      map(({ elapsed }) => animationFrames.find(({ timestamp }) => timestamp >= elapsed)?.value),
      filter((value): value is number => !!value && value !== previousValue)
    );
  }

  calculateAnimationFrames(
    die: number[],
    result: number,
    options: {
      animationDurationMs: number,
      animationFramerate: number
    }
  ): { timestamp: number, value: number }[] {
    const easingPoints: number[] = Array.from(Array(options.animationFramerate), (_, i) => easeInCubic(i / (options.animationFramerate - 1)));
    const frameTimestamps = easingPoints.map((value, i) => {
      if (i === 0) return 0;
      if (i === options.animationFramerate - 1) return options.animationDurationMs;
      return Math.abs(value * options.animationDurationMs);
    });
    const randomIntermediates = calculateRandomIntermediates(options.animationFramerate, die, result);
    return frameTimestamps.map((timestamp, i) => ({
      timestamp: timestamp,
      value: randomIntermediates[i]
    }));
  }

  showDiceValue(value: number): void {
    (this.dieValueElement().nativeElement as HTMLElement).innerText = value.toString();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }

}

/**
 * Easing function that implements an ease-in cubic curve.
 * @param x value between 0 and 1 representing the progress of the animation
 * @see https://easings.net/
 */
function easeInCubic(x: number): number {
  return x * x * x;
}

/**
 * Calculates a set of random intermediate values for a die roll and makes sure that no
 * value is repeated within a certain limit. Also ensures that the last value in the
 * returned array is the final result of the dice roll.
 *
 * @param amount the amount of random values to generate
 * @param die the die to roll, represented as an array of possible values
 * @param result the final result of the dice roll, will be the last value in the returned array
 */
function calculateRandomIntermediates(amount: number, die: number[], result: number): number[] {
  const recentsLimit = Math.floor(die.length / 2);
  const recents: number[] = [ result ];
  const results: number[] = [ result ];

  while (results.length < amount) {
    let randomValue: number;

    do {
      randomValue = die[Math.floor(Math.random() * die.length)];
    } while (recents.includes(randomValue));

    results.push(randomValue);

    if (recents.length >= recentsLimit)
      recents.shift();
    recents.push(randomValue);
  }

  return results.reverse();
}
