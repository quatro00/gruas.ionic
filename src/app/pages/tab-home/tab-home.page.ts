import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { PagosService } from 'src/app/services/pagos.service';
import { ServicioService } from 'src/app/services/servicios.service';
import { Geolocation } from '@capacitor/geolocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotizacionComponent } from '../../components/cotizacion/cotizacion.component';
import { GruaService } from 'src/app/services/grua.service';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
  standalone:false
})
export class TabHomePage implements OnInit {

  lat: number = 0;
  lon: number = 0;

  servicioId:any='';
  cotizacionId:any='';
  tipo:any;
  serviciosProximos:any = 0;
  totalEnElMes:number = 0;
  serviciosDisponibles:any[]=[];
  gruas:any[]=[];

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviciosService:ServicioService,
    private pagosService:PagosService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private gruaService:GruaService,
    private toastController:ToastController
  ) { 
    this.loginForm = this.fb.group({
          costo: ['', Validators.required], // Campo requerido
          tiempo: ['', Validators.required], // Campo requerido
          grua: ['', Validators.required], // Campo requerido
        });
  }

  async enviaCotizacion() {
      // Muestra el loader
      const loading = await this.loadingController.create({
        message: 'Enviando cotización...',
        spinner: 'circles',
      });
      await loading.present();
  
      // Crea el objeto de la petición
      const loginRequest: any = {
        servicioId: this.servicioId, // Cambia por los valores reales del formulario
        gruaId: this.loginForm.value.grua,
        costo: this.loginForm.value.costo,
        tiempo: this.loginForm.value.tiempo
      };

      const loginRequest_modificar: any = {
        cotizacionId: this.servicioId, // Cambia por los valores reales del formulario
        gruaId: this.loginForm.value.grua,
        costo: this.loginForm.value.costo,
        tiempo: this.loginForm.value.tiempo
      };
      
      // Crear cotizacion
      if(this.tipo == 1){
        this.serviciosService.EnviarCotizacionProveedor(loginRequest).subscribe({
          next: async (response: any) => {
            await this.showToast('Cotización enviada correctamente.', 'success');
            this.modalController.dismiss();
            this.loadData();
            await loading.dismiss(); // Oculta el loader
  
            console.log(response,'respuesta');
          },
          error: async (err:any) => {
            //console.error(err.error.errors.error[0]);
            console.log(err,'error');
            await loading.dismiss(); // Oculta el loader incluso si ocurre un error
          },
        });
      }

      //modificar cotizacion
      if(this.tipo == 0){
        this.serviciosService.ModificarCotizacionProveedor(loginRequest_modificar).subscribe({
          next: async (response: any) => {
            await this.showToast('Cotización modificada correctamente.', 'success');
            this.modalController.dismiss();
            this.loadData();
            await loading.dismiss(); // Oculta el loader
  
            console.log(response,'respuesta');
          },
          error: async (err:any) => {
            //console.error(err.error.errors.error[0]);
            console.log(err,'error');
            await loading.dismiss(); // Oculta el loader incluso si ocurre un error
          },
        });
      }


      
      
    }

  async openModal(servicioId:any, tipo:any) {
    this.tipo = tipo;
    this.servicioId = servicioId;
    this.cotizacionId = servicioId;

    const modalElement = document.getElementById('modal-cotizacion') as HTMLIonModalElement;
    if (modalElement) {
      await modalElement.present();
    }
  }
  ngOnInit() {
    
    this.getLocation();
    this.loadData();
  }

  async showToast(message: string, tipo:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top', // Muestra el mensaje en la parte superior
      color: tipo, // Color del toast (puede ser "primary", "success", "danger", etc.)
    });
    await toast.present();
  }

  onCotizar(){

  }

  close(){
    this.modalController.dismiss();
  }

  close1(){
    this.modalController.dismiss();
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
      this.pagosService.GetPagosMensuales(),
      this.gruaService.GetGruasProveedor()
    ]).subscribe({
      next: ([
        serviciosProximosResponse,
        getServiciosDisponiblesResponse,
        pagosMensualesResponse,
        getGruasProveedorResponse
      ]) => {
        this.serviciosProximos = serviciosProximosResponse.length;
        this.serviciosDisponibles = getServiciosDisponiblesResponse;
        this.gruas = getGruasProveedorResponse;
        
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
