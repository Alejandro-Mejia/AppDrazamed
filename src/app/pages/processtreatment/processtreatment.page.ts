import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import * as moment from 'moment';
import { MenuController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-processtreatment',
  templateUrl: './processtreatment.page.html',
  styleUrls: ['./processtreatment.page.scss'],
})
export class ProcesstreatmentPage implements OnInit {

  porcentaje: any;
  restante: any;
  alarma: any;
  apiUrl7 = `images/products/`;
  apiUrl8 = `.jpg`;
  base_url: any;
  tomadas: any;
  faltantes: any;
  taken: any;
  fecha: any;
  imgUrl = `images/products/default.png`;
  apiImg = `images/products/`;
  error1: any;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private config: ConfigService, 
    public menuCtrl: MenuController, 
    private http:HttpClient) {
    this.base_url = config.get_base_url();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.alarma = this.router.getCurrentNavigation().extras.state.user;
        this.http.get(`${this.base_url}${this.apiImg}${this.alarma.item_code}${this.apiUrl8}`).subscribe((val) => {

        }, async (err: HttpErrorResponse) => {
          this.error1 = err.status;
          console.log(this.error1);
          if(this.error1 === 404){
            this.alarma.imagen = true;
          }
          else{
            this.alarma.imagen = false;
          }
        });
        this.fecha = moment(this.alarma.next_date).format('L')
        console.log(this.alarma);
        this.taken = this.alarma.taken;
        this.porcentaje = (this.taken / this.alarma.total) * 100;
        this.restante = Math.ceil(100 - this.porcentaje);
        this.faltantes = this.alarma.total - this.taken;
        console.log('Se ha tomado ' + this.taken);
      }
    });

    /*this.taken = this.pastillas - 1;
    console.log(this.taken);
    this.porcentaje = (this.taken / this.pastillas) * 100;
    this.restante = 100 - this.porcentaje;*/
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  goHome() {
    this.router.navigate(['perfil']);
  }
  goPerfil() {
    this.router.navigate(['perfil']);
  }
}