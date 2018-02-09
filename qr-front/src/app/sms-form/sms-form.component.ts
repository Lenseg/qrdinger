import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';

import { ParamsService, ModelUpdateService } from '../_services/index';

import { Code } from '../_global/code';
import { ErrorMessage } from '../_global/definitions';
import { patternWarningWalidator } from '../_global/directives';

const errors = {
  number: {
    required : {
      type: 'err',
      message: 'Are you sure number shold be empty?'
    },
    pattern : {
      type: 'err',
      message: 'Please, put some numbers in here'
    },
    patternWarning : {
      type: 'warn',
      message: 'International prefix (+X) is reccomended'
    }
  },
  message : {
    required : {
      type: 'warn',
      message: 'Are you sure message shold be empty?'
    }
  }
};

@Component({
  selector: 'app-sms-form',
  templateUrl: './sms-form.component.html'
})
export class SmsFormComponent {
  code: Code;
  numberRegexp = /[0-9]/;
  statrtsWidthPlusRegexp = /^\+/;

  form: FormGroup;

  messageErrors: ErrorMessage[] = [];
  messageWarns: ErrorMessage[] = [];
  numberErrors: ErrorMessage[] = [];
  numberWarns: ErrorMessage[] = [];
  constructor(
    private modelUpdateService: ModelUpdateService,
    private paramsService: ParamsService,
    private fb: FormBuilder,
    private stateService: StateService) {
    this.createForm();
    this.bindUpdateEvents();
    this.setModel();
  }
  createForm(): void {
    const number =  this.stateService.params['number'] ? decodeURI(this.stateService.params['number']) : '',
    message =  this.stateService.params['message'] ? decodeURI(this.stateService.params['message']) : '';
    this.form = this.fb.group({
      number: [number, [
        Validators.required,
        Validators.pattern(this.numberRegexp),
        patternWarningWalidator(this.statrtsWidthPlusRegexp)
      ]],
      message: [message, Validators.required]
    });
  }
  bindUpdateEvents(): void {
    this.paramsService.bindFormParamsUpdate(this.form);
    this.form.valueChanges.subscribe((value: string) => {
      for (const controlName in errors) {
        if (errors.hasOwnProperty(controlName)) {
          const control = this.form.get(controlName);
          this[controlName + 'Errors'] = [];
          this[controlName + 'Warns'] = [];
          if (control && control.dirty && !control.valid) {
            for (const key in control.errors) {
              if (errors.hasOwnProperty(key)) {
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
    const number = this.form.value.number.replace(/[^+[0-9]]*/g, '');
    const model = {
      type: 'sms',
      number: number,
      message: this.form.value.message
    };
    this.modelUpdateService.modelUpdate(model);
  }
  preventCharInput(e: KeyboardEvent): void {
    const regexp = /[^0-9,+,(,),\-,—,–, ]/g;
    if (regexp.test(e.key)) {
      e.preventDefault();
    }
  }
  filterPaste(e: ClipboardEvent): void {
    setTimeout(() => {
      const regexp = /[^0-9,+,(,),\-,—,–, ]/g;
      const control = this.form.get('number');
      control.setValue(control.value.replace(regexp, ''));
    }, 0);
  }
}
interface SmsParams {
  number?: string;
  message?: string;
}
