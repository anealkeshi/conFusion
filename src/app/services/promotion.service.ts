import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromotionService {

  constructor(private http: Http,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getPromotions(): Promise<Promotion[]> {
  //   //return Promise.resolve(PROMOTIONS);
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(PROMOTIONS), 2000);
  //   });
  // }
  //
  // getPromotion(id: number): Promise<Promotion> {
  //   //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedPromotion(): Promise<Promotion> {
  //   //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
  //   });
  // }

  // getPromotions(): Observable<Promotion[]> {
  //   return Observable.of(PROMOTIONS).delay(2000);
  // }
  //
  // getPromotion(id: number): Observable<Promotion> {
  //   return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000);
  // }
  //
  // getFeaturedPromotion(): Observable<Promotion> {
  //   return Observable.of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).delay(2000);
  // }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.http.get(baseURL + 'promotions/'+ id)
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
                    .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}
