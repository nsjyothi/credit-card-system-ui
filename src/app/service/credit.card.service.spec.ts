import { ApiService } from './../commons/api.service';
import { CreditCardService } from './credit.card.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { CreditCard } from '../models/CreditCard';



describe('CreditCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [CreditCardService]
    });
  });

// testing fetching credit cards
  it('should fetch all credit cards from api', inject([CreditCardService, ApiService], (service: CreditCardService, apiService: ApiService) => {

    const creditCards = [];
    const creditCard1 = new CreditCard();
    creditCard1.id = 1;
    creditCard1.creditCardNumber = '4444333322221111';
    creditCard1.customerName = 'Jyothi';
    creditCard1.creditCardLimit = 1200.00;
    creditCard1.balance = 100.00;

    const creditCard2 = new CreditCard();
    creditCard2.id = 2;
    creditCard2.creditCardNumber = '4444333322221210';
    creditCard2.customerName = 'Sunil';
    creditCard2.creditCardLimit = 800.00;
    creditCard2.balance = 700.00;

    creditCards.push(creditCard1);
    creditCards.push(creditCard2);

    let response;

    spyOn(apiService, 'get').and.returnValue(creditCards);


    response = service.getCreditCards();
    expect(response).toEqual(creditCards);
  }));

  // testing adding a credit card
  it('should add a credit card ', inject([CreditCardService, ApiService], (service: CreditCardService, apiService: ApiService) => {

    const inputCreditCard = new CreditCard();
    inputCreditCard.creditCardNumber = '4335887854132220';
    inputCreditCard.customerName = 'Jyothi';
    inputCreditCard.creditCardLimit = 1200.00;

    const creditCard1 = new CreditCard();
    creditCard1.id = 1;
    creditCard1.creditCardNumber = '4444333322221111';
    creditCard1.customerName = 'Jyothi';
    creditCard1.creditCardLimit = 1200.00;
    creditCard1.balance = 100.00;

    spyOn(apiService, 'post').and.returnValue(creditCard1);

    let response;
        response = service.addCreditCard(inputCreditCard);

    expect(response).toEqual(creditCard1);

  }));
});
