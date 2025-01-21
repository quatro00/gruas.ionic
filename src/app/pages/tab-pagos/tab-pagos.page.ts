import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-pagos',
  templateUrl: './tab-pagos.page.html',
  styleUrls: ['./tab-pagos.page.scss'],
  standalone:false  
})
export class TabPagosPage implements OnInit {
  darkMode = false;

  constructor() { }

  ngOnInit(): void {
    this.checkAppMode();
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