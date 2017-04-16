import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject'

@Injectable()
export class CreateCodeService {
  codeValue = new Subject<string>();
  codeValueUdpaveEvent = this.codeValue.asObservable();
  codeValueUpdate (data:string){
    this.codeValue.next(data);
  }
}
