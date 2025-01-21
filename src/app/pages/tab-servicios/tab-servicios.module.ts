import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabServiciosPageRoutingModule } from './tab-servicios-routing.module';

import { TabServiciosPage } from './tab-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabServiciosPageRoutingModule
  ],
  declarations: [TabServiciosPage]
})
export class TabServiciosPageModule {}
