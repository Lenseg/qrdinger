import { Injectable } from '@angular/core';
import { StateService } from '@uirouter/angular'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  user: Observable<firebase.User>;

  constructor(private stateService:StateService, public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
  checkAuthenticated() {
    return this.loggedIn;
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.setLoggedIn(true);
      this.stateService.go('codes',{});
    });
  }
  loginWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
    ).then(() => {
      this.setLoggedIn(true);
      this.stateService.go('codes',{});
    });
  }
  registerUser(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    ).then(() => {
      this.setLoggedIn(true);
      this.stateService.go('codes',{});
    });;
  }
  handleAuth() {
    // When Auth0 hash parsed, get profile
  }

  private _getProfile(authResult) {
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
  }

  logout() {
    // Remove tokens and profile and update login status subject
    this.afAuth.auth.signOut();
  }

  get authenticated() {
    return false
    // Check if there's an unexpired access token
  }

}
