import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';
import { ErrorMessage } from '../_global/definitions';

import { ParamsService, ModelUpdateService } from '../_services/index';

import { Code, UrlCodeModel } from '../_global/code';
import { patternWarningWalidator } from '../_global/directives';

const errors = {
  pattern : {
    type: 'err',
    message: 'Your link is incorrect.'
  },
  required : {
    type: 'err',
    message: 'Please, put something in link field.'
  },
  patternWarning : {
    type: 'warn',
    message: 'Http(s) protocol prefix is reccomended.'
  }
};

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html'
})
export class UrlFormComponent {
  urlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  protocolRegexp = /^(http:|ftp:|https:)/;
  urlValue = this.stateService.params['url'] ? decodeURIComponent(this.stateService.params['url']) : '' ;

  form: FormGroup;

  errors: ErrorMessage[] = [];
  warns: ErrorMessage[] = [];

  constructor(
    private modelUpdateService: ModelUpdateService,
    private fb: FormBuilder,
    private paramsService: ParamsService,
    private stateService: StateService) {
    this.createForm();
    this.bingUpdateEvents();
    this.setModel();
  }
  createForm(): void {
    const url =  this.stateService.params['url'] ? decodeURI(this.stateService.params['url']) : '';
    this.form = this.fb.group({
      url: [url, [
        Validators.required,
        Validators.pattern(this.urlRegexp),
        patternWarningWalidator(this.protocolRegexp)
      ]],
    });
  }
  bingUpdateEvents(): void {
    this.paramsService.bindFormParamsUpdate(this.form);
    this.form.valueChanges.subscribe((value: string) => {
      this.errors = [];
      this.warns = [];
      const control = this.form.get('url');
      if (control && !control.valid && control.dirty) {
        for (const err in control.errors) {
          if (control.errors.hasOwnProperty(err)) {
            if (errors[err].type === 'err') {
              this.errors.push(errors[err]);
            } else {
              this.warns.push(errors[err]);
            };
          }
        }
      }
      this.setModel();
    });
  }
  setModel(): void {
    const model = {
      type: 'url',
      url: this.form.value.url
    };
    this.modelUpdateService.modelUpdate(model);
  }
}
