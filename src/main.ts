import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"sound-share-dfbf7","appId":"1:1004875925541:web:11c46e922d2f22cbdb97cc","storageBucket":"sound-share-dfbf7.firebasestorage.app","apiKey":"AIzaSyAgguvHGUPXRlOjGIo7aCKJMgzFBcMmulE","authDomain":"sound-share-dfbf7.firebaseapp.com","messagingSenderId":"1004875925541","measurementId":"G-K443HQ8B2V"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
  ],
});

//test 123