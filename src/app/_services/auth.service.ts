import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable()
export class AuthService {
  username: string = 'Lenseg';

  constructor(public appConfig: AppConfigService) { console.log('kek') }
  isAuthenticated() {
    return !!this.appConfig.emailAddress;
  }

  authenticate(username:string, password:string) {
    const appConfig = this.appConfig;

    const checkCredentials = () => new Promise<string>((resolve, reject) => {
      const validUsername = this.username === username;
      const validPassword = password === 'password';

      return (validUsername && validPassword) ? resolve(username) : reject('Invalid username or password');
    });

    return checkCredentials()
      .then((authenticatedUser: string) => {
        appConfig.emailAddress = authenticatedUser;
        appConfig.save();
      });
  }

  logout() {
    this.appConfig.emailAddress = undefined;
    this.appConfig.save();
  }
}
