import { Component, Input, Inject, ViewChild, ElementRef, OnChanges } from '@angular/core';

import { StateService, UIRouterGlobals } from '@uirouter/angular';

import { CodesService, ParamsService, ModelUpdateService, AuthService } from '../_services/index';

import { Code } from '../_global/code';
import { codeTypes, codeTypesRepresentations } from '../_global/definitions';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ErrorMessage } from '../_global/definitions';

@Component({
  selector: 'app-create-code',
  templateUrl: './create-code.component.html'
})
export class CreateCodeComponent implements OnChanges {
  public code: Code;
  public codeId: string;
  private stateName: string;
  public activeType: string;
  public saving: boolean;
  private codeTypes: any = codeTypes;
  private typesMap: any = codeTypesRepresentations;
  errorMessage: ErrorMessage;
  private modelsCache: any = {};
  constructor (public codesService: CodesService, public modelUpdateService: ModelUpdateService,
    private paramsService: ParamsService, public authService: AuthService,  public stateService: StateService,
     public uiRouterGlobals: UIRouterGlobals) {
    this.codeId = this.stateService.params['codeId'];
    this.code = new Code();
    if (this.codeId !== 'new') {
      this.codesService.getCode(this.codeId).subscribe(code =>
        this.code = new Code(code));
    }
    const currentFormType = uiRouterGlobals.current.name.replace('edit.', '');
    this.activeType = this.typesMap[currentFormType] || null;
    this.modelUpdateService.modelUdpaveEvent.subscribe((data: any) => {
      this.code.model = data;
    });
    this.setOptionsFromParams();
  }

  ngOnChanges() {
    this.setOptionsFromParams();
    if (this.code.type && this.code.type !== this.stateName) {
      this.activeType = this.typesMap[this.code.type];
      this.stateName = this.code.type;
      this.stateService.go(`edit.${this.stateName}`, this.paramsService.createParamsObject(Object.assign({}, this.code.options, this.code.model)));
    }
  }
  public selectForm(type: string): void {
    this.modelsCache[this.activeType] = this.code.model;
    if (this.modelsCache[type]) {
      this.code.model = this.modelsCache[type];
    } else {
      this.code.type = type;
    }
    this.activeType = this.typesMap[type];
    this.setOptionsFromParams();
    this.stateService.go(`edit.${type}`, this.paramsService.createParamsObject(Object.assign({}, this.code.options, this.code.model)));
  };
  setOptionsFromParams() {
    this.code.options.level =  this.stateService.params['level'] ? decodeURIComponent(this.stateService.params['level']) : this.code.options.level;
    this.code.options.foreground =  this.stateService.params['foreground'] ? decodeURIComponent(this.stateService.params['foreground']) : this.code.options.foreground;
    this.code.options.background =  this.stateService.params['background'] ? decodeURIComponent(this.stateService.params['background']) : this.code.options.background;
  }
  saveCode() {
    this.saving = true;
    let promice;
    if (this.codeId === 'new') {
      promice = this.codesService.saveCode(this.code);
      this.codeId = promice.key;
      promice.then((arg) => {
        this.stateService.go(this.stateService.current, {'codeId': this.codeId});
        this.saving = false;
      })
      .catch((error) => {
        this.showError(error);
      });
    } else {
      this.codesService.updateCode(this.code, this.codeId).then((arg) => {
        this.saving = false;
      })
      .catch((error) => {
        this.showError(error);
      });
    }
  }
  showError(error) {
    this.errorMessage = {
      type: 'error',
      message: error.message
    };
  }
}
