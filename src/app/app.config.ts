import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideTablerIcons } from 'angular-tabler-icons';
import {
  IconBrandGithub,
  IconCircleCheck,
  IconCircleX,
  IconDice,
  IconMoonStars,
  IconSun,
  IconX
} from 'angular-tabler-icons/icons';
import { provideTheming } from './theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideTablerIcons({
      IconDice: IconDice,
      IconCircleX: IconCircleX,
      IconCircleCheck: IconCircleCheck,
      IconX: IconX,
      IconBrandGithub: IconBrandGithub,
      IconMoonStars: IconMoonStars,
      IconSun: IconSun
    }),
    provideTheming()
  ]
};
