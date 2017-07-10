import { Injectable } from '@angular/core';
import { DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(){
    return DISHES;
  }

}
