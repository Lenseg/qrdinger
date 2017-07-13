import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as QRious from 'qrious';
import { Code } from '../_global/code';

@Component({
  selector: 'display-code',
  templateUrl: './display-code.component.html',
  host:{
    '(window:resize)':'onResize()'
  }
})

export class DisplayCodeComponent {

  private codeInstance : any = {};
  @Input('code') code : Code;
  @ViewChild('canvas') canvas:ElementRef;
  @ViewChild('canvasContainer') canvasContainer:ElementRef;
  constructor () {

  }
  ngOnChanges(){
    this.updateCode();
  }
  ngOnInit(){
    this.updateSize();
    this.createCode();
  }
  ngDoCheck() {
    this.updateCode();
  }
  onResize(){
    this.updateSize();
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
    this.codeInstance.value = this.code.value;
    for(var option in this.code.options){
        this.codeInstance[option] = this.code.options[option];
    }
  }
}
