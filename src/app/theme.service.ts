import {
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  provideAppInitializer
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Provides theming support for the application. Determines the user's theme preference
 * and applies the appropriate theme.
 * @see ThemeService
 */
export function provideTheming(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ThemeService,
    provideAppInitializer(() => {
      const themeService = inject(ThemeService);
      themeService.setTheme(themeService.determineThemePreference());
    })
  ]);
}

@Injectable()
export class ThemeService {

  private _themeChange = new Subject<'dark' | 'light'>();

  get themeChange$(): Observable<'dark' | 'light'> {
    return this._themeChange.asObservable();
  }

  determineThemePreference(): 'dark' | 'light' {
    const storedThemePreference = localStorage.getItem('theme');
    if (storedThemePreference === 'dark' || storedThemePreference === 'light')
      return storedThemePreference;
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      return 'dark';
    return 'light';
  }

  setTheme(theme: 'dark' | 'light'): void {
    if (theme === 'dark' && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this._themeChange.next('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this._themeChange.next('light');
    }
  }

  toggleTheme(): void {
    if (this.determineThemePreference() === 'dark')
      this.setTheme('light');
    else
      this.setTheme('dark');
  }

}
