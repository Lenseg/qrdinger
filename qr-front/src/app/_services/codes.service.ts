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
  cache:any[];

  constructor (private afDb: AngularFireDatabase, private authService: AuthService) {
  }

  getCodes() {
    if(this.authService.checkAuthenticated() && !this.list){
      this.list = this.afDb.list('/codes/' + this.authService.user.uid , {
      });
      this.list.subscribe(codes =>
        this.cache = codes);
    }
    return this.list;
  }
  getCode(id:string) {
    if(this.cache){
      return Observable.of(this.cache.find( code => code.$key === id ));
    } else {
      return this.afDb.object('/codes/' + this.authService.user.uid + '/' + id)
    }
  }
  saveCode(code, key){
    if(key!=='new'){
      this.list.update(key, code.toObj())
    } else {
      this.list.push(code.toObj());
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
