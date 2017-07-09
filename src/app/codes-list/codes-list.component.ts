import { Component, OnInit, Input } from '@angular/core';
import { Code } from '../_global/code';
import { CodesService } from '../_services/index';
import { Observable } from 'rxjs/Rx';

@Component({
  selector:'codes-list',
  templateUrl:'./codes-list.component.pug'
})

export class CodesListComponent implements OnInit{
  codes: Code[] = [];
  error:any;
  constructor(private codesService:CodesService){
  }
  ngOnInit() { this.getCodes(); }

  getCodes() {
    console.log('get codes')
    this.codesService.getCodes()
                     .subscribe(
                       codes => this.codes = codes,
                       error =>  this.error = error);
  }
}
