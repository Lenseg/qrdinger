import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { CreateCodeComponent } from './create-code/create-code.component';

const homeState = {
  name: 'home',
  url: '/',
  component: HomeComponent
}

const createCode = {
  name: 'createCode',
  url: '/create',
  component: CreateCodeComponent
}

export const APP_STATES = [homeState, createCode]
