import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FakeCatPage } from './fake-cat.page';

const routes: Routes = [
  {
    path: '',
    component: FakeCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FakeCatPageRoutingModule {}
