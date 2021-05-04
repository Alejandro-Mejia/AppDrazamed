import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, from, of, Subscription, ObservableInput } from 'rxjs';
import { take, map, switchMap, switchMapTo, subscribeOn } from 'rxjs/operators';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { data } from 'jquery';
import { ConfigService } from 'src/app/services/config.service'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { Facebook } from '@ionic-native/facebook/ngx';


const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const USUARIOS = 'user-logged';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = `user/user-login/0?`;

  public items: any;
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  public items2: any;
  public items3: any;
  status: string;
  public usuario: any;
  base_url: any;
  normalLogin = false;
  googleLogin = false;
  fbLogin = false;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    // private facebook: Facebook,
    // private googlePlus: GooglePlus,
    private config: ConfigService,
    private alertController: AlertController) {
    this.base_url = config.get_base_url();
    this.loadStoredToken();
  }

  loadStoredToken() {
    const platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        console.log('token from storage', token);
        if (token) {
          const decoded = helper.decodeToken(token);
          // console.log('decoded: ', decoded);
          this.userData.next(decoded);
          return true;
        }else {
      return null;
    }
      })
    );
  }

  login(credentials: { email: string, password: string }) {
    let data: Observable<any>;
    data = this.http.get(`${this.base_url}${this.apiURL}email=${credentials.email}&password=${credentials.password}`);
    data.subscribe(result => {
      this.items = result;
      this.items2 = this.items.data.status;
      console.log('items en el primer get');
      console.log(this.items);
      if (this.items) {
        this.usuario = { name: this.items.name, email: this.items.email, user_id: this.items.data.user_id };
      }
      console.log('usuarios info');
console.log(this.usuario);
    }, async (err: HttpErrorResponse) => {
      this.items3 = err.status;
      console.log('this.items3: ', this.items3);
      
      if (this.items3 === 401 || credentials.email === '' || credentials.password === '') {
        console.log('Usuario o contraseña incorrecto');
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
        return of(null);
      }
    }, () => {
    this.normalLogin = true;
    });

  
    return this.http.get(`${this.base_url}${this.apiURL}email=${credentials.email}&password=${credentials.password}`).pipe(
      take(1),
      map(res => {
        return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRyYXphbWVkIiwiaWF0IjoxNTE2MjM5MDIyfQ.4x0iejWjRVH3V7ULcX0-vRmxeR8NLdlFGvx69CuBrrY`;
      }),
      switchMap((token) => {
        /* if(this.items){
          this.usuario = { name: this.items.name, email: this.items.email, user_id: this.items.data.user_id };   
        } */
        if(this.items){
        let decoded = helper.decodeToken(token);
        // console.log('login decoded: ', decoded);
        this.userData.next(decoded);
        
          window.localStorage.setItem(USUARIOS, JSON.stringify(this.usuario));
           let storageObs = from(this.storage.set(TOKEN_KEY, token));
           return  storageObs;
        }  
       
        /* if (this.items2 !== 'ACTIVE'){
          return of(null);
        } */
       
      })
    );
  
   
  }

  // loginGoogle(datas){

  //   return this.http.get(`https://randomuser.me/api/`).pipe(
  //     take(1),
  //     map(res => {
  //       return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRyYXphbWVkIiwiaWF0IjoxNTE2MjM5MDIyfQ.4x0iejWjRVH3V7ULcX0-vRmxeR8NLdlFGvx69CuBrrY`;
  //     }),
  //     switchMap((token) => {
  //       let decoded = helper.decodeToken(token);
  //       // console.log('login decoded: ', decoded);
  //       this.userData.next(decoded);
  //       window.localStorage.setItem(USUARIOS, JSON.stringify(datas));
  //       let storageObs = from(this.storage.set(TOKEN_KEY, token));
  //       this.googleLogin = true;
  //       /* if (this.items2 !== 'ACTIVE'){
  //         return of(null);
  //       } */
  //       return  storageObs;
  //     })
  //   );
  // }

  // loginFacebook(dataFacebook){
  // console.log('dataFacebook: ', dataFacebook);
  //   return this.http.get(`https://randomuser.me/api/`).pipe(
  //     take(1),
  //     map(res => {
  //       return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRyYXphbWVkIiwiaWF0IjoxNTE2MjM5MDIyfQ.4x0iejWjRVH3V7ULcX0-vRmxeR8NLdlFGvx69CuBrrY`;
  //     }),
  //     switchMap((token) => {
  //       let decoded = helper.decodeToken(token);
  //       // console.log('login decoded: ', decoded);
  //       this.userData.next(decoded);
  //       window.localStorage.setItem(USUARIOS, JSON.stringify(dataFacebook));
  //       let storageObs = from(this.storage.set(TOKEN_KEY, token));
  //       this.fbLogin = true;
  //       /* if (this.items2 !== 'ACTIVE'){
  //         return of(null);
  //       } */
  //       return  storageObs;
  //     })
  //   );
  // }

  // loginApple(){}

  getusuario() {
    return  (JSON.parse(window.localStorage.getItem(USUARIOS)));
  }


  logout() {
    /* console.log('normal login', this.normalLogin);
    console.log('google login', this.googleLogin); */
    // console.log('facebook login', this.fbLogin);

    
      this.storage.remove(TOKEN_KEY).then(() => {
        window.localStorage.removeItem(USUARIOS);
        this.router.navigateByUrl('/login1');
        this.userData.next(null);
        this.normalLogin = false;
      }); 
    
    
    
    // else if(this.googleLogin === true){
    //   this.googlePlus.logout().then(logOutRes =>{
    //     console.log('logOutRes: ', logOutRes);
    //       window.localStorage.removeItem('GoogleUser');
    //       this.router.navigateByUrl('/login1');
    //       this.userData.next(null);
    //       this.googleLogin = false;
    //   });
    // }else if(this.fbLogin === true){
    //   this.facebook.logout().then(res => {
    //     console.log('res: ', res);
    //     window.localStorage.removeItem('FacebookUser');
    //       this.router.navigateByUrl('/login1');
    //       this.userData.next(null);
    //       this.fbLogin = false;
    //   });
    // }
       
  }

}
