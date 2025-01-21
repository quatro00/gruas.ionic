import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false
})
export class TabsPage implements OnInit {

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

  selectTab: any;
  @ViewChild('tabs',{static:false})
  tabs!: IonTabs;

  setCurrentTab() {
    this.selectTab = this.tabs.getSelected();
  }

}
