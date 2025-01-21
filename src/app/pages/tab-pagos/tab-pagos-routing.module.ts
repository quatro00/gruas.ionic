import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPagosPage } from './tab-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: TabPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPagosPageRoutingModule {}
