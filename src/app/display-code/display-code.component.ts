import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as QRious from 'qrious';
import { CodeOptions } from '../codeOptions';

@Component({
  selector: 'display-code',
  templateUrl: './display-code.component.pug'
})

export class DisplayCodeComponent {

  private code : any;
  @Input('codeOptions') codeOptions : CodeOptions;
  @ViewChild('canvas') el:ElementRef;
  constructor () {

  }
  ngAfterViewInit() {
    this.updateCode();
  }
  ngDoCheck() {
   for(let option in this.codeOptions){
     if(this.codeOptions[option] && this.codeOptions[option] !== this.code[option])
      this.code[option] = this.codeOptions[option]
   }
  //  if(!this.inputSettings.equals(this.previousInputSettings)) {
  //     // inputSettings changed
  //     // some logic here to react to the change
  //     this.previousInputSettings = this.inputSettings;
  //  }
 }
  private initCode(): void {
  }
  public updateCode(): void {
    this.code = new QRious({
      element:this.el.nativeElement,
      value:this.codeOptions.value
    });
  }
}
