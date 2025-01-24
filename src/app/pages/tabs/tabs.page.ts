import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonTabs, LoadingController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false
})
export class TabsPage implements OnInit {

  darkMode = false;

  
  

  constructor(
    private fb: FormBuilder,
    private usuariosService:UsuariosService,
        private loadingController: LoadingController,
        private toastController:ToastController
  ) { }

  ngOnInit(): void {
    this.checkAppMode();
    //this.loadData();
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

  selectTab: any;
  @ViewChild('tabs',{static:false})
  tabs!: IonTabs;

  setCurrentTab() {
    this.selectTab = this.tabs.getSelected();
  }

}
