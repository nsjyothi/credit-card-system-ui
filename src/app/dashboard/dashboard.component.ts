import { UtilityService } from './../commons/utility.service';
import { CreditCardService } from '../service/credit.card.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CreditCard } from '../models/CreditCard';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { FormGroup, NgForm, NgModel, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  title = 'Credit Card System';
  creditCard: CreditCard;
  submitted = false;
  integerNumber = '0123456789';
  showTable: boolean;
  showError: boolean;
  name: any;
  creditCardNumber: any;
  creditCardLimit: any;
  displayedColumns: string[] = ['Name', 'Card Number', 'Balance', 'Limit'];
  dataSource: MatTableDataSource<CreditCard> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('creditCardForm') public creditCardForm: NgForm;


  ccForm: FormGroup;

  constructor(private creditCardService: CreditCardService, private utilityService: UtilityService, private fb: FormBuilder) {}


  ngOnInit(): void {
    this.showError=false;
    this.name = new FormControl();
    this.creditCardNumber = new FormControl([Validators.minLength(13)]);
    this.creditCardLimit = new FormControl([Validators.required]);

    this.ccForm = this.fb.group({
      name: this.name,
      creditCardNumber: this.creditCardNumber,
      creditCardLimit: this.creditCardLimit
    });

    this.showTable = false;
    this.getCreditCards();
    this.creditCard = new CreditCard();

    //loading initial data
    const creditCard1 = new CreditCard();
    creditCard1.creditCardNumber = '1111222233334444';
    creditCard1.customerName = 'Alice';
    creditCard1.creditCardLimit = 2000.00;
    creditCard1.balance = -1045.00;
    this.creditCardService.addCreditCard(creditCard1).subscribe();

    const creditCard2 = new CreditCard();
    creditCard2.creditCardNumber = '4444333322221111';
    creditCard2.customerName = 'Bob';
    creditCard2.creditCardLimit = 5000.00;
    creditCard2.balance = 10.24;
    this.creditCardService.addCreditCard(creditCard2).subscribe();

  }

  public hasError = (controlName: string, errorName: string) => {
    console.log('error ', errorName)
    return this.ccForm.controls[controlName].hasError(errorName);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit() { this.submitted = true; }

  addNewCreditCard() {
    this.creditCardService.addCreditCard(this.creditCard).subscribe(response => {
      if (response) {
        this.utilityService.openSnackBar(
          'Success'
        );
        this.getCreditCards();
        this.creditCardForm.reset();
      }

    },
    error => {
      this.utilityService.openSnackBar(
        error.error.message ? error.error.message : 'Service Unavailable, Please Retry Later'
      );
    }
    );
  }

  getCreditCards() {
    this.creditCardService.getCreditCards().pipe(
      map(resp => {
        return resp.body;
      })
    ).subscribe(response => {
      if (response.length > 0) {
        this.showTable = true;
        this.dataSource = new MatTableDataSource<CreditCard>(response);
        this.dataSource.paginator = this.paginator;
      }
     },
     error => {
      this.utilityService.openSnackBar(
        error.error.message ? error.error.message : 'Service Unavailable, Please Retry Later'
      );
    });
  }

  validateCardNumber(e): void {

    if (this.integerNumber.indexOf(e.key) === -1) {
      event.preventDefault();
    }
  }
}
