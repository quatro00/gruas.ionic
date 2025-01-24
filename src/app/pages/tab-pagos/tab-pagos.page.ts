import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { forkJoin } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { ReportesService } from 'src/app/services/reportes.service';

registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-tab-pagos',
  templateUrl: './tab-pagos.page.html',
  styleUrls: ['./tab-pagos.page.scss'],
  providers: [DatePipe], 
  standalone:false  
})
export class TabPagosPage implements OnInit {
  darkMode = false;
  periodo = '';

  pagos:any[] = [];
  formattedDate: string = ''; // Fecha en formato MMM YYYY
  numericMonth: number = 0;  // Mes en formato numérico (1-12)
  numericYear: number = 0;   // Año en formato numérico (por ejemplo, 2025)
  currentDate = new Date(); // Obtén la fecha actual

  constructor(
    private datePipe: DatePipe, 
    private loadingController:LoadingController,
    private reportesService:ReportesService)
    {
    

    // Extrae el mes y el año
    this.numericMonth = this.currentDate.getMonth() + 1; // Mes (0-11) -> (+1 para 1-12)
    this.numericYear = this.currentDate.getFullYear();   // Año

    this.periodo = this.convierteMes(this.numericMonth) + ' ' + this.numericYear.toString();

    

   }
 async cambiaMes(iteracion:number){
  
  this.currentDate.setMonth(this.currentDate.getMonth() + (iteracion));
  
  this.numericMonth = this.currentDate.getMonth() + 1; // Mes (0-11) -> (+1 para 1-12)
  this.numericYear = this.currentDate.getFullYear();   // Año

  this.periodo = this.convierteMes(this.numericMonth) + ' ' + this.numericYear.toString();

  this.loadData();
 }

 async loadData() {
     const loading = await this.loadingController.create({
       message: 'Espere...',
       spinner: 'circles',
     });
     await loading.present();
 
     let periodo = this.datePipe.transform(this.currentDate, 'yyyy-MM') || '';
     let request:any = {
      periodo:periodo,
      estatusPago:0
    }

     forkJoin([
           this.reportesService.GetPagosProveedor(request)
         ]).subscribe({
           next: ([
            GetPagosProveedorResponse,
           ]) => {
             this.pagos = GetPagosProveedorResponse;
             console.log(this.pagos);
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


   convierteMes(mes:number){
    if(mes == 1){return 'Ene'}
    if(mes == 2){return 'Feb'}
    if(mes == 3){return 'Mar'}
    if(mes == 4){return 'Abr'}
    if(mes == 5){return 'May'}
    if(mes == 6){return 'Jun'}
    if(mes == 7){return 'Jul'}
    if(mes == 8){return 'Ago'}
    if(mes == 9){return 'Sep'}
    if(mes == 10){return 'Oct'}
    if(mes == 11){return 'Nov'}
    if(mes == 12){return 'Dic'}
    return '';
   }
  ngOnInit(): void {
    this.checkAppMode();

    this.loadData();
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

  selectedseg: string = 'Historico';
  selectTab(event: CustomEvent) {
    this.selectedseg = event.detail.value;
  }
}