import { Component, OnInit, Input } from '@angular/core';
import { TargetState, StateService } from 'ui-router-ng2';
import { AuthService, AppConfigService } from '../_services/index';

import { ErrorMessage } from '../_global/definitions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug'
})
export class LoginComponent {
  @Input() returnTo: TargetState;
  username:string;
  credentials:credentials = { username: null, password: null };
  authenticating: boolean;
  errorMessage: ErrorMessage;

  constructor(appConfig: AppConfigService,
              private authService: AuthService,
              private $state: StateService
  ) {
    this.username = authService.username;

    this.credentials = {
      username: appConfig.emailAddress,
      password: 'password'
    };
  }

  login(credentials:credentials) {
    this.authenticating = true;

    const returnToOriginalState = () => {
      const state = this.returnTo.state();
      const params = this.returnTo.params();
      const options = Object.assign({}, this.returnTo.options(), { reload: true });
      this.$state.go(state, params, options);
    };

    const showError = (errorMessage:ErrorMessage) =>
      this.errorMessage = errorMessage;

    const stop = () => this.authenticating = false;
    this.authService.authenticate(credentials.username, credentials.password)
      .then(returnToOriginalState)
      .catch(showError)
      .then(stop, stop);
  }
}
class credentials {
  username:string | null;
  password:string | null;
}
