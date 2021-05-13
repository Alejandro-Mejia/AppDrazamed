import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FakeHomePage } from './fake-home.page';

const routes: Routes = [
  {
    path: '',
    component: FakeHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FakeHomePageRoutingModule {}
