import { Component, OnInit, Input } from '@angular/core';
import { Code } from '../_global/code';
import { CodesService } from '../_services/index';
import { Observable } from 'rxjs/Rx';

@Component({
  selector:'codes-list',
  templateUrl:'./codes-list.component.html'
})

export class CodesListComponent implements OnInit{
  codes: Code[] = [];
  error:any;
  constructor(private codesService:CodesService){
  }
  ngOnInit() { this.getCodes(); }

  getCodes() {
    this.codesService.getCodes()
                     .subscribe(
                       codes => {
                          codes.forEach((code)=>{
                            this.codes.push(new Code(code))
                          })
                       },
                       error =>  this.error = error);
  }
}
