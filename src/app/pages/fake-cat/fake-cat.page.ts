import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-fake-cat',
  templateUrl: './fake-cat.page.html',
  styleUrls: ['./fake-cat.page.scss'],
})
export class FakeCatPage implements OnInit {

  apiUrl = `favorites`;
  apiUrl2 = `medicine/load-medicine-web/1?term=`;
  apiUrl3 = `medicine/load-medicine-web/0?n=`;
  apiUrl4 = `medicine/search-medicine/1?cat=`;
  apiUrl5 = ``;
  apiUrl6 = `images/products/default.png`;
  apiUrl7 = `images/products/`;
  apiUrl8 = `.jpg`;

  fav: any;
  fav2: any;
  data: any;
  med2: any;
  med3: any;
  med4: any;
  med5: any;
  data1: any;
  err1: any;
  medis: any;
  imagen: any;
  searchres: any;
  searchres2: any;
  searchres3: any;
  searchres4: any;
  searchres5: any;
  base_url: any;
  categorias: any;


  constructor(private http: HttpClient, 
              private route: ActivatedRoute, 
              private config: ConfigService, 
              private router: Router,
              private menuCtrl: MenuController,
              private alertController: AlertController) { 

    this.base_url = config.get_base_url();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.categorias = this.router.getCurrentNavigation().extras.state.cat;
        console.log(this.categorias);
        this.http.get(`${this.base_url}${this.apiUrl}`).subscribe((favorito) => {
          this.fav = favorito;
          this.fav2 = this.fav.result.msg;
        });
        this.http.get(`${this.base_url}${this.apiUrl4}${this.categorias}&lab=icom`).subscribe((res) => {
          this.searchres = res;
          // this.searchres2 = this.searchres.result.status;
          this.searchres5 = this.searchres.result.msg;
          // console.log(this.searchres2);
          console.log(this.searchres5);

        });
        this.http.get(`${this.base_url}${this.apiUrl4}${this.categorias}&xlab=icom`).subscribe((res) => {
          this.searchres3 = res;
          this.searchres4 = this.searchres3.result.msg;
          console.log(this.searchres4);

        });
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async addToCart(){
    const alert = await this.alertController.create({
      message: `<img src = "../../assets/img/RECURSOS/iconos drazamed-27.png" class="alert1">Por favor inicia sesión`,
      mode: 'ios',
      cssClass: 'failed',
      backdropDismiss: false,
      buttons: [
        {
          text:'Ingresar',
          cssClass: 'btnalert',
          handler: login => {
            this.router.navigate(['login1']);
          }
        },
        {
          text:'Cancelar',
          cssClass: 'btnalert'
        }
      ]
    });
  
    await alert.present();
  }

  goBack(){
    this.router.navigate(['fake-home']);
  }

}
