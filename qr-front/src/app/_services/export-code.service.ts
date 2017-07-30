import { Injectable } from '@angular/core';

@Injectable()
export class ExportCodeService {
  public types: string[] = ['png', 'svg', 'jpeg'];
  constructor() {

  }
  export(canvas, type){
    console.log(canvas, type);
  }
}
