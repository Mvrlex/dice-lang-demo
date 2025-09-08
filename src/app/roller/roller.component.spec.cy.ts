import { provideTablerIcons } from 'angular-tabler-icons';
import { IconCircleCheck, IconCircleX } from 'angular-tabler-icons/icons';
import { RollerComponent } from './roller.component';

it('should display the comparison result', () => {
  cy.mount(RollerComponent, {
    providers: [
      provideTablerIcons({
        IconCircleX: IconCircleX,
        IconCircleCheck: IconCircleCheck
      })
    ]
  });
  cy.get('[data-testid="input-roll-editor"]').type('3d6 > 20');
  cy.get('[data-testid="button-roll"]').click();
  cy.get('[data-testid="section-roll-result"]').should('contain.text', 'FAILURE');

  cy.get('[data-testid="input-roll-editor"]').type('20 <= 3d6');
  cy.get('[data-testid="button-roll"]').click();
  cy.get('[data-testid="section-roll-result"]').should('contain.text', 'FAILURE');

  cy.get('[data-testid="input-roll-editor"]').type('3d6 > 1');
  cy.get('[data-testid="button-roll"]').click();
  cy.get('[data-testid="section-roll-result"]').should('contain.text', 'SUCCESS');
});
