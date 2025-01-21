import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabConfiguracionPage } from './tab-configuracion.page';

describe('TabConfiguracionPage', () => {
  let component: TabConfiguracionPage;
  let fixture: ComponentFixture<TabConfiguracionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConfiguracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
