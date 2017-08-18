import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { baseURL } from '../shared/baseurl';
import { visibility, flyInOut, expand } from '../animations/app.animation';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
            visibility(),
            flyInOut(),
            expand()
  ],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  }
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  dishErrMess: string;
  visibility = 'shown';
  errMess : string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private BaseURL) { }

    ngOnInit() {
      this.dishservice.getDishIds()
                      .subscribe(dishIds => this.dishIds = dishIds,
                                errmess => this.dishErrMess = <any>errmess);
      this.route.params
        .switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
        .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);  this.visibility = 'shown'; },
          errmess => { this.dish = null; this.errMess = <any>errmess; });
    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }

  goBack(): void {
    this.location.back();
  }
}
