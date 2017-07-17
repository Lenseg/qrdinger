// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyApCwQTqMckd8XG1dr2prTqB6tQw2VuNUU",
    authDomain: "qrdinger.firebaseapp.com",
    databaseURL: "https://qrdinger.firebaseio.com",
    projectId: "qrdinger",
    storageBucket: "qrdinger.appspot.com",
    messagingSenderId: "252516911799"
  }
};
