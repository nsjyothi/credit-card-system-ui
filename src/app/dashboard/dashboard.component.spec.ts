import { HttpClientModule } from '@angular/common/http';
import { CreditCardSpacingPipe } from './../commons/cc-spacing.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatPaginatorModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
 import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let title: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
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
  })
  it('Check title of the component template ', () => {
    expect(title.textContent).toContain(component.title);
  });

});
