import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as QRious from 'qrious';
import { CodeOptions } from '../code-options-model';

@Component({
  selector: 'display-code',
  templateUrl: './display-code.component.pug',
  // styleUrls: ['./display-code.component.less']
  host:{
    '(window:resize)':'onResize()'
  }
})

export class DisplayCodeComponent {

  private code : any = {};
  @Input('codeOptions') codeOptions : CodeOptions;
  @ViewChild('canvas') canvas:ElementRef;
  @ViewChild('canvasContainer') canvasContainer:ElementRef;
  constructor () {

  }
  ngOnChanges(){
    console.log('changes')
    this.updateCode();
  }
  ngOnInit(){
    Object.assign(this.codeOptions, {
        element:this.canvas.nativeElement
    });
    this.updateSize();
    this.createCode();
  }
  ngDoCheck() {
   for(let option in this.codeOptions){
     if(this.codeOptions[option] && this.codeOptions[option] !== this.code[option])
      this.code[option] = this.codeOptions[option]
   }
  }
  onResize(){
    this.updateSize();
    this.updateCode();
  }
  createCode(): void {
      this.code = new QRious(
        this.codeOptions
      );
  }
  updateSize(): void {
    this.codeOptions.size = this.canvasContainer.nativeElement.offsetWidth;
  }
  updateCode() : void {
    for(var option in this.codeOptions){
      this.code[option] = this.codeOptions[option];
    }
  }
}
