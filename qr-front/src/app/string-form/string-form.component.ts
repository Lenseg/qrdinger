import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';

import { ParamsService, ModelUpdateService } from '../_services/index';

import { ErrorMessage } from '../_global/definitions';
import { Code, StringCodeModel } from '../_global/code';

const errors = {
  required : {
    type: 'err',
    message: 'Please, put something in text field.'
  }
};

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html'
})
export class StringFormComponent {

  form: FormGroup;
  errors: ErrorMessage[] = [];

  constructor(
    private modelUpdateService: ModelUpdateService,
    private fb: FormBuilder,
    private paramsService: ParamsService,
    private stateService: StateService) {
    this.createForm();
    this.bindUpdateEvents();
    this.setModel();
  }
  createForm() {
    const stringValue = this.stateService.params['string'] ? decodeURIComponent(this.stateService.params['string']) : '' ;
    this.form = this.fb.group({
      string: [stringValue, [
        Validators.required
      ]]
    });
    this.setModel();
  }
  bindUpdateEvents(): void {
    this.paramsService.bindFormParamsUpdate(this.form);
    this.form.valueChanges.subscribe((value: string) => {
      this.errors = [];
      const control = this.form.get('string');
      if (control && !control.valid && control.dirty) {
        for (const err in control.errors) {
          if (control.errors.hasOwnProperty(err)) {
            this.errors.push(errors[err]);
          }
        }
      }
      this.setModel();
    });
  }
  setModel(): void {
    const model = {
      type: 'string',
      string: this.form.value.string
    };
    this.modelUpdateService.modelUpdate(model);
  }
}
