import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tab-home',
    loadChildren: () => import('./pages/tab-home/tab-home.module').then( m => m.TabHomePageModule)
  },
  {
    path: 'tab-servicios',
    loadChildren: () => import('./pages/tab-servicios/tab-servicios.module').then( m => m.TabServiciosPageModule)
  },
  {
    path: 'tab-pagos',
    loadChildren: () => import('./pages/tab-pagos/tab-pagos.module').then( m => m.TabPagosPageModule)
  },
  {
    path: 'tab-configuracion',
    loadChildren: () => import('./pages/tab-configuracion/tab-configuracion.module').then( m => m.TabConfiguracionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
