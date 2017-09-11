import { Component, trigger, state, style, transition, animate } from '@angular/core';

import { Animations } from './_global/animations'

import { AuthService } from './_services/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ Animations.slideInOut ]
})

export class AppComponent {
  private collapsed: boolean;

  constructor (private authService:AuthService ) {
    this.collapsed = true;
  }
  public isCollapsed(): boolean {
    return this.collapsed;
  }
  public toggleMenu(): void {
    this.collapsed = !this.collapsed;
  }
}
