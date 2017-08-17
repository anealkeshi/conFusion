import { Injectable } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs/Observable';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular) { }

  // getDishes(): Promise<Dish[]> {
  //   //return Promise.resolve(DISHES);
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES), 2000);
  //   });
  // }
  //
  // getDish(id: number): Promise<Dish> {
  //   //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedDish(): Promise<Dish> {
  //   //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  //   });
  // }

 //  getDishes(): Observable<Dish[]> {
 //   return Observable.of(DISHES).delay(2000);
 // }
 //
 // getDish(id: number): Observable<Dish> {
 //   return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
 // }
 //
 // getFeaturedDish(): Observable<Dish> {
 //   return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
 // }
 //
 // getDishIds(): Observable<number[]> {
 //    return Observable.of(DISHES.map(dish => dish.id ));
 //  }


getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one('dishes',id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
      .catch(error => { return error; } );
  }

}
