import { Component, Input, ElementRef } from '@angular/core';

import { ExportCodeService } from '../_services/index'
@Component({
  selector: 'export-code',
  templateUrl: './export-code.component.html',
  styleUrls: ['./export-code.component.css']
})
export class ExportCodeComponent {
  @Input('canvas') canvas : ElementRef;
  constructor(private exportCodeService:ExportCodeService) { }

  export(type:string){
    this.exportCodeService.export(this.canvas, type);
  }

}
