import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MispedidosPageRoutingModule } from './mispedidos-routing.module';

import { MispedidosPage } from './mispedidos.page';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    MispedidosPageRoutingModule
  ],
  declarations: [MispedidosPage]
})
export class MispedidosPageModule {}
