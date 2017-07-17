import { Injectable } from '@angular/core';
import { Code } from '../_global/code';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import * as firebase from 'firebase/app';
import { Http, Headers, Response } from "@angular/http";

@Injectable()
export class CodesService {
  private url = 'http://localhost:3001/api/codes/';
  private database = firebase.database();
  constructor (private http: Http) {}
  request:Observable<any>
  cache:Code[];

  getCodes() {
    if(this.cache){
      return Observable.of(this.cache);
    } else if(this.request) {
      return this.request;
    } else {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.request = this.http.get(this.url, {
        headers: headers
      })
      .map((resp) => this.cache = resp.json() || {})
      .catch(this.handleError);
      return this.request;
    }
  }
  getCode(id:string) {
    if(this.cache){
      let res = this.cache.find( code => code.id === id );
      return Observable.of(this.cache.find( code => code.id === id ));
    } else {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let request = this.http.get(`${this.url}/${id}`,{
         headers: headers
       })
      .map(resp =>  resp.json() || {})
      .catch(this.handleError);
      return request;
    }
  }
  private handleError (error: Response | any) {
    // TODO remote loggingr
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
