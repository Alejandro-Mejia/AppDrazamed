import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MenuController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { ConfigService } from 'src/app/services/config.service'
import { TratamientosService } from '../services/tratamientos.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {
  credenciales: any;
  correo: any;
  clave: any;
  accept: any;
  key = 'user';
  token: any;
  key1 = 'remind';
  apns: any;
  base_url: any;
  postJson = {};
  usuario: any;
  email: any;
  refresh_token: any;
  public items3: any;
  public items2: any;

  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    public http: HttpClient,
    public menuCtrl: MenuController,
    private alertController: AlertController,
    private platform: Platform,
    private auth: AuthService,
    private storage: Storage,
    private loadingController: LoadingController,
    private fcm: FCM,
    private config: ConfigService,
    private tratamientoService: TratamientosService
  ) {
    this.base_url = config.get_base_url();
    this.platform.ready().then(() => {
      this.get();
    })
  }
 postFCM(){
  this.token =  window.localStorage.getItem('token-fcm');
  this.refresh_token =  window.localStorage.getItem('refresh-token');
  this.apns = window.localStorage.getItem('apnsToken');
  this.usuario = this.auth.getusuario();
  this.email = this.usuario.email;
  console.log('Token android' + this.token);
  console.log('Token iOS' + this.apns);
  if(this.platform.is('android') === true){
    this.postJson = {
      email: this.email,
      user_type: 3,
      token: this.token,
      apnstoken: this.apns,
      isAndroid: 'true'
    };
    console.log(this.postJson);
  }else{
  this.postJson = {
    email: this.email,
    user_type: 3,
    token: this.token,
    apnstoken: this.apns,
    isAndroid: 'false'
  };
  console.log(this.postJson);
 
  } 
  this.http.post(`${this.base_url}user/post-fcm-data`, this.postJson).subscribe(res => {
    console.log(res);
 });
 }
  async login() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Por favor espera...',
      mode: 'ios',
      spinner: 'dots'
    });
    await loading.present();
    this.auth.login(this.credentials)
      .then(async (res: any) => {
        loading.dismiss();
      console.log('respuesta login: ', res); 
        
        if (res.status == 'SUCCESS') {
          this.tratamientoService.getAlarma();
          this.router.navigate(['home']);
          this.postFCM();
          if (this.accept === true) {
            window.localStorage.setItem(this.key, JSON.stringify(this.credentials));
            window.localStorage.setItem(this.key1, JSON.stringify(this.accept = true));
            /*this.storage.set(this.key, this.credentials);
            this.storage.set(this.key1, this.accept = true);*/
            console.log('se guardo porque esta en true');
          }
          else {
            console.log('no se guarda');
            window.localStorage.removeItem(this.key);
            window.localStorage.removeItem(this.key1);
            /*this.storage.remove(this.key);
            this.storage.remove(this.key1);*/
          }
        } /* else {
          const alert = await this.alertController.create({
            header: 'Login Failed',
            message: '<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert">Usuario o contraseña incorrectos',
            mode: 'ios',
            cssClass: 'failed',
            buttons: [
              {
                text: 'Aceptar',
                cssClass: 'btnalert',
              }
            ]
          });
          await alert.present();
        } */
      }).catch(error => {
      loading.dismiss();
      });
  }

  get() {
    /*this.storage.get(this.key).then(val => {
       this.credenciales = val;
       this.correo = this.credenciales.email;
       this.clave = this.credenciales.password;
       this.credentials.email = this.correo;
       this.credentials.password = this.clave;
    });*/
    this.credenciales = JSON.parse(window.localStorage.getItem(this.key));
    this.correo = this.credenciales.email;
    this.clave = this.credenciales.password;
    this.credentials.email = this.correo;
    this.credentials.password = this.clave;
    this.accept = JSON.parse(window.localStorage.getItem(this.key1));
    /*this.storage.get(this.key1).then((val) => {
      this.accept = val;
    });*/
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home']);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }



}
