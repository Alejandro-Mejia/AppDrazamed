import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-edit-alarm',
  templateUrl: './edit-alarm.page.html',
  styleUrls: ['./edit-alarm.page.scss'],
})
export class EditAlarmPage implements OnInit {
  items: any;
  base_url: any;
  apiUrl7 = `images/products/`;
  apiUrl8 = `.jpg`;
  alarmas: any;
  intervaloNumber: number;
  fecha: any;
  user1: any;
  userid: any;
  hora: any;
  freq: any;
  tratamiento: any;
  imgUrl = `images/products/default.png`;
  apiImg = `images/products/`;
  error1: any;

  constructor(private config: ConfigService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private auth: AuthService, private http: HttpClient, private tratamientoService: TratamientosService,
              private alertCtrl: AlertController, public menuCtrl: MenuController) {
    this.base_url = config.get_base_url();
  }

  intervalo = [{ id: 4, name: '4 Horas' }, { id: 8, name: '8 Horas' }, { id: 12, name: '12 Horas' }, { id: 16, name: '16 Horas' },
  { id: 24, name: '24 Horas' }, { id: 48, name: '48 Horas' }, { id: 72, name: '72 Horas' }];

  dosis = [1, 2, 3, 4, 5];

  alarmasForm = this.formBuilder.group({
    mensaje: ['', [Validators.required]],
    time: ['', [Validators.required]],
    date: ['', [Validators.required]],
    freq: ['', [Validators.required]],
    dosis: ['', [Validators.required]]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.items = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.items);
        this.http.get(`${this.base_url}${this.apiImg}${this.items.item_code}${this.apiUrl8}`).subscribe((val) => {

        }, async (err: HttpErrorResponse) => {
          this.error1 = err.status;
          console.log(this.error1);
          if(this.error1 === 404){
            this.items.imagen = true;
          }
          else{
            this.items.imagen = false;
          }
        });
      }
    });
    this.fecha = moment().format('YYYY-MM-DD');
        this.hora = moment().format('LTS');
        this.freq = this.intervaloNumber;
        this.alarmas = {
          date: moment(this.fecha).format('YYYY-MM-DD'),
          time: '',
          mensaje: this.items.item_name,
          item_name: this.items.item_name,
          composition: this.items.composition,
          item_code: this.items.item_code,
          dosis: ''
        };
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  doSomething(date) {
    moment(date).format('YYYY-MM-DD');
  }
  doSomethingh(time) {
    moment(time).format('LT');
  }
  goBack(){
    this.router.navigate(['perfil']);
  }
  editAlarm(){
    this.user1 = this.auth.getusuario();
    this.userid = this.user1.email;
    this.alarmas.time = moment(this.alarmas.time).format('HH:mm')
    this.tratamiento = {
      email: this.userid,
      item_code: this.items.item_code,
      dosis: this.alarmas.dosis,
      freq: this.freq,
      start_time: `${this.alarmas.date}T${this.alarmas.time}:00`,
    };
    console.log(this.tratamiento);
    this.http.post(`${this.base_url}treatment/edit-treatment`, this.tratamiento).subscribe(async (res) => {
      console.log(res)
      let response: any;
      response = res;
      const response1 = response.status;
      if(response1 === 'SUCCESS'){
        let alert = await this.alertCtrl.create({
          message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">La alarma fue editada.',
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
        this.tratamientoService.getTreatmen(); 
        this.router.navigate(['perfil']); 
        this.alarmasForm.reset();
      }
    });
  }
}
