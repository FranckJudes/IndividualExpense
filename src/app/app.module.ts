import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { getApp, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { getAuth , indexedDBLocalPersistence, initializeAuth, provideAuth}  from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';

import { provideFirestore , getFirestore} from '@angular/fire/firestore';
import { getStorage , provideStorage} from '@angular/fire/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Capacitor } from '@capacitor/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule,
    HammerModule,
    provideFirebaseApp(() =>  initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=> getStorage()),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(),{
          persistence : indexedDBLocalPersistence,
        });
      }else{
        return getAuth();
      }
    })
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
