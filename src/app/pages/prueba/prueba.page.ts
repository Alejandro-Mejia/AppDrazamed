import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ConfigService } from 'src/app/services/config.service';
import * as moment from 'moment';
import { AlertController, LoadingController, MenuController, Platform } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

import { Observable, Subject, timer, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {


  apiUrl7 = `images/products/`;
  apiUrl8 = `.jpg`;
  intervalo = [{ id: 4, name: '4 Horas' }, { id: 8, name: '8 Horas' }, { id: 12, name: '12 Horas' }, { id: 16, name: '16 Horas' },
  { id: 24, name: '24 Horas' }, { id: 48, name: '48 Horas' }, { id: 72, name: '72 Horas' }];

  dosis = [1, 2, 3, 4, 5];

  intervaloNumber: number;
  fecha: any = 0;
  hora: any = 0;
  base_url: any;
  user1: any;
  userid: any;

  alarmas: any;
  items: any;
  loop: any;
  currentnot: any;
  status: any;
  currentnot1: any;
  currentnot3: any;
  tratamiento: any;
  freq: any;
  response: any;
  medicamento: any;
  imgUrl = `images/products/default.png`;
  apiImg = `images/products/`;
  error1: any;

  constructor(private router: Router, private route: ActivatedRoute, private config: ConfigService,
    public menuCtrl: MenuController, private loadingController: LoadingController,
    private alertCtrl: AlertController, private formBuilder: FormBuilder, private storage: Storage,
    private tratamientoService: TratamientosService, private htpp: HttpClient, private auth: AuthService,
    private http: HttpClient, private plt: Platform) {
    this.base_url = config.get_base_url();
    this.user1 = this.auth.getusuario();
    this.userid = this.user1.email
  }
  alarmasForm = this.formBuilder.group({
    obs: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    freq: new FormControl('', [Validators.required]),
    dosis: new FormControl('', [Validators.required]),
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
      item_name: this.items.item_name,
      obs: this.items.item_name,
      composition: this.items.composition,
      units: this.items.units,
      toma: 'T0',
      dosis: ''
    };
    console.log('json inicial');
    console.log(this.alarmas);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  goBack() {
    this.router.navigate(['createalarm']);
  }

  doSomething(fecha) {
    moment(fecha).format('YYYY-MM-DD');
  }
  doSomethingh(hora) {
    moment(hora).format('LTS');
  }

  async load() {
    let loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Por favor espera...',
      mode: 'ios',
      spinner: 'dots',
      duration: 50
    });
    await loading.present();
  }

  async createAlarm() {
    this.alarmas.time = moment(this.alarmas.time).format('HH:mm')
    this.tratamiento = {
      email: this.userid,
      item_code: this.items.item_code,
      total: this.items.units_value,
      dosis: this.alarmas.dosis,
      freq: this.freq,
      start_time: `${this.alarmas.date}T${this.alarmas.time}:00`,
      obs: `${this.items.item_name}, tomar ${this.alarmas.dosis} cada ${this.freq} horas`
    };
    let loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Por favor espera...',
      mode: 'ios',
      spinner: 'dots',
      duration: 50
    });
    await loading.present();
    console.log(this.tratamiento);
    this.http.post(`${this.base_url}treatment/create-treatment`, this.tratamiento).pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe(async (msj) => {
      console.log(msj);
      this.response = msj;
      this.medicamento = this.response.data;
      console.log(this.medicamento)
      let alert = await this.alertCtrl.create({
        message: '<img src = "../../assets/img/RECURSOS/check.png" class="alert">La alarma fue creada.',
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
      let next = this.medicamento.next_time
      this.alarmas.taken = this.medicamento.taken;
      this.alarmas.total = this.medicamento.total;
      this.alarmas.next_time = moment(this.medicamento.next_time).format('LT');
      this.alarmas.item_code = this.medicamento.item_code;
      this.alarmas.buy_time = moment(this.medicamento.buy_time.date).format('ll');
    //this.alarmas.dosis = this.medicamento.dosis;
     /*  this.tratamientoService.addAlarm(this.alarmas);
      this.tratamientoService.TimeRemaining(this.alarmas.item_code, next); */
      this.tratamientoService.getTreatmen();
      console.log(this.alarmas);
      this.router.navigate(['home']);
      this.alarmasForm.reset();
      this.status = {
        email: this.userid,
	      item_code: this.medicamento.item_code,
	      active: true
      }
      this.http.post(`${this.base_url}treatment/update-active-status`, this.status).subscribe(respuesta => {
      console.log('Tratamiento activo: ', respuesta);
      });
    });
  }

  check(id) {
    let pastillas = 0;
    pastillas = this.alarmas.total;
    let horas_totales = 0;
    horas_totales = this.alarmas.freq * pastillas;
    let dateObjetive2 = new Date(`${this.alarmas.date}T${this.alarmas.time}`);
    let nowstart = new Date();
    let nowstart2 = moment(nowstart);
    let dateObjetive3 = moment(dateObjetive2);
    let endDate = moment(dateObjetive2).add(horas_totales, 'hours').format();
    let proxima = moment(endDate).subtract(48, 'hours').format('YYYY-MM-DD');
    console.log('Fecha final' + ' ' + endDate);
    console.log('Proxima entrega' + ' ' + proxima);
  }

}
