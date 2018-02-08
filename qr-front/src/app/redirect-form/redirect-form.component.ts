import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ParamsService, ModelUpdateService } from '../_services/index';

import { Code } from '../_global/code';
import { ErrorMessage } from '../_global/definitions';
import { patternWarningWalidator } from '../_global/directives';

const errors = {
  path: {
    required: {
      type: 'err',
      message: 'Path cant be empty.'
    },
    pattern: {
      type: 'err',
      message: 'Only alpha-numeric and -_ allowed.'
    },
    unavalible: {
      type: 'err',
      message: 'This url is taken.'
    },
    checking: {
      type: 'warn',
      message: 'Checking avaliblebility.'
    }
  },
  redirect: {
    pattern: {
      type: 'err',
      message: 'Your link is incorrect.'
    },
    required: {
      type: 'err',
      message: 'Please, put something in link field.'
    },
    patternWarning: {
      type: 'warn',
      message: 'Http(s) protocol prefix is reccomended.'
    }
  }
};

@Component({
  selector: 'app-redirect-form',
  templateUrl: './redirect-form.component.html'
})
export class RedirectFormComponent {

  address = 'http://qrdinger.com/';

  urlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  pathEndRegexp = /^[\w\d_-]+$/;
  protocolRegexp = /^(http:|ftp:|https:)/;

  code: Code;

  form: FormGroup;


  pathErrors: ErrorMessage[] = [];
  pathWarns: ErrorMessage[] = [];
  redirectErrors: ErrorMessage[] = [];
  redirectWarns: ErrorMessage[] = [];
  constructor(private modelUpdateService: ModelUpdateService, private paramsService: ParamsService, private fb: FormBuilder, private stateService: StateService, private http: HttpClient) {
    this.createForm();
    this.bindUpdateEvents();
    this.setModel();
  }
  createForm(): void {
    const path = this.stateService.params['path'] ? decodeURI(this.stateService.params['path']) : '',
    redirect = this.stateService.params['redirect'] ? decodeURI(this.stateService.params['redirect']) : '';
    this.form = this.fb.group({
      path: [path, [
        Validators.required,
        Validators.pattern(this.pathEndRegexp),
      ], this.checkIsUrlTaken.bind(this)],
      redirect: [redirect, [
        Validators.required,
        Validators.pattern(this.urlRegexp),
        patternWarningWalidator(this.protocolRegexp)
      ]]
    });
  }
  bindUpdateEvents(): void {
    this.paramsService.bindFormParamsUpdate(this.form);
    this.form.statusChanges.subscribe((value: string) => {
      for (const controlName in errors) {
        if ( errors.hasOwnProperty(controlName))  {
          const control = this.form.get(controlName);
          this[controlName + 'Errors'] = [];
          this[controlName + 'Warns'] = [];
          if (control && control.dirty && !control.valid) {
            for (const key in control.errors) {
              if ( control.errors.hasOwnProperty(key))  {
                const errMessage = errors[controlName][key];
                if (errMessage.type === 'err') {
                  this[controlName + 'Errors'].push(errMessage);
                } else {
                  this[controlName + 'Warns'].push(errMessage);
                }
              }
            }
          }
        }
      }
      this.setModel();
    });
  }
  setModel(): void {
    const model = {
      type: 'redirect',
      address: this.address,
      path: this.form.value.path,
      redirect: this.form.value.redirect
    };
    this.modelUpdateService.modelUpdate(model);
  }
  checkIsUrlTaken(control: AbstractControl) {
    const params = new HttpParams().set('codeid', this.stateService.params.codeId);
    control.setErrors({
      checking: true
    });
    return this.http.get('/testrapi/' + control.value, {
      params
    }).map((res: any) => {
      return res.avalible ? null : { unavalible: true };
    });
  }
}
