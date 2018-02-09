import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';
import { ErrorMessage } from '../_global/definitions';

import { AuthService } from '../_services/index';

const errors = {
  password: {
    required : {
      type: 'err',
      message: 'Password required'
    }
  },
  passwordConfirm: {
    required : {
      type: 'err',
      message: 'Confirm password'
    },
    match: {
      type: 'err',
      message: 'Passwords doesn\'t match'
    }
  },
  email : {
    required : {
      type: 'err',
      message: 'Email required'
    },
    pattern : {
      type: 'err',
      message: 'Invalid email'
    }
  }
};

@Component({
  selector: 'app-reqister',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


  form: FormGroup;

  passwordErrors: ErrorMessage[] = [];
  passwordWarns: ErrorMessage[] = [];
  emailErrors: ErrorMessage[] = [];
  emailWarns: ErrorMessage[] = [];
  passwordConfirmErrors: ErrorMessage[] = [];
  passwordConfirmWarns: ErrorMessage[] = [];
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
    this.bindUpdateEvents();
  }
  createForm(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegexp)
      ]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: this.isPasswordsAreSame('password', 'passwordConfirm')
    });
  }
  bindUpdateEvents(): void {
    this.form.valueChanges.subscribe((value: string) => {
      for (const controlName in errors) {
        if (errors.hasOwnProperty(controlName)) {
          const control = this.form.get(controlName);
          this[controlName + 'Errors'] = [];
          this[controlName + 'Warns'] = [];
          if (control && control.dirty && !control.valid) {
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
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
    });
  }
  register() {
    this.authService.registerUser(this.form.value.email, this.form.value.password);
  }
  isPasswordsAreSame(passControlName: string, passConfirmControlName: string) {
    return(group: FormGroup) => {
      const passControl = group.get(passControlName);
      const passConfirmControl = group.get(passConfirmControlName);
      if (passConfirmControl.value !== passControl.value) {
        const newErrors = Object.assign(passConfirmControl.errors || {}, {match: true});
        passConfirmControl.setErrors(newErrors);
      } else {
        if (passConfirmControl.errors && passConfirmControl.errors.match) {
          const newErrors = Object.assign(passConfirmControl.errors || {}, {});
          delete newErrors.match;
          passConfirmControl.setErrors(newErrors);
        }
      }
    };
  }
}
