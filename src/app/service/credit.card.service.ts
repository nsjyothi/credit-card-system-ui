import { Config } from '../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../commons/api.service';
import { CreditCard } from '../models/CreditCard';
@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  constructor(private apiService: ApiService, private config: Config){}
  addCreditCard(creditCard: CreditCard):Observable<any> {
    return this.apiService.post(this.config.environmentBaseUrl+this.config.addCreditCardUrl, creditCard, {queryParams: null})
  }

  getCreditCards(): Observable<any> {
  return this.apiService.get(this.config.environmentBaseUrl+this.config.getCreditCardUrl, {queryParams: null});
  }
}
