import { Component, trigger, state, style, transition, animate } from '@angular/core';

import { Animations } from './_global/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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