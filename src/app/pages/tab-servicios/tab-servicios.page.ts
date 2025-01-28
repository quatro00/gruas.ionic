import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ReportesService } from 'src/app/services/reportes.service';
import { ServicioService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-tab-servicios',
  templateUrl: './tab-servicios.page.html',
  styleUrls: ['./tab-servicios.page.scss'],
  providers: [DatePipe],
  standalone: false
})
export class TabServiciosPage implements OnInit {
  darkMode = false;
  serviciosProximos: any[] = [];

  formattedDate: string = ''; // Fecha en formato MMM YYYY
  numericMonth: number = 0;  // Mes en formato numérico (1-12)
  numericYear: number = 0;   // Año en formato numérico (por ejemplo, 2025)
  currentDate = new Date(); // Obtén la fecha actual
  periodo = '';

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private serviciosService: ServicioService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
    private reportesService: ReportesService
  ) {
    this.numericMonth = this.currentDate.getMonth() + 1; // Mes (0-11) -> (+1 para 1-12)
    this.numericYear = this.currentDate.getFullYear();   // Año

    this.periodo = this.convierteMes(this.numericMonth) + ' ' + this.numericYear.toString();
  }

  convierteMes(mes: number) {
    if (mes == 1) { return 'Ene' }
    if (mes == 2) { return 'Feb' }
    if (mes == 3) { return 'Mar' }
    if (mes == 4) { return 'Abr' }
    if (mes == 5) { return 'May' }
    if (mes == 6) { return 'Jun' }
    if (mes == 7) { return 'Jul' }
    if (mes == 8) { return 'Ago' }
    if (mes == 9) { return 'Sep' }
    if (mes == 10) { return 'Oct' }
    if (mes == 11) { return 'Nov' }
    if (mes == 12) { return 'Dic' }
    return '';
  }

  ngOnInit(): void {
    this.checkAppMode();
    this.loadData();
  }

  async cambiaMes(iteracion: number) {

    this.currentDate.setMonth(this.currentDate.getMonth() + (iteracion));

    this.numericMonth = this.currentDate.getMonth() + 1; // Mes (0-11) -> (+1 para 1-12)
    this.numericYear = this.currentDate.getFullYear();   // Año

    this.periodo = this.convierteMes(this.numericMonth) + ' ' + this.numericYear.toString();

    this.buscaServiciosMensuales();
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


  async buscaServiciosMensuales() {
    const loading = await this.loadingController.create({
      message: 'Espere...',
      spinner: 'circles',
    });
    await loading.present();

    let periodo = this.datePipe.transform(this.currentDate, 'yyyy-MM') || '';
    let request: any = {
      periodo: periodo
    }


    forkJoin([
      this.reportesService.GetServiciosProveedorMensuales(request)
    ]).subscribe({
      next: ([
        GetServiciosProveedorMensualesResponse,
      ]) => {
        //this.pagos = GetPagosProveedorResponse;
        console.log(GetServiciosProveedorMensualesResponse);
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
  async selectTab(event: CustomEvent) {
    this.selectedseg = event.detail.value;

    //buscamos el historico de los servicios
    if (this.selectedseg == 'History') {
      this.buscaServiciosMensuales();
    }
  }
}