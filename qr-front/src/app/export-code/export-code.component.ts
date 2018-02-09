import { Component, Input, ElementRef } from '@angular/core';
import { Code } from '../_global/code';
import { ExportCodeService } from '../_services/index';
@Component({
  selector: 'app-export-code',
  templateUrl: './export-code.component.html',
  styleUrls: ['./export-code.component.css']
})
export class ExportCodeComponent {
  @Input('code') code: Code;
  constructor(private exportCodeService: ExportCodeService) { }

  export(type: string) {
    this.exportCodeService.export(this.code, type);
  }
}
