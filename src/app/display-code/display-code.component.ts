import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as QRious from 'qrious';
import { Code, CodeOptions} from '../global/typeClasses';

@Component({
  selector: 'display-code',
  templateUrl: './display-code.component.pug',
  // styleUrls: ['./display-code.component.less']
  host:{
    '(window:resize)':'onResize()'
  }
})

export class DisplayCodeComponent {

  private codeInstance : any = {};
  @Input('code') code : Code;
  codeOptions : CodeOptions = {};
  @ViewChild('canvas') canvas:ElementRef;
  @ViewChild('canvasContainer') canvasContainer:ElementRef;
  constructor () {

  }
  ngOnChanges(){
    this.updateCode();
  }
  ngOnInit(){
    this.codeOptions = {

    };
    this.updateSize();
    this.createCode();
  }
  ngDoCheck() {
    for(var option in this.code){
        this.codeInstance[option] = this.code[option];
    }
  }
  onResize(){
    this.updateSize();
    this.updateCode();
  }
  createCode(): void {
      this.codeInstance = new QRious({
        size:this.canvasContainer.nativeElement.offsetWidth,
        element:this.canvas.nativeElement
      });
  }
  updateSize(): void {
    this.codeInstance.size = this.canvasContainer.nativeElement.offsetWidth;
  }
  updateCode() : void {
    for(var option in this.code){
        this.codeInstance[option] = this.code[option];
    }
  }
}
