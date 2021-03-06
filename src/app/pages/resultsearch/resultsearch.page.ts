import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarritoPage } from '../carrito/carrito.page';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service'
import { TratamientosService } from 'src/app/services/tratamientos.service';


@Component({
  selector: 'app-resultsearch',
  templateUrl: './resultsearch.page.html',
  styleUrls: ['./resultsearch.page.scss'],
})
export class ResultsearchPage implements OnInit {


  apiUrl7 = `images/products/`;
  apiUrl8 = `.jpg`;
  imagen1 = `images/products/default.png`;
  cartItemCount: BehaviorSubject<number>;
  posteo: Observable<any>;
  imgUrl = [{ imagen: `images/products/default.png` }];
  data: any;
  data1: any;
  fromProx = false;
  formul: any[] = [];
  name: '';
  base_url: any;
  
  err1: any;
  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private cartService: CartService, 
    private menuCtrl: MenuController, 
    private router: Router,
    private config: ConfigService,
    private alertCtrl: AlertController,
    private tratamientoService: TratamientosService,
    private loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      this.base_url = config.get_base_url();
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        this.data1 = this.router.getCurrentNavigation().extras.state.formula;
        this.fromProx = this.router.getCurrentNavigation().extras.state.fromProx;
        console.log('fromProx: ', this.fromProx);
        console.log(this.data);
        if (this.data1 === 1) {
          this.formul = ['Se requiere formula'];
        } else {
          this.formul = ['No se requiere formula'];
        }
        for (let imgg of this.data) {
          this.http.get(`${this.base_url}${this.apiUrl7}${imgg.item_code}${this.apiUrl8}`).subscribe((val) => {

          }, async (err: HttpErrorResponse) => {
            this.err1 = err.status;
            console.log(this.err1);
          });
        }
      }
    });
  }
  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  goBack() {
    this.router.navigate(['medicamentos']);
  }
  goCarrito() {
    this.router.navigate(['carrito']);
  }

  async addToCart(product) {
    if(this.fromProx == false){
    this.cartService.addProduct(product);
    const alert = await this.alertCtrl.create({
      message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">Producto agregado con éxito',
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
      this.tratamientoService.addMedProxPedido(product);
      const loading = await this.loadingController.create({
        cssClass: 'loading',
        message: 'Por favor espera...',
        mode: 'ios',
        spinner: 'dots'
      });
      await loading.present();
      setTimeout(async() => {
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">Producto agregado con éxito',
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
       this.tratamientoService.getProxPedido();
       this.router.navigate(['proxima-entrega']);
      },2000)
    }
  }

  openCart() {
    this.router.navigate(['carrito']);
  }

  postData() {
    const postData = new FormData();
    postData.append('carro', this.name);
    this.posteo = this.http.post('http://localhost/httppost/json.php', postData);
    this.posteo.subscribe(data => {
      console.log(data);
    });
  }
}
