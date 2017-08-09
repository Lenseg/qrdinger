import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/index';

import { ErrorMessage } from '../_global/definitions';
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  errorMessage: ErrorMessage;
  form:FormGroup;
  constructor(private fb:FormBuilder, private authService: AuthService) {
   this.createForm();
  }
  createForm():void{
    this.form = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.pattern(this.emailRegexp)
      ]]
    });
  }
  resetPass() {
    this.authService.resetPass(this.form.value.email)
  }
}
