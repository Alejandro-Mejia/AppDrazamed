import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {

  alarm = [];
  alarmas = [];
  proxima = [];
  prox: any;
  key = 'getAlarma';
  apiUrl = `my-treatments?email=`
  base_url: any;
  user1: any;
  user: any;
  cartUrl = `medicine/add-cart/0?`;
  userid: any;
  items: any;
  items3: any;
  tratamiento: any;
  cart2 =[];
  del: any;
  items2 = [];
  proxPedido = [];
  next_time: any;
  intervalos: any = [];
  mycart = `my-cart-app?email=`;

  constructor(private storage: Storage, private platform: Platform, private http: HttpClient, private config: ConfigService,
    private auth: AuthService, private localNotifications: LocalNotifications) {
    this.base_url = config.get_base_url();
  }

  getTreatmen() {
    for (let tim of this.alarm) {
      clearInterval(this.intervalos[tim.item_code]);
    }
    this.proxPedido.splice(0, this.proxPedido.length);
    this.proxima.splice(0, this.proxima.length);
    this.alarm.splice(0, this.alarm.length);
    this.items2.splice(0, this.items2.length);
    this.user1 = this.auth.getusuario();
    this.userid = this.user1.email;
    this.http.get(`${this.base_url}${this.apiUrl}${this.userid}`).subscribe(val => {
      this.items = val;
      for (let item of this.items) {
        let next_date = item.next_time;
        item.next_time = moment(item.next_time).format('LT');
        item.medicines[0].next_time = item.next_time;
        item.medicines[0].next_date = next_date;
        item.medicines[0].dosis = item.dosis;
        item.medicines[0].frequency = item.frequency;
        item.medicines[0].taken = item.taken;
        item.medicines[0].total = item.total;
        if(item.active == 1){
          item.medicines[0].active = true;
        }else{
          item.medicines[0].active = false;
        }
        item.medicines[0].buy_time = moment(item.buy_time).format();
        item.medicines[0].isReorden = item.hasReorden;
        this.items3 = item.medicines
        for (var i = 0; i < this.items3.length; i++) {
          this.items2.push(this.items3[i]);
          this.alarm = this.items2;
        }
      }
      for (let time of this.alarm) {
        if(time.next_date !== null){
          this.proxima.push(time.buy_time);
          }
        this.TimeRemaining(time.item_code, time.next_date);
      }
      console.log(this.alarm);
      this.prox = 0;
      console.log(': this.proxima', this.proxima);
      let prxFormatted = this.proxima.map(f => moment(f));
      this.prox = moment.min(prxFormatted).format('ll');
      console.log('this.prox: ', this.prox);
      this.setCurrentPedido(this.alarm);
    });
  }
  getAlarma() {
    return this.alarm;
  }
  proximaEntrega(){
    return this.prox;
  }
  TimeRemaining(item_code, next_time) {
    if (next_time !== null) {
      let alarma = {
        timeH: 0,
        timeM: 0,
        timeD: 0,
        item_code: item_code,
        taken: 0
      };
      this.intervalos[item_code] = setInterval(() => {

        let dateObjective = moment(next_time);
        let now = moment();
        let timeleft = 0;
        timeleft = dateObjective.diff(now);

        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor(((timeleft % (1000 * 60 * 60)) / (1000 * 60)) + 1);
        if (minutes !== 60) {
          alarma.timeH = hours;
          alarma.timeM = minutes;
          alarma.timeD = days;
          // console.log("Dias:", days, "Minutos:", minutes, "Horas:", hours);
          this.addAlarm(alarma);
        } else {
          alarma.timeH = hours + 1;
          alarma.timeM = 0;
          alarma.timeD = days;
          this.addAlarm(alarma);
        }
        if (timeleft < 0) {
          alarma.timeH = 0;
          alarma.timeM = 0;
          alarma.timeD = 0;
          console.log(alarma);
          clearInterval(this.intervalos[item_code]);
          this.addAlarm(alarma);
          //  this.TimeRemaining(item_code, next_time);
        }
      }, 1000)
    } else {
      let alarma = {
        timeH: 0,
        timeM: 0,
        timeD: 0,
        item_code: item_code,
        taken: 0
      };
      alarma.timeH = 0;
      alarma.timeM = 0;
      alarma.timeD = 0;
      console.log(alarma);
      this.addAlarm(alarma);
    }
  }

  addAlarm(alarma) {
    //console.log(alarma);
    let added = false;
    for (let alar of this.alarm) {
      if (alar.item_code === alarma.item_code) {
        if (alarma.taken !== 0) {
          alar.taken += alarma.taken;
          break;
        } else {
          alar.taken += 0;
          break;
        }
      }
    }
    for (let al of this.alarm) {
      if (al.item_code === alarma.item_code) {
        al.timeM = alarma.timeM;
        al.timeH = alarma.timeH;
        al.timeD = alarma.timeD;
      }
      added = true;
    }
    if (!added) {
      this.alarm.push(alarma);
      console.log(this.alarm);
    }

  }

  removeAlarm(alarma) {
    for (let [index, p] of this.alarm.entries()) {
      if (p.item_code === alarma.item_code) {
        this.alarm.splice(index, 1);
        clearInterval(this.intervalos[alarma.item_code]);
        this.user1 = this.auth.getusuario();
        this.userid = this.user1.email;
        this.del = {
          email: this.userid,
          item_code: alarma.item_code
        };
        this.http.post(`${this.base_url}treatment/delete-treatment`, this.del).subscribe((val) => {
          console.log(val);
          //this.getTreatmen();
        });
      }
    }
  }


  setCurrentPedido(treatment: any[]) {
    this.user1 = this.auth.getusuario();
    this.userid = this.user1.email;
    if (this.proxPedido.length !== 0) {
      for (let trt of treatment) {
        for (let trt2 of this.proxPedido) {
          if (trt.isReorden !== 1) {
            if (trt2.item_code !== trt.item_code) {
              this.proxPedido.push(trt);
              
              break;
            }
          }
        }
      }
    } else {
      for (let trt of treatment) {
        if (trt.isReorden !== 1) {
          this.proxPedido.push(trt);
          this.http.get(`${this.base_url}${this.mycart}${this.userid}`).subscribe((val) => {
                this.items = val;
                // this.cart = this.items.items;
                this.cart2 = this.items.items;
                for (let NormalCart of this.cart2) {
                  if (NormalCart.isReorden === 1) {
                    this.proxPedido.push(NormalCart);
                  }
                }
              });
        }
      }
    }
  }
  getProxPedido() {
    return this.proxPedido;
  }
  addMedProxPedido(product) {
    let added = false;
    for (let p of this.proxPedido) {
      if (p.item_code == product.item_code) {
        added = true;
        break;
      }
    }
    if (!added) {
      this.proxPedido.push(product);
      this.user = this.auth.getusuario();
      this.userid = this.user.user_id;
      this.http.get(`${this.base_url}${this.cartUrl}id=${product.id}&medicine=${product.value || product.name}&med_quantity=1&is_reorden=1&hidden_item_code=${product.item_code}
      &hidden_selling_price=${product.mrp}&pres_required=${product.is_pres_required}&user_id=${this.userid}`).subscribe((val) => {
        console.log(val);
      });
    }
  }
  rmMedProxPedido(medicine) {
    for (let [index, p] of this.proxPedido.entries()) {
      if (p.item_code === medicine.item_code) {
        this.proxPedido.splice(index, 1);
      }
    }
  }
  rmAllProx() {
    this.proxPedido.length = 0;
  }
}
