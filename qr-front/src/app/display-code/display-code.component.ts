import { Component, ElementRef, Input, ViewChild, HostListener, OnChanges, OnInit, DoCheck } from '@angular/core';
import { QRious } from '../_global/qrious';
import { Code } from '../_global/code';

@Component({
  selector: 'app-display-code',
  templateUrl: './display-code.component.html'
})

export class DisplayCodeComponent implements OnChanges, OnInit, DoCheck {

  private codeInstance: any = {};
  @Input('code') code: Code;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvasContainer') canvasContainer: ElementRef;
  constructor () {

  }
  ngOnChanges () {
    this.updateCode();
  }
  ngOnInit () {
    this.updateSize();
    this.createCode();
  }
  ngDoCheck() {
    this.updateCode();
  }
  onResize() {
    this.updateSize();
  }
  createCode(): void {
    this.codeInstance = new QRious({
      size: this.canvasContainer.nativeElement.offsetWidth,
      element: this.canvas.nativeElement
    });
  }
  updateSize(): void {
    this.codeInstance.size = this.canvasContainer.nativeElement.offsetWidth;
  }
  updateCode(): void {
    this.codeInstance.value = this.code.value;
    for (const option in this.code.options) {
      if (this.code.options.hasOwnProperty(option)) {
        this.codeInstance[option] = this.code.options[option];
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  windowOnResize(event) {
    this.onResize();
  };
}
