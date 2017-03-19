import { Component, trigger, state, style, transition, animate } from '@angular/core';

import { Animations } from './global/animations'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.pug',
  animations: [ Animations.slideInOut ]
})

export class AppComponent {
  private collapsed: boolean;

  constructor () {
    this.collapsed = true;
  }
  public isCollapsed(): boolean {
    return this.collapsed;
  }
  public toggleMenu(): void {
    this.collapsed = !this.collapsed;
  }
}
