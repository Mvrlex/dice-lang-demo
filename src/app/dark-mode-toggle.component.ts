import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TablerIconComponent } from 'angular-tabler-icons';
import { map, startWith } from 'rxjs';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-dark-mode-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TablerIconComponent
  ],
  template: `
    <button
      (click)="toggleDarkMode()"
      type="button"
      class="btn btn-tertiary"
      [attr.aria-label]="isDarkMode() ? 'Enable light mode' : 'Enable dark mode'"
    >
      <i-tabler [name]="isDarkMode() ? 'moon-stars' : 'sun'" class="icon"/>
    </button>
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class DarkModeToggleComponent {

  isDarkMode: Signal<boolean>;

  constructor(
    private readonly themeService: ThemeService
  ) {
    this.isDarkMode = toSignal(themeService.themeChange$.pipe(
      startWith(themeService.determineThemePreference()),
      map(theme => theme === 'dark')
    ), { requireSync: true });
  }

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

}
