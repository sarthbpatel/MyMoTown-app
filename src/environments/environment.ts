// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC4FKmFPtCIG5bdVCvZhZGnUe6n1BXm7V0",
  authDomain: "my-motown-app.firebaseapp.com",
  databaseURL: "https://my-motown-app-default-rtdb.firebaseio.com",
  projectId: "my-motown-app",
  storageBucket: "my-motown-app.appspot.com",
  messagingSenderId: "1034491236664",
  appId: "1:1034491236664:web:ae03b95220b464a88731cd",
  measurementId: "G-Y08MXK00BC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
