import { Component, trigger, state, style, transition, animate } from '@angular/core';

import { MetaService } from 'ng2-ui-router-meta';
import { Animations } from './_global/animations'

import { AuthService } from './_services/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ Animations.slideInOut ]
})

export class AppComponent {
  private collapsed: boolean;

  constructor (public authService:AuthService, private metaService: MetaService ) {
    this.collapsed = true;
  }
  public isCollapsed(): boolean {
    return this.collapsed;
  }
  public hideMenu(): void {
    this.collapsed = true;
  }
  public toggleMenu(): void {
    this.collapsed = !this.collapsed;
  }
}
