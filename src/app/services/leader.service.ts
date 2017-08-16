import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class LeaderService {

  constructor() { }

  // getLeaders() : Promise<Leader[]>{
  //   //return Promise.resolve(LEADERS);
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(LEADERS), 2000);
  //   });
  // }
  //
  // getLeader(id: number): Promise<Leader> {
  //   //return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedLeader(): Promise<Leader> {
  //   //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
  //   });
  // }


  getLeaders() : Observable<Leader[]>{
    return Observable.of(LEADERS).delay(2000);
  }

  getLeader(id: number): Observable<Leader> {
    return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
  }

  getFeaturedLeader(): Observable<Leader> {
    return Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
  }

}
