import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPagosPageRoutingModule } from './tab-pagos-routing.module';

import { TabPagosPage } from './tab-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPagosPageRoutingModule
  ],
  declarations: [TabPagosPage]
})
export class TabPagosPageModule {}
