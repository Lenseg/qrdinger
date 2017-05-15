import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

  emailAddress: string = undefined;

  constructor() {
    this.load();
  }

  toObject() {
    return {
      emailAddress: this.emailAddress
    };
  }

  load() {
    try {
      const data = JSON.parse(sessionStorage.getItem('appConfig'));
      return Object.assign(this, data);
    } catch (Error) { }

    return this;
  }

  save() {
    const string = JSON.stringify(this.toObject());
    sessionStorage.setItem('appConfig', string);
  }

}
