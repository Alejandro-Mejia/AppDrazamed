import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {

  alarm = [];
  alarmas = [];
  key = 'alarmas1';
  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() =>{
      this.storage.get(this.key).then(val => {
         this.alarm = val;
      });
    });
  }

  getAlarma(){
    return this.alarm;
  }


  addAlarm(alarma){
    const added = false;
    if (!added){
      this.alarm.push(alarma);
    }
    this.storage.set(this.key, this.alarm);
  }

  removeAlarm(){

  }
}