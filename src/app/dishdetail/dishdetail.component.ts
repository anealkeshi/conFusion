import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { baseURL } from '../shared/baseurl';
import { trigger, state, style, animate, transition } from '@angular/animations';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
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
