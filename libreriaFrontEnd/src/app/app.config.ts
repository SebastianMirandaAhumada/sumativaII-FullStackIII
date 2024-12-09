import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'full-stack-ii-b5c40',
        appId: '1:933702174984:web:863838cdc9eacb960a04bd',
        storageBucket: 'full-stack-ii-b5c40.appspot.com',       
        apiKey: 'AIzaSyAgjwZebDmQUo3zYybXUSWrNPgn20i7Duw',
        authDomain: 'full-stack-ii-b5c40.firebaseapp.com',
        messagingSenderId: '933702174984',
      })
    ),
    provideAuth(() => getAuth()),    
    provideStorage(() => getStorage()),
  ],
};
