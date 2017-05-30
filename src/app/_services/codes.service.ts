import { Injectable } from '@angular/core';
import { CodeDefinition } from '../global/typeClasses';

import { Http } from "@angular/http";

@Injectable()
export class CodesService {
  constructor( public http: Http ) {

  }

  cache:Promise<CodeDefinition[]> = null;

  getAllCodes() {
    return this.cache = this.cache || this.http.get('api/codes')
        .map(resp =>  resp.json())
        .toPromise();
  }

  getCode(id:string) {
    function codeMatchesParam(code:CodeDefinition) {
      return code.id === id;
    }

    return this.getAllCodes()
        .then((codes) => {codes.data.find(codeMatchesParam)});
  }
}
