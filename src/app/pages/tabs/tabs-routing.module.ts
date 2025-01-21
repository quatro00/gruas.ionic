import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tab-home/tab-home.module').then(m => m.TabHomePageModule)
      },
      {
        path: 'servicios',
        loadChildren: () => import('../tab-servicios/tab-servicios.module').then(m => m.TabServiciosPageModule)
      },
      {
        path: 'pagos',
        loadChildren: () => import('../tab-pagos/tab-pagos.module').then(m => m.TabPagosPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../tab-configuracion/tab-configuracion.module').then(m => m.TabConfiguracionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
