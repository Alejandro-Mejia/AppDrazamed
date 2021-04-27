import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MenuController, IonSlides, AlertController, LoadingController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service'
import { finalize } from 'rxjs/operators';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, OnDestroy {

  @ViewChild('mySlider') slider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,
    zoom: {
      maxRatio: 5
    }
  };

  code: any;
  code2: any;
  cartItemCount: BehaviorSubject<number>;
  posteo: Observable<any>;
  comentarios: any;
  postUrl = `user/contact-us`;
  user: any;
  usuario: any;
  email: any;
  nombre: any;
  datatoSend: any;
  alar = [];
  base_url: any;
  alarmas = [];
  items: any;
  items2 = [];
  apiUrl7 = `images/products/`;
  apiUrl8 = `.jpg`;
  proxima = [];
  prox: any;
  alarma: any;
  treatment_status: any;
  user1: any;
  userid: any;
  apiUrl = `my-treatments?email=`;
  items3: any;
  intervalos: any = [];
  alarm = [];
  constructor(
    public menuCtrl: MenuController,
    private cartService: CartService,
    private auth: AuthService,
    public alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router,
    private config: ConfigService,
    private loadingController: LoadingController,
    private tratamientoService: TratamientosService,
    private storage: Storage,
    private platform: Platform
  ) {
    this.base_url = config.get_base_url();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  ngOnInit() {
    console.log('on init')
    // this.alarmas = this.tratamientoService.getAlarma()
    this.user = this.auth.getusuario();
    this.userid = this.user.email;
    console.log(this.user);
    // this.alarmas = this.tratamientoService.getAlarma();
    // console.log(this.alarmas)
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.proxima.splice(0, this.proxima.length);
    this.alarmas = this.tratamientoService.getAlarma();
    console.log(this.alarmas);
    console.log('perfil pagina')
    this.prox = this.tratamientoService.proximaEntrega();
    console.log('this.prox: ', this.prox);
    
    let prox = this.tratamientoService.getProxPedido();
    console.log('prox: ', prox);
  }
  ngOnDestroy() {

  }
 /*  toggleEvent(activo, alarma){
    this.user = this.auth.getusuario();
    this.userid = this.user.email;
  if(activo.detail.checked == false){
    alarma.active = false;
    /* this.treatment_status = {
      email: this.userid,
	    item_code: alarma.item_code,
	    active: false
    }
    this.http.post(`${this.base_url}treatment/update-active-status`, this.treatment_status).subscribe(respuesta => {
      console.log('Tratamiento activo: ', respuesta);
      }); 
      
console.log(': ', 1);
  }else if(activo.detail.checked == true){
    alarma.active = true;
    /*  this.treatment_status = {
      email: this.userid,
	    item_code: alarma.item_code,
	    active: true
    }
    this.http.post(`${this.base_url}treatment/update-active-status`, this.treatment_status).subscribe(respuesta => {
      console.log('Tratamiento activo: ', respuesta);
    }); 
    
console.log(': ', 2);
  }
  } */
  /* proximaEntrega(){
    this.proxima.splice(0, this.proxima.length);
    this.prox = 0;
    for (let al of this.alarmas) {
      if(al.next_date !== null){
      this.proxima.push(al.buy_time);
      }
      // this.tratamientoService.TimeRemaining(al.item_code, al.next_date);
    }
    console.log(': this.proxima', this.proxima);
    let prxFormatted = this.proxima.map(f => moment(f));
    this.prox = moment.min(prxFormatted).format('ll');
    console.log('this.prox: ', this.prox);
    return this.prox;
  } */
  async addComment() {
    const input = await this.alertCtrl.create({
      header: '¿Cómo va tu tratamiento?',
      cssClass: 'failed',
      mode: 'ios',
      buttons: [
        {
          text: 'Enviar',
          cssClass: 'btnalert',
          handler: async (data) => {
            this.comentarios = data.comentario;
            this.usuario = this.auth.getusuario();
            this.email = this.usuario.email;
            this.nombre = this.usuario.name;
            this.datatoSend = {
              name: this.nombre,
              phone: '',
              msg: this.comentarios,
              email: this.email,
            };
            const loading = await this.loadingController.create({
              cssClass: 'loading',
              message: 'Por favor espera...',
              mode: 'ios',
              spinner: 'dots'
            });
            await loading.present();
            this.http.post(`${this.base_url}${this.postUrl}`, this.datatoSend).
              pipe(
                finalize(() => {
                  loading.dismiss();
                })
              )
              .subscribe(async (val) => {
                this.code = val;
                this.code2 = this.code.status;
                if (this.code2 === 'SUCCESS') {
                  const alert = await this.alertCtrl.create({
                    message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">El comentario fue enviado',
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
                }
              });
          }
        }
      ],
      inputs: [
        {
          name: 'comentario',
          cssClass: 'inputs',
          type: 'textarea',
          placeholder: 'Escribe tu comentario'
        }
      ]
    });

    await input.present();
  }

  goEdit() {
    this.router.navigate(['editprofile']);
  }
  async PedidoProximo() {
    if(this.alarmas.length === 0){
      const alert = await this.alertCtrl.create({
        message: '<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert">No tienes pedidos pendientes',
        mode: 'ios',
        cssClass: 'failed',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            cssClass: 'btnalert',
          }
        ]
      });
      await alert.present();
    }else{
    this.router.navigate(['proxima-entrega']);
    }
  }
  misPedidos() {
    this.router.navigate(['mispedidos']);
  }
  miPastillero() {
    this.router.navigate(['mipastillero']);
  }
  misDirecciones() {
    this.router.navigate(['misdirecciones']);
  }
  async removetreatment(alarma) {
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
            this.tratamientoService.rmMedProxPedido(alarma);
            this.prox = this.tratamientoService.proximaEntrega();
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
  processTreat(alarma) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: alarma
      }
    };
    this.router.navigate(['processtreatment'], navigationExtras);
  }
  editAlarm(alarmas) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: alarmas
      }
    };
    this.router.navigate(['edit-alarm'], navigationExtras);
  }
  goCarrito() {
    this.router.navigate(['carrito']);
  }
}
