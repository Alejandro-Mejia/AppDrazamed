import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, IonRouterOutlet, IonSlides, MenuController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-fake-home',
  templateUrl: './fake-home.page.html',
  styleUrls: ['./fake-home.page.scss'],
})
export class FakeHomePage implements OnInit {

base_url: any;
public items: any;
public items2: any;
public items3: any;
public items4: any;

apiURL = `medicine/load-medicine-cats/0`;
apiURL2 = `favorites`;
apiURL3 = ``;
apiUrl7 = `images/products/`;
apiUrl8 = `.jpg`;
apiUrl1 = `images/products/default.png`;

@ViewChild('mySlider') slider: IonSlides;
sliderOpts = {
  autoplay: true,
  speed: 1000,
  zoom: {
    maxRatio: 5
  }
};

  constructor(
    private http: HttpClient, 
    private config: ConfigService,
    private menuCtrl: MenuController,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private alertController: AlertController) { 

    this.base_url = config.get_base_url();
    this.http.get(`${this.base_url}${this.apiURL}`).subscribe((response) => {
      this.items = response;
      this.items2 = this.items [0].result.msg;
  });

    this.http.get(`${this.base_url}${this.apiURL2}`).subscribe((response) => {
      this.items3 = response;
      this.items4 = this.items3.result.msg;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.routerOutlet.swipeGesture = false;
   }

   goCat(item: string){
    let navigationsExtras: NavigationExtras = {
      state : {
        cat: item
      }
    }
    this.router.navigate(['fake-cat'], navigationsExtras);
  }
  login(){
    this.router.navigate(['login1']);
  }
  async addMed(){
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

}
