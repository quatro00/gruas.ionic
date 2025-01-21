import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabConfiguracionPage } from './tab-configuracion.page';

const routes: Routes = [
  {
    path: '',
    component: TabConfiguracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabConfiguracionPageRoutingModule {}
