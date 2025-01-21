import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabConfiguracionPageRoutingModule } from './tab-configuracion-routing.module';

import { TabConfiguracionPage } from './tab-configuracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabConfiguracionPageRoutingModule
  ],
  declarations: [TabConfiguracionPage]
})
export class TabConfiguracionPageModule {}
