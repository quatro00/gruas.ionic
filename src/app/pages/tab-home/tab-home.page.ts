import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { PagosService } from 'src/app/services/pagos.service';
import { ServicioService } from 'src/app/services/servicios.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
  standalone:false
})
export class TabHomePage implements OnInit {

  lat: number = 0;
  lon: number = 0;

  serviciosProximos:any = 0;
  totalEnElMes:number = 0;
  serviciosDisponibles:any[]=[];

  constructor(
    private serviciosService:ServicioService,
    private pagosService:PagosService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadData();
    this.getLocation();
  }

  onCotizar(){

  }

  async getLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.lat = coordinates.coords.latitude;
      this.lon = coordinates.coords.longitude;
      console.log('Latitud:', this.lat, 'Longitud:', this.lon);
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  }

  calculateDistance(lat1:number, lon1:number, lat2:number, lon2:number) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /*
  const providerLat = 19.4326; // Latitud del proveedor
const providerLon = -99.1332; // Longitud del proveedor

services.sort((a, b) => {
  const distanceA = calculateDistance(providerLat, providerLon, a.latitude, a.longitude);
  const distanceB = calculateDistance(providerLat, providerLon, b.latitude, b.longitude);
  return distanceA - distanceB;
});

*/
  async loadData() {

    const loading = await this.loadingController.create({
      message: 'Espere...',
      spinner: 'circles',
    });
    await loading.present();


    forkJoin([
      this.serviciosService.GetServiciosProximos(),
      this.serviciosService.GetServiciosDisponibles(),
      this.pagosService.GetPagosMensuales()
    ]).subscribe({
      next: ([
        serviciosProximosResponse,
        getServiciosDisponiblesResponse,
        pagosMensualesResponse
      ]) => {
        this.serviciosProximos = serviciosProximosResponse.length;
        this.serviciosDisponibles = getServiciosDisponiblesResponse;

        console.log('sin ordenar', this.serviciosDisponibles);
        console.log(this.lat, this.lon);
        if(this.lat != 0 && this.lon != 0){
          this.serviciosDisponibles = this.serviciosDisponibles.sort((a, b) => {
            const distanceA = this.calculateDistance(this.lat, this.lon, a.latOrigen, a.lonOrigen);
            const distanceB = this.calculateDistance(this.lat, this.lon, b.latOrigen, b.lonOrigen);
            return distanceA - distanceB;
          });

          console.log('ordenados', this.serviciosDisponibles);
        }
        


        pagosMensualesResponse.forEach((element:any) => {
          this.totalEnElMes = this.totalEnElMes + element.monto;
        });
        
      },
      complete: () => {
        loading.dismiss();
        //this.isLoading = false;
        //this.showContent = true;
      },
      error: () => {
        loading.dismiss();
        //this.isLoading = false;
        // Maneja el error si es necesario
        //this.msg.error("Ocurrio un error inesperado.");
      }
    });
  }
}
