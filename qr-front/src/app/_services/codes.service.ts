import { Injectable } from '@angular/core';
import { Code } from '../_global/code';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import * as firebase from 'firebase/app';
import { Http, Headers, Response } from "@angular/http";

import { AuthService } from './index';

@Injectable()
export class CodesService {
  list:FirebaseListObservable<any>;
  cache:Code[];

  constructor (private afDb: AngularFireDatabase, private authService: AuthService) {
    this.authService.userObservable.subscribe(user =>{
      if(user.uid){
        this.list = this.afDb.list('/codes/' + user.uid , {
          query: {
            limitToLast: 50
          }
        });
        this.list.subscribe(codes => this.cache = codes);
      }
    })
  }

  getCodes() {
    return this.list;
  }
  getCode(id:string) {
    if(this.cache){
      let res = this.cache.find( code => code.id === id );
      return Observable.of(this.cache.find( code => code.id === id ));
    }
  }
  saveCode(code){
    this.list.push(code);
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
