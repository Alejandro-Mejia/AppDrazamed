import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FakeHomePageRoutingModule } from './fake-home-routing.module';

import { FakeHomePage } from './fake-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FakeHomePageRoutingModule
  ],
  declarations: [FakeHomePage]
})
export class FakeHomePageModule {}
