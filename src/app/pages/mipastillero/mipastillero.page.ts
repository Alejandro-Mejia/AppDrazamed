import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AlertController, IonSlides, MenuController, Platform } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config.service';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mipastillero',
  templateUrl: './mipastillero.page.html',
  styleUrls: ['./mipastillero.page.scss'],
})
export class MipastilleroPage implements OnInit {

base_url: any;
apiUrl7 = `images/products/`;
apiUrl8 = `.jpg`;
item_name: any;
alarmas = [];
items: any;
items2 = [];

proxima = [];
prox: any;
alarma: any;
user1: any;
userid: any;
apiUrl = `my-treatments?email=`;
items3: any;
alarm = [];
alar: any;
user: any;
imgUrl = `images/products/default.png`;
apiImg = `images/products/`;
error1: any;

  @ViewChild('mySlider') slider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,
    zoom: {
      maxRatio: 5
    }
  };

  cartItemCount: BehaviorSubject<number>;
  constructor(private cartService: CartService, private router: Router, private storage: Storage, private platform: Platform, 
              private config: ConfigService, private tratamientoService: TratamientosService, private alertCtrl: AlertController,
              private auth: AuthService, private http: HttpClient, public menuCtrl: MenuController) {
    this.base_url = config.get_base_url();
    this.cartItemCount = this.cartService.getCartItemCount();
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.alarmas = this.tratamientoService.getAlarma();
    this.menuCtrl.enable(true);
    console.log(this.alarmas);
    console.log('entrando');
    for(let imgs of this.alarmas){
      this.http.get(`${this.base_url}${this.apiImg}${imgs.item_code}${this.apiUrl8}`).subscribe((val) => {

      }, async (err: HttpErrorResponse) => {
        this.error1 = err.status;
        console.log(this.error1);
        if(this.error1 === 404){
          imgs.imagen = true;
        }
        else{
          imgs.imagen = false;
        }
      });
    }
  }
 /*  getTreatments(){
    // this.alarmas.splice(0, this.alarmas.length);
    this.alarm.splice(0, this.alarm.length);
    this.proxima.splice(0, this.proxima.length);
    this.user = this.auth.getusuario();
    console.log(this.user);
      this.user1 = this.auth.getusuario();
      this.userid = this.user1.email;
      this.http.get(`${this.base_url}${this.apiUrl}${this.userid}`).subscribe(val => {
        this.items = val;
        for (let item of this.items) {
          let next_date = item.next_time;
          item.next_time = moment(item.next_time).format('LT');
          item.medicines[0].next_time = item.next_time;
          item.medicines[0].next_date = next_date;
          item.medicines[0].dosis = item.dosis;
          item.medicines[0].taken = item.taken;
          item.medicines[0].total = item.total;
          item.medicines[0].buy_time = moment(item.buy_time).format('ll');
  
          this.items3 = item.medicines
          for (var i = 0; i < this.items3.length; i++) {
            this.items2.push(this.items3[i]);
            this.alarm = this.items2;
          }
        }
        for (let ala of this.alarm) {
          // this.alar.push(ala);
          console.log(ala);
          this.tratamientoService.addAlarm(ala);
        
        }
         this.alarmas = this.tratamientoService.getAlarma();
        for (let al of this.alarmas) {
           this.tratamientoService.TimeRemaining(al.item_code, al.next_date);
        } 
       // console.log(this.alarmas);
  
      });
  } */
  createAlarm(){
    this.router.navigate(['createalarm']);
  }
  editAlarm(alarmas){
    let navigationExtras: NavigationExtras = {
      state: {
        user: alarmas
      }
    };
    this.router.navigate(['edit-alarm'], navigationExtras);
  }
  goCarrito(){
    this.router.navigate(['carrito']);
  }
  async removetreatment(alarma){
    const alert = await this.alertCtrl.create({
      message: '<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert">¿Deseas eliminar el tratamiento?',
      mode: 'ios',
      cssClass: 'failed',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Si',
          cssClass: 'btnalert',
          handler: data => {
            this.tratamientoService.removeAlarm(alarma);
          }
        },
        {
          text: 'No',
          cssClass: 'btnalert',
        }
      ]
       });
    await alert.present();
  }
  processTreat(alarma){
    let navigationExtras: NavigationExtras = {
      state: {
        user: alarma
      }
    };
    this.router.navigate(['processtreatment'], navigationExtras);
  }
}
