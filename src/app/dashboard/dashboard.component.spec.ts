import { HttpClientModule } from '@angular/common/http';
import { CreditCardSpacingPipe } from './../commons/cc-spacing.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatPaginatorModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { CreditCard } from '../models/CreditCard';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let title: HTMLElement;
  let submitButton: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule],
      declarations: [ DashboardComponent, CreditCardSpacingPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    title = fixture.nativeElement.querySelector('mat-card-title');
  });

  it('component should be defined', ()=> {
    expect(component).toBeDefined();
  });

  it('Check title of the component template ', () => {
    expect(title.textContent).toContain(component.title);
  });

  it('form invalid when empty', () => {
    expect(component.ccForm.valid).toBeFalsy();
});

it('form name field validity', () => {
  let errors = {};
        let name = component.ccForm.controls['name'];
        expect(name.valid).toBeFalsy();

        // name field is required
        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();

        // set a value to name field
        name.setValue("test");
        errors = name.errors || {};
        expect(errors['required']).toBeFalsy();

});

it('form creditCardLimit field validity', () => {
  let errors = {};
        let creditCardLimit = component.ccForm.controls['creditCardLimit'];
        expect(creditCardLimit.valid).toBeFalsy();

        // creditCardLimit field is required
        errors = creditCardLimit.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set a value to creditCardLimit field
        creditCardLimit.setValue(1200.00);
        errors = creditCardLimit.errors || {};
        expect(errors['required']).toBeFalsy();

});

it('form creditCardNumber field validity', () => {
  let errors = {};
        const creditCardNumber = component.ccForm.controls['creditCardNumber'];
        expect(creditCardNumber.valid).toBeFalsy();

        // creditCardLimit field is required
        errors = creditCardNumber.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set a value to creditCardLimit field with correct length less than min length
        creditCardNumber.setValue('44443333222');
        errors = creditCardNumber.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();

        // // Set a value to creditCardLimit field with correct length more than max length
        // creditCardNumber.setValue('44443333222211110000');
        // errors = creditCardNumber.errors || {};
        // expect(errors['required']).toBeFalsy();
        // expect(errors['maxlength']).toBeTruthy();


        // Set a value to creditCardLimit field with correct field length
        creditCardNumber.setValue('4444333322221111');
        errors = creditCardNumber.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();

});

});
