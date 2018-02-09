import { Component, OnInit, Input } from '@angular/core';
import { TargetState, StateService } from '@uirouter/angular';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/index';

import { ErrorMessage } from '../_global/definitions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  @Input() returnTo: TargetState;
  authenticating: boolean;
  errorMessage: ErrorMessage;
  form: FormGroup;

  constructor(private fb: FormBuilder, private $state: StateService, private authService: AuthService) {
   this.createForm();
  }
  createForm(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegexp)
      ]],
      password: ['', Validators.required],
    });
  }
  login() {
    this.authenticating = true;
    this.authService.loginWithEmail(this.form.value.email, this.form.value.password).catch((error) => {
      this.authenticating = false;
      this.errorMessage = {
        type: 'error',
        message: error.message
      };
    });
  }
}
interface Credentials {
  username: string | null;
  password: string | null;
}
