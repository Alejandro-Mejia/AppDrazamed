import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AuthService } from './services/auth.service';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { Facebook } from '@ionic-native/facebook/ngx';
//FCM
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';






@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({animated: false}), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    // GooglePlus,
    // Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    Camera,
    WebView,
    NativeStorage,
    LocalNotifications,
    InAppBrowser,
    BackgroundMode,
    FilePath
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
