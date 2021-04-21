import { Component, ViewChild } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

// import { Push, PushOptions, PushObject, PushEvent } from '@ionic-native/push/ngx';

// import { Fire } from '@ionic-native/fcm/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { TratamientosService } from './services/tratamientos.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  public hasPermission: boolean;
  public hasIosPermission: boolean;
  public token: string;
  public apnstoken: string;
  public pushPayload: INotificationPayload;

  payment_url = `medicine/make-mercado-pago-payment/`;
  user: any;
  user1: any;
  userid: any;
  key = 'token-fcm';
  base_url :any;
  item: any;
  medicine: any;
  respuestapost: any;
  respuestapost1: any;
  item_codeP:any;
  item_codeT:any;
  respuestapost3: any;
  respuestapost2: any;
  dosis: any;
  ad: any;
  address: any;
  linkpay: any;
     

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public auth: AuthService,
    private localNotifications: LocalNotifications,
    private tratamientoService: TratamientosService,
    private fcm: FCM,
    private http: HttpClient,
    private config: ConfigService,
    private alertCtrl: AlertController,
    private iab: InAppBrowser
  ) {
    this.initializeApp();
    this.base_url = config.get_base_url();
  }

  ionViewWillEnter() {
    console.log(this.user);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.backgroundMode.enable();
      // this.getPush();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /* this.localNotifications.hasPermission().then(val => {
        if (val === false){
          this.localNotifications.requestPermission();
        }
        else if (val === true){
          console.log('hay permisos');
        }
      }); */

      this.setupFCM();

    });

  }

  /* pushSet() {
    const pusher = new Pusher('270a27c11d1a38de071b', {
      cluster: 'us2',
    });
    Pusher.logToConsole = true;
    const channel = pusher.subscribe('Drazamed');
    channel.bind('orderStatus', (data) => {
      console.log(data);
      this.user1 = data.user.email;
      this.user = this.auth.getusuario();
      this.userid = this.user.email;
      console.log(this.userid);
      console.log(this.user1);
      if (this.user1 === this.userid) {
        this.localNotifications.schedule({
          text: 'Orden verificada',
          lockscreen: true
        });
      }
    });
  } */
  
  async sendToma(treatment_id, body){
    this.user = this.auth.getusuario();
    this.userid = this.user.email;
    console.log("TreatmentId:", treatment_id);
    console.log("email:", this.userid);
    let treatmentId = treatment_id;
    // acá entra la notificacion con id de tratamiento
    let alert = await this.alertCtrl.create({
      mode: 'ios',
      cssClass: 'failed',
      message: body,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Posponer',
          cssClass: 'btnalert',
          handler: datos => {
            console.log("Posponer");
            var urlTreatment = `${this.base_url}treatment/treatment-by-id?id=`+treatmentId;
            console.log('url',urlTreatment);
            this.http.get(urlTreatment).subscribe((res) => {
              this.respuestapost = res;
              this.respuestapost3 = this.respuestapost.status;
              this.item_codeP = this.respuestapost.data[0].item_code;

              console.log("Post:", this.respuestapost3);
              console.log("tratamiento:",res);
              console.log("item_code:",this.item_codeP);

              if(this.respuestapost3 === "SUCCESS"){
                let alarma2 = {
                  email: this.userid,
                  taken: 0,
                  item_code: this.item_codeP,
                }
                console.log('envio posponer');
                console.log(alarma2);
                this.http.post(`${this.base_url}treatment/update-treatment`, alarma2).subscribe((resp) => {
                  this.respuestapost = resp;
                  this.respuestapost2 = this.respuestapost.status;
                  if(this.respuestapost2 === "SUCCESS"){
                    let alarma1 = {
                      taken: 0,
                      timeM: 0,
                      timeH: 0,
                      timeD: 0,
                      item_code: this.item_codeP
                    }
                    // this.tratamientoService.addAlarm(alarma1);
                    this.tratamientoService.getTreatmen();
                  }
                });
              };
            });
          }
        },
        {
          text: 'Tomar',
          cssClass: 'btnalert',
          handler: data => {

            this.http.get(`${this.base_url}treatment/treatment-by-id?id=${treatment_id}`).subscribe((res) => {
              this.respuestapost = res;
              this.respuestapost1 = this.respuestapost.status;
              this.item_codeT = this.respuestapost.data[0].item_code;
              this.dosis = this.respuestapost.data[0].dosis
              let alarma = {
                email: this.userid,
                taken: this.dosis,
                item_code: this.item_codeT,
              }
              console.log(alarma)
              this.http.post(`${this.base_url}treatment/update-treatment`, alarma).subscribe((resp) => {
                this.respuestapost = resp;
                this.respuestapost1 = this.respuestapost.status;
                console.log(this.respuestapost1);
                if(this.respuestapost1 === "SUCCESS"){
                  /* this.router.navigate(['home']); */
                  let alarma1 = {
                    taken: 1,
                    timeM: 0,
                    timeH: 0,
                    timeD: 0,
                    item_code: this.item_codeT
                  }
                  /* this.tratamientoService.addAlarm(alarma1); */
                  this.tratamientoService.getTreatmen();
                }
              });
              
            });
           
          }
        }
        
      ]
    });
    await alert.present();
    
    let alarma = {
      email: this.userid,
      toma: 'T1',
      item_code: '7702184010655',
    }
   //  this.tratamientoService.addAlarm(alarma);
  }
  async sendToma1(body){
    let alert = await this.alertCtrl.create({
      mode: 'ios',
      cssClass: 'failed',
      message: body,
      backdropDismiss: false,
      buttons: [
        {text: 'Ver',
          cssClass: 'btnalert',
         handler: (d) =>{
           this.router.navigate(['proxima-entrega']);
         }   
      }
      ]
    });
    await alert.present();
  }
  async sendToma2(body){
    let alert = await this.alertCtrl.create({
      mode: 'ios',
      cssClass: 'failed',
      message: body,
      backdropDismiss: false,
      buttons: [
        {text: 'Ok',
          cssClass: 'btnalert', 
      }
      ]
    });
    await alert.present();
  }
  async sendToma3(body,invoice_id){
    this.user = this.auth.getusuario();
    this.userid = this.user.email;
    let alert = await this.alertCtrl.create({
      mode: 'ios',
      cssClass: 'failed',
      message: body,
      backdropDismiss: false,
      buttons: [
        {text: 'Pagar',
         cssClass: 'btnalert', 
         handler: pp => {
          this.http.get(`${this.base_url}${this.payment_url}${invoice_id}/1?email=${this.userid}`).subscribe(pay => {
            this.ad = pay;
            this.address = this.ad.posted.address;
            this.linkpay = this.ad.preference.init_point;
            this.iab.create(this.linkpay, '_blank');
          });
         }
      }
      ]
    });
    await alert.present();
  }
  private async setupFCM() {
    await this.platform.ready();
    console.log('FCM setup started');

    if (!this.platform.is('cordova')) {
      return;
    }
    console.log('In cordova platform');

    console.log('Subscribing to token updates');
    this.fcm.onTokenRefresh().subscribe((newToken) => {
      this.token = newToken;
      console.log('onTokenRefresh received event with: ', newToken);
      window.localStorage.setItem('refresh-token', newToken);
    
    });
    console.log('Subscribing to new notifications');
    this.fcm.onNotification().subscribe((payload) => {
      this.pushPayload = payload;
      if(this.platform.is('ios')){
        console.log('onNotification received event with id: ', payload.a_data.treatment_id);
        // let data = JSON.parse(payload.a_data);
        if(payload.a_data.msg_type === 1){
          this.sendToma(payload.a_data.treatment_id, payload.body);
        }else if(payload.a_data.msg_type === 2){
           this.sendToma1(payload.body);
        }else if(payload.a_data.msg_type === 3){
           this.sendToma2(payload.body);
        }else if(payload.a_data.msg_type === 4){
          this.sendToma3(payload.body,payload.a_data.treatment_id);
        }else if(payload.a_data.msg_type === 5){
          this.sendToma2(payload.body);
        }else if(payload.a_data.msg_type === 6){
          this.sendToma2(payload.body);
        }
      }else{
        console.log('onNotification received event with id: ', payload);
        let data = JSON.parse(payload.a_data);
        if(data.msg_type === 1){
          this.sendToma(data.treatment_id, payload.body);
        }else if(data.msg_type === 2){
          this.sendToma1(payload.body);
        }else if(data.msg_type === 3){
          this.sendToma2(payload.body);
        }else if(data.msg_type === 4){
          this.sendToma3(payload.body,data.treatment_id);
        }else if(payload.a_data.msg_type === 5){
          this.sendToma2(payload.body);
        }else if(payload.a_data.msg_type === 6){
          this.sendToma2(payload.body);
        }
      }
     
    });

    this.hasPermission = await this.fcm.requestPushPermission();
    console.log('requestPushPermission result: ', this.hasPermission);

    this.hasIosPermission = await this.fcm.hasPermission();
    console.log('requestIosPushPermission result: ', this.hasIosPermission);


    this.token = await this.fcm.getToken();
    window.localStorage.setItem(this.key, this.token);
    console.log('getToken result: ', this.token);

    if(this.platform.is('ios')){    
    let intApns = setInterval(async () => {
      this.apnstoken = await this.fcm.getAPNSToken();
      console.log('getAPNSToken result: ', this.apnstoken);
      if(this.apnstoken){
        clearInterval(intApns);
        window.localStorage.setItem('apnsToken', this.apnstoken);
      }
    }, 2000);
    }
    this.pushPayload = await this.fcm.getInitialPushPayload();
    console.log('getInitialPushPayload result: ', this.pushPayload);
    if(this.pushPayload !== null){
      // let data = JSON.parse(this.pushPayload.a_data);
        if(this.pushPayload.a_data.msg_type === 1){
          this.sendToma(this.pushPayload.a_data.treatment_id, this.pushPayload.body);
        }else if(this.pushPayload.a_data.msg_type === 2){
           this.sendToma1(this.pushPayload.body);
        }else if(this.pushPayload.a_data.msg_type === 3){
           this.sendToma2(this.pushPayload.body);
        }else if(this.pushPayload.a_data.msg_type === 4){
           this.sendToma3(this.pushPayload.body,this.pushPayload.a_data.treatment_id);
        }else if(this.pushPayload.a_data.msg_type === 5){
          this.sendToma2(this.pushPayload.body);
        }else if(this.pushPayload.a_data.msg_type === 6){
          this.sendToma2(this.pushPayload.body);
        }
    }
  }

  public get pushPayloadString() {
    return JSON.stringify(this.pushPayload, null, 4);
  }

  // getPush() {
  //   this.push.hasPermission().then((res) => {
  //     if (res.isEnabled) {
  //       console.log('Si hay permisos para notificaciones push');
  //     } else {
  //       console.log('No hay permisos para notificaciones push');
  //     }
  //   });

  //   const options: PushOptions = {
  //     android: {
  //       senderID: '193162804196',
  //       forceShow: true
  //     },
  //     ios: {
  //       // senderID: 'SENDER_ID',//si no lo pones, se generará un token para APNS
  //       alert: 'true',
  //       badge: true,
  //       sound: 'false'
  //     },
  //     windows: {}
  //   };

  //   const pushObject: PushObject = this.push.init(options);
  //   pushObject.on('notification').subscribe((notification: any) => {
  //     //aquí recibimos las notificaciones de firebase
  //     console.log(notification);
  //     alert(notification);
  //   });
  //   pushObject.on('registration').subscribe((registration: any) => {
  //     const registrationId = registration.registrationId;
  //     console.log("registration",registrationId);
  //     //registrationId lo debes guardar en mysql o similar para reutilizar
  //   });
  //   pushObject.on('error').subscribe(error => {
  //     console.error('Error with Push plugin', error)
  //   });
  // }

  goHome() {
    this.router.navigate(['home']);
  }

  goPerfil() {
    this.router.navigate(['perfil']);
  }

  goMedicamentos() {
    this.router.navigate(['medicamentos']);
  }

  goMensajes() {
    this.router.navigate(['mensajes']);
  }

  goPastillero() {
    this.router.navigate(['mipastillero']);
  }

  goAcercade() {
    this.router.navigate(['acercade']);
  }


  goOut() {
    this.auth.logout();
  }
}
