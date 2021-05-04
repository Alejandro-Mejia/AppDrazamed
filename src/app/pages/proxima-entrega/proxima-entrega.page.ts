import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { finalize } from 'rxjs/operators';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-proxima-entrega',
  templateUrl: './proxima-entrega.page.html',
  styleUrls: ['./proxima-entrega.page.scss'],
})
export class ProximaEntregaPage implements OnInit {

  tratamientos = [];
  pedidoArr = [];
  pedidoArr1 = [];
  smallerDate: any;
  conditionSmaller: any;
  base_url: any;
  subtotal: any;
  imgUrl = `images/products/default.png`;
  apiImg = `images/products/`;
  apiUrl8 = `.jpg`;
  orden: any;
  proxima = [];
  user1: any;
  userid: any;
  cantidad = [];
  item_code = [];
  subtotal1: any;
  formula = [];
  code: any;
  error1: any;
  code2: any;
  total: any;
  tax1: any;
  addedMed = false;
  cartUrl3 = `medicine/remove-from-cart-app?`;


  constructor(private router: Router, public menuCtrl: MenuController, private route: ActivatedRoute,
    private config: ConfigService, private alertCtrl: AlertController, private loadingController: LoadingController,
    private auth: AuthService, private http: HttpClient, private tratamientoService: TratamientosService,
    private cartService: CartService) {
    this.base_url = config.get_base_url();
    this.route.queryParams.subscribe(params => {
      this.base_url = config.get_base_url();
      if (this.router.getCurrentNavigation().extras.state) {
        this.addedMed = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    //  this.tratamientos.splice(0, this.tratamientos.length);
    this.tratamientos = this.tratamientoService.getProxPedido();
    this.smallerDate = 0;
    this.proxima.splice(0, this.proxima.length);
    for (let al of this.tratamientos) {
      this.proxima.push(al.buy_time);
    }
    console.log(': this.proxima', this.proxima);
    let prxFormatted = this.proxima.map(f => moment(f));
    this.smallerDate = moment.min(prxFormatted).format('ll');

    console.log('this.tratamientos: ', this.tratamientos);
    let smaller = this.tratamientos.filter(sm => moment(sm.buy_time).format('ll') === this.smallerDate)
    console.log('smaller: ', smaller, this.smallerDate);
    let smallerFmatted = new Date(this.smallerDate).toISOString();
    this.conditionSmaller = moment(smallerFmatted).diff(moment(), 'days');
    console.log('this.conditionSmaller: ', this.conditionSmaller);
    for (let trt of this.tratamientos) {
      if (moment(trt.buy_time).diff(moment(smallerFmatted), 'days') <= 4) {
        this.pedidoArr1.push(trt);
      }
    }
    this.pedidoArr = this.pedidoArr1.filter(function (item, index, array) {
      return array.indexOf(item) === index;
    });
    for(let imgs of this.pedidoArr){
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
    console.log(': pedido arr ', this.pedidoArr);
  }

  Volver() {
    this.router.navigate(['perfil']);
  }

  goBuscar() {
    let navigationExtras: NavigationExtras = {
      state: {
        fromProx: true
      }
    }
    this.router.navigate(['medicamentos'], navigationExtras);
  }


  getSubTotal() {
    return this.pedidoArr.reduce((i, j) => i + (j.mrp || + j.unit_price), 0);
  }
  getTotal() {
    if (this.pedidoArr.length !== 0) {
      return this.getSubTotal() + 2000;
    }
    else {
      return 0;
    }
  }
  getTax() {
    this.subtotal = 0;
    this.subtotal1 = 0;
    for (let ta of this.pedidoArr) {
      this.total = (ta.mrp * 1 || ta.unit_price * 1);
      this.tax1 = ta.tax ? ta.tax : 0;
      this.subtotal = Math.floor(this.total / (((100) + this.tax1) / 100));
      this.subtotal1 += this.subtotal;
    }
    return this.subtotal1;
  }

  impuesto() {
    return this.getSubTotal() - this.getTax();
  }

  removeMed(medicine) {
    this.tratamientoService.rmMedProxPedido(medicine);
    for (let [index, p] of this.pedidoArr.entries()) {
      if (p.item_code === medicine.item_code) {
        this.pedidoArr.splice(index, 1);
      }
    }
    this.cartService.removeProduct(medicine);
  }

  async send() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Por favor espera...',
      mode: 'ios',
      spinner: 'dots'
    });
    await loading.present();
    this.user1 = this.auth.getusuario();
    this.userid = this.user1.email;
    for (let code of this.pedidoArr) {
      this.item_code.push(code.item_code);
      this.cantidad.push(code.medicine_count = 1);
      this.formula.push(code.is_pres_required);
    }

    this.orden = {
      email: this.userid,
      cart_length: this.pedidoArr.length,
      shipping_cost: 2000,
      quantity: this.cantidad,
      is_pres_required: 0,
      item_code: this.item_code
    };
    this.http.post(`${this.base_url}medicine/store-prescription/0`,
      this.orden)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(async (mensaje) => {
        this.code = mensaje;
        this.code2 = this.code.status;
        if (this.code2 === 'SUCCESS') {
          const alert = await this.alertCtrl.create({
            message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">Tu orden fue creada',
            mode: 'ios',
            cssClass: 'failed',
            backdropDismiss: false,
            buttons: [
              {
                text: 'Aceptar',
                cssClass: 'btnalert',
                handler: (data) => { alert2.present(); }
              }
            ]
          });
          const alert2 = await this.alertCtrl.create({
            message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">En algunos minutos verificaremos tu orden',
            mode: 'ios',
            cssClass: 'failed',
            backdropDismiss: false,
            buttons: [
              {
                text: 'Aceptar',
                cssClass: 'btnalert',
                handler: (data) => {

                  for (let remIsReorden of this.pedidoArr) {
                    if (remIsReorden.isReorden === 1) {
                      this.http.get(`${this.base_url}${this.cartUrl3}email=${this.userid}&item_code=${remIsReorden.item_code}`).subscribe((val) => {
                        console.log(val);
                      });
                    }
                  }

                  this.router.navigate(['mispedidos']);
                  this.user1 = this.auth.getusuario();
                  this.userid = this.user1.email;
                  let i = 0;
                  for (let reorder of this.pedidoArr) {
                    let postUpdate = {
                      email: this.userid,
                      item_code: reorder.item_code
                    }
                    this.http.post(`${this.base_url}treatment/update-reorden`, postUpdate).subscribe((res: any) => {
                      console.log('res reorden: ', res);
                    });
                  }
                }
              }
            ]
          });
          await alert.present();

        }
        else {
          console.log(mensaje);
          const alert = await this.alertCtrl.create({
            message: '<img src = "../../assets/img/RECURSOS/wrong.png" class="alert">Su orden no fue creada, intente de nuevo',
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
        }
      });
  }

}
