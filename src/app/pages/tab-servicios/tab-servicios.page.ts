import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ServicioService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-tab-servicios',
  templateUrl: './tab-servicios.page.html',
  styleUrls: ['./tab-servicios.page.scss'],
  standalone:false
})
export class TabServiciosPage implements OnInit {
  darkMode = false;
  serviciosProximos:any[]=[];
  constructor(
    private fb: FormBuilder,
        private serviciosService:ServicioService,
        private loadingController: LoadingController,
        private modalController: ModalController,
        private toastController:ToastController
  ) { }

  ngOnInit(): void {
    this.checkAppMode();
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Espere...',
      spinner: 'circles',
    });
    await loading.present();

    forkJoin([
          this.serviciosService.GetServiciosProximos()
        ]).subscribe({
          next: ([
            serviciosProximosResponse,
          ]) => {
            this.serviciosProximos = serviciosProximosResponse;
            console.log(this.serviciosProximos);
            
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


  

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    // const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  selectedseg: string = 'Upcoming';
  selectTab(event: CustomEvent) {
    this.selectedseg = event.detail.value;
  }
}