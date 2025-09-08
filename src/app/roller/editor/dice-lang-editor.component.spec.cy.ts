import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createOutputSpy } from 'cypress/angular';
import { DiceLangEditorComponent } from './dice-lang-editor.component';

it('should accept input', () => {
  cy.mount(DiceLangEditorComponent);
  cy.get('[contenteditable="true"]').type('2d6');
  cy.get('[contenteditable="true"]').should('have.text', '2d6');
});

it('should provide autocompletion', () => {
  cy.mount(DiceLangEditorComponent);
  cy.get('[contenteditable="true"]').focus().type('{ctrl}{ }');
  cy.get('.cm-tooltip')
    .should('contain.text', 'd20')
    .should('contain.text', 'd12')
    .should('contain.text', 'd10')
    .should('contain.text', 'd8')
    .should('contain.text', 'd6')
    .should('contain.text', 'd4');
  cy.get('[contenteditable="true"]').focus().type('{ctrl}{ }').type('{downArrow}{enter}');
  cy.get('[contenteditable="true"]').should('have.text', 'd12');
});

it('should autocomplete references', () => {
  cy.mount(DiceLangEditorComponent);
  cy.get('[contenteditable="true"]').focus().type('@');
  cy.get('.cm-tooltip').should('contain.text', '@strength');
  cy.get('[contenteditable="true"]').focus().type('str{enter}', { delay: 100 });
  cy.get('[contenteditable="true"]').should('have.text', '@strength');
});

it('using template driven form should disable form and editor', () => {
  cy.mount(`
      <app-dice-lang-editor [ngModel]="'test value'" name="value" [disabled]="true"/>
    `, {
    imports: [
      DiceLangEditorComponent,
      FormsModule
    ]
  });
  cy.get('[contenteditable="false"]').should('have.text', 'test value');
});

describe('using reactive form', () => {

  beforeEach(() => {
    cy.mount(`
      <form [formGroup]="form" (ngSubmit)="submitted.emit(form.value)">
        <app-dice-lang-editor formControlName="value"/>
      </form>
    `, {
      imports: [
        DiceLangEditorComponent,
        FormsModule,
        ReactiveFormsModule
      ],
      componentProperties: {
        form: new FormGroup({
          value: new FormControl('test value')
        }),
        submitted: createOutputSpy<void>('submittedSpy')
      }
    }).then(wrapper => {
      cy.wrap(wrapper.component.form).as('form');
    });
  })

  it('should display value from form', () => {
    cy.get('[contenteditable="true"]').should('have.text', 'test value');
  });

  it('should update and dirty form', () => {
    cy.get('[contenteditable="true"]').type(' changed');
    cy.get('[contenteditable="true"]').should('have.text', 'test value changed');
    cy.get('@form').should('have.property', 'dirty', true);
    cy.get('@form').should('have.property', 'value').and('deep.equal', { value: 'test value changed' });
  });

  it('should set form touched', () => {
    cy.get('[contenteditable="true"]').focus().blur();
    cy.get('@form').should('have.property', 'touched', true);
  })

  it('should submit form when enter is pressed', () => {
    cy.get('[contenteditable="true"]').type(' changed{enter}');
    cy.wait(100);
    cy.get('@submittedSpy').should('have.been.calledWith', {
      value: 'test value changed'
    });
  });

});
