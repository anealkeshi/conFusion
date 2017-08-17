import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs/Observable';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeaderService {

  constructor(private http: Http,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

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


  // getLeaders() : Observable<Leader[]>{
  //   return Observable.of(LEADERS).delay(2000);
  // }
  //
  // getLeader(id: number): Observable<Leader> {
  //   return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
  // }
  //
  // getFeaturedLeader(): Observable<Leader> {
  //   return Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
  // }

  getLeaders() : Observable<Leader[]>{
    return this.http.get(baseURL + 'leaders')
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getLeader(id: number): Observable<Leader> {
    return  this.http.get(baseURL + 'leaders/'+ id)
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
                    .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}
