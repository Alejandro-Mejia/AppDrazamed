import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';


import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service'


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  code: any;
  code2: any;
  user: any;
  images = [];
  userid: any;
  mycart: any;
  cantidad = [];
  item_code = [];
  formula = [];
  base_url: any;
  constructor(private router: Router, private menuCtrl: MenuController, private cartService: CartService,
    private alertCtrl: AlertController, private camera: Camera,private http: HttpClient,
    private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private platform: Platform, private auth: AuthService, private config: ConfigService) {
    this.base_url = config.get_base_url();
    this.mycart = this.cartService.getCurrent();
    console.log(this.mycart);
  }

  imgUrl = `images/products/default.png`;
  apiImg = `images/products/`;
  apiUrl8 = `.jpg`;
  delete_cart = `empty-cart?email=`;
  subtotal: any;
  formulaImage: any = "";
  subtotal1: any;
  cart = [];
  user1: any;
  tax: any;
  tax1: any;
  value: any;
  name: any;
  text: any;
  requiredFormula = false;
  total: any;
  orden: any;
  err1: any;
  med: any;
  tax2: any;
  division: any;
  subtotal2: any;
  error1: any;
  async ngOnInit() {
  }

  goPerfil() {
    this.router.navigate(['perfil']);
  }
  async ionViewWillEnter() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
    for(let imgs of this.cart){
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
    console.log(this.cart);
    this.menuCtrl.enable(false);
    this.user = this.auth.getusuario();
    this.userid = this.user.email;
    console.log(this.userid);
    for (const formula of this.cart) {
      if (formula.is_pres_required === 1) {
        this.requiredFormula = true;
        this.value = formula.value;
        this.name = formula.name;
        this.med = formula.medicine_name;
        this.text = `El medicamento ${this.value || this.name || this.med} requiere adjuntar fórmula médica.`;
        const alert = await this.alertCtrl.create({
          header: this.text,
          message: '<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert">',
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
      }else{
        this.requiredFormula = false;
      }
    }
  }
  goHome() {
    this.router.navigate(['home']);
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
    this.ionViewWillEnter();
  }

  getSubTotal() {
    return this.cart.reduce((i, j) => i + (j.unit_price * j.medicine_count || + j.mrp * j.medicine_count), 0);
  }
  getTotal() {
    if (this.cart.length !== 0) {
      return this.getSubTotal() + 2000;
    }
    else {
      return 0;
    }
  }
  getTax() {
    this.subtotal = 0;
    this.subtotal1 = 0;
    for (let ta of this.cart) {
      this.total = (ta.mrp * ta.medicine_count || ta.unit_price * ta.medicine_count);
      this.tax1 = ta.tax ? ta.tax : 0;
      this.subtotal = Math.floor(this.total / (((100) + this.tax1) / 100));
      this.subtotal1 += this.subtotal;
    }
    return this.subtotal1;
  }
  envio() {
    if (this.cart.length === 0) {
      return 0;
    }
    else {
      return 2000;
    }
  }
  impuesto() {
    return this.getSubTotal() - this.getTax();
  }
  goBuscar() {
    this.router.navigate(['medicamentos']);
  }


  // --------------------- codigo para subir formula
  async showAlert1() {
    const alert = await this.alertCtrl.create({

      message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert1">Tu fórmula ha sido subida correctamente',
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

  async showAlert2() {
    const alert = await this.alertCtrl.create({
      message: '<img src = "../../assets/img/RECURSOS/wrong.png" class="alert1">Ha ocurrido un error al subir tu fórmula, intenta de nuevo',
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

  async showAlert3() {
    const alert = await this.alertCtrl.create({
      
      message: `<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert1">${this.text}`,
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

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una imagen',
      mode: 'ios',
      buttons: [{
        text: 'Buscar en galeria',
        handler: () => {
          this.galeria();
          /* this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY); */
        }
      },
      {
        text: 'Usar camara',
        handler: () => {
          this.foto();
          /* this.takePicture(this.camera.PictureSourceType.CAMERA); */
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  foto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.formulaImage = 'data:image/jpeg;base64,' + imageData;
      this.requiredFormula = false;
    }, (err) => {
      console.log(err);
    });
  }

  galeria() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.formulaImage = 'data:image/jpeg;base64,' + imageData;
      this.requiredFormula = false;
    }, (err) => {
      console.log(err);
    });
  }

  removeFormula(){
    this.formulaImage="";
  }

  // --------------------- codigo para crear una orden.


  async send() {
    const alert1 = await this.alertCtrl.create({
      
      message: `<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert1">Tu orden será entregada entre 24 y 48 horas`,
      mode: 'ios',
      cssClass: 'failed',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          cssClass: 'btnalert',
          handler: async r => {
            if(this.requiredFormula == true){
              this.showAlert3();
                }else{
                const loading = await this.loadingController.create({
                  cssClass: 'loading',
                  message: 'Por favor espera...',
                  mode: 'ios',
                  spinner: 'dots'
                });
                await loading.present();
            
                this.user1 = this.auth.getusuario();
                this.userid = this.user1.email;
                console.log(this.formulaImage);
                for (let code of this.cart) {
                  this.item_code.push(code.item_code);
                  this.cantidad.push(code.medicine_count);
                  this.formula.push(code.is_pres_required);
                }
                this.orden = {
                  email: this.userid,
                  cart_length: this.cart.length,
                  shipping_cost: 2000,
                  quantity: this.cantidad,
                  is_pres_required: 0,
                  item_code: this.item_code,
                  prescription: this.formulaImage
                };
                this.http.post(`${this.base_url}medicine/store-prescription/0`,
                  this.orden, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
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
                            handler: (data) => { this.router.navigate(['mispedidos']); }
                          }
                        ]
                      });
            
                      this.http.get(`${this.base_url}${this.delete_cart}${this.userid}`).subscribe(val => {
                        console.log(val);
                      });
                      this.cartService.removeAll();
                      this.formulaImage = "";
                      this.requiredFormula = false;
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
        },
        {
          text: 'Cancelar',
          cssClass: 'btnalert',
        }
      ]
    });
    await alert1.present();
    
  }
}
