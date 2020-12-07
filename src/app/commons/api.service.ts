import { Config } from './../config/config';
import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apibaseurl: string;
  constructor(
    private http: HttpClient, private config: Config) {
    this.apibaseurl = this.config.environmentBaseUrl ;
  }

   get(url: string, httpOptions: any) {
    return this.http.get(
      url,
      {
        observe: 'response',
        params: httpOptions.queryParams ? httpOptions.queryParams : '',
        headers: httpOptions.headers ? httpOptions.headers : ''
      }
    );
  }

  post(url: string, data: any, httpOptions: any) {
    return this.http.post(
      url,
      data,
      {
        observe: 'response',
        params: httpOptions.queryParams ? httpOptions.queryParams : '',
        headers: httpOptions.headers ? httpOptions.headers : ''
      }
    );
  }
}
