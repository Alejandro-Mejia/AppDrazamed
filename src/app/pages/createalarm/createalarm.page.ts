import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-createalarm',
  templateUrl: './createalarm.page.html',
  styleUrls: ['./createalarm.page.scss'],
})
export class CreatealarmPage implements OnInit {
  @Output() itemSelected = new EventEmitter<string>();
  @ViewChild('searchBarInput', { static: true }) searchbarInput: string;

  isItemAvailable = false;
  base_url: any;
  user: any;
  apiUrl7 = `images/products/`;
  apiUrl8 = `.jpg`;
  userid: any;
  pedidos: any;
  items2 = [];
  items5 = [];
  items7 = [];
  items3: any;
  items4: any;
  items: any[] = [];
  imgUrl = `images/products/default.png`;
  apiImg = `images/products/`;
  error1: any;

  constructor(private router: Router, private http: HttpClient, private config: ConfigService, private auth: AuthService,
    public menuCtrl: MenuController) {
    this.isItemAvailable = true;
    this.base_url = config.get_base_url();
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.user = this.auth.getusuario();
    this.userid = this.user.email;
    this.http.get(`${this.base_url}my-prescriptions?email=${this.userid}`).subscribe((res) => {
      
      this.pedidos = res;
      console.log('this.pedidos: ', this.pedidos);
      

      for (let item of this.pedidos) {
        this.items3 = item.get_cart;
        if(item.status === 4 || item.status === 5){
        for (var i = 0; i < this.items3.length; i++) {
          this.items2.push(this.items3[i]);
        }
      }
      }

      for (let uni of this.items2) {
        if (uni.units !== 'ML' && uni.units !== 'NoD' && uni.units !== 'GR') {
          this.items5.push(uni);
        }
      }
      console.log(this.items5);
      let a = [];
      for (let items of this.items5) {
        let infoMed = {
          composition: items.composition,
          units: items.units,
          units_value: items.units_value,
          item_code: items.item_code,
          item_name: items.item_name
        }
        a.push(infoMed);
      }
      this.items7 = a.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return index === a.findIndex(obj => {
          return JSON.stringify(obj) === _thing;
        });
      });
      console.log(': ', this.items7);
      if(this.pedidos !== ''){
        this.initializeItems();
      }
    });
  }
  initializeItems() {

    this.items = this.items7;
    console.log('this.items: ', this.items);
    for(let imgs of this.items){
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
  }
  goBack() {
    this.router.navigate(['mipastillero']);
  }

  updateAlarm() {

  }
  getItems(ev: any) {

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items7.filter((item: any) => {
        return (item.item_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.isItemAvailable = true;
    }
  }
  fillSearchbarText(item) {
    this.searchbarInput = item.item_name;
    this.itemSelected.emit(item.item_name);
    this.items4 = item;
    let navigationExtras: NavigationExtras = {
      state: {
        user: item
      }
    };
    this.router.navigate(['prueba'], navigationExtras);
    this.searchbarInput = '';
  }

}
