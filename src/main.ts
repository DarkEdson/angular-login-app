import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { initializeApp } from 'firebase/app';

if (environment.production) {
  enableProdMode();
}

const firebaseConfig = {
  apiKey: "AIzaSyANVl6lQ6bkTvFOOP3KFsGdHcEW1EU4NPI",
  authDomain: "logins-7fb7b.firebaseapp.com",
  projectId: "logins-7fb7b",
  storageBucket: "logins-7fb7b.appspot.com",
  messagingSenderId: "943659315938",
  appId: "1:943659315938:web:4e6494b4d582f93cb6e4bb",
  measurementId: "G-X1ZMJG7JFS"
};

const app = initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
