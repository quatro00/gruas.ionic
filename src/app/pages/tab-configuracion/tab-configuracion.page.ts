import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { GruaService } from 'src/app/services/grua.service';
import { ServicioService } from 'src/app/services/servicios.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-tab-configuracion',
  templateUrl: './tab-configuracion.page.html',
  styleUrls: ['./tab-configuracion.page.scss'],
  standalone:false
})
export class TabConfiguracionPage implements OnInit {
  darkMode = false;
  gruas:any[]=[];
  razonSocial:any = '';
  direccion:any = '';
  rfc:any = '';
  nombre:any = '';
  nombreUsuario:any = '';
  telefono:any = '';
  correoElectronico:any = '';

  correo:any = 'soporte@serviciosmc.mx';

  constructor(
    private fb: FormBuilder,
        private usuariosService:UsuariosService,
            private loadingController: LoadingController,
            private servicioService: ServicioService,
            private gruaService: GruaService,
            private toastController:ToastController
  ) { }

  ngOnInit(): void {
    this.checkAppMode();
    this.loadData();
  }

  async loadData(){
    const loading = await this.loadingController.create({
      message: 'Espere...',
      spinner: 'circles',
    });
    await loading.present();

    forkJoin([
          this.usuariosService.GetPerfil(),
          this.gruaService.GetGruasProveedor()
        ]).subscribe({
          next: ([
            getPerfilResponse,
            getGruasProveedorResponse
          ]) => {
            this.gruas = getGruasProveedorResponse;

            console.log(this.gruas);

            this.razonSocial = getPerfilResponse.razonSocial;
            this.direccion = getPerfilResponse.direccion;
            this.rfc = getPerfilResponse.rfc;
            this.nombre = getPerfilResponse.nombre;
            this.nombreUsuario = getPerfilResponse.nombreUsuario;
            this.telefono = getPerfilResponse.telefono;
            this.correoElectronico = getPerfilResponse.correoEletronico;
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

  selectedseg: string = 'Perfil';
  selectTab(event: CustomEvent) {
    this.selectedseg = event.detail.value;
  }
}