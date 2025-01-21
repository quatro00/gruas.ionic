import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabServiciosPage } from './tab-servicios.page';

describe('TabServiciosPage', () => {
  let component: TabServiciosPage;
  let fixture: ComponentFixture<TabServiciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
