import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/index';

import { ErrorMessage } from '../_global/definitions';
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html'
})
export class ForgotPassComponent {
  emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  errorMessage: ErrorMessage;
  form: FormGroup;
  loading: boolean;
  constructor(private fb: FormBuilder, private authService: AuthService) {
   this.createForm();
  }
  createForm(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegexp)
      ]]
    });
  }
  resetPass() {
    this.loading = true;
    this.authService.resetPass(this.form.value.email).then(() => {
      this.loading = false;
      this.errorMessage = {
        type: 'success',
        message: 'Reset email has been sent.'
      };
    }).catch((error: any) => {
      this.loading = false;
      this.errorMessage = {
        type: 'error',
        message: error.message
      };
    });
  }
}
