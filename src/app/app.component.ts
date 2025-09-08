import { Component } from '@angular/core';
import { TablerIconComponent } from 'angular-tabler-icons';
import { DarkModeToggleComponent } from './dark-mode-toggle.component';
import { Die3dComponent } from './die-3d.component';
import { DocumentationComponent } from './documentation.component';
import { RollerComponent } from './roller/roller.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="block max-w-[36em] mx-auto px-4">
      <div class="h-screen max-h-[800px] py-4">
        <div class="flex justify-between gap-2">
          <a href="https://github.com/Mvrlex/dice-lang" class="btn btn-tertiary">
            <i-tabler name="brand-github" class="icon"/>
            GitHub
          </a>
          <app-dark-mode-toggle/>
        </div>
        <div class="flex flex-col items-center justify-center h-full">
          <app-die-3d class="mb-4"/>
          <h1 class="heading-main">
            <span class="underline underline-offset-6 decoration-6 decoration-blue-400 dark:decoration-blue-500">dice</span>-lang
          </h1>
          <p class="text-xl">
            The simple dice&nbsp;rolling&nbsp;language.
          </p>
        </div>
      </div>
      <app-documentation class="pb-4"/>
    </div>
    <div
      class="w-full sticky bottom-0 left-0 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700"
      style="box-shadow: rgba(0, 0, 0, 0.35) 0 7px 29px 0;"
    >
      <div class="max-w-[36em] mx-auto">
        <app-roller class="p-6"/>
      </div>
    </div>
  `,
  imports: [
    DocumentationComponent,
    RollerComponent,
    TablerIconComponent,
    DarkModeToggleComponent,
    Die3dComponent
  ]
})
export class AppComponent { }
