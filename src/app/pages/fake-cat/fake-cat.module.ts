import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FakeCatPageRoutingModule } from './fake-cat-routing.module';

import { FakeCatPage } from './fake-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FakeCatPageRoutingModule
  ],
  declarations: [FakeCatPage]
})
export class FakeCatPageModule {}
