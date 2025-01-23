import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss'],
  standalone: false
})
export class CotizacionComponent {
  tiempoDeArribo: string = '';
  costo: number | null = null;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
  
  submitForm() {
    this.modalController.dismiss({
      tiempoDeArribo: this.tiempoDeArribo,
      costo: this.costo,
    });
  }
}