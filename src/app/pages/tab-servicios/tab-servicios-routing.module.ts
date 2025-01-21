import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabServiciosPage } from './tab-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: TabServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabServiciosPageRoutingModule {}
