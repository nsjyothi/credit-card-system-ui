import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root' })
export class Config {
  environmentBaseUrl = 'http://localhost:8080';

  addCreditCardUrl = '/credit-cards';

  getCreditCardUrl = '/credit-cards';

}
