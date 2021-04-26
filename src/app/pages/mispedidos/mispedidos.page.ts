import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TratamientosService } from 'src/app/services/tratamientos.service';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.page.html',
  styleUrls: ['./mispedidos.page.scss'],
})
export class MispedidosPage implements OnInit {
  isYesClicked = false;
  isNoClicked = false;
  base_url: any;
  comentarios: any;
  datatoSend: any;
  nombre: any;
  user1: any;
  userid: any;
  orders: any;
  estado: any;
  estado1: any;
  orden = [];
  orden2: any;
  push: any;
  push1: any;
  userid1: any;
  code: any;
  code2: any;
  cart_med: any;
  id: any;
  user: any;
  payment_url = `medicine/make-mercado-pago-payment/`;
  postUrl = `user/contact-us`;
  ad: any;
  address: any;
  linkpay: any;
  status: any;
  invoice_i: any;
  calificado = false;
  precio: any;
  pendientes = [];
  completados = [];
  constructor(private iab: InAppBrowser, private router: Router, private http: HttpClient, private auth: AuthService, private menuCtrl: MenuController,
    private config: ConfigService, private alertController: AlertController, private loadingController: LoadingController,
    private tratamientoService: TratamientosService) {
    this.base_url = config.get_base_url();
    this.user1 = this.auth.getusuario();
    this.userid = this.user1.email;
    this.orders = this.http.get(`${this.base_url}my-prescriptions?email=${this.userid}`).subscribe((val: any) => {
      this.orden = val;
      for (let notVer of this.orden) {
        if (notVer.status === 1 || notVer.status === 2) {
          this.pendientes.push(notVer);
        } else if (notVer.status >= 4) {
          notVer.qualified = 0;
          this.completados.push(notVer);
        }
      }
      console.log('pendientes', this.pendientes);
      console.log('completados', this.completados);
    });
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['home']);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.tratamientoService.getTreatmen();
  }
  calificar(pedido) {
    console.log('pedido: ', pedido);
    for (let qual of this.completados) {
      if (pedido.id === qual.id) {
        qual.qualified = 1;
      }
    }

    console.log(': ', this.completados);
    this.calificado = true;
  }
  async logRatingChange(rates) {
    console.log('rates: ', rates);
    if (rates >= 4) {
      const alert = await this.alertController.create({
        message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">Tu opinión ha sido enviada.',
        mode: 'ios',
        cssClass: 'failed',
        buttons: [
          {
            text: 'Aceptar',
            handler: d => {
              this.calificado = false;
            },
            cssClass: 'btnalert',
          }
        ]
      });
      await alert.present();
    } else if (rates <= 3) {
      const input = await this.alertController.create({
        header: '¡Cuentanos tu opinión!',
        cssClass: 'failed',
        mode: 'ios',
        buttons: [
          {
            text: 'Enviar',
            cssClass: 'btnalert',
            handler: async (data) => {
              this.comentarios = data.comentario;
              this.user1 = this.auth.getusuario();
              this.userid = this.user1.email;
              this.nombre = this.user1.name;
              this.datatoSend = {
                name: this.nombre,
                phone: '',
                msg: this.comentarios,
                email: this.userid,
              };
              const loading = await this.loadingController.create({
                cssClass: 'loading',
                message: 'Por favor espera...',
                mode: 'ios',
                spinner: 'dots'
              });
              await loading.present();
              this.http.post(`${this.base_url}${this.postUrl}`, this.datatoSend).
                subscribe(async (val) => {
                  loading.dismiss();
                  this.code = val;
                  this.code2 = this.code.status;
                  if (this.code2 === 'SUCCESS') {
                    const alert = await this.alertController.create({
                      message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">Tu comentario fue enviado.',
                      mode: 'ios',
                      cssClass: 'failed',
                      buttons: [
                        {
                          text: 'Aceptar',
                          handler: d => {
                            this.calificado = false;
                          },
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
  }
  goOpen(ordenes) {

    let navigationExtras: NavigationExtras = {
      state: {
        user: ordenes,
      }
    };
    this.router.navigate(['request-open'], navigationExtras);
  }
  goClosed(completados) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: completados,
      }
    };
    this.router.navigate(['request-closed'], navigationExtras);
  }
  goPago(orden) {
    this.cart_med = orden.get_cart;
    this.id = orden.id;
    this.status = orden.status;
    console.log(orden);
    console.log(this.cart_med);
    this.invoice_i = this.cart_med[0].invoice_id;
    console.log(this.invoice_i);
    this.http.get(`${this.base_url}${this.payment_url}${this.invoice_i}/1?email=${this.userid}`).subscribe(pay => {
      this.ad = pay;
      this.address = this.ad.posted.address;
      this.linkpay = this.ad.preference.init_point;
      this.iab.create(this.linkpay, '_blank');
    });
  }
  async removeOrder(order) {

    const alert = await this.alertController.create({
      message: '<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert">¿Deseas eliminar el pedido?',
      mode: 'ios',
      cssClass: 'failed',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Si',
          cssClass: 'btnalert',
          handler: async data => {
            const loading = await this.loadingController.create({
              cssClass: 'loading',
              message: 'Por favor espera...',
              mode: 'ios',
              spinner: 'dots'
            });
            await loading.present();
            this.user = this.auth.getusuario();
            this.userid1 = this.user.email;
            this.http.get(`${this.base_url}user/pres-delete/${order.id}`).subscribe(async (val) => {
              this.estado = val;
              this.estado1 = this.estado.status;
              if (this.estado1 === 'SUCCESS') {
                loading.dismiss();
                for (let [index, p] of this.pendientes.entries()) {
                  if (p.id === order.id) {
                    this.pendientes.splice(index, 1);
                  }
                }
                const alert2 = await this.alertController.create({
                  message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">Se ha eliminado tu pedido',
                  mode: 'ios',
                  cssClass: 'failed',
                  buttons: [
                    { text: 'ok', cssClass: 'btnalert' }
                  ]
                });
                await alert2.present();
              }
            });
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
}
